import http from 'api/http.config';

export default {
    async search(data) {
        const res = await http.get(`/charities?search=${data.charity}&categories=${data.categories}&pageSize=20`);
        return res.data;
    },
};