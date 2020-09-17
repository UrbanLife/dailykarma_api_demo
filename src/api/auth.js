import http from 'api/http.config';

export default {
    async checkAccess(data) {
        const res = await http.get('/charities?search=cat&categories=animals,religion&pageSize=20');
        return res.data;
    },
};