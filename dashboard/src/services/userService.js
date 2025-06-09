import { getRequest } from './api';

export const getAllUsers = () => getRequest('/users');
export const getUserById = id => getRequest(`/users/${id}`);
