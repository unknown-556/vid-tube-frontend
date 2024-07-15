import { createContext, useState, useEffect } from 'react';
import { signIn, signUp } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
    }
  }, []);

  const login = async (credentials) => {
    const response = await signIn(credentials);
    localStorage.setItem('token', response.data.accessToken);
    setUser(response.data.user);
  };

  const register = async (userData) => {
    const response = await signUp(userData);
    localStorage.setItem('token', response.data.accessToken);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
