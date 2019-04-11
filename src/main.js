// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import axios from "axios";

// Importing Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueGoodTablePlugin from "vue-good-table";
import _ from "lodash";
import VueFormGenerator from "vue-form-generator";

// Importing jQuery
import "jquery";
import "bootstrap";
import $ from "jquery";

// Importing Bootstrap

// Adding Font Awesome Icons
library.add(faFilter);
library.add(faPlus);
library.add(faSyncAlt);
library.add(faUpload);
library.add(faFileExcel);
library.add(faEye);
library.add(faPencilAlt);
library.add(faTimes);
library.add(faCalendarAlt);
library.add(faFileUpload);

// Vue Use and Components
Vue.use(VueGoodTablePlugin);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueFormGenerator, { fields: _.values(VueFormGenerator.fieldsLoader) });
Vue.component("vue-form-generator", VueFormGenerator, []);

Vue.use(VueI18n);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "fr", // set locale
  messages: { fr: {} } // set locale messages
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
