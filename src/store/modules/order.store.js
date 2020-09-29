import api from 'api';


const initialState = () => ({
    'orders': null,
});

const state = initialState();

const getters = {
    /**
     * Get store orders
     * @param state
     * @returns {null|boolean}
     */
    getStoreOrders(state) {
        return state.orders;
    },
}

/**
 * Order state actions
 */
const actions = {
    /**
     * Add new order
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async add({commit}, data) {
        try {
            const res = await api.store.addOrder(data);
            commit('ADD_ORDER', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Get all orders
     * @param commit
     * @returns {Promise<void>}
     */
    async getAll({commit}) {
        try {
            const res = await api.store.getOrders();
            console.log(res);
            commit('GET_ALL_ORDERS', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
}

/**
 * Order state mutations
 */
const mutations = {
    ADD_ORDER(state, data) {
    },
    GET_ALL_ORDERS(state, data) {
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}