import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from "../api";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (!action.payload || action.payload.id == null) {
        console.error("Invalid product added to cart", action.payload);
        return state;
      }

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity:
            updatedItems[existingItemIndex].quantity +
            (action.payload.quantity || 1),
        };
        return { ...state, cartItems: updatedItems };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...action.payload,
              quantity: action.payload.quantity || 1,
            },
          ],
        };
      }

      case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.productId
            ? { 
                ...item, 
                quantity: Math.max(1, action.payload.newQuantity) 
              }
            : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    case "SET_CART":
      return { ...state, cartItems: action.payload || [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });
  const [userId, setUserId] = React.useState(() => localStorage.getItem('userId') || sessionStorage.getItem('userId') || null);

  useEffect(() => {
    const handler = () => {
      const uid = localStorage.getItem('userId') || sessionStorage.getItem('userId') || null;
      setUserId(uid);
    };
    window.addEventListener('auth:userChange', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('auth:userChange', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        dispatch({ type: 'SET_CART', payload: [] });
        return;
      }

      try {
        const data = await getCart();
        if (data && Array.isArray(data.items)) {
          const items = data.items.map(({ product, quantity }) => ({ ...product, quantity }));
          dispatch({ type: 'SET_CART', payload: items });
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        dispatch({ type: 'SET_CART', payload: [] });
      }
    };

    loadCart();
  }, [userId]);

  const addToCart = async (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      if (!userId) return;
      await apiAddToCart(product.id, product.quantity || 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      if (!userId) return;
      await apiRemoveFromCart(productId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, newQuantity } });
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      if (!userId) return;
      await updateCartItem(productId, newQuantity);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const clearCart = async () => {
    const snapshot = state.cartItems;
    dispatch({ type: "CLEAR_CART" });
    try {
      const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
      if (!userId) return;
      await Promise.all(snapshot.map(item => apiRemoveFromCart(item.id)));
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cleanItems = state.cartItems.filter(
    (item) => item != null && item.id != null
  );
  
  const cartCount = cleanItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const cartTotal = cleanItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems: cleanItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
