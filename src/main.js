// Import the styles directly. (Or you could add them via script tags.)
import 'bootstrap/scss/bootstrap.scss';
import './assets/css/font-awesome.min.css';
import './assets/css/material-dashboard.min.css';
// import './assets/css/material-dashboard-dark.min.css';
// import './assets/css/paper-dashboard.min.css';
// import './assets/css/light-bootstrap-dashboard.css';
import './main.scss';

import Vue from 'vue';
import qs from 'qs';

import axios from 'axios';
import Datetime from 'vue-datetime';
import FormGenerator from './components/form/form-generator';
import notificationsMixin from './mixins/notificationsMixin';
import VueGoodTablePlugin from 'vue-good-table';
import VueRouter from 'vue-router';
// eslint-disable-next-line
import VueI18n from "vue-i18n";
import Draggable from 'vuedraggable';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import fr from './translations/fr';
import en from './translations/en';

import App from './App.vue';
import VueEnyoComponents from './plugin';

// Importing Lodash
import _ from 'lodash';


// Vue Use and Components
Vue.use(VueGoodTablePlugin);
Vue.use(VueRouter);

Vue.component('Draggable', Draggable);
Vue.component('datetime', Datetime);
Vue.component('vue-form-generator', FormGenerator, []);
Vue.mixin(notificationsMixin);

Vue.use(FormGenerator, {
  fields: _.values(FormGenerator.fieldsLoader)
});


Vue.use(VueEnyoComponents,
  {
    config: {
      modelsStorePath: 'model.models'
    },
    'global': {
      props: {
        apiResponseConfig: {
          type: Object,
          note: 'This object define the configuration for processing data coming from the api : count, data path',
          default: () => ({
            dataPath: 'data',
            totalCountPath: 'data.totalCount'
          })
        }
      }
    },
    'FieldVSelect': {
      props: {
        apiResponseConfig: {
          type: Object,
          note: 'This object define the configuration for processing data coming from the api : count, data path',
          default: () => ({
            dataPath: 'data',
            totalCountPath: 'data.totalCount'
          })
        },
        preloadQueryParam: {
          default: '_limit=10'
        }
      }
    },
    'AwesomeCrud': {
      props: { primaryKey: { type: String, default: 'id' } }
    }

  });

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages: {
    fr,
    en
  } // set locale messages
});


const router = new VueRouter({
  mode: 'history',
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    var result = qs.stringify(query);
    return result ? ('?' + result) : '';
  },
  routes: [
    {
      path: '/',
      component: () => import('../examples/pages/Demos.vue')
    },
    {
      path: '/awesomelist',
      component: () => import('../examples/pages/AwesomelistPage')
    },
    {
      path: '/awesometable',
      component: () => import('../examples/pages/AwesomeTablePage.vue')
    },
    {
      path: '/awesomecrud-advanced',
      component: () => import('../examples/pages/AwesomeCrudAdvancedPage')
    },
    {
      path: '/awesomecrud',
      component: () => import('../examples/pages/AwesomeCrudPage')
    },
    {
      path: '/awesomecrud/:id',
      component: () => import('../examples/pages/AwesomeCrudPage')
    },
    {
      path: '/awesomecrud/:id/edit',
      component: () => import('../examples/pages/AwesomeCrudPage')
    },
    {
      path: '/awesomekanban',
      component: () => import('../examples/pages/AwesomeKanbanPage')
    },
    {
      path: '/awesomelayout',
      component: () => import('../examples/pages/AwesomeLayoutPage')
    }
  ]
});

Vue.prototype.$http = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
window.vm = new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app');

export default window.vm;
