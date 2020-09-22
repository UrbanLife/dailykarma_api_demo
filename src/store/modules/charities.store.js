import api from 'api';


const initialState = () => ({
    'available': null,
    'installed': null,
    'search_result': null,
});

const state = initialState();

/**
 * User state getters
 */
const getters = {
    /**
     * Get charities installed into the store
     * @param state
     * @returns {null|boolean}
     */
    getInstalledCharities(state) {
        return state.installed;
    },
    getFoundCharities(state) {
        return state.search_result;
    }
}

/**
 * User state actions
 */
const actions = {
    /**
     * Search charities that can be installed into the store
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async searchCharities({commit}, data) {
        try {
            let res = await api.charities.search(data);
            commit('FOUND_CHARITIES', res.result);
        } catch (e) {
            throw new Error("Charities were not fetched...");
        }
    },
    /**
     * Get charities installed into the store
     * @param commit
     * @returns {Promise<void>}
     */
    async fetchCharities({commit}) {
        try {
            const res = await api.store.charities();
            commit('FETCH_CHARITIES', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Add charity to the store
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async addCharity({commit}, data) {
        try {
            const res = await api.store.addCharity(data);
            commit('CHARITY_ADDED', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Delete charity from the store
     * @param commit
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCharity({commit}, id) {
        try {
            const res = await api.store.deleteCharity(id);
            commit('CHARITY_DELETED', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    eraseSearchResult({commit}) {
        commit('FOUND_CHARITIES', {});
    }
}

/**
 * Charities state mutations
 */
const mutations = {
    UPDATE_CHARITIES(state, data) {
        state.available = data;
    },
    FETCH_CHARITIES(state, data) {
        state.installed = data;
    },
    FOUND_CHARITIES(state, data) {
        state.search_result = data;
    },
    CHARITY_ADDED() {
    },
    CHARITY_DELETED() {
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}