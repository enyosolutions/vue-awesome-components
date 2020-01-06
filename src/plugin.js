import axios from 'axios';
import { directive as vClickOutside } from 'vue-clickaway';
import _ from 'lodash'
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

import EnyoCrudStatsSection from './components/misc/EnyoCrudStatsSection.vue';
import EnyoAjaxTable from './components/table/EnyoAjaxTable.vue';



import {
  Datetime
} from 'vue-datetime';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

 const GlobalComponents = {
  install(Vue, options) {
    // if (!Vue.$root.$options.components.multiselect) {
    //   // eslint-disable-next-line
    //   console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    // }


    if (options) {
      if (options['CrudComponent'] && options['CrudComponent'].props) {
        CrudComponent.props = _.merge(CrudComponent.props, options['CrudComponent'].props);
      }

      if (options['EnyoAjaxTable'] && options['EnyoAjaxTable'].props) {
        EnyoAjaxTable.props = _.merge(EnyoAjaxTable.props, options['EnyoAjaxTable'].props);
      }
    }


    Vue.component('enyo-card', EnyoCard);
    Vue.component('enyo-stats-card', EnyoStatsCard);
    Vue.component('enyo-stats', EnyoCrudStatsSection);
    Vue.component('enyo-table-and-charts-card', TableAndChartsCard);

    Vue.component('datetime', Datetime); //todo better re

    Vue.component('upload-button', UploadButton);
    Vue.component('enyo-select', EnyoSelect);
    Vue.component('live-edit', LiveEdit);

    // Vue.component('fieldDateTime', FieldDateTime);
    Vue.component('fieldEnyoSelect', FieldEnyoSelect);
    Vue.component('fieldFileInput', FieldFileInput);
    Vue.component('fieldJsonTextarea', FieldJsonTextarea);

    Vue.component('ajax-table', EnyoAjaxTable);
    Vue.component('enyo-ajax-table', EnyoAjaxTable);


    Vue.component('crud-component', CrudComponent);

    console.log('loaded components');

    if (!Vue.prototype.$http) {
      Vue.prototype.$http = axios.create({});
    }

    // DIRECTIVES
    Vue.directive('click-outside', vClickOutside);
  }
};

export default GlobalComponents;
