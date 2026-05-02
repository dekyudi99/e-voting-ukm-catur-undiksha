import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Sesuaikan dengan URL Laravel Anda
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;