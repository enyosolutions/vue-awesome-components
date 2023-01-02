<template>
  <div class="aw-list aw-listing">
    <div class="float-left col-6 pl-0">
      <slot name="list-header-left"></slot>
      <div class="card aw-segment-table-wrapper" v-if="segmentFieldDefinitionComputed">
        <awesome-segments
          :field="segmentFieldDefinitionComputed"
          :apiRequestConfig="apiRequestConfig"
          :apiResponseConfig="apiResponseConfig"
          @change="onSegmentChange"
        />
      </div>
    </div>
    <div class="float-right text-right col-6 pr-0">
      <slot name="list-header-right"></slot>
    </div>
    <div class="card aw-list-card aw-list-component awesome-list">
      <div
        class="card-header"
        v-if="showHeader"
        :class="'aw-list-header ' + (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')"
      >
        <ProgressBar v-if="isRefreshing"></ProgressBar>
        <div class="row">
          <div class="col-12 col-md-8">
            <h3 class="mb-0 aw-list-title">
              <slot name="list-title"
                ><template v-if="titleComputed"
                  >{{ titleComputed }} <span class="badge badge-primary d-inline p-1">{{ totalCount }}</span></template
                ></slot
              >
              <auto-refresh-button
                v-if="actions && actions.refresh"
                v-model="isRefreshing"
                @refresh="getItems({ useSkeleton: true })"
                :auto-refresh="autoRefresh"
                :auto-refresh-interval="autoRefreshInterval"
              />
              <template v-if="actions && actions.changeItemsPerRow">
                <div class="btn-group ml-3" role="group">
                  <button
                    class="btn btn-sm btn-sm"
                    @click="setListMode()"
                    :class="itemsPerRow === 1 ? 'btn-primary' : 'btn-light'"
                  >
                    <i :class="'fa fa-list'" />
                  </button>
                  <button
                    class="btn btn-sm"
                    :class="itemsPerRow === 2 ? 'btn-primary' : 'btn-light'"
                    @click="setMediumGridMode()"
                  >
                    <i :class="'fa fa-th-large'" />
                  </button>

                  <button
                    class="btn btn-sm"
                    :class="itemsPerRow === 3 ? 'btn-primary' : 'btn-light'"
                    @click="setGridMode()"
                  >
                    <i :class="'fa fa-th'" />
                  </button>
                </div>
              </template>

              <div class="btn-group float-right aw-list-buttons">
                <slot name="top-actions" class />

                <div class="btn-group" role="group" v-if="_actions.sort">
                  <popper
                    trigger="clickToOpen"
                    :options="{
                      placement: 'top'
                    }"
                    ref="sortPopover"
                  >
                    <button
                      slot="reference"
                      type="button"
                      class="btn btn-sm btn-simple dropdown-toggle"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {{ $t('AwesomeCrud.buttons.sort') }}
                    </button>
                    <div class="popper card mt-0" style="z-index: 1;">
                      <button
                        v-for="(col, index) in columns"
                        :key="index"
                        class="dropdown-item col"
                        type="button"
                        href="#"
                        :class="{
                          'text-light bg-primary': columnSortState === col.field,
                          'd-none': col.field === '__ACTIONS'
                        }"
                        @click="toggleColumnSort(col.field)"
                      >
                        {{ col.label }}
                        <span v-if="columnSortState === col.field" class="pull-right">
                          {{ columnSortDirection === 'asc' ? '⬆️' : '⬇️' }}</span
                        >
                      </button>
                    </div>
                  </popper>
                </div>
                <div class="btn-group" role="group">
                  <popper
                    trigger="clickToOpen"
                    :options="{
                      placement: 'bottom',
                      modifiers: { offset: { offset: '0,10px' } }
                    }"
                    ref="filterPopover"
                    v-if="actions && (actions.export || actions.import)"
                  >
                    <button slot="reference" type="button" class="btn btn-simple dropdown-toggle btn-sm">
                      {{ $t('AwesomeTable.more') }}
                    </button>

                    <div class="popper card mt-0" style="z-index: 1;">
                      <slot name="top-more-actions" />
                      <button
                        v-if="actions && actions.export"
                        class="btn  btn-sm btn-success btn-simple btn-block"
                        @click="exportCallBack"
                      >
                        <i class="fa fa-file-excel" />
                        {{ $t('common.buttons.excel') }}
                      </button>

                      <button class="btn btn-sm  btn-default btn-simple btn-block" @click="exportCurrentArrayToExcel">
                        <i class="fa fa-file-excel" />
                        {{ $t('common.buttons.excel-currentpage') }}
                      </button>
                    </div>
                  </popper>

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
            <p class="card-category">
              <slot name="list-subtitle" />
            </p>
          </div>
          <div class="col-12 col-md-4">
            <input v-if="actions.search" type="text" v-model="search" placeholder="Rechercher" class="form-control" />
          </div>
          <div class="col-12">
            <awesome-filter
              v-if="displayAwFilter"
              class="pl-0  "
              edit-filters
              id="advancedFilterComponentDisplay"
              :fields="_filterableColumns"
              @update-filter="advancedFiltering"
              :advanced-filters="advancedFilters"
            />
            <awesome-filter
              v-if="actions.filter"
              display-filters
              :fields="_filterableColumns"
              @update-filter="advancedFiltering"
              :advanced-filters="advancedFilters"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <slot name="list-empty-state" :isRefreshing="isRefreshing" :items="_paginatedItems">
          <template v-if="!_paginatedItems || !_paginatedItems.length">
            <div class="text-center">
              <i v-if="isRefreshing" class="fa fa-spinner fa-spin fa-3x"></i>
              <template v-else>
                {{ $t('AwesomeTable.empty') }}
                <br />
                <i class="fa fa-file-o fa-4x"></i><br />
                <a v-if="_actions.create" href="javascript:void(0)" @click.prevent="$emit('create')" class="">
                  {{ $t('AwesomeTable.createFirstItem') }} <i class="fa fa-plus text-primary"></i>
                </a>
              </template>
            </div>
          </template>
        </slot>
        <slot name="list-items" :items="_paginatedItems" :itemsPerRow="itemsPerRow" :columns="columns">
          <Draggable
            v-if="_paginatedItems"
            v-model="_paginatedItems"
            ghost-class="moving-card"
            group="awesomeList"
            :delay="300"
            :disabled="!_isDraggable"
            :delay-on-touch-only="true"
            class="draggable-list w-100 list-responsive"
            :class="styles.listWrapperClasses"
          >
            <template v-for="(item, index) in _paginatedItems">
              <div
                :key="index"
                class="pointer d-flex"
                :class="itemWrapperClasses"
                @click="handleItemClick($event, item)"
              >
                <slot name="list-item" :item="item" :itemsPerRow="itemsPerRow" :index="index">
                  <div
                    class="card mb-3 aw-list-item flex-fill"
                    :class="itemClasses"
                    :style="{ 'flex-direction': itemsPerRow < 2 ? 'row' : 'column', height: _itemHeight }"
                  >
                    <i v-if="_isDraggable" class="draggable-icon fa fa-list"></i>
                    <img
                      class="card-img-top"
                      v-if="imageField && getItemProperty(item, imageField)"
                      :src="getItemProperty(item, imageField)"
                      :alt="getItemProperty(item, titleField)"
                      :class="imageClasses"
                      :style="imageStyles"
                    />
                    <div class="card-body">
                      <h4
                        class="card-title aw-list-item-title"
                        style=""
                        v-if="getItemProperty(item, titleField)"
                        v-html="getItemProperty(item, titleField)"
                      ></h4>
                      <h6
                        class="card-title aw-list-item-subtitle"
                        v-if="getItemProperty(item, subtitleField)"
                        v-html="getItemProperty(item, subtitleField)"
                      ></h6>

                      <h3
                        class="card-title aw-list-item-title"
                        style=""
                        v-if="!_useClassicLayout && _modelDisplayField && item[_modelDisplayField]"
                      >
                        {{ item[_modelDisplayField] }}
                      </h3>

                      <p class="card-text aw-list-item-description" v-if="getItemProperty(item, descriptionField)">
                        <AwesomeDisplay
                          v-bind="getField(descriptionField)"
                          :value="getItemProperty(item, descriptionField)"
                        >
                        </AwesomeDisplay>
                      </p>
                      <template v-if="columns && columns.length && !_useClassicLayout">
                        <div v-for="(itemData, key) in getAllowedFields(item)" :key="key">
                          <small class="aw-list-item-field-label text-info">{{ getField(key).label || key }}</small
                          ><br />
                          <AwesomeDisplay
                            v-bind="getField(key)"
                            :value="itemData"
                            :relation="getField(key).relation"
                            :relation-label="getField(key).relationLabel"
                            :relation-url="getField(key).relationUrl"
                            :relation-key="getField(key).relationKey"
                          >
                          </AwesomeDisplay>
                        </div>
                      </template>
                      <div class="aw-list-item-action pl-3 pr-3" v-if="actions.itemButton">
                        <button
                          @click="handleItemButtonClick($event, item)"
                          class="btn btn-primary btn-sm "
                          :class="itemsPerRow > 1 ? 'btn-block' : ''"
                        >
                          {{ $t('AwesomeList.buttons.itemAction') }}
                        </button>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>
            </template>
          </Draggable>
        </slot>
        <hr v-if="actions.pagination == undefined || actions.pagination" />
        <nav class="text-center" v-if="actions.pagination == undefined || actions.pagination">
          <paginate
            v-model="page"
            :page-count="_pageCount"
            :page-range="3"
            :margin-pages="2"
            :click-handler="onPaginationChange"
            :prev-text="'<< '"
            :next-text="' >>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :prev-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-link-class="'page-link'"
            :next-link-class="'page-link'"
          ></paginate>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import Popper from 'vue-popperjs';
