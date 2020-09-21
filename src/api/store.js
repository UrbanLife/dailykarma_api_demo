import http from 'api/http.config';

export default {
    async install(data) {
        const res = await http.post('/store-management/install', data);
        return res.data;
    },
    async charities() {
        const res = await http.get('/store/charities');
        return res.data;
    },
    async addCharity(data) {
        const res = await http.post('/store/charities/add', data);
        return res.data;
    }
};