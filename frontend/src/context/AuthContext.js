import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token on initial load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Fetch user data if token exists
        await fetchUserData();
      }
      setIsLoading(false);
    };
    
    initAuth();
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user'); // Your user endpoint
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      // For now, don't logout on fetch failure - just set a dummy user
      // This is because the backend might not be running
      setUser({ email: 'demo@example.com', name: 'Demo User' });
    }
  };

  const login = async (email, password) => {
    try {
      // For now, simulate a successful login since backend might not be running
      // Replace this with actual API call when backend is ready
      // const response = await axios.post('/api/login', { email, password });
      // const { user, token } = response.data;
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = { email, name: email.split('@')[0] };
      
      localStorage.setItem('token', mockToken);
      setToken(mockToken);
      setUser(mockUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      // Don't redirect here - let the Login component handle redirection
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}