import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCircleUser,
  faHeart,
  faSearch,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext";
import Button from "./Button";
import { Products } from "./Products";

function MyComponent() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
    const { favorites, favoritesCount, removeFavorite } = useFavorites();

  const handleSearch = () => {
    if (searchValue.trim()) {
      const filteredProducts = Products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchClick = () => {
    if (showSearchInput && searchValue) {
      handleSearch();
    } else {
      const next = !showSearchInput;
      setShowSearchInput(next);
      setShowResults(false);
      if (next && searchInputRef.current) {
        setTimeout(() => searchInputRef.current.focus(), 0);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue) {
      handleSearch();
    }
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };
  const Togglenav = () => {
    setIsNavOpen(!isNavOpen);
  };
  
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="lg:hidden p-4 flex justify-end">
        <button
          type="button"
          aria-label="Open menu"
          onClick={Togglenav}
          className="p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
      </div>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
        onKeyDown={(e) => { if (e.key === 'Escape') setIsNavOpen(false); }}
        className={`
          fixed top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 to-black text-white z-[1000]
          transform transition-transform duration-300 ease-in-out
          ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          lg:hidden overflow-y-auto
        `}
      >
        {/* Navigation Links */}
        <nav className="flex md:flex-row gap-8 flex-wrap md:items-center md:justify-center mt-0 z-[1000] bg-black p-4">
          <Link
            to="/about"
            className="text-white text-[1rem] md:text-2xl hover:text-gray-300"
            onClick={Togglenav}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white text-[1rem] md:text-2xl hover:text-gray-300"
            onClick={Togglenav}
          >
            Contact
          </Link>
          <Link
            to="/HelpCenter"
            className="text-white text-[1rem] md:text-2xl hover:text-gray-300"
            onClick={Togglenav}
          >
            Help Center
          </Link>

          <p className="text-white text-[1rem] md:text-2xl">
            Call Us:{" "}
            <a href="tel:+1-555-123-4567" className="hover:underline">
              +1 (800) TECH-BIZ
            </a>
          </p>
        </nav>

        {/* Close button inside the mobile nav */}
        <div className="items-start justify-between ml-4 mt-4 flex flex-row">
          <Link to="/">
            <h1
              className="text-2xl md:text-4xl md:ml-8 font-fuse"
              onClick={Togglenav}
            >
              TechShed
            </h1>
          </Link>

          <div className="lg:hidden p-4 flex justify-end relative bottom-4 md:right-8">
            <button
              type="button"
              aria-label="Close menu"
              autoFocus
              onClick={Togglenav}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex md:hidden mr-3 justify-between flex-row mb-4">
          {/* {login button} */}
          <Button
            icon={faCircleUser}
            text="Log In"
            className="flex font-bold cursor-pointer items-center text-xl gap-2 hover:border-2 hover:rounded-lg"
            onClick={() => { Togglenav(); window.location.href = "/Login"; }}
          />

          {/* favorite */}
          <div className="relative">
            <Button
              icon={faHeart}
              onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
              className="flex cursor-pointer hover:rounded-lg hover:shadow-md hover:bg-gray-200 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-500 hover:focus:ring-offset-2"
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}

            {isFavoritesOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h2 className="text-xl font-bold text-black">Your Favorites</h2>
                  <button onClick={() => setIsFavoritesOpen(false)}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-gray-500 hover:text-red-500"
                    />
                  </button>
                </div>
                {favoritesCount > 0 ? (
                  <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                    {favorites.map((product) => (
                      <li
                        key={product.id}
                        className="py-2 flex items-center gap-4"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium text-sm text-black">
                            {product.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    You have no favorites yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div ref={searchContainerRef} className="relative flex md:hidden md:items-center">
          <div
            className={`flex items-center bg-gray-200 rounded-3xl transition-all duration-300 ease-in-out ${
              showSearchInput ? "w-64 opacity-100 p-2" : "w-0 opacity-0 p-0"
            } overflow-hidden`}
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search..."
              className="w-full bg-transparent outline-none border-none text-black placeholder-gray-500"
            />
          </div>
          <button
            type="button"
            aria-label="Search"
            onClick={handleSearchClick}
            className="ml-2 p-2 rounded-lg hover:shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </button>
          {showResults && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto text-black">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((product) => (
                    <li key={product.id} className="p-2 hover:bg-gray-100">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex items-center gap-3"
                        onClick={() => {
                          setShowResults(false);
                          setShowSearchInput(false);
                          setSearchValue("");
                          setIsNavOpen(false);
                        }}
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-gray-500">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Product not found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center mt-10 md:mt-20 space-y-10">
          <div>
            <Link
              to="/ShopAll"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Shop All
            </Link>
          </div>
          <div>
            <Link
              to="/Computer"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Computers
            </Link>
          </div>
          <div>
            <Link
              to="/Tablets"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Tablets
            </Link>
          </div>
          <div>
            <Link
              to="/Drones"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Drones & Camera
            </Link>
          </div>
          <div className="relative group">
                  <div className="text-2xl transition-colors rounded-md px-2 flex items-center cursor-pointer hover:text-blue-700">
                    Audio
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="h-full w-full ml-1 transform transition-transform duration-200 group-hover:rotate-180"
                    />
                  </div>
                  <div className="text-2xl text-black absolute left-0 top-full p-4 w-45 flex flex-col gap-2 bg-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-10">
                    <Link to="/Headphones" className="hover:text-blue-700" onClick={Togglenav}>
                      Headphones
                    </Link>
                    <Link to="/Speakers" className="hover:text-blue-700" onClick={Togglenav}>
                      Speakers
                    </Link>
                  </div>
                </div>
          <div>
            <Link
              to="/Mobile"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Mobile
            </Link>
          </div>
          <div>
            <Link
              to="/HomeCinema"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              T.V & Home Cinema
            </Link>
          </div>
          <div>
            <Link
              to="/WearableTech"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Wearable Tech
            </Link>
          </div>
          <div>
            <Link
              to="/OnSale"
              className="text-2xl text-center pb-4 hover:border-b-2 w-full"
              onClick={Togglenav}
            >
              Sale
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
