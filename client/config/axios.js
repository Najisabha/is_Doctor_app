import axios from 'axios';
import { API_URL } from './urls';
export const axiosInstance = axios.create({
    baseURL: API_URL
});
export default axiosInstance;