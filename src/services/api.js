import axios from 'axios';

const api = axios.create({
    baseURL: 'https://me2.nillink.com.br/'
})

export default api;