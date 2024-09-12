import axios from 'axios';

const AxiosClient = axios.create({
    baseURL: 'http://localhost:5110/api/employee',
    headers:{
        'Content-Type': 'application/json'
    }
});

export default AxiosClient;