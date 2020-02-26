import EnyoVueComponents from './../../src/plugin.js';
import VueFormGenerator from "vue-form-generator";
  import Multiselect from "vue-multiselect";
export default ({ Vue, options, router, siteData, isServer }) => {
  Vue.component("multiselect", Multiselect);
  Vue.use(VueFormGenerator, {
    fields: _.values(VueFormGenerator.fieldsLoader)
  });
//  Vue.component("vue-form-generator", VueFormGenerator, []);

  Vue.use(EnyoVueComponents);

  if (!isServer) {
    // Register jQuery
    window.$ = window.jQuery = require("jquery");
  }
};

