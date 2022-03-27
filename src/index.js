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

import AwesomeTable from './components/table/AwesomeTable/AwesomeTable.vue';
import AwesomeKanban from './components/table/AwesomeKanban.vue';
import AwesomeList from './components/table/AwesomeList.vue';
import AwesomeDisplay from './components/crud/display/AwesomeDisplay.vue';

import FormGenerator from './components/form/form-generator/index.js';
import { abstractField } from './components/form/form-generator/index.js';

import apiErrorsMixin from './mixins/apiErrorsMixin';
import notificationsMixin from './mixins/notificationsMixin';
import rolesMixin from './mixins/rolesMixin';
import AwesomeActionList from './components/misc/AwesomeAction/AwesomeActionList.vue';
import AwesomeAction from './components/misc/AwesomeAction/AwesomeAction.vue';
import AwesomeFilter from './components/misc/AwesomeFilter.vue';
import AwesomeFilterValue from './components/misc/AwesomeFilter/AwesomeFilterValue.vue';
import AwesomeFilterOperator from './components/misc/AwesomeFilter/AwesomeFilterOperator.vue';

import install from './plugin';

const VueAwesomeComponents = {
  AjaxTable: AwesomeTable,
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeTable,
  AwesomeList,
  AwesomeKanban,
  AwesomeCrud,
  AwesomeDisplay,
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
  AwesomeFilter,
  AwesomeFilterValue,
  AwesomeFilterOperator,
}

export {
  abstractField,
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeCrud as EnyoCrudComponent,
  AwesomeCrud as CrudComponent,
  AwesomeCrud,
  AwesomeKanban,
  AwesomeList,
  AwesomeTable,
  AwesomeTable as AjaxTable,
  AwesomeDisplay,
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
  AwesomeActionList,
  AwesomeAction,
  AwesomeFilter,
  AwesomeFilterValue,
  AwesomeFilterOperator,
}

export default VueAwesomeComponents;
