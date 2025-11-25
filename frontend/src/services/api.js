import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const dishAPI = {
  getAllDishes: () => api.get('/dishes'),
  togglePublish: (id) => api.patch(`/dishes/${id}/toggle-publish`),
  initializeData: () => api.post('/dishes/initialize'),
};

export default api;