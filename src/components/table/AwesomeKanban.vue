<template>
  <div class="awesome-kanban">
    <Draggable
      class="draggable-list"
      :list="localLists"
      group="lists"
      :animation="kanbanOptions.animation"
      ghost-class="moving-list"
      :scroll-sensitivity="kanbanOptions.scrollSensitivity"
      @change="listChanged"
      :options="{disabled: kanbanOptions.moveList}"
    >
      <KanbanList
        v-for="(list, index) in localLists" :key="index"
        :title="list.title"
        :list="list.content"
        group="card"
        :animation="kanbanOptions.animation"
        :scroll-sensitivity="kanbanOptions.scrollSensitivity"
        :options="{disabled: kanbanOptions.moveCard}"
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
  import i18nMixin from "../../mixins/i18nMixin";
  import apiListMixin from "../../mixins/apiListMixin";
  import apiErrorsMixin from "../../mixins/apiErrorsMixin";

  import _ from "lodash";

  import KanbanList from "../misc/KanbanList";
  import Draggable from "vuedraggable";

  const defaultOptions = {
    scrollSensitivity: 200,
    animation: 200,
    moveList: false,
    moveCard: false,
  };

  export default {
    name: "AwesomeKanban",
    components: {
      KanbanList,
      Draggable
    },
    mixins: [i18nMixin, apiErrorsMixin, apiListMixin],
    props: {
      /**
       * The lists of list with data
       */
      lists : {
        type: Array,
        default: () => ([])
      },
      /**
       * The field use to create the default list base on all field value (eg: filterField: 'status' => list of values ['completed', 'failed', 'scheduled'])
       */
      filterField: {
        type: String,
        default: ''
      },

      /**
       * The values associated with the filterField (eg: ['completed', 'failed', 'scheduled'])
       */
      filterValues: {
        type: Array,
        default: () => ([])
      },

      /**
       * The options of the kanban component
       */
      kanbanOptions: {
        type: Object,
        default: () => defaultOptions
      }
    },
    data: () => ({
      localLists: [], // Static list to test
      isAddingList: false,
      newListName: '',
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
      },

      filterLists() {
        if (this.filterField && this.filterValues) {
          this.filterValues.forEach(filterValue => {
            let content = [];
            this.localLists.forEach(localList => {
              content.push(_.filter(localList.content, [this.filterField, filterValue]));
              _.remove(localList.content, (obj) => {
                return obj[this.filterField] === filterValue
              });
            })
            content = _.flatten(content);
            if (!_.some(this.localLists, {'title': filterValue})) {
              this.localLists.push({ title: filterValue, content })
            }
          })
        }
      }
    },
    mounted() {
      if (this.lists && this.lists.length) {
        this.localLists = this.lists;
      }
      this.refreshLocalData();
      if (this.data && this.data.length) {
        this.localLists.push({ title: 'defaultData', content: this.data});
      }
      this.filterLists();
    },

    watch: {
      data(newValue) {
        if (newValue && newValue.length && !_.some(this.localLists, {'title': this.entity})) {
          this.localLists.push({ title: 'defaultData', content: newValue});
        }
      }
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
      height: 100%;
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