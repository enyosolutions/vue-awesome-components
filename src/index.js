import FieldEnyoSelect from './components/crud/fields/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/fields/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/fields/FieldJsonTextarea.vue';
import AwesomeCrud from './components/crud/AwesomeCrud.vue';
import AwesomeForm from './components/crud/AwesomeForm.vue';
import AutoProps from './components/misc/AutoProps.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';
import LiveEdit from './components/form/LiveEdit.vue';

import EnyoCard from './components/card/EnyoCard.vue';
import EnyoCrudStatsSection from './components/misc/EnyoCrudStatsSection.vue';

import AwesomeTable from './components/table/AwesomeTable.vue';
import AwesomeKanban from './components/table/AwesomeKanban.vue';

import FormGenerator from './components/form/form-generator';
import { abstractField } from './components/form/form-generator';

import apiErrorsMixin from './mixins/apiErrorsMixin';
import notificationsMixin from './mixins/notificationsMixin';
import rolesMixin from './mixins/rolesMixin';



import install from './plugin';

const VueAwesomeComponents = {
  AjaxTable: AwesomeTable,
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeTable,
  AwesomeCrud,
  EnyoCard,
  EnyoCrudComponent: AwesomeCrud,
  CrudComponent: AwesomeCrud,
  EnyoCrudStatsSection,
  EnyoSelect,
  FieldEnyoSelect,
  FieldFileInput,
  FieldJsonTextarea,
  install,
  LiveEdit,
  rolesMixin,
  TableAndChartsCard,
  UploadButton,
  FormGenerator,
  abstractField,
  notificationsMixin,
}

export {
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeTable as AjaxTable,
  AwesomeTable,
  AwesomeCrud as EnyoCrudComponent,
  AwesomeCrud as CrudComponent,
  AwesomeCrud,
  AwesomeKanban,
  EnyoCard,
  EnyoCrudStatsSection,
  EnyoSelect,
  FieldEnyoSelect,
  FieldFileInput,
  FieldJsonTextarea,
  install,
  LiveEdit,
  rolesMixin,
  TableAndChartsCard,
  UploadButton,
  VueAwesomeComponents as VueEnyoComponents,
  VueAwesomeComponents,
  FormGenerator,
  notificationsMixin,
}

export default VueAwesomeComponents;
