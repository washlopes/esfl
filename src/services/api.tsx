import axios from 'axios';

const api = axios.create ({
    baseURL: 'http://localhost:8082/apifazai/'
    // baseURL: 'http://pxl0hosp0380.dispositivos.bb.com.br:8080/apifazai/'
});

export default api;