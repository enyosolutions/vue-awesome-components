// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "./main.scss";

import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from "axios";
import Datetime from 'vue-datetime';
import VueFormGenerator from 'vue-form-generator';
import VueGoodTablePlugin from "vue-good-table";
import VueRouter from "vue-router";
import Multiselect from 'vue-multiselect'

import App from "./App.vue";
import VueEnyoComponents from "./plugin";
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Importing Lodash
import _ from "lodash";
// Importing jQuery
import "jquery";
import $ from "jquery";


// Vue Use and Components
Vue.use(VueGoodTablePlugin);
Vue.use(VueRouter);

Vue.component('multiselect', Multiselect);
Vue.component('datetime', Datetime);
Vue.component("vue-form-generator", VueFormGenerator, []);


Vue.use(VueFormGenerator, {
  fields: _.values(VueFormGenerator.fieldsLoader)
});


Vue.use(VueI18n);
Vue.use(VueEnyoComponents, {'CrudComponent': {extends: {props:{primaryKey: {type:String, default: 'tintin'}}}}});

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "fr", // set locale
  messages: {
    fr: {
      "awesomelist.buttons.increase": "More items per row",
      "awesomelist.buttons.decrease": "Less items per row",
      "awesomelist.buttons.refresh": "Refresh",
      "awesomelist.buttons.itemAction": "Open"
    }
  } // set locale messages
});


const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("../examples/pages/Demos.vue")
    },
    {
      path: "/awesomelist",
      component: () => import("../examples/pages/AwesomelistPage")
    }
  ]
});

Vue.prototype.$http = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});
window.$ = $;
window.$ = window.jQuery = require("jquery");
window._ = _;

window.vm = new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");

export default i18n;
