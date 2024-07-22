import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Puedes agregar lógica para obtener datos del usuario con el token si es necesario
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      console.log('Login successful');
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
