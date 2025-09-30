import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const images = [
    "/images/iphone-15-pro-wallpaper-2.webp",
    "/images/c837a6_9c1280daaeb0481abc58e6e236efdf59~mv2.png",
    "/images/c837a6_837f9cd4f59146c3ad47a2bd882fedfd~mv2.png",
    "/images/c837a6_f58829a26e594ca3aa72383e19cf39b9~mv2.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const intervalTime = 10000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [images.length, intervalTime]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Background ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out
              ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-8 text-white">
        {/* Header Section */}
        <header className="text-center lg:text-start py-28 md:md:py-96 lg:py-28">
          <div className="lg:mx-55">
            <h4 className="bg-red-600 text-white inline-block px-3 py-1 font-semibold mb-2">
              Best Prices
            </h4>
            <h1 className="text-6xl font-bold xl:w-[60%] mb-4 drop-shadow-lg leading-20 lg:leading-15">
              Incredible Prices on All Your Favorite Items
            </h1>
            <p className="text-lg sm:text-xl drop-shadow-md mb-6">
              Get more for less on selected brands
            </p>
            <button
              type="button"
              className="mx-auto bg-blue-900 text-white hover:bg-blue-800 cursor-pointer rounded-full px-8 py-3 transition-colors duration-300 shadow-lg"
              onClick={() => navigate("/ShopAll")}
            >
              Shop Now
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
