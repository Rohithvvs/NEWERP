// src/services/AuthService.js
import axios from "axios";

const API_URL = "https://localhost:7085/api/Auth"; // Change this

export const Registation = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = (data) => {
  console.log("auth",data);
  return axios.post(`${API_URL}/login`, data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const saveToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
};
