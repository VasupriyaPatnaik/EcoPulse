import axios from "axios";

// For Netlify deployment, API calls go to same domain
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? `${window.location.origin}` // Use current domain in production
  : "http://localhost:8888"; // Netlify dev server in development

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
instance.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
instance.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
