import axios from 'axios';

const API_URL = 'http://192.168.0.101:4456/api/vidtube';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (userData) => api.post('/auth/register', userData);
export const signIn = (credentials) => api.post('/auth/login', credentials);
export const getVideos = () => api.get('/get');
export const getVideo = (id) => api.get(`/get/get/${id}`);
export const getMyVideos = () => api.get('/videos/videos');
export const getRelatedVideos = (category) => api.get(`/videos/related/${category}`);
export const getRandomVideos = () => api.get('/videos/random');

export const uploadVideo = (formData) => {
    return axios.post(`${API_URL}/post/post`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
};  

export default api;
