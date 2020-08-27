<template>
    <div class="container-fluid" id="awesome-kanban-page">
      <h1>Awesome Kanban</h1>
      <AwesomeKanban
        :lists="lists"
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
              name: 'Task 1'
            },
            {
              id: 2,
              name: 'Task 2'
            },
            {
              id: 3,
              name: 'Task 3'
            },
            {
              id: 4,
              name: 'Task 4'
            },
            {
              id: 5,
              name: 'Task 5'
            },
            {
              id: 6,
              name: 'Task 6'
            },
            {
              id: 7,
              name: 'Task 7'
            },
            {
              id: 8,
              name: 'Task 8'
            }
          ]
        },
        {title: 'test-1', content: []}
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