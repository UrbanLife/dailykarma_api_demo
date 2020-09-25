import http from 'api/http.selfback.config';

export default {
    async checkAccess(data) {
        const res = await http.post('/api/auth', data);
        return res.data;
    },
    async setStoreData(data) {
        const res = await http.post('/api/store', data);
        return res.data;
    },
    async getStoreData(email) {
        const res = await http.get(`/api/store/${email}`);
        return res.data;
    },
    async userToken(data) {
        const res = await http.post('/api/user/token', data);
        return res.data;
    }
};