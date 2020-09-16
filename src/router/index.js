import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const routerOptions = [
    {path: '/', component: 'main', name: 'main'},
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

export default router;