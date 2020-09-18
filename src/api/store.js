import http from 'api/http.config';

export default {
    async install(data) {
        const res = await http.post('/store-management/install', data);
        return res.data;
    },
};