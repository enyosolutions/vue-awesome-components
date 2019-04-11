import FieldEnyoSelect from './components/crud/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/FieldJsonTextarea.vue';
import FieldDateTime from './components/crud/FieldDateTime.vue';
import CrudComponent from './components/crud/CrudComponent.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';

import { Datetime } from 'vue-datetime';

import Card from './components/card/Card.vue';
import Stats from './components/misc/Stats.vue';

import AjaxTable from './components/table/AjaxTable.vue';
import axios from 'axios';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('enyo-card', Card);
    Vue.component('enyo-stats-card', Stats);
    Vue.component('enyo-table-and-charts-card', TableAndChartsCard);

    Vue.component('datetime', Datetime); //todo better re

    Vue.component('upload-button', UploadButton);
    Vue.component('enyo-select', EnyoSelect);

    Vue.component('fieldDateTime', FieldDateTime);
    Vue.component('fieldEnyoSelect', FieldEnyoSelect);
    Vue.component('fieldFileInput', FieldFileInput);
    Vue.component('fieldJsonTextarea', FieldJsonTextarea);

    Vue.component('ajax-table', AjaxTable);
    Vue.component('crud-component', CrudComponent);


    if (!Vue.prototype.$http) {
        Vue.prototype.$http = axios.create({});
    }

  }
};

export default GlobalComponents;
