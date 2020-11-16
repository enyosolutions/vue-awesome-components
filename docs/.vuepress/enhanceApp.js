import Multiselect from "vue-multiselect";
export default ({ Vue, options, router, siteData, isServer }) => {
  Vue.component("multiselect", Multiselect);
  //  Vue.component("vue-form-generator", VueFormGenerator, []);

  // Vue.use(EnyoVueComponents);

  if (!isServer) {
    // Register jQuery
    window.$ = window.jQuery = require("jquery");
  }
};

