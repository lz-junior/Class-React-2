import axios from 'axios';

// API: https://api.themoviedb.org/3/movie/now_playing?api_key=4fb839c6ef39db9d421b671118ce07fe
// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/now_playing?api_key=4fb839c6ef39db9d421b671118ce07fe

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;