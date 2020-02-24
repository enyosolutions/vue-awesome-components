<template>
  <div>
    <h3>Simple table</h3>
    <pre style="color:white">
      < EnyoAjaxTable
      :columns="['col1', 'col2', 'col3']"
      :rows="[
      {col1: 'qq', col2:'some data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq2', col2:'some moore data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      {col1: 'qq3', col2:'a third data', col3: 'oopsie',
      notDisplayedColumn: 'ghosted'},
      ]"
      :options="{actions: {noActions: true}}"
      />
    </pre>

    <EnyoAjaxTable
      :columns="['col1', 'col2', 'col3']"
      :rows="[
      {col1: 'qq', col2:'some data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
      {col1: 'qq2', col2:'some moore data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
      {col1: 'qq3', col2:'a third data', col3: 'oopsie', notDisplayedColumn: 'ghosted'},
       ]"
       :options="{actions: {noActions: true}}"
    />

    <h3>Table with configuration</h3>

    <pre style="color:white">
         < EnyoAjaxTable
      :columns="[{type:'image', field: 'picture'}, {type: 'url', field: 'url'}, {type: 'boolean', field: 'myboolean'}]"
      :rows="[
      {picture: 'https://picsum.photos/200?1', url:'https://mozilla.org', myboolean: false, notDisplayedColumn: 'ghosted'},
      {picture: 'https://picsum.photos/200?2', url:'https://bing.com', myboolean: true, notDisplayedColumn: 'ghosted'},
      {picture: 'https://picsum.photos/200?3', url:'https://google.com', myboolean: undefined, notDisplayedColumn: 'ghosted'},
       ]"
       :options="{actions: {noActions: true}}"
    />
    </pre>
        <EnyoAjaxTable
      :columns="[{type:'image', field: 'picture'}, {type: 'url', field: 'url'}, {type: 'boolean', field: 'myboolean'}]"
      :rows="[
      {picture: 'https://picsum.photos/200?1', url:'https://mozilla.org', myboolean: false, notDisplayedColumn: 'ghosted'},
      {picture: 'https://picsum.photos/200?2', url:'https://bing.com', myboolean: true, notDisplayedColumn: 'ghosted'},
      {picture: 'https://picsum.photos/200?3', url:'https://google.com', myboolean: undefined, notDisplayedColumn: 'ghosted'},
       ]"
       :options="{actions: {noActions: true}}"
    />

    <h3>Table with api</h3>

    <pre style="color:white">
           < EnyoAjaxTable
      :columns="[{type:'number', field: 'userId'},
       {type: 'number', field: 'id'},
       {type: 'boolean', field: 'completed'},
       {type: 'string', field: 'title'}]"
       url="https://jsonplaceholder.typicode.com/todos"
       responseField=""
       :options="{actions: {noActions: false}}"
    />
    </pre>
        <EnyoAjaxTable
      :columns="[{type:'number', field: 'userId'},
       {type: 'number', field: 'id'},
       {type: 'boolean', field: 'completed'},
       {type: 'string', field: 'title'}]"
      url="https://jsonplaceholder.typicode.com/todos"
      responseField=""
      :options="{actions: {noActions: false}}"
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