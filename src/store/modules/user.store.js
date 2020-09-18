import router from 'router';
import api from 'api';


const initialState = () => ({
    'auth_key': null,
    'token': null,
    'user_data': {
        "domain": "test.qa",
        "name": "QA Test Store",
        "currency": "USD",
        "owner": "QA Tester",
        "email": "tester@test.qa",
        "timezone": "America/Los_Angeles",
        "address": {
            "line1": "227 Broadway",
            "line2": "Ste 302",
            "city": "Santa Monica",
            "province": "CA",
            "postalCode": "90401",
            "country": "USA"
        }
    }
});

const state = initialState();

/**
 * User state getters
 */
const getters = {
    getAuthKey(state) {
        return state.auth_key;
    },
}

/**
 * User state actions
 */
const actions = {
    async setAuthKey({commit}, auth_key) {
        try {
            let res = await api.auth.setAuthKey({'auth_key': auth_key});
            commit('SET_AUTH_KEY', res);
            return true;
        } catch (e) {
            throw new Error(e);
        }
    },
    async runAuthorization({commit, state}) {
        try {
            let res = await api.store.install(state.user_data);
            commit('INSTALL_AUTHORIZED', res);
            await api.auth.setToken({'token': res.token});
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    },
}

/**
 * Charities state mutations
 */
const mutations = {
    SET_AUTH_KEY(state, data) {
        localStorage.setItem('auth_key', data.auth_key);
        state.auth_key = data.auth_key;
    },
    INSTALL_AUTHORIZED(state, data) {
        localStorage.setItem('token', data.token);
        state.token = data.token;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}