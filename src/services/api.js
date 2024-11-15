import axios from "axios";

// Set up base URL for API calls
const API_URL = "http://localhost:5000/api";

// Axios instance to handle auth tokens and API requests
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add token in headers for authenticated requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handler to catch and handle API errors globally
const handleApiError = (error) => {
  if (error.response) {
    // Request made and server responded with a status other than 2xx
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'Something went wrong!';
  } else if (error.request) {
    // Request was made but no response was received
    console.error('Network Error:', error.request);
    return 'Network error. Please try again later.';
  } else {
    // Something else happened
    console.error('Error:', error.message);
    return 'An unexpected error occurred.';
  }
};

// API functions
export const createUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data; // Return response data for further use (e.g., token)
  } catch (error) {
    throw new Error(handleApiError(error)); // Throw a custom error message
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data; // Return response data (e.g., token)
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/cars", productData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getUserProducts = async () => {
  try {
    const response = await api.get("/cars");
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/cars/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/cars/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
