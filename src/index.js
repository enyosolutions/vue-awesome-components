import FieldEnyoSelect from './components/crud/FieldEnyoSelect.vue';
import FieldFileInput from './components/crud/FieldFileInput.vue';
import FieldJsonTextarea from './components/crud/FieldJsonTextarea.vue';
import CrudComponent from './components/crud/CrudComponent.vue';

import TableAndChartsCard from './components/card/TableAndChartsCard.vue';

import EnyoSelect from './components/form/EnyoSelect.vue';
import UploadButton from './components/form/UploadButton.vue';
import LiveEdit from './components/form/LiveEdit.vue';

import EnyoCard from './components/card/EnyoCard.vue';
import EnyoStats from './components/misc/EnyoStats.vue';

import AjaxTable from './components/table/AjaxTable.vue';

import apiErrorsMixin from './mixins/apiErrorsMixin';
import rolesMixin from './mixins/rolesMixin';




const VueEnyoComponents = {
 FieldEnyoSelect,
 FieldFileInput,
 FieldJsonTextarea,
 CrudComponent,
 TableAndChartsCard,
 EnyoSelect,
 UploadButton,
 EnyoCard,
 EnyoStats,
 AjaxTable,
 LiveEdit,
 apiErrorsMixin,
 rolesMixin,
}


export {
  FieldEnyoSelect,
  FieldFileInput,
  FieldJsonTextarea,
  CrudComponent,
  TableAndChartsCard,
  EnyoSelect,
  UploadButton,
  EnyoCard,
  EnyoStats,
  AjaxTable,
  LiveEdit,
  apiErrorsMixin,
  rolesMixin,
  VueEnyoComponents
}
export default VueEnyoComponents;
