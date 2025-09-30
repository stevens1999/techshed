import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faheart,
  faShoppingCart,
  faArrowLeft,
  faCheck,
  faShieldAlt,
  faTruck,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../CartContext";
import { useFavorites } from "../FavoritesContext";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, getProducts } from "../../api";

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="half-gradient">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
            fill="url(#half-gradient)"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Product Card Component for recommendations
const ProductCard = ({ product, onProductClick }) => {
  return (
    <div
      className="bg-white cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
      onClick={() => onProductClick(product)}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/300x300/CCCCCC/666666?text=Image+Error`;
          }}
        />
        {product.sale && (
          <div className="absolute top-0 left-0 bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">
            Sale
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {product.sale && product.originalPrice !== null && (
            <span className="text-xl font-semibold text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Product Detail Component
const ProductDetail = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState(null);
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setCurrentProduct(null);
      setQuantity(1);
      setActiveTab("description");

      const parsedId = parseInt(productId);
      if (isNaN(parsedId)) {
        console.error(`Invalid product ID: ${productId}`);
        navigate("/ShopAll");
        setLoading(false);
        return;
      }

      try {
        const product = await getProduct(parsedId);
        if (product) {
          setCurrentProduct(product);
        } else {
          console.error(`Product with id ${productId} not found`);
          setCurrentProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setCurrentProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (currentProduct) {
        try {
          const allProducts = await getProducts();
          const recommended = allProducts.filter(
            (p) =>
              p.id !== currentProduct.id && p.category === currentProduct.category
          ).slice(0, 4);

          if (recommended.length < 4) {
            const additional = allProducts.filter(
              (p) => p.id !== currentProduct.id && !recommended.some(r => r.id === p.id)
            ).slice(0, 4 - recommended.length);
            recommended.push(...additional);
          }

          setRecommendedProducts(recommended);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
          setRecommendedProducts([]);
        }
      }
    };

    fetchRecommendations();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!currentProduct && !loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-800 mb-2">Product Not Found</div>
          <div className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </div>
          <button
            onClick={() => navigate("/ShopAll")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </button>
        </div>
      </div>
    );
  }

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = () => {
    addToCart({ ...currentProduct, quantity });
    console.log(`Added ${quantity}x "${currentProduct.name}" to cart!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(currentProduct.id)) {
      removeFavorite(currentProduct.id);
    } else {
      addFavorite(currentProduct);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="mt-40 lg:mt-47 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          className="flex items-center text-xl text-blue-600 hover:text-blue-800 mb-8 transition-color cursor-pointer"
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back
        </button>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product Images */}
            <div className="lg:p-8 p-6">
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img
                  src={currentProduct.img}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/600x600/CCCCCC/666666?text=Product+Image`;
                  }}
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 lg:p-8 lg:border-l">
              {currentProduct.sale && (
                <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  On Sale!
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {currentProduct.name}
              </h1>

              <div className="flex items-center mb-6">
                <StarRating rating={currentProduct.rating} size="w-5 h-5" />
                <span className="ml-3 text-lg text-gray-600">
                  {currentProduct.rating} out of 5 stars
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {currentProduct.sale && currentProduct.originalPrice !== null && (
                  <span className="text-xl font-semibold text-gray-400 line-through">
                    ${currentProduct.originalPrice?.toFixed(2)}
                  </span>
                )}
                <span className="text-2xl font-bold text-gray-900">
                  ${currentProduct.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {currentProduct.description ||
                  "Experience premium quality and performance with this exceptional product. Designed with cutting-edge technology and user-friendly features to enhance your daily productivity and entertainment."}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-lg font-medium text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                  Add to Cart
                </button>
                <FontAwesomeIcon
                  icon={faheart}
                  className={`${
                    isFavorite(currentProduct.id)
                      ? "text-red-500"
                      : "text-gray-400"
                  } cursor-pointer w-6 h-6 text-3xl mt-4`}
                  onClick={handleToggleFavorite}
                />
              </div>

              {/* Trust Badges */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="mr-2 text-green-600"
                    />
                    Free Shipping
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faUndo}
                      className="mr-2 text-blue-600"
                    />
                    30-Day Returns
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="mr-2 text-purple-600"
                    />
                    Warranty Included
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              {["description", "specifications", "features"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-8 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {currentProduct.description ||
                    "This premium product combines cutting-edge technology with exceptional design to deliver an outstanding user experience. Whether you're working, creating, or entertaining, this device meets all your needs with superior performance and reliability."}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Built with premium materials and attention to detail, this
                  product offers durability and style that will serve you well
                  for years to come. The intuitive design ensures ease of use
                  while maintaining professional-grade capabilities.
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProduct.specifications ? (
                  Object.entries(currentProduct.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="font-medium text-gray-900">
                          {key}:
                        </span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    )
                  )
                ) : (
                  <div className="col-span-2 text-gray-600">
                    <p>
                      Detailed specifications will be available soon. Please
                      contact our support team for more information.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProduct.features
                  ? currentProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500 mr-3"
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))
                  : [
                      "High-Quality Build",
                      "User-Friendly Design",
                      "Premium Performance",
                      "Reliable Support",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500 mr-3"
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
