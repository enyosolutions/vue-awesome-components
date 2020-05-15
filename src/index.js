import FieldEnyoSelect from './components/crud/fields/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/fields/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/fields/FieldJsonTextarea.vue';
import CrudComponent from './components/crud/CrudComponent.vue';
import AwesomeForm from './components/crud/AwesomeForm.vue';
import AutoProps from './components/misc/AutoProps.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';
import LiveEdit from './components/form/LiveEdit.vue';

import EnyoCard from './components/card/EnyoCard.vue';
import EnyoCrudStatsSection from './components/misc/EnyoCrudStatsSection.vue';

import AwesomeTable from './components/table/AwesomeTable.vue';

import apiErrorsMixin from './mixins/apiErrorsMixin';
import rolesMixin from './mixins/rolesMixin';
import install from './plugin';

const VueEnyoComponents = {
  AjaxTable: AwesomeTable,
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeTable,
  CrudComponent,
  EnyoCard,
  EnyoCrudComponent: CrudComponent,
  AwesomeCrud: CrudComponent,
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
}

export {
  apiErrorsMixin,
  AutoProps,
  AwesomeForm,
  AwesomeTable as AjaxTable,
  AwesomeTable,
  CrudComponent as EnyoCrudComponent,
  CrudComponent as AwesomeCrud,
  CrudComponent,
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
  VueEnyoComponents,
}

export default VueEnyoComponents;
