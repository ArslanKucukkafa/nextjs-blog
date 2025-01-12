import axios from 'axios';
import envConfig from '../env.config.js';

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: envConfig.getConfig('NEXT_PUBLIC_API_URL'),
  timeout: 10000, // 10 saniye timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Gerekirse token ekleyebilirsiniz
    const token = typeof window !== 'undefined' 
      ? document.cookie
          .split('; ')
          .find((row) => row.startsWith('access_token='))
          ?.split('=')[1]
      : null;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    // Detaylı hata loglaması
    if (error.response) {
      // Sunucudan gelen hata
      console.error('Server Error:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      console.error('No response received');
      console.error('Request:', error.request);
    } else {
      // İstek bile gönderilemedi
      console.error('Error setting up request');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
