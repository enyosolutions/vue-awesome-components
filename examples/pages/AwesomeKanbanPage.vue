<template>
    <div class="container-fluid" id="awesome-kanban-page">
      <h1>Awesome Kanban</h1>
      <AwesomeKanban
        :lists="lists"
        filter-field="status"
        :filter-values="['failed', 'completed', 'scheduled']"
        :kanban-options="{ moveList: true }"
      ></AwesomeKanban>
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
      lists: [
        {
          title: 'tasks',
          content: [
            {
              id: 1,
              status: 'failed',
              name: 'Task 1'
            },
            {
              id: 2,
              status: 'failed',
              name: 'Task 2'
            },
            {
              id: 3,
              status: 'completed',
              name: 'Task 3'
            },
            {
              id: 4,
              status: 'completed',
              name: 'Task 4'
            },
            {
              id: 4,
              status: 'scheduled',
              name: 'Task 4'
            },
            {
              id: 7,
              status: 'completed-with-warnings',
              name: 'Task 1'
            },
            {
              id: 8,
              status: 'completed-with-warnings',
              name: 'Task 2'
            },
          ]
        },
      ]
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