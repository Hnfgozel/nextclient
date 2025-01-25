import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getReservations = async (page: number = 1, limit: number = 5) => {
  const response = await api.get(`/reservations?page=${page}&limit=${limit}`);
  return response.data;
};

export const getReservationsWithCustomers = async (page: number = 1, limit: number = 5) => {
  const response = await api.get(`/reservations/with-customers?page=${page}&limit=${limit}`);
  return response.data;
};

export default api; 