// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "./main.scss";

import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import axios from "axios";
import Datetime from 'vue-datetime';
import VueFormGenerator from 'vue-form-generator';
import VueGoodTablePlugin from "vue-good-table";
import Multiselect from 'vue-multiselect'


import VueEnyoComponents from "./plugin";
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Importing Lodash
import _ from "lodash";
// Importing jQuery
import "jquery";
import $ from "jquery";


// Vue Use and Components
Vue.use(VueGoodTablePlugin);

Vue.component('multiselect', Multiselect);
Vue.component('datetime', Datetime);

Vue.use(VueFormGenerator, {
  fields: _.values(VueFormGenerator.fieldsLoader)
});
Vue.component("vue-form-generator", VueFormGenerator, []);


Vue.use(VueI18n);
Vue.use(VueEnyoComponents, {'CrudComponent': {extends: {props:{primaryKey: {type:String, default: 'tintin'}}}}});

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "fr", // set locale
  messages: {
    fr: {}
  } // set locale messages
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
  render: h => h(App)
}).$mount("#app");

export default i18n;