import Paginate from 'vuejs-paginate';
import _ from 'lodash';
import apiErrors from '../../mixins/apiErrorsMixin';
import i18nMixin from '../../mixins/i18nMixin';
import apiListMixin from '../../mixins/apiListMixin';
import relationMixin from '../../mixins/relationMixin';
import awEmitMixin from '../../mixins/awEmitMixin';
import templatingMixin from '../../mixins/templatingMixin';

import AwesomeDisplay from '../crud/display/AwesomeDisplay.vue';
import AwesomeFilter from '../misc/AwesomeFilter.vue';
import AwesomeSegments from './parts/AwesomeSegments.vue';
import AutoRefreshButton from './parts/AutoRefreshButton.vue';
import ProgressBar from './parts/ProgressBar.vue';

export default {
  name: 'AwesomeList',
  components: {
    AutoRefreshButton,
    AwesomeDisplay,
    AwesomeFilter,
    AwesomeSegments,
    Paginate,
    popper: Popper,
    ProgressBar
  },
  mixins: [i18nMixin, apiErrors, apiListMixin, relationMixin, awEmitMixin, templatingMixin],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    perRow: {
      type: Number,
      default: 3
    },
    perPage: {
      type: Number,
      default: 6
    },
    useGridSystem: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    gridModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    listModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    imageField: {
      type: String,
      description: 'The field to use for the image'
    },
    titleField: {
      type: String,
      description: 'The field to use for the title'
    },
    subtitleField: {
      type: String,
      description: 'The field to use for the subtitle'
    },
    descriptionField: {
      type: String,
      description: 'The field to use for the description'
    },
    displayFields: {
      type: Array,
      description: 'The fields to display on the card'
    },
    translations: {
      type: Object,
      default: () => ({
        'AwesomeList.buttons.increase': 'More items per row',
        'AwesomeList.buttons.decrease': 'Less items per row',
        'AwesomeList.buttons.refresh': 'Refresh',
        'AwesomeList.buttons.itemAction': 'Open'
      })
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    imageClasses: {
      type: [Object, String],
      default: '',
      description: 'classes to put around the image'
    },
    itemClasses: {
      type: [Object, String],
      default: 'shadow',
      description: 'classes to put around the item'
    },
    imageStyles: {
      type: [Object, String],
      default: '',
      description: 'styles to put around the image'
    },
    actions: {
      type: Object,
      default: () => ({
        itemButton: true,
        refresh: true,
        changeItemsPerRow: true,
        pagination: true,
        reorder: false,
        sort: true
      })
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: '',
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        customBulkActions: []
      })
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note:
        'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    }
  },
  data() {
    return {
      itemsPerRow: 3,
      page: 0,
      data: [],
      advancedFilters: [],
      search: '',
      displayAwFilter: false,
      columnSortState: '',
      columnSortDirection: 'asc'
    };
  },
  computed: {
    titleComputed() {
      if (this.title === false) {
        return '';
      }
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

    _itemHeight() {
      const height = this.itemsPerRow === 1 ? this.listModeItemHeight : this.gridModeItemHeight;
      if (!height) {
        return 'auto';
      }
      return _.isString(height) ? height : height + 'px';
    },

    _pageCount() {
      const perPage = parseInt(this.serverParams.perPage) || this.perPage;
      return perPage && this.totalCount ? Math.ceil(this.totalCount / perPage) : 0;
    },

    itemWrapperClasses() {
      if (!this.useGridSystem) {
        return '';
      }
      switch (this.itemsPerRow) {
        case 0:
        case 1:
        default:
          return 'col-12';
        case 2:
          return 'col-6';
        case 3:
          return 'col-4';
        case 4:
          return 'col-3';
        case 5:
        case 6:
          return 'col-2';
        case 12:
          return 'col-1';
      }
    },

    _paginatedItems: {
      get() {
        const currentPage = this.serverParams && this.serverParams.page ? this.serverParams.page : 1;
        const perPage = parseInt(this.serverParams.perPage) || this.perPage;
        const startIndex = (currentPage - 1) * perPage;
        if (!this.data) {
          return [];
        }
        return this.mode === 'remote'
          ? this.data
          : this.localSearch(this.data, this.search).slice(startIndex, startIndex + perPage);
      },
      set(d) {
        if (!this.search) {
          this.data = d;
          this.onListReordered(d);
        }
      }
    },

    _useClassicLayout() {
      return this.imageField || this.titleField || this.subtitleField || this.descriptionField;
    },

    advancedFiltersCount() {
      return (this.advancedFilters && this.advancedFilters.length) || 0;
    },

    advancedFiltersFormated() {
      return AwesomeFilter.methods.parseFilter(this.advancedFilters, { dispatch: false });
    },

    _modelDisplayField() {
      if (this._model && this._model.displayField) {
        return this._model.displayField;
      }

      if (this.primaryKeyFieldCpt) {
        return this.primaryKeyFieldCpt;
      }
      return '';
    },

    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },
    _filterableColumns() {
      return this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled =
            (this.filterable === undefined || this.filterable) &&
            (col.filterOptions.filterable === undefined || col.filterOptions.filterable);
        }
        return col;
      });
    },

    _isDraggable() {
      return this.actions.reorder && !this.search;
    }
  },
  watch: {
    perRow: 'resetItemsPerRow',
    rows: 'refreshLocalData',
    search(newVal) {
      this.onSearch({ searchTerm: newVal });
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    if (this.perRow) {
      this.resetItemsPerRow();
    }
  },
  beforeDestroy() {},
  methods: {
    getAllowedFields(item) {
      let fields = {};
      Object.keys(item).forEach((key) => {
        this.columns.forEach((column) => {
          if (column.field === key) {
            fields = Object.assign(fields, _.pick(item, [key]));
          }
        });
      });
      return fields;
    },

    getField(key) {
      const field = _.filter(this.columns, ['field', key]);
      return field[0] ? field[0] : field;
    },
    getFieldType(key) {
      const field = _.filter(this.columns, ['field', key]);
      return field[0] ? field[0] : field;
    },
    resetItemsPerRow() {
      this.itemsPerRow = this.perRow;
    },

    increaseItemsPerRow(c) {
      this.itemsPerRow += c;
    },

    decreaseItemsPerRow(c) {
      this.itemsPerRow -= c;
    },

    setGridMode() {
      this.itemsPerRow = 3;
    },

    setListMode() {
      this.itemsPerRow = 1;
    },

    setMediumGridMode() {
      this.itemsPerRow = 2;
    },

    handleItemClick($event, item) {
      this.$emit('itemClicked', item);
    },

    handleItemButtonClick($event, item) {
      this.$emit('itemButtonClicked', item);
    },

    onPaginationChange(page) {
      this.serverParams.page = page;
      if (this.mode !== 'remote') {
        return;
      }
      this.getItems();
    },

    advancedFiltering(parsedFilters, filters) {
      this.updateParams({
        advancedFilters: _.cloneDeep(filters),
        parsedAdvancedFilters: _.cloneDeep(parsedFilters),
        page: 0
      });
      this.getItems({ useSkeleton: true });

      this.$awEmit('advanced-filter', parsedFilters, filters);
      this.$awEmit('filter', { filters: this.serverParams.filters, rawFilters: filters });
    },

    toggleFilter() {
      this.filterable = !this.filterable;

      // if filter are disabled then remove set values
      if (!this.filterable) {
        if (!this.serverParams) {
          this.serverParams = {};
        }
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems({ useSkeleton: true });
      }
    },

    localSearch(items, search) {
      let filteredList = items.filter((item) => {
        if (!this.search) {
          return true;
        }
        try {
          return JSON.stringify(Object.values(item)).match(new RegExp(this.search, 'i'));
        } catch (err) {
          console.warn('err', err);
        }
        return true;
      });

      if (!this.columnSortState) {
        return filteredList;
      }
      filteredList = _.sortBy(filteredList, this.columnSortState);

      if (this.columnSortDirection === 'asc') {
        return filteredList;
      }
      return filteredList.reverse();
    },

    onListReordered(items) {
      this.$emit('reorder', items);
    },

    toggleColumnSort(colName) {
      const sort = { [colName]: true };
      // if item already selected just change the direction
      if (this.columnSortState === colName) {
        this.columnSortDirection = this.columnSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.columnSortState = colName;
      }
      this.$refs.sortPopover.doClose();
      if (this.mode !== 'remote') {
        return;
      }
      sort[colName] = this.columnSortDirection;
      this.pushChangesToRouter({ query: { sort } }, true);
      this.updateParams({ sort });
      this.getItems({ useSkeleton: true });
    }
  }
};
</script>
<style lang="scss">
.aw-list {
  clear: both;
  .aw-list-component {
    .aw-list-item {
      .aw-list {
        &-item {
          &-title {
            color: var(--primary);
            font-weight: bold;
          }
        }
      }
    }

    .list-responsive {
      width: 100%;
      margin: 0;
    }

    .pagination {
      justify-content: center;
    }

    .aw-list-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;

      .draggable-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #ddd;
      }
      .card-body {
        min-height: 50px;
      }
    }

    .col-12 {
      .aw-list-item {
        .card-img-top {
          height: 100%;
          width: 30%;
        }

        .aw-list-item-action {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding-bottom: 10px;
          padding-right: 10px;
          text-align: right;

          button {
            color: #fff;
          }
        }
      }
    }

    .col-2,
    .col-3,
    .col-4,
    .col-6 {
      .aw-list-item {
        .card-img-top {
          height: 60%;
        }

        .aw-list-item-action {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding-top: 5px;
          padding-bottom: 5px;
          background-color: white;

          button {
            color: #fff;
          }
        }
      }
    }
  }
  .awesome-list {
    clear: both;
  }

  .aw-list-header {
    width: 100%;
    text-align: left;
  }

  .ajax-table-img {
    max-height: 50px;
  }

  .ajax-table-checkbox {
    height: 18px;
    width: 18px;
  }

  .text-avoid-overflow {
    max-width: 30vw;
  }

  .vgt-date-range {
    height: 32px;
    width: 100%;

    .form-control {
      padding: 6px 12px;
      height: 32px;
      font-size: 12px;
    }
  }

  .daterangepicker.dropdown-menu {
    visibility: visible;
    opacity: 1;
  }

  .ajax-table-header.card-header.colored-header {
    color: white;

    * {
      color: white;
    }
  }

  // font-awesome icons
  .font-awesome-pencil {
    color: #17a2b8;
  }

  .font-awesome {
    color: #6c757d;
  }
}
</style>
