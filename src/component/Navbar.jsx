import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faHeart,
  faCartShopping,
  faGift,
  faChevronDown,
  faTimes,
  faUser,
  faBox,
  faSignOutAlt,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import MyComponent from "./MyComponent";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";
import { useAuth } from "./AuthContext";
import { Products } from "./Products";

// Component for the top black bar
const TopBar = () => (
  <div className="bg-black">
    <div className="container mx-auto flex justify-between items-center -mt-0.5 p-4 text-white">
      <div className="flex gap-4">
        <FontAwesomeIcon icon={faGift} className="text-xl text-white" />
        <p>Free Shipping for orders over $200</p>
      </div>
      <nav className="hidden text-white lg:flex gap-4 xl:gap-12">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/HelpCenter">Help Center</Link>
        <p>
          Call Us:{" "}
          <a href="tel:+1-555-123-4567" className="hover:underline">
            +1 (800) TECH-BIZ
          </a>
        </p>
      </nav>
    </div>
  </div>
);

// Component for the main navigation links
const MainLinks = () => (
  <div className="bg-gray-200">
    <div className="container mx-auto hidden lg:flex lg:gap-6 items-center p-4">
      <Link to="/ShopAll" className="hover:text-blue-700">
        Shop All
      </Link>
      <Link to="/Computer" className="hover:text-blue-700">
        Computers
      </Link>
      <Link to="/Tablets" className="hover:text-blue-700">
        Tablets
      </Link>
      <Link to="/Drones" className="hover:text-blue-700">
        Drones & Camera
      </Link>
      <div className="relative group">
        <div className="transition-colors rounded-md px-2 flex items-center cursor-pointer hover:text-blue-700">
          Audio
          <FontAwesomeIcon
            icon={faChevronDown}
            className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:rotate-180"
          />
        </div>
        <div className="absolute left-0 top-full p-4 w-35 flex flex-col gap-2 bg-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 z-10">
          <Link to="/Headphones" className="hover:text-blue-700">
            Headphones
          </Link>
          <Link to="/Speakers" className="hover:text-blue-700">
            Speakers
          </Link>
        </div>
      </div>
      <Link to="/Mobile" className="hover:text-blue-700">
        Mobile
      </Link>
      <Link to="/HomeCinema" className="hover:text-blue-700">
        T.V & Home Cinema
      </Link>
      <Link to="/WearableTech" className="hover:text-blue-700">
        Wearable Tech
      </Link>
      <Link to="/OnSale" className="hover:text-blue-700">
        Sale
      </Link>
    </div>
  </div>
);

