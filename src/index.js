import FieldEnyoSelect from './components/crud/fields/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/fields/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/fields/FieldJsonTextarea.vue';
import CrudComponent from './components/crud/CrudComponent.vue';
import AwesomeForm from './components/crud/AwesomeForm.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';
import LiveEdit from './components/form/LiveEdit.vue';

import EnyoCard from './components/card/EnyoCard.vue';
import EnyoCrudStatsSection from './components/misc/EnyoCrudStatsSection.vue';

import AwesomeTable from './components/table/AwesomeTable.vue';

import apiErrorsMixin from './mixins/apiErrorsMixin';
import rolesMixin from './mixins/rolesMixin';
import install from './mixins/rolesMixin';

const VueEnyoComponents = {
  FieldEnyoSelect,
  FieldFileInput,
  FieldJsonTextarea,
  CrudComponent,
  EnyoCrudComponent: CrudComponent,
  TableAndChartsCard,
  EnyoSelect,
  UploadButton,
  EnyoCard,
  EnyoCrudStatsSection,
  AwesomeTable,
  AwesomeForm,
  AjaxTable: AwesomeTable,
  LiveEdit,
  apiErrorsMixin,
  rolesMixin,
  install
}

export {
  FieldEnyoSelect,
  FieldFileInput,
  FieldJsonTextarea,
  CrudComponent,
  CrudComponent as EnyoCrudComponent,
  TableAndChartsCard,
  EnyoSelect,
  UploadButton,
  EnyoCard,
  EnyoCrudStatsSection,
  AwesomeTable,
  AwesomeTable as AjaxTable,
  AwesomeForm,
  LiveEdit,
  apiErrorsMixin,
  rolesMixin,
  VueEnyoComponents,
  install
}

export default VueEnyoComponents;
