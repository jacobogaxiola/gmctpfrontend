// src/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      correoelectronico: email,
      contrasena: password,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};
