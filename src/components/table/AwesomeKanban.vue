<template>
  <div class="aw-kanban aw-listing">
    <div class="float-left col-6 pl-0">
      <slot name="kanban-header-left"></slot>
      <div class="card aw-segment-table-wrapper d-none" v-show="segmentFieldDefinitionComputed">
        <awesome-segments
          :field="segmentFieldDefinitionComputed"
          :apiRequestConfig="apiRequestConfig"
          :apiResponseConfig="apiResponseConfig"
          @change="onSegmentChange"
          @segment-list-changed="onSegmentListChanged"
        />
      </div>
    </div>
    <div class="float-right text-right col-6 pr-0">
      <slot name="kanban-header-right"><button class="btn btn-primary" style="visibility: hidden">&nbsp;</button></slot>
    </div>

    <div class="card aw-kanban-card">
      <div class="d-block">
        <div class="card-header aw-kanban-header">
          <div class="row">
            <ProgressBar v-if="isRefreshing" />

            <div class="col-12 col-md-8">
              <h3 class="text-left aw-kanban-title">
                <slot name="kanban-title"
                  ><template v-if="titleComputed"
                    >{{ titleComputed }}
                    <span class="badge badge-primary d-inline p-1">{{ totalCount }}</span></template
                  ></slot
                >
                <auto-refresh-button
                  v-if="actions && actions.refresh"
                  v-model="isRefreshing"
                  @refresh="getItems({ useSkeleton: true })"
                  :auto-refresh="autoRefresh"
                  :auto-refresh-interval="autoRefreshInterval"
                />

                <div class="btn-group btn-group-sm float-right awesome-list-buttons">
                  <slot name="top-actions" class />
                  <div class="btn-group" role="group">
                    <button
                      v-if="actions.filter && actions.advancedFiltering"
                      slot="reference"
                      type="button"
                      class="btn btn-simple btn-sm"
                      :class="{
                        'btn-primary': displayAwFilter || advancedFiltersCount,
                        'btn-default': !advancedFiltersCount
                      }"
                      @click="displayAwFilter = !displayAwFilter"
                    >
                      <i class="fa fa-filter" />
                      {{ $t('AwesomeTable.buttons.filters') }}
                      {{ advancedFiltersCount ? `(${advancedFiltersCount})` : '' }}
                    </button>
                  </div>
                </div>
              </h3>
            </div>
            <div class="col-12 col-md-4">
              <input
                v-if="actions.search"
                type="text"
                v-model="search"
                class="form-control"
                :placeholder="$t('AwesomeTable.searchInput')"
              />
            </div>
            <div class="col-12">
              <awesome-filter
                v-if="displayAwFilter"
                edit-filters
                id="advancedFilterComponentDisplay"
                :fields="_filterableColumns"
                @update-filter="advancedFiltering"
                :advanced-filters="advancedFilters"
                class="p-0"
              />
              <awesome-filter
                display-filters
                id="advancedFilterComponent"
                :fields="_filterableColumns"
                @update-filter="advancedFiltering"
                :advanced-filters="advancedFilters"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="awesome-kanban" ref="scrollableDiv">
          <Draggable
            class="draggable-list"
            :list="localLists"
            group="lists"
            :animation="options.animation"
            ghost-class="moving-list"
            :scrollSensitivity="scrollSensitivity || options.scrollSensitivity"
            @change="listChanged"
            :disabled="!options.moveList"
          >
            <KanbanList
              v-for="(list, index) in localLists"
              :animation="options.animation"
              :columns="columns"
              :custom-list-actions="customListActions"
              :descriptionField="descriptionField"
              :disabled="!options.moveCard"
              :display-labels-cache="displayLabelsCache"
              :fields="options.fields"
              :card-click-resolver="cardClickResolver"
              :id="list.id"
              :imageField="imageField"
              :items="list.content"
              :key="index"
              :labelsField="labelsField"
              :scroll-sensitivity="options.scrollSensitivity"
              :showColumns="options.showColumns"
              :subtitleField="subtitleField"
              :title="list.title"
              :titleField="titleField"
              :userImageField="userImageField"
              :usersField="usersField"
              :userTitleField="userTitleField"
              group="card"
              @remove-list="onRemoveList"
              @customListAction="onCustomListAction"
              @change="onCardChanged"
              @cardRemoved="onCardRemoved"
              @cardAdded="onCardAdded"
              @cardClicked="(card) => onCardClicked(card, $event)"
              @cardMoved="onCardMoved"
              @choose="onChoose"
              @unchoose="onUnChoose"
            >
              <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
                ><slot :name="slot" v-bind="scope"
              /></template>
            </KanbanList>
          </Draggable>
          <div v-if="actions && actions.addKanbanList" class="card add-list" @click.stop="editForm">
            <div class="card-body">
              <div v-if="!isAddingList" class="card-text">
                <i class="fa fa-plus"></i>
                {{ $t('AwesomeKanban.labels.addList') }}
              </div>
              <div v-if="isAddingList">
                <input
                  v-model="newListName"
                  class="form-control mb-1"
                  type="text"
                  :placeholder="$t('AwesomeKanban.labels.listName')"
                />
                <button :disabled="!newListName" @click.stop="addList" class="btn btn-primary">
                  {{ $t('AwesomeKanban.labels.add') }}
                </button>
                <button @click.stop="clearForm" class="btn btn-primary ml-1">
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
import listCardFormatMixin from '../../mixins/listCardFormatMixin';
import advanceFilterMixin from '../../mixins/advanceFilterMixin';
import { segmentMixin } from '../../mixins/';

