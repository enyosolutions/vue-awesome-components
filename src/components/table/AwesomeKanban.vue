<template>
  <div class="awesome-kanban">
    <KanbanList
      title="Default List"
      :list="tasks"
      group="lists"
      :animation="200"
      :scroll-sensitivity="200"
    ></KanbanList>
    <KanbanList
      v-for="(list, index) in lists" :key="index"
      :title="index"
      :list="list"
      group="lists"
      :animation="200"
      :scroll-sensitivity="200"
    ></KanbanList>
    <div
      class="card add-list"
      @click.stop="editForm"
    >
      <div class="card-body">
        <div
          v-if="!isAddingList"
          class="card-text"
        >
          <i class="fa fa-plus"></i>
          Ajouter une liste
        </div>
        <div v-if="isAddingList">
          <input v-model="newListName" class="form-control" type="text" placeholder="List name"/>
          <button
            :disabled="!newListName"
            @click.stop="addList"
            class="btn btn-simple btn-primary"
          >Ajouter
          </button>
          <button @click.stop="clearForm" class="btn btn-xs btn-simple btn-primary">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import KanbanList from "../misc/KanbanList";
  import _ from "lodash";

  export default {
    name: "AwesomeKanban",
    components: {
      KanbanList
    },
    data: () => ({
      lists: {
        "test-1": [],
      },
      tasks: [
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
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
        {
          id: 8,
          name: 'Task 8'
        },
      ],
      newTasks: [],
      isAddingList: false,
      newListName: '',
      scrollSensitivity: 200,
      animation: 200
    }),
    methods: {
      addList() {
        if (this.newListName) {
          if (!_.has(this.lists, this.newListName)) {
            this.$set(this.lists, this.newListName, []);
            this.newListName = '';
            this.isAddingList = false;
          }
        }
      },
      clearForm() {
        this.isAddingList = false
        this.newListName = '';
      },
      editForm() {
        this.isAddingList = true
      }
    },
  }
</script>

<style lang="scss">
  .container {
    max-width: 100%;
  }

  .awesome-kanban {
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height: 50vh;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;

    .card {
      margin: 6px 0;
    }

    .add-list {
      cursor: pointer;
      margin: 0 10px;
      width: 272px;
      min-width: 272px;
      position: relative;
    }
  }
</style>