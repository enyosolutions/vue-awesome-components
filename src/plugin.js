import FieldEnyoSelect from './components/crud/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/FieldJsonTextarea.vue';
import FieldDateTime from './components/crud/fieldDateTime.vue';
import CrudComponent from './components/crud/CrudComponent.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';

import { Datetime } from 'vue-datetime';

import Card from './components/card/Card.vue';
import Stats from './components/misc/Stats.vue';

import AjaxTable from '@/components/table/AjaxTable.vue';
import axios from 'axios';
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component('card', Card);
    Vue.component('stats', Stats);
    Vue.component('table-and-charts-card', TableAndChartsCard);

    Vue.component('datetime', Datetime);

    Vue.component('upload-button', UploadButton);
    Vue.component('EnyoSelect', EnyoSelect);

    Vue.component('fieldDateTime', FieldDateTime);
    Vue.component('fieldEnyoSelect', FieldEnyoSelect);
    Vue.component('fieldFileInput', FieldFileInput);
    Vue.component('fieldJsonTextarea', FieldJsonTextarea);

    Vue.component('AjaxTable', AjaxTable);
    Vue.component('crud-component', CrudComponent);


    if (!Vue.prototype.$http) {
        Vue.prototype.$http = axios.create({});
    }

  }
};

export default GlobalComponents;
