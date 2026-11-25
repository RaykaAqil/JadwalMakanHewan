// Konfigurasi URL Backend API
// Ganti dengan URL backend jika di-deploy ke server berbeda
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default API_BASE_URL;

