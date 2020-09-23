import Vue from 'vue';
import Router from 'vue-router';
import {checkAccess} from "utils";
import api from 'api';

Vue.use(Router)

const routerOptions = [
    {path: '/install', component: 'install', name: 'install'},
    {path: '/charities', component: 'charities', name: 'charities'},
    {path: '/', component: 'dashboard', name: 'dashboard'},
]

const routes = routerOptions.map(route => {
    return {
        ...route,
        component: () => import(`components/${route.component}.vue`)
    }
})

const router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const publicPages = ['install'];
    const authRequired = !publicPages.includes(to.name);
    const auth_key = localStorage.getItem('auth_key');
    const token = localStorage.getItem('token');

    const clearStorageKeys = () => {
        localStorage.removeItem('auth_key');
        localStorage.removeItem('token');
        localStorage.removeItem('vuex');
    };

    if (authRequired) {
        checkAccess({'auth_key': auth_key || ''})
            .then((res) => {
                if (res.authorized) {
                    if (!token) {
                        api.auth.userToken()
                            .then(res => {
                                localStorage.setItem('token', res.token);
                            })
                            .catch(err =>{});
                    }
                    next();
                } else {
                    clearStorageKeys();
                    next({name: 'install'});
                }
            })
            .catch(() => {
                clearStorageKeys();
                next({name: 'install'});
            });
    } else {
        next();
    }
});

export default router;