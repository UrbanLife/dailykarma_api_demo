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
    },
    async deleteCharity(id) {
        const res = await http.delete(`/store/charities/${id}`);
        return res.data;
    },
    async campaigns() {
        const res = await http.get('/store/campaigns');
        return res.data;
    },
    async infoCampaign(type) {
        const res = await http.get(`/store/campaigns/${type}`);
        return res.data;
    },
    async createCampaign(data) {
        const res = await http.post(`/store/campaigns/${data.type}`, data.payload);
        return res.data;
    },
    async updateCampaign(type) {
        const res = await http.put(`/store/campaigns/${type}`);
        return res.data;
    },
    async activateCampaign(type) {
        const res = await http.post(`/store/campaigns/${type}/activate`);
        return res.data;
    },
    async stopCampaign(type) {
        const res = await http.post(`/store/campaigns/${type}/stop`);
        return res.data;
    },
    async addOrder(data) {
        const res = await http.post('/store/orders/add', data);
        return res.data;
    },
    async refundOrder(id) {
        const res = await http.put(`/store/orders/${id}/refund`);
        return res.data;
    },
    async getOrders() {
        const res = await http.get('/store/orders/');
        return res.data;
    }
};