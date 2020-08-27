<template>
  <div class="awesome-kanban">
    <Draggable
      class="draggable-list"
      :list="localLists"
      group="lists"
      :animation="200"
      ghost-class="moving-list"
      :scroll-sensitivity="200"
      @change="listChanged"
    >
      <KanbanList
        v-for="(list, index) in localLists" :key="index"
        :title="list.title"
        :list="list.content"
        group="card"
        :animation="200"
        :scroll-sensitivity="200"
        @remove-list="removeList"
        @change="cardChanged"
      ></KanbanList>
    </Draggable>
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
          {{$t("AwesomeKanban.labels.addList")}}
        </div>
        <div v-if="isAddingList">
          <input v-model="newListName" class="form-control" type="text" :placeholder="$t('AwesomeKanban.labels.listName')"/>
          <button
            :disabled="!newListName"
            @click.stop="addList"
            class="btn btn-simple btn-primary"
          >{{$t("AwesomeKanban.labels.add")}}
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
  import i18nMixin from "../../mixins/i18nMixin";
  import Draggable from "vuedraggable";

  export default {
    name: "AwesomeKanban",
    components: {
      KanbanList,
      Draggable
    },
    mixins: [i18nMixin],
    props: {
      lists : {
        type: Array,
        default: () => ([])
      }
    },
    data: () => ({
      localLists: [], // Static list to test
      newTasks: [],
      isAddingList: false,
      newListName: '',
      scrollSensitivity: 200,
      animation: 200
    }),
    methods: {
      addList() {
        if (this.newListName) {
          if (!_.some(this.localLists, {'title': this.newListName})) {
            this.localLists.push({ title: this.newListName, content: []})
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
      },

      removeList(list) {
        this.localLists = _.filter(this.localLists, (item) => {
          return item.title !== list;
        });
      },

      listChanged(item) {
        console.log(item);
      },

      cardChanged(item, listTitle) {
        console.log(item, listTitle);
      }
    },
    mounted() {
      this.localLists = this.lists
    }
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

    .draggable-list {
      display: flex;
      flex-direction: row;
      flex-flow: nowrap;
      .moving-list {
        opacity: 0.4;
        background: #F7FAFC;
        border: 1px solid #4299e1;
      }
    }
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