import axios from 'axios';

export default axios.create({
    baseURL: process.env.SELFBACK,
    headers: {
        'Content-Type': 'application/json',
    }
});
