import axios from 'axios';
import CripVueLoading from 'crip-vue-loading';
import { directive as vClickOutside } from 'vue-clickaway';

import FieldEnyoSelect from './components/crud/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/FieldJsonTextarea.vue';
// import FieldDateTime from './components/crud/FieldDateTime.vue';
import CrudComponent from './components/crud/CrudComponent.vue';


import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';
import LiveEdit from './components/form/LiveEdit.vue';

import EnyoCard from './components/card/EnyoCard.vue';
import EnyoStatsCard from './components/card/EnyoStatsCard.vue';
import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoStats from './components/misc/EnyoStats.vue';
import AjaxTable from './components/table/AjaxTable.vue';



import {
  Datetime
} from 'vue-datetime';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    // if (!Vue.$root.$options.components.multiselect) {
    //   // eslint-disable-next-line
    //   console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    // }

    Vue.component('enyo-card', EnyoCard);
    Vue.component('enyo-stats-card', EnyoStatsCard);
    Vue.component('enyo-stats', EnyoStats);
    Vue.component('enyo-table-and-charts-card', TableAndChartsCard);

    Vue.component('datetime', Datetime); //todo better re

    Vue.component('upload-button', UploadButton);
    Vue.component('enyo-select', EnyoSelect);
    Vue.component('live-edit', LiveEdit);

    // Vue.component('fieldDateTime', FieldDateTime);
    Vue.component('fieldEnyoSelect', FieldEnyoSelect);
    Vue.component('fieldFileInput', FieldFileInput);
    Vue.component('fieldJsonTextarea', FieldJsonTextarea);

    Vue.component('ajax-table', AjaxTable);
    Vue.component('crud-component', CrudComponent);


    if (!Vue.prototype.$http) {
      Vue.prototype.$http = axios.create({});
    }

    Vue.use(CripVueLoading, { axios: Vue.prototype.$http });

    // DIRECTIVES
    Vue.directive('click-outside', vClickOutside);
  }
};

export default GlobalComponents;
