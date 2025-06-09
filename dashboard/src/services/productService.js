import { getRequest } from './api';

export const getAllProducts = () => getRequest('/products');
export const getProductById = id => getRequest(`/products/${id}`);
