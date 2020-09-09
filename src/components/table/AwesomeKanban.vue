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
      :disabled="!kanbanOptions.moveList"
    >
      <KanbanList
        v-for="(list, index) in localLists" :key="index"
        :title="list.title"
        :list="list.content"
        :fields="kanbanOptions.fields"
        :columns="columns"
        group="card"
        :animation="kanbanOptions.animation"
        :scroll-sensitivity="kanbanOptions.scrollSensitivity"
        :disabled="!kanbanOptions.moveCard"
        :custom-list-actions="kanbanOptions.customListActions"
        @remove-list="onRemoveList"
        @customListAction="onCustomListAction"
        @change="onCardChanged"
        @cardClicked="onCardClicked"
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
          <input v-model="newListName" class="form-control" type="text"
                 :placeholder="$t('AwesomeKanban.labels.listName')"/>
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

  import { defaultKanbanOptions } from "../../mixins/defaultProps";

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
      lists: {
        type: Array,
        default: () => ([])
      },

      /*
      * The columns to use AwesomeDisplay
      * */
      columns: {
        type: Array,
        default: () => []
      },

      /**
       * The options of the kanban component
       */
      kanbanOptions: {
        type: Object,
        default: () => defaultKanbanOptions
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
            this.localLists.push({title: this.newListName, content: []})
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

      onRemoveList(list) {
        /* LOCAL REMOVE */
        this.localLists = _.filter(this.localLists, (item) => {
          return item.title !== list;
        });
        this.$emit('removeList', list);
      },

      listChanged(item) {
        this.$emit('listChanged', item);
      },

      onCardChanged(item, listTitle) {
        this.$emit('cardChanged', item, listTitle);
      },

      onCardClicked(item) {
        this.$emit('cardClicked', item);
      },

      handleLists() {
        if (this.lists && this.lists.length) {
          this.localLists = _.cloneDeep(this.lists);
        } else {
          if (this.data && this.data.length) {
            const list = [{title: this.entity, content: _.cloneDeep(this.data)}]
            this.localLists = _.cloneDeep(list);
          }
        }
        this.filterLists();
        this.orderCardInLists();
      },

      filterLists() {
        if (this.kanbanOptions.filterField && this.kanbanOptions.filterValues && this.kanbanOptions.filterValues.length) {
          this.kanbanOptions.filterValues.forEach(filterValue => {
            let content = [];
            this.localLists.forEach(localList => {
              content.push(_.filter(localList.content, [this.kanbanOptions.filterField, filterValue]));
              _.remove(localList.content, (obj) => {
                return obj[this.kanbanOptions.filterField] === filterValue
              });
            })
            content = _.flatten([...content]);
            if (!_.some(this.localLists, {'title': filterValue.toString()})) {
              this.localLists.push({ title: filterValue.toString(), content })
            }
          })
        }
      },

      orderCardInLists() {
        const sortOrder = this.kanbanOptions.sortOrder ? this.kanbanOptions.sortOrder.toLowerCase() : 'desc';
        if (this.kanbanOptions.sortField) {
          this.localLists.forEach(localList => {
            if (localList.content.length > 1) {
              localList.content = _.orderBy(localList.content, (item) => {
                return item[this.kanbanOptions.sortField]
              }, [sortOrder]);
            }
          })
        }
      },

      onCustomListAction(body) {
        this.$emit('customListAction', body);
      },
    },
    mounted() {
      this.refreshLocalData();
      this.handleLists();
    },

    watch: {
      data() {
        this.handleLists();
      },
      'kanbanOptions.filterField'() {
        this.handleLists();
      },
      'kanbanOptions.filterValues'() {
        this.handleLists();
      },
      'kanbanOptions.sortField' () {
        this.orderCardInLists();
      },
      'kanbanOptions.sortOrder'() {
        this.orderCardInLists();
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
    height: calc(100vh - 14rem);;
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