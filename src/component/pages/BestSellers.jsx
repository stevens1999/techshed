import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBestsellers } from "../../api";

// StarRating component to display product ratings
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

// ProductCard Component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-1000 overflow-hidden flex flex-col transform hover:-translate-y-1">
      {/* Product Image */}
      <div className="relative w-full md:h-64 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-90"
          onError={(e) => {
            e.target.onerror = null; // Prevents infinite loop if placeholder also fails
            e.target.src = `https://placehold.co/300x300/CCCCCC/666666?text=Image+Error`;
          }}
        />

        {product.sale && (
          <div className="absolute top-0 left-0 bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-br-lg">
            Sale
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-3">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {product.sale && (
            <span className="text-xl font-semibold text-gray-400 line-through">
              ${product.originalPrice?.toFixed(2)}
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

// ProductSlider Component for horizontal scrolling
const ProductSlider = ({ products }) => {
  const scrollRef = useRef(null);

  // Scroll a specified distance to the left or right
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-300)}
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg z-10 transition-transform duration-300 hover:scale-110 hidden md:block"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
      </button>

      <div
        ref={scrollRef}
        className="flex space-x-5 overflow-x-auto p-4 scroll-smooth transition-all duration-300 no-scrollbar"
        style={{
          scrollSnapType: 'x mandatory',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-1/1 sm:w-1/3 md:w-1/3 lg:w-1/5 xl:w-1/5 scroll-snap-align-start"
          >
            <Link to={`/product/${product.id}`} key={product.id} className="block">
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      <button
        onClick={() => scroll(300)}
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg z-10 transition-transform duration-300 hover:scale-110 hidden md:block"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-gray-600" />
      </button>
    </div>
  );
};

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const data = await getBestsellers();
        setProducts(data);
      } catch (err) {
        setError('Failed to load best sellers');
        console.error('Error fetching bestsellers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <div className="mt-12 lg:mt-4 lg:mx-10">
        <div className="bg-white antialiased p-4 sm:p-6 lg:p-8">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              Best Sellers
            </h2>
          </header>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading best sellers...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 lg:mt-4 lg:mx-10">
        <div className="bg-white antialiased p-4 sm:p-6 lg:p-8">
          <header className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              Best Sellers
            </h2>
          </header>
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 lg:mt-4 lg:mx-10">
      <div className="bg-white antialiased p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Best Sellers
          </h2>
        </header>

        {/* Product Slider Section */}
        <ProductSlider products={products} />

        {/* View All Button */}
        <div className="flex justify-center md:mt-8 space-x-4">
          <button
            onClick={() => navigate('/ShopAll')}
            className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;

