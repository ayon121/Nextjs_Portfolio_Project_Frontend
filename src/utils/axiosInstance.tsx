import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-rho-plum-42.vercel.app/api/v1',
    withCredentials: true,
});

export default axiosInstance;