import axios from "axios";

// For Netlify deployment, API calls go to same domain
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production (Netlify Functions)
  : "http://localhost:8888"; // Netlify dev server in development

const instance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export default instance;
