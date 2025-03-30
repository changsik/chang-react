import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: { // 요청 헤더
        'Content-Type': 'application/json',  
        'Channel': 'web',
        "X-Requested-With": "XMLHttpRequest"
        //Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
});

apiClient.interceptors.request.use(
    (config) => {
        if(localStorage.getItem('token')){
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        }
        return config;
    },  
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;