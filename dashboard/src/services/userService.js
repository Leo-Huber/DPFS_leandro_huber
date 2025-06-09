// dashboard/src/services/userService.js
import api from './api';

export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data; // { count, users: [...] }
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data; // Objeto user
};
