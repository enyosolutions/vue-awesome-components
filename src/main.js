// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/fontello.css";

import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import axios from "axios";
import Datetime from 'vue-datetime';
import VueFormGenerator from 'vue-form-generator';
import VueGoodTablePlugin from "vue-good-table";

// Importing Lodash
import _ from "lodash";
// Importing jQuery
import "jquery";
import $ from "jquery";

import EnyoCard from './components/card/EnyoCard.vue';

import AjaxTable from './components/table/AjaxTable.vue';


// Vue Use and Components
Vue.use(VueGoodTablePlugin);

Vue.component('datetime', Datetime);
Vue.component('enyo-card', EnyoCard);
Vue.component('ajax-table', AjaxTable);

Vue.use(VueFormGenerator, {
  fields: _.values(VueFormGenerator.fieldsLoader)
});
Vue.component("vue-form-generator", VueFormGenerator, []);


Vue.use(VueI18n);

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
