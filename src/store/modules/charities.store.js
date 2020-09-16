import router from 'router';
import api from 'api';


const initialState = () => ({
    'all': null,
});

const state = initialState();

/**
 * User state getters
 */
const getters = {}

/**
 * User state actions
 */
const actions = {
    async fetchCharities({commit}) {
        try {
            let res = await api.charities.fetch();
            commit('UPDATE_CHARITIES', res.result);
        } catch (e) {
            console.log("Charities were not fetched...");
        }
    },
}

/**
 * Charities state mutations
 */
const mutations = {
    UPDATE_CHARITIES(state, data) {
        state.all = data;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}