import http from 'api/http.selfback.config';

export default {
    async checkAccess(data) {
        const res = await http.post('/api/auth', data);
        return res.data;
    },
    async setAuthKey(data) {
        const res = await http.post('/api/user/key', data);
        return res.data;
    },
    async userToken(data) {
        const res = await http.post('/api/user/token', data);
        return res.data;
    }
};