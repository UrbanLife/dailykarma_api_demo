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
    async getUserToken({commit, state}) {
        try {
            let res = await api.auth.userToken({'email': state.user_data.email});
            commit('GET_USER_TOKEN', res);
            return res.data;
        } catch (e) {
            throw new Error(e.response.data.message);
        }
    },
    async setAuthKey({commit}, data) {
        try {
            let res = await api.auth.setAuthKey(data);
            commit('SET_AUTH_KEY', res);
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
    SET_AUTH_KEY(state, data) {
        localStorage.setItem('auth_key', data.auth_key);
        state.auth_key = data.auth_key;
        state.user_data.name = data.username;
        state.user_data.email = data.email;
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