const Navbar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState(null);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);
  const cartRef = useRef(null);
  const favoritesRef = useRef(null);

  const { cartCount, cartItems, removeFromCart, updateQuantity } = useCart();
  const { favorites, favoritesCount, removeFavorite } = useFavorites();
  const { user, isAuthenticated, logout } = useAuth();

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
      setShowSearchInput(!showSearchInput);
      setShowResults(false);

      if (!showSearchInput && searchInputRef.current) {
        setTimeout(() => searchInputRef.current.focus(), 0);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setShowResults(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchValue) {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeOverlay === 'cart' && cartRef.current && !cartRef.current.contains(event.target)) {
        setActiveOverlay(null);
      }
      if (activeOverlay === 'favorites' && favoritesRef.current && !favoritesRef.current.contains(event.target)) {
        setActiveOverlay(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeOverlay]);

  const handleCartClick = () => {
    setActiveOverlay(activeOverlay === 'cart' ? null : 'cart');
  };

  const handleFavoritesClick = () => {
    setActiveOverlay(activeOverlay === 'favorites' ? null : 'favorites');
  };

  const handleProfileClick = () => {
    setActiveOverlay(activeOverlay === 'profile' ? null : 'profile');
  };

  const handleLogout = () => {
    logout();
    setActiveOverlay(null);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <header className="bg-white font-bold fixed top-0 w-full z-50">
      <TopBar />
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* {logo} */}
        <Link to="/">
          <h1 className="font-bold text-4xl">TechShed</h1>
        </Link>

        <div className="flex md:gap-4 md:items-center">
          {/* search */}
          <div className="hidden md:flex md:items-center md:relative">
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
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="w-full bg-transparent outline-none border-none text-black placeholder-gray-500"
              />
            </div>
            <div
              onClick={handleSearchClick}
              className="ml-2 cursor-pointer p-2 rounded-lg hover:shadow-md hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faSearch} className="text-xl" />
            </div>

            {showResults && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
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

          {/* User Profile / Login */}
          <div className="hidden lg:flex relative">
            {isAuthenticated ? (
              <>
                <Button
                  icon={faCircleUser}
                  text={user?.name || 'Profile'}
                  onClick={handleProfileClick}
                  className="font-bold cursor-pointer gap-2 hover:rounded-lg hover:shadow-md hover:bg-gray-200 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-500 hover:focus:ring-offset-2"
                />
                
                {activeOverlay === 'profile' && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl z-50 p-4">
                    <div className="flex items-center gap-3 border-b pb-3 mb-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    
                    <nav className="space-y-2">
                      <Link 
                        to="/Profile" 
                        onClick={() => setActiveOverlay(null)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <FontAwesomeIcon icon={faUser} className="w-4" />
                        My Account
                      </Link>
                      
                      <Link 
                        to="/Profile" 
                        onClick={() => setActiveOverlay(null)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <FontAwesomeIcon icon={faBox} className="w-4" />
                        Orders
                      </Link>
                      
                      <Link 
                        to="/Profile" 
                        onClick={() => setActiveOverlay(null)}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <FontAwesomeIcon icon={faHeart} className="w-4" />
                        Wishlist
                      </Link>
                      
                      <hr className="my-2" />
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4" />
                        Logout
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <Link to="/Login">
                <Button
                  icon={faCircleUser}
                  text="Log In"
                  className="font-bold cursor-pointer gap-2 hover:rounded-lg hover:shadow-md hover:bg-gray-200 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-500 hover:focus:ring-offset-2"
                />
              </Link>
            )}
          </div>

          {/* favorite */}
          <div className="hidden md:flex relative" ref={favoritesRef}>
            <Button
              icon={faHeart}
              onClick={handleFavoritesClick}
              className="hidden md:flex cursor-pointer hover:rounded-lg hover:shadow-md hover:bg-gray-200 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-500 hover:focus:ring-offset-2"
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}

            {activeOverlay === 'favorites' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h2 className="text-xl font-bold text-black">Your Favorites</h2>
                  <button onClick={() => setActiveOverlay(null)}>
                    <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                {favoritesCount > 0 ? (
                  <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                    {favorites.map((product) => (
                      <li key={product.id} className="py-2 flex items-center gap-4">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium text-sm text-black">{product.name}</h3>
                          <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
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
                  <div className="p-4 text-center text-gray-500">You have no favorites yet.</div>
                )}
              </div>
            )}
          </div>

          {/* cart */}
          <div className="relative" ref={cartRef}>
            <Button
              icon={faCartShopping}
              onClick={handleCartClick}
              className="cursor-pointer mt-4 md:mt-0 hover:rounded-lg hover:shadow-md hover:bg-gray-200 hover:focus:outline-none hover:focus:ring-2 hover:focus:ring-gray-500 hover:focus:ring-offset-2"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}

            {activeOverlay === 'cart' && (
              <div className="absolute -left-46 md:right-0 top-full mt-2 w-100 bg-white rounded-lg shadow-xl z-50 p-4 lg:-left-80">
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button onClick={() => setActiveOverlay(null)}>
                    <FontAwesomeIcon icon={faTimes} className="text-gray-500 hover:text-red-500" />
                  </button>
                </div>
                {cartItems && cartItems.length > 0 ? (
                  <>
                    <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                      {cartItems.map((product) => (
                        <li key={product.id} className="py-3 flex items-center gap-3">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium text-sm">{product.name}</h3>
                            <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                disabled={product.quantity <= 1}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full text-xs"
                              >
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span className="text-sm font-medium min-w-[20px] text-center">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-xs"
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-2 border-t flex justify-between items-center">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-lg font-bold">${calculateTotal()}</span>
                    </div>
                    <Link to="/checkout">
                      <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Go to Checkout
                      </button>
                    </Link>
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MyComponent />
          </div>
        </div>
      </div>

      {/* CTA */}
      <MainLinks />
    </header>
  );
};

export default Navbar;
