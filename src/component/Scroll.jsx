import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Scroll = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Show button after scrolling down 300px
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-opacity duration-300 focus:outline-none z-50"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default Scroll;
