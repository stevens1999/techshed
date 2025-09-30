// API service for e-commerce backend
const API_BASE = 'https://techshed.onrender.com/api';

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add user ID header if available
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Health check
export async function checkHealth() {
  return apiCall('/health');
}

// Products
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiCall(`/products?${query}`);
}

export async function getProduct(id) {
  return apiCall(`/products/${id}`);
}

export async function getCategories() {
  return apiCall('/categories');
}

export async function getBestsellers() {
  return apiCall('/bestsellers');
}

export async function getSaleProducts() {
  return apiCall('/sale');
}

// Cart
export async function getCart() {
  return apiCall('/cart');
}

export async function addToCart(productId, quantity = 1) {
  return apiCall('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(productId, quantity) {
  return apiCall(`/cart/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(productId) {
  return apiCall(`/cart/${productId}`, {
    method: 'DELETE',
  });
}

// Favorites
export async function getFavorites() {
  return apiCall('/favorites');
}

export async function addToFavorites(productId) {
  return apiCall('/favorites', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export async function removeFromFavorites(productId) {
  return apiCall(`/favorites/${productId}`, {
    method: 'DELETE',
  });
}

// Auth
export async function signup(name, email, password, phone) {
  const response = await apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone }),
  });

  // Store user ID for future requests
  if (response.user?.id) {
    localStorage.setItem('userId', response.user.id);
  }

  return response;
}

export async function login(email, password) {
  const response = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Store user ID and token
  if (response.user?.id) {
    localStorage.setItem('userId', response.user.id);
    localStorage.setItem('token', response.token);
  }

  return response;
}

export function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  return userId && token ? { userId, token } : null;
}

// Newsletter and Contact
export async function subscribeNewsletter(email) {
  return apiCall('/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function sendContactMessage(name, email, message) {
  return apiCall('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  });
}