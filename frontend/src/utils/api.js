import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Cart
export const getCart = (sessionId) => api.get(`/cart?sessionId=${sessionId}`);
export const addToCart = (data) => api.post('/cart/add', data);
export const updateCartItem = (sessionId, data) =>
  api.put(`/cart/update?sessionId=${sessionId}`, data);
export const removeCartItem = (sessionId, data) =>
  api.delete(`/cart/remove?sessionId=${sessionId}`, { data });
export const clearCart = (sessionId) =>
  api.delete(`/cart/clear?sessionId=${sessionId}`);

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const getOrder = (id) => api.get(`/orders/${id}`);
export const getAllOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}/status`, { status });

// Admin
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const adminRegister = (data) => api.post('/admin/register', data);
export const getAdminProfile = () => api.get('/admin/profile');

// Upload
export const uploadImage = (formData) =>
  api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export default api;



