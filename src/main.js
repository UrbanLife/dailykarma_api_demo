import Vue from 'vue';
import {i18n} from "plugins/i18n";
import Buefy from 'buefy';

import {FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText} from '@fortawesome/vue-fontawesome';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCheckSquare,
    faGripVertical,
    faPencilAlt,
    faThList,
    faTh,
    faEllipsisV,
    faPlus,
    faEraser,
    faList,
    faBorderAll,
    faLink,
    faAngleUp,
    faAngleDown,
    faCaretLeft,
    faCaretRight
} from '@fortawesome/free-solid-svg-icons';

library.add([
    faEraser, faList, faBorderAll, faLink, faAngleUp, faAngleDown,
    faCaretLeft, faCaretRight, faPlus, faEllipsisV, faTh, faThList,
    faPencilAlt, faGripVertical, faCheckSquare
]);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

Vue.use(Buefy, {
    defaultIconComponent: 'font-awesome-icon',
    defaultIconPack: 'fas',
});

import App from './App.vue';
import router from 'router';
import store from 'store';

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
    store,
    i18n,
}).$mount('#app');