import KanbanList from '../misc/KanbanList.vue';
import AwesomeFilter from '../misc/AwesomeFilter.vue';

import AwesomeSegments from './parts/AwesomeSegments.vue';
import AutoRefreshButton from './parts/AutoRefreshButton.vue';
import ProgressBar from './parts/ProgressBar.vue';

import { defaultKanbanOptions } from '../../mixins/defaultProps';

export default {
  name: 'AwesomeKanban',
  components: {
    AutoRefreshButton,
    AwesomeFilter,
    AwesomeSegments,
    KanbanList,
    ProgressBar
  },
  mixins: [
    i18nMixin,
    apiErrorsMixin,
    apiListMixin,
    relationMixin,
    listCardFormatMixin,
    segmentMixin,
    advanceFilterMixin
  ],
  props: {
    perPage: {
      type: [String, Number],
      default: 200
    },
    /**
     * The field to use to split the data
     */
    splittingField: {
      type: [String, Object]
    },
    /**
     * The field to use to sort the data
     */
    sortField: {
      type: [String, Object]
    },
    /**
     * The direction to use to sort the data
     */
    sortOrder: {
      type: String,
      default: 'asc',
      validator: (value) => ['asc', 'desc'].includes(value)
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
        addKanbanList: true
      })
    },

    displayOrphansList: {
      type: Boolean,
      default: true
    },
    displayColumnsInCards: {
      type: Boolean,
      default: false
    },

    customListActions: {
      type: Array,
      default: () => [],
      note: 'See https://enyosolutions-team.github.io/vue-awesome-components/guide/awesomecrud/custom-actions.html'
    },
    scrollSensitivity: {
      type: Number,
      default: 500,
      note: 'See https://github.com/SortableJS/Sortable/tree/master/plugins/AutoScroll#scrollsensitivity-option'
    },
    cardClickResolver: Function
  },

  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.Draggable) {
      /* eslint-disable-next-line */
      console.error('`Draggable` is missing. Please install `vuedraggable` and register the component globally!');
    }
    this.reorderListItemsDebounced = _.debounce(this.reorderListItems, 200);
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
    },
    splittingValuesComputed() {
      return this.splittingValues && Array.isArray(this.splittingValues) && this.splittingValues.length
        ? this.splittingValues
        : this.splittingFieldApiValues;
    },
    segmentFieldDefinitionComputed() {
      if (!this.splittingField) {
        return '';
      }
      if (this.columns) {
        const field = this.columns.find((f) => f.field === this.splittingField);
        if (field) {
          return field;
        }
      }
      return '';
    },

    _filterableColumns() {
      return this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled =
            (this.displayAwFilter === undefined || this.displayAwFilter) &&
            (col.filterOptions.filterable === undefined || col.filterOptions.filterable);
        }
        return col;
      });
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
    splittingValuesComputed() {
      this.handleLists();
    },
    'options.sortField'() {
      this.orderCardInLists();
    },
    'options.sortOrder'() {
      this.orderCardInLists();
    },
    search(newVal) {
      this.onSearch({ searchTerm: newVal });
    }
  },
  data: () => ({
    localLists: [], // Static list to test
    isAddingList: false,
    newListName: '',
    isRefreshing: false,
    displayLabelsCache: {},
    splittingFieldApiValues: [],
    displayAwFilter: false,
    search: '',
    scrollBox: {}
  }),

  methods: {
    addList() {
      if (this.newListName) {
        if (!_.some(this.localLists, { title: this.newListName })) {
          this.localLists.push({
            id: this.newListName,
            title: this.newListName,
            content: []
          });
          this.newListName = '';
          this.isAddingList = false;
        }
        this.$awEmit('aw-kanban-list-added', this.localLists[this.localLists.length - 1]);
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
      this.$awEmit('aw-kanban-list-removed', list);
    },

    listChanged(item) {
      this.$emit('listChanged', item);
      this.$awEmit('aw-kanban-list-changed', item, this.localLists);
    },

    onCardChanged(item, targetList, orderedListItems) {
      this.$emit('cardChanged', item, targetList, orderedListItems);
      this.reorderListItemsDebounced(orderedListItems);
    },
    onCardRemoved(item, list) {
      this.$emit('cardRemoved', item, list);
    },
    onCardAdded(payload, list, orderedListItems) {
      this.$emit('cardAdded', payload, list, orderedListItems);
      this.changeItemSplittingValue(payload, list, orderedListItems);
    },
    onCardMoved(item, list) {
      this.$emit('cardAdded', item, list);
    },

    onCardClicked(item, $event) {
      this.$emit('cardClicked', item, $event);
    },

    handleLists() {
      if (this.lists && this.lists.length) {
        this.localLists = _.cloneDeep(this.lists);
      } else {
        //  if (this.data && Array.isArray(this.data)) {
        const list = this.displayOrphansList
          ? [
              {
                id: 'unsorted',
                title: this.$t('AwesomeKanban.labels.unsorted'),
                content: this.data ? this.data.filter((item) => item[this.splittingField] == undefined) : []
              }
            ]
          : [];
        this.localLists = _.cloneDeep(list);
        //  }
      }
      this.splitItemsInLists();
      this.orderCardInLists();
    },

    // split items in lists
    splitItemsInLists() {
      if (this.splittingField && this.splittingValuesComputed && Array.isArray(this.splittingValuesComputed)) {
        this.splittingValuesComputed.forEach((filterValue) => {
          let id = filterValue,
            title = filterValue.toString();
          if (typeof filterValue === 'object') {
            id =
              (this.segmentFieldDefinitionComputed.relation &&
                filterValue[this.segmentFieldDefinitionComputed.relationKey]) ||
              filterValue.id ||
              filterValue;
            title =
              (this.segmentFieldDefinitionComputed.relation &&
                filterValue[this.segmentFieldDefinitionComputed.relationLabel]) ||
              filterValue.label ||
              id;
          }
          let content = [];
          if (this.data) {
            content = _.filter(this.data, [this.splittingField, id]);
            if (id === 'unsorted') {
              content = content.push(...this.data.filter((item) => item[this.splittingField] == id));
            }
          } else {
            this.localLists.forEach((localList) => {
              content.push(_.filter(localList.content, [this.splittingField, id]));
              _.remove(localList.content, (obj) => {
                return obj[this.splittingField] === id;
              });
            });
            content = _.flatten([...content]);
          }

          if (!_.some(this.localLists, { id, title })) {
            this.localLists.push({ id, title, content });
          }
        });
      }
    },

    orderCardInLists() {
      const sortOrder = this.sortOrder ? this.sortOrder.toLowerCase() : 'asc';
      if (this.sortField) {
        this.localLists.forEach((localList) => {
          if (localList.content.length > 1) {
            localList.content = _.orderBy(
              localList.content,
              (item) => {
                return item[this.sortField];
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
    },

    async changeItemSplittingValue({ element, newIndex }, targetList, orderedList) {
      element[this.splittingField] = targetList.id === 'unsorted' || targetList.id === undefined ? null : targetList.id;
      if (this.sortField) {
        delete element[this.sortField];
      }
      const urlparts = this._url.split('?');
      urlparts[0] = `${urlparts[0]}/${element[this.primaryKey]}`;
      await this.$awApi.put(urlparts.join('?'), element);
    },

    async reorderListItems(orderedList) {
      if (this.sortField && orderedList) {
        const promises = orderedList.map((item, index) => {
          const urlparts = this._url.split('?');
          delete item[this.splittingField];
          urlparts[0] = `${urlparts[0]}/${item[this.primaryKey]}`;
          return this.$awApi.put(urlparts.join('?'), { ...item, [this.sortField]: index });
        });
        await Promise.all(promises);
      }
    },

    onSegmentListChanged(values) {
      this.splittingFieldApiValues = values;
    },

    onMouseMove(event) {
      const scrollDiv = this.$refs.scrollableDiv;
      // (1) prepare to moving: make absolute and on top by z-index

      // move it out of any current parents directly into body
      // to make it positioned relative to the body
      if (!this.scrollBox) {
        this.scrollBox = this.$refs.scrollableDiv.getBoundingClientRect();
      }
      // centers the ball at (pageX, pageY) coordinates
      document.querySelector('#scrollableDiv');
      const distanceToTheEnd = document.body.offsetWidth - event.pageX;
      const distanceToTheStart = event.pageX - this.scrollBox.x;
      // console.log('Space left to the start', distanceToTheStart);
      // console.log('Space left to the end', distanceToTheEnd);
      if (distanceToTheEnd < 50 && scrollDiv.scrollLeft + scrollDiv.offsetWidth < scrollDiv.scrollWidth) {
        scrollDiv.scrollLeft += 10;
      } else if (distanceToTheStart < 0 && scrollDiv.scrollLeft > 0) {
        scrollDiv.scrollLeft -= 10;
      }
    },
    onChoose($event) {
      this.scrollBox = this.$refs.scrollableDiv.getBoundingClientRect();
      document.addEventListener('dragover', this.onMouseMove);
    },
    onUnChoose($event) {
      document.removeEventListener('dragover', this.onMouseMove);
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
