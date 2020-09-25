import api from 'api';


const initialState = () => ({
    'campaigns': null,
});

const state = initialState();

const getters = {
    /**
     * Get store campaigns
     * @param state
     * @returns {null|boolean}
     */
    getStoreCampaigns(state) {
        return state.campaigns;
    },
}

/**
 * Campaign state actions
 */
const actions = {
    /**
     * Get store campaigns
     * @param commit
     * @returns {Promise<void>}
     */
    async getAll({commit}) {
        try {
            const res = await api.store.campaigns();
            commit('GET_ALL_CAMPAIGNS', res);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Get campaign information
     * @param commit
     * @param type
     * @returns {Promise<void>}
     */
    async info({commit}, type) {
        try {
            const res = await api.store.infoCampaign(type);
            commit('INFO_CAMPAIGN', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Create new campaign
     * @param commit
     * @param data
     * @returns {Promise<void>}
     */
    async create({commit}, data) {
        try {
            const res = await api.store.createCampaign(data);
            commit('CREATE_CAMPAIGN', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Update campaign
     * @param commit
     * @param type
     * @returns {Promise<void>}
     */
    async update({commit}, type) {
        try {
            const res = await api.store.updateCampaign(type);
            commit('UPDATE_CAMPAIGN', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Activate campaign
     * @param commit
     * @param type
     * @returns {Promise<void>}
     */
    async activate({commit}, type) {
        try {
            const res = await api.store.activateCampaign(type);
            commit('ACTIVATE_CAMPAIGN', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
    /**
     * Deactivate campaign
     * @param commit
     * @param type
     * @returns {Promise<void>}
     */
    async stop({commit}, type) {
        try {
            const res = await api.store.stopCampaign(type);
            commit('STOP_CAMPAIGN', res.result);
        } catch (e) {
            throw new Error(e.message);
        }
    },
}

/**
 * Campaigns state mutations
 */
const mutations = {
    GET_ALL_CAMPAIGNS(state, data) {
        state.campaigns = data.campaigns;
    },
    INFO_CAMPAIGN(state, data) {
    },
    CREATE_CAMPAIGN(state, data) {
    },
    UPDATE_CAMPAIGN(state, data) {
    },
    ACTIVATE_CAMPAIGN(state, data) {
    },
    STOP_CAMPAIGN(state, data) {
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}