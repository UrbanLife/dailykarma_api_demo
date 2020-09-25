import router from 'router';
import api from 'api';


const initialState = () => ({
    'auth_key': null,
    'token': null,
    'user_data': null,
});

const state = initialState();

/**
 * User state getters
 */
const getters = {
    getAuthKey(state) {
        return state.auth_key;
    },
    userData(state) {
        return state.user_data;
    },
}

/**
 * User state actions
 */
const actions = {
    async getUserToken({commit, state}) {
        try {
            let res = await api.auth.userToken({'email': state.user_data.email});
            commit('GET_USER_TOKEN', res);
            return res.data;
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    async setStoreData({commit}, data) {
        try {
            let res = await api.auth.setStoreData(data);
            commit('SET_STORE_DATA', res);
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    async getStoreData({commit}, email) {
        try {
            let res = await api.auth.getStoreData(email);
            commit('GET_STORE_DATA', res);
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    async runAuthorization({commit, state}) {
        try {
            let res = await api.store.install(state.user_data);
            commit('INSTALL_AUTHORIZED', res);
            await api.auth.userToken({
                'token': res.token,
                'email': state.user_data.email
            });
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
}

/**
 * Charities state mutations
 */
const mutations = {
    GET_USER_TOKEN(state, data) {
        localStorage.setItem('token', data.token);
        state.token = data.token;
    },
    SET_STORE_DATA(state, data) {
        localStorage.setItem('auth_key', data.auth_key);
        state.auth_key = data.auth_key;
        state.user_data.owner = data.owner;
        state.user_data.email = data.email;
        state.user_data.domain = data.domain;
        state.user_data.name = data.name;
        state.user_data.currency = data.currency;
        state.user_data.timezone = data.timezone;
        state.user_data.address = {
            'line1': data.address,
            'city': data.city,
            'province': data.province,
            'postalCode': data.postalCode,
            'country': data.country,
        };
    },
    INSTALL_AUTHORIZED(state, data) {
        localStorage.setItem('token', data.token);
        state.token = data.token;
    },
    GET_STORE_DATA(state, data) {
        state.user_data = data;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}