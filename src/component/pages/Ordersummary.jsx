import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../CartContext";
import { Products } from "../Products";

const OrderSummary = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const items = cartItems
    .map((cartItem) => {
      const product = Products.find((p) => p.id === cartItem.id);
      if (!product) {
        return null;
      }
      return {
        ...product,
        quantity: cartItem.quantity,
        total: product.price * cartItem.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const shipping = subtotal >= 200 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-4 pb-2"
        >
          <div className="flex items-center flex-grow">
            <img
              src={item.img}
              alt={item.name}
              className="w-16 h-16 mr-4 rounded-md"
            />
            <div className="flex-grow">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-500 text-sm">
                ${item.price.toFixed(2)} each
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full text-xs"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="text-sm font-medium min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-xs"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-semibold">${item.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
