import axios from 'axios';

export default axios.create({
    baseURL: process.env.API_HOST,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': {
            toString() {
                const token = localStorage.getItem('token');
                const auth_key = localStorage.getItem('auth_key');
                return token ? `Bearer ${token}` : `Bearer ${auth_key}`;
            }
        },
    }
});
