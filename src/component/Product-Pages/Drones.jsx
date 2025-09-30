import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSort,
  faList,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { Products } from "../Products";

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

// Filter products for Drones & Cameras category
const droneProducts = Products.filter(
  (product) => product.category === "Drones" || product.category === "Cameras"
);

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
        <div className="flex items-center gap-2 mb-4">
          {product.sale && product.originalPrice !== null && (
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

const Drones = () => {
  const [allProducts] = useState(droneProducts);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const initialDisplayCount = 20;
  const productsPerLoad = 10;
  const [visibleProductCount, setVisibleProductCount] =
    useState(initialDisplayCount);

  // State for filters
  const [priceFilters, setPriceFilters] = useState([]);
  const [ratingFilters, setRatingFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setDisplayedProducts(allProducts);
  }, [allProducts]);

  // Apply filters and sorting
  const applyFilters = () => {
    let filtered = [...allProducts];

    // Apply price filters
    if (priceFilters.length > 0) {
      filtered = filtered.filter((product) => {
        if (priceFilters.includes("Under $50") && product.price < 50)
          return true;
        if (
          priceFilters.includes("$50 - $100") &&
          product.price >= 50 &&
          product.price <= 100
        )
          return true;
        if (
          priceFilters.includes("$100 - $200") &&
          product.price > 100 &&
          product.price <= 200
        )
          return true;
        if (
          priceFilters.includes("$200 - $500") &&
          product.price > 200 &&
          product.price <= 500
        )
          return true;
        if (priceFilters.includes("$500 & Above") && product.price > 500)
          return true;
        return false;
      });
    }

    // Apply rating filters
    if (ratingFilters.length > 0) {
      filtered = filtered.filter((product) => {
        if (ratingFilters.includes("4 & above") && product.rating >= 4)
          return true;
        if (ratingFilters.includes("3 & above") && product.rating >= 3)
          return true;
        if (ratingFilters.includes("2 & above") && product.rating >= 2)
          return true;
        return false;
      });
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case "Price: Low to High":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "Price: High to Low":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "Rating: High to Low":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "Newest Arrivals":
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }
    }

    setDisplayedProducts(filtered);
    setVisibleProductCount(initialDisplayCount);
    setIsSidebarOpen(false);
  };

  // Handler for price filter changes
  const handlePriceFilterChange = (priceRange) => {
    setPriceFilters((prev) =>
      prev.includes(priceRange)
        ? prev.filter((range) => range !== priceRange)
        : [...prev, priceRange]
    );
  };

  // Handler for rating filter changes
  const handleRatingFilterChange = (rating) => {
    setRatingFilters((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setPriceFilters([]);
    setRatingFilters([]);
    setSortOption(null);
    setDisplayedProducts(allProducts);
    setVisibleProductCount(initialDisplayCount);
  };

  return (
    <div className="mt-40 lg:mt-47">
      <div className="antialiased p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
            Drones & Camera
          </h2>
        </header>
        <div className="lg:flex">
          {/* Mobile sidebar toggle button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden mb-6 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon
              icon={isSidebarOpen ? faTimes : faFilter}
              className="mr-2"
            />
            {isSidebarOpen ? "Close Filters" : "Show Filters"}
          </button>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div
              className={`${
                isSidebarOpen ? "block" : "hidden"
              } lg:block lg:w-64 lg:pr-8 lg-6 lg:mb-0`}
            >
              {/* Clear filters button */}
              {(priceFilters.length > 0 ||
                ratingFilters.length > 0 ||
                sortOption) && (
                <button
                  onClick={clearAllFilters}
                  className="w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear All Filters
                </button>
              )}

              <div className="bg-white md:flex md:justify-between lg:flex-col lg:justify-normal rounded-lg p-4 shadow-md">
                {/* Browse By Section */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <FontAwesomeIcon
                      icon={faList}
                      className="mr-2 text-blue-600"
                    />
                    Browse by
                  </h3>
                  <ul className="space-y-2 pl-2">
                    {[
                      { name: "Computers", path: "/Computer" },
                      { name: "Tablets", path: "/Tablets" },
                      { name: "Speakers", path: "/Speakers" },
                      { name: "Headphones", path: "/Headphones" },
                      { name: "Mobile", path: "/Mobile" },
                      { name: "T.V &Home Cinema", path: "/HomeCinema" },
                      { name: "Wearable Tech", path: "/WearableTech" },
                      { name: "Sale", path: "/OnSale" },
                    ].map((category) => (
                      <li key={category.name}>
                        <Link
                          to={category.path}
                          className="text-gray-700 hover:text-blue-600 block py-1"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Filter By Section */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <FontAwesomeIcon
                      icon={faFilter}
                      className="mr-2 text-blue-600"
                    />
                    Filter by
                  </h3>
                  <div className="pl-2">
                    <h4 className="font-medium text-gray-700 mb-2">Price</h4>
                    <div className="space-y-2">
                      {[
                        "Under $50",
                        "$50 - $100",
                        "$100 - $200",
                        "$200 - $500",
                        "$500 & Above",
                      ].map((price) => (
                        <div key={price} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`price-${price}`}
                            checked={priceFilters.includes(price)}
                            onChange={() => handlePriceFilterChange(price)}
                            className="mr-2 h-4 w-4 text-blue-600 rounded"
                          />
                          <label
                            htmlFor={`price-${price}`}
                            className="text-gray-600"
                          >
                            {price}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mt-4 mb-2">
                        Rating
                      </h4>
                      <div className="space-y-2">
                        {["4 & above", "3 & above", "2 & above"].map(
                          (rating) => (
                            <div key={rating} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`rating-${rating}`}
                                checked={ratingFilters.includes(rating)}
                                onChange={() =>
                                  handleRatingFilterChange(rating)
                                }
                                className="mr-2 h-4 w-4 text-blue-600 rounded"
                              />
                              <label
                                htmlFor={`rating-${rating}`}
                                className="text-gray-600"
                              >
                                {rating}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sort By Section */}
                <div className="mt-4">
                  <h3 className="font-bold text-lg -ml-1 mb-3 flex items-center">
                    <FontAwesomeIcon
                      icon={faSort}
                      className="mr-2 text-blue-600"
                    />
                    Sort by
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Price: Low to High",
                      "Price: High to Low",
                      "Rating: High to Low",
                      "Newest Arrivals",
                    ].map((sortOptionItem) => (
                      <div key={sortOptionItem} className="flex items-center">
                        <input
                          type="radio"
                          name="sort"
                          id={`sort-${sortOptionItem}`}
                          checked={sortOption === sortOptionItem}
                          onChange={() => setSortOption(sortOptionItem)}
                          className="mr-2 h-4 w-4 text-blue-600"
                        />
                        <label
                          htmlFor={`sort-${sortOptionItem}`}
                          className="text-gray-600"
                        >
                          {sortOptionItem}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Apply Filters Button */}
              <button
                onClick={applyFilters}
                className="w-full mt-6 mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-5 gap-x-6 gap-y-8">
            {displayedProducts.slice(0, visibleProductCount).map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="hover:scale-105 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </div>

        {/* See More/See Less Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          {visibleProductCount < displayedProducts.length && (
            <button
              onClick={handleSeeMore}
              className="bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
            >
              See More
            </button>
          )}
          {visibleProductCount > initialDisplayCount && (
            <button
              onClick={handleSeeLess}
              className="bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
            >
              See Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Drones;
