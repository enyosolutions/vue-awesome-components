<template>
    <div class="container-fluid" id="awesome-kanban-page">
      <h1>Awesome Kanban</h1>
      <AwesomeKanban></AwesomeKanban>
    </div>
</template>

<script>
  import AwesomeKanban from "../../src/components/table/AwesomeKanban";
  export default {
    name: "AwesomeKanbanPage",
    components: {
      AwesomeKanban
    },
    data: () => ({
        //
    })
  }
</script>

<style scoped>
  #awesome-kanban-page {
    flex: 1;
    display: flex;
    flex-flow: column;
  }
</style>