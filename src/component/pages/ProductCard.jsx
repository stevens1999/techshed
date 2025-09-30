import React from "react";
const ProductCard = ({ product, onProductClick }) => {
  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      navigate(`/product/${product.id}`);
      console.log(`Navigating to product: ${product.name}`);
    }
  };

  return (
    <div
      className="bg-white cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-1000 overflow-hidden flex flex-col transform hover:-translate-y-1"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative w-full md:h-64 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-90"
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

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex items-center mb-3">
          <StarRating rating={product.rating} />
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2">
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
export default ProductCard;
