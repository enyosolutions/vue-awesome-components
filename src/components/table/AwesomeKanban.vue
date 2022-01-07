<template>
  <div class="aw-kanban aw-listing">
    <div class="float-left col-6 pl-0">
      <slot name="kanban-header-left"></slot>
      <div class="card aw-segment-table-wrapper" v-show="segmentFieldDefinitionComputed">
        <awesome-segments
          :field="segmentFieldDefinitionComputed"
          :apiRequestConfig="apiRequestConfig"
          :apiResponseConfig="apiResponseConfig"
          @change="onSegmentChange"
        />
      </div>
    </div>
    <div class="float-right text-right col-6 pr-0">
      <slot name="kanban-header-right"><button class="btn btn-primary" style="visibility: hidden">&nbsp;</button></slot>
    </div>

    <div class="card aw-kanban-card">
      <div class="d-block">
        <div class="card-header">
          <h4 class="text-left">
            <slot name="aw-kanban-title">{{ titleComputed }}</slot>
            <div class="btn-group btn-group-sm float-right awesome-list-buttons">
              <div v-if="isRefreshing" style="text-align: center">
                <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" style="color: #888; margin-left: 10px" />
              </div>
              <slot name="top-actions" class />
              <div class="btn-group" role="group">
                <button v-if="actions && actions.refresh" class="btn btn-simple btn-sm p-0" @click="getItems()">
                  <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
                  {{ $t('AwesomeKanban.buttons.refresh') }}
                </button>
              </div>
            </div>
          </h4>
        </div>
      </div>
      <div class="card-body">
        <div class="awesome-kanban">
          <Draggable
            class="draggable-list"
            :list="localLists"
            group="lists"
            :animation="options.animation"
            ghost-class="moving-list"
            :scroll-sensitivity="options.scrollSensitivity"
            @change="listChanged"
            :disabled="!options.moveList"
          >
            <KanbanList
              v-for="(list, index) in localLists"
              :id="list.id || list.title"
              :key="index"
              :title="list.title"
              :items="list.content"
              :fields="options.fields"
              :columns="columns"
              group="card"
              :animation="options.animation"
              :scroll-sensitivity="options.scrollSensitivity"
              :disabled="!options.moveCard"
              :custom-list-actions="actions.customListActions"
              @remove-list="onRemoveList"
              @customListAction="onCustomListAction"
              @change="onCardChanged"
              @cardRemoved="onCardRemoved"
              @cardAdded="onCardAdded"
              @cardClicked="onCardClicked"
              @cardMoved="onCardMoved"
            ></KanbanList>
          </Draggable>
          <div v-if="actions && actions.addList" class="card add-list" @click.stop="editForm">
            <div class="card-body">
              <div v-if="!isAddingList" class="card-text">
                <i class="fa fa-plus"></i>
                {{ $t('AwesomeKanban.labels.addList') }}
              </div>
              <div v-if="isAddingList">
                <input
                  v-model="newListName"
                  class="form-control"
                  type="text"
                  :placeholder="$t('AwesomeKanban.labels.listName')"
                />
                <button :disabled="!newListName" @click.stop="addList" class="btn btn-simple btn-primary">
                  {{ $t('AwesomeKanban.labels.add') }}
                </button>
                <button @click.stop="clearForm" class="btn btn-xs btn-simple btn-primary">
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import i18nMixin from '../../mixins/i18nMixin';
import apiListMixin from '../../mixins/apiListMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import relationMixin from '../../mixins/relationMixin';

import KanbanList from '../misc/KanbanList';
import AwesomeSegments from './parts/AwesomeSegments.vue';

import { defaultKanbanOptions } from '../../mixins/defaultProps';

