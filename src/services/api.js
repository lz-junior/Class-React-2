import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL da API: /movie/550?api_key=4fb839c6ef39db9d421b671118ce07fe

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;