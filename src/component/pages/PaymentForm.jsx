import React, { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
const AddPaymentForm = ({ onAddMethod, onCancel }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [messageBox, setMessageBox] = useState({
    isVisible: false,
    title: "",
    text: "",
    type: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        clearCart();
        navigate("/");
        setMessageBox({ isVisible: false, title: "", text: "", type: "" });
        setPaymentSuccess(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, clearCart]);

  const closeMessageBox = () => {
    setMessageBox({ ...messageBox, isVisible: false });
  };

  const [formData, setFormData] = useState({
    type: "credit_card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    paypalEmail: "",
    makeDefault: false,
  });
  const [errors, setErrors] = useState({});

  // Utility function to get card brand from number
  const getCardBrand = (cardNumber) => {
    const firstDigit = cardNumber.trim().replace(/\s/g, "")[0];
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "American Express";
    if (firstDigit === "6") return "Discover";
    return "Card";
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNum = formData.cardNumber.replace(/\s/g, "");
    const currentYear = new Date().getFullYear() % 100;
    const [expMonth, expYear] = formData.expiry.split("/").map(Number);

    if (formData.type === "credit_card") {
      if (!cardNum || cardNum.length !== 16) {
        newErrors.cardNumber = "Please enter a valid 16-digit card number.";
      }
      if (
        !formData.expiry ||
        !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)
      ) {
        newErrors.expiry = "Please enter a valid expiry date (MM/YY).";
      } else if (
        expYear < currentYear ||
        (expYear === currentYear && expMonth < new Date().getMonth() + 1)
      ) {
        newErrors.expiry = "The card has expired.";
      }
      if (!formData.cvv || !/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Please enter a valid CVV (3-4 digits).";
      }
      if (!formData.name) {
        newErrors.name = "Please enter the name on the card.";
      }
    } else if (formData.type === "paypal") {
      if (
        !formData.paypalEmail ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)
      ) {
        newErrors.paypalEmail = "Please enter a valid PayPal email.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCardNumberChange = (e) => {
    const formatted =
      e.target.value
        .replace(/\s/g, "")
        .replace(/[^0-9]/gi, "")
        .match(/.{1,4}/g)
        ?.join(" ") || "";
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setFormData((prev) => ({ ...prev, expiry: value.slice(0, 5) }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (validateForm()) {
      let newMethod;
      if (formData.type === "credit_card") {
        newMethod = {
          type: "credit_card",
          last4: formData.cardNumber.slice(-4),
          brand: getCardBrand(formData.cardNumber),
          expiry: formData.expiry,
          name: formData.name,
        };
      } else {
        newMethod = {
          type: "paypal",
          email: formData.paypalEmail,
        };
      }
      if (onAddMethod) {
        onAddMethod(newMethod, formData.makeDefault);
      }
    }

    const isPaymentSuccessful = Math.random() > 0.2;

    if (isPaymentSuccessful) {
      setMessageBox(
        {
          isVisible: true,
          title: "Payment Successful",
          text: "Thank you for your purchase! Your order has been placed successfully.",
        });
        setPaymentSuccess(true);
    } else {
      setMessageBox({
        isVisible: true,
        title: "Payment Failed",
        text: "There was an issue processing your payment. Please check your details and try again.",
      });
      setPaymentSuccess(false);
    }
  };

  return (
    <div className="mt-4">
      {messageBox.isVisible && (
        <div className={`mb-4 p-4 rounded-md ${
          messageBox.type === "success" 
            ? "bg-green-100 text-green-800 border border-green-200" 
            : "bg-red-100 text-red-800 border border-red-200"
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold mb-1">{messageBox.title}</h3>
              <p>{messageBox.text}</p>
            </div>
            {messageBox.type === "error" && (
              <button
                onClick={closeMessageBox}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
      <h4 className="text-lg font-medium text-gray-900 mb-4">
        Add Payment Method
      </h4>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "credit_card" })}
            aria-pressed={formData.type === "credit_card"}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              formData.type === "credit_card"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "paypal" })}
            aria-pressed={formData.type === "paypal"}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              formData.type === "paypal"
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            PayPal
          </button>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        {formData.type === "credit_card" ? (
          <>
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Card Number *
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                required
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.cardNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="expiry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry (MM/YY) *
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  required
                  value={formData.expiry}
                  onChange={handleExpiryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.expiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV *
                </label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  required
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name on Card *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <label
              htmlFor="paypalEmail"
              className="block text-sm font-medium text-gray-700"
            >
              PayPal Email *
            </label>
            <input
              type="email"
              id="paypalEmail"
              name="paypalEmail"
              placeholder="you@example.com"
              required
              value={formData.paypalEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.paypalEmail && (
              <p className="mt-1 text-sm text-red-600">{errors.paypalEmail}</p>
            )}
          </div>
        )}

        {/* <div className="flex items-center">
          <input
            id="makeDefault"
            name="makeDefault"
            type="checkbox"
            checked={formData.makeDefault}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="makeDefault" className="ml-2 block text-sm text-gray-900">
            Set as default payment method
          </label>
        </div> */}

        <div className="flex space-x-3 mt-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Check Out
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentForm;
