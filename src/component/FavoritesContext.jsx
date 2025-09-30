import React, { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, addToFavorites as apiAddToFavorites, removeFromFavorites as apiRemoveFromFavorites } from "../api";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || sessionStorage.getItem('userId') || null);

  // React to userId changes (login/logout) and storage events
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

  // Fetch favorites whenever userId changes
  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) {
        setFavorites([]);
        return;
      }

      try {
        const data = await getFavorites();
        if (data && Array.isArray(data.items)) {
          setFavorites(data.items);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [userId]);

  const addFavorite = async (product) => {
    setFavorites((prev) => [...prev, product]);
    try {
      if (!userId) return;
      await apiAddToFavorites(product.id);
    } catch (error) {
      console.error('Error adding favorite:', error);
      setFavorites((prev) => prev.filter(item => item.id !== product.id));
    }
  };

  const removeFavorite = async (productId) => {
    const snapshot = favorites;
    setFavorites((prev) => prev.filter(item => item.id !== productId));
    try {
      if (!userId) return;
      await apiRemoveFromFavorites(productId);
    } catch (error) {
      console.error('Error removing favorite:', error);
      setFavorites(snapshot);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoritesCount,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);