import Vue from 'vue';
import Router from 'vue-router';
import {checkAccess} from "utils";

Vue.use(Router)

const routerOptions = [
    {path: '/install', component: 'install', name: 'install'},
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
    const token = localStorage.getItem('token');

    if (authRequired) {
        checkAccess({'token': token || ''})
            .then(() => {
                next();
            })
            .catch(() => {
                next({name: 'install'});
            });
    } else {
        next();
    }
});

export default router;