export default {
  name: 'AwesomeKanban',
  components: {
    KanbanList,
    AwesomeSegments
  },
  mixins: [i18nMixin, apiErrorsMixin, apiListMixin, relationMixin],
  props: {
    /**
     * The field to use to split the data
     */
    splittingField: {
      type: [String, Object]
    },
    /**
     * List of accepted values for splitting the data
     */
    splittingValues: {
      type: Array
    },
    /**
     * The lists of list with data
     */
    lists: {
      type: Array,
      default: () => []
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
    options: {
      type: Object,
      default: () => defaultKanbanOptions
    },

    /**
     * The options of the kanban component
     */
    actions: {
      type: Object,
      default: () => ({
        refresh: true,
        addList: true
      })
    }
  },
  data: () => ({
    localLists: [], // Static list to test
    isAddingList: false,
    newListName: '',
    isRefreshing: false
  }),
  methods: {
    addList() {
      if (this.newListName) {
        if (!_.some(this.localLists, { title: this.newListName })) {
          this.localLists.push({ title: this.newListName, content: [] });
          this.newListName = '';
          this.isAddingList = false;
        }
      }
    },

    clearForm() {
      this.isAddingList = false;
      this.newListName = '';
    },

    editForm() {
      this.isAddingList = true;
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

    onCardChanged(item, list) {
      this.$emit('cardChanged', item, list);
    },
    onCardRemoved(item, list) {
      this.$emit('cardRemoved', item, list);
    },
    onCardAdded(item, list) {
      this.$emit('cardAdded', item, list);
    },
    onCardMoved(item, list) {
      this.$emit('cardAdded', item, list);
    },

    onCardClicked(item) {
      this.$emit('cardClicked', item);
    },

    handleLists() {
      if (this.lists && this.lists.length) {
        this.localLists = _.cloneDeep(this.lists);
      } else {
        if (this.data && this.data.length) {
          const list = [{ title: this.entity, content: _.cloneDeep(this.data) }];
          this.localLists = _.cloneDeep(list);
        }
      }
      this.filterLists();
      this.orderCardInLists();
    },

    filterLists() {
      if (this.splittingField && this.splittingValues && this.splittingValues.length) {
        this.splittingValues.forEach((filterValue) => {
          let content = [];
          this.localLists.forEach((localList) => {
            content.push(_.filter(localList.content, [this.splittingField, filterValue]));
            _.remove(localList.content, (obj) => {
              return obj[this.splittingField] === filterValue;
            });
          });
          content = _.flatten([...content]);
          if (!_.some(this.localLists, { title: filterValue.toString() })) {
            this.localLists.push({ title: filterValue.toString(), content });
          }
        });
      }
    },

    orderCardInLists() {
      const sortOrder = this.options.sortOrder ? this.options.sortOrder.toLowerCase() : 'desc';
      if (this.options.sortField) {
        this.localLists.forEach((localList) => {
          if (localList.content.length > 1) {
            localList.content = _.orderBy(
              localList.content,
              (item) => {
                return item[this.options.sortField];
              },
              [sortOrder]
            );
          }
        });
      }
    },

    onCustomListAction(body) {
      this.$emit('customListAction', body);
    },

    getSegmentValues(field) {
      return (
        field &&
        ((field.fieldOptions && field.fieldOptions.filterDropdownItems) ||
          field.enum ||
          field.fieldOptions.values ||
          field.fieldOptions.options)
      );
    }
  },
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.Draggable) {
      /* eslint-disable-next-line */
      console.error('`Draggable` is missing. Please install `vuedraggable` and register the component globally!');
    }
  },
  mounted() {
    this.handleLists();
  },

  computed: {
    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },
    titleComputed() {
      if (this.title) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this._model && this._model.pluralName) {
        return this.$te(this._model.pluralName) ? this.$t(this._model.pluralName) : _.startCase(this._model.pluralName);
      }

      if (this._model && this._model.singularName) {
        return this.$te(this._model.singularName)
          ? this.$t(this._model.singularName)
          : _.startCase(this._model.singularName);
      }

      if (this._model && this._model.name) {
        return this.$te(this._model.name) ? this.$t(this._model.name) : _.startCase(this._model.name);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : _.startCase(this.identity);
      }
      return '';
    }
  },

  watch: {
    lists() {
      this.handleLists();
    },
    data() {
      this.handleLists();
    },
    splittingField() {
      this.handleLists();
    },
    splittingValues() {
      this.handleLists();
    },
    'options.sortField'() {
      this.orderCardInLists();
    },
    'options.sortOrder'() {
      this.orderCardInLists();
    }
  }
};
</script>

<style lang="scss">
.container {
  max-width: 100%;
}

.aw-kanban-card {
  clear: both;
}
.aw-display-field:not(pre) {
  white-space: normal;
}

.awesome-kanban {
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100vh - 14rem);
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
      background: #f7fafc;
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
