import http from 'api/http.config';

export default {
    async search(data) {
        //const res = await http.get(`/charities?search=${data.charity}&categories=animals,religion&pageSize=20`);
        const res = await http.get(`/charities?search=${data.charity}&pageSize=20`);
        return res.data;
    },
};