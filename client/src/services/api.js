import axios from 'axios';
import cookies from '../utils/cookies';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  originalConfig => {
    let config = { ...originalConfig };

    const token = cookies.get('token')

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }

    return config
  }
)

export default api