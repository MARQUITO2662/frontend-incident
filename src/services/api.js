import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta el baseURL según sea necesario
  timeout: 1000,
});

export default api;
