<template>
  <div>
    <EnyoAjaxTable
      :columns="['col1', 'col2', 'col3']"
      :rows="[
      {col1: 'qq', col2:'some data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
      {col1: 'qq2', col2:'some moore data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
      {col1: 'qq3', col2:'a third data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
       ]"
       :options="{actions: {noActions: true}}"
    />
  </div>
</template>

<script>
  import EnyoAjaxTable from '../../../src/components/table/EnyoAjaxTable.vue';

  export default {
    name: 'AjaxTableDemo',
    components:{EnyoAjaxTable},
    props: {
    },
    mounted() {
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="css" scoped>
  @import "~vue-good-table/dist/vue-good-table.css";
  @import "~bootstrap/dist/css/bootstrap.min.css";

</style>