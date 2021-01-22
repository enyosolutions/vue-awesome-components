<template>
  <div class="aw-list-card aw-list-component awesome-list">
    <div
        :class="
        'aw-list-header ' +
          (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')
      "
    >
      <h4 class>
        <slot name="aw-list-title">{{ _listTitle }}</slot>
        <div class="btn-group btn-group-sm float-right aw-list-buttons">
          <slot name="table-top-actions" class/>
          <div v-if="isRefreshing" style="text-align: center">
            <i
                class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"
                style="color:#888;margin-left:10px"
            />
          </div>
          <div class="btn-group" role="group">
            <button
                v-if="actions && actions.refresh"
                class="btn btn-simple"
                @click="getItems()"
            >
              <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')"/>
              {{ $t("AwesomeList.buttons.refresh") }}
            </button>

            <popper
                trigger="clickToOpen"
                :options="{
              placement: 'bottom',
              modifiers: { offset: { offset: '0,10px' } }
            }"
                ref="filterPopover"
                v-if="actions.filter && actions.advancedFiltering"
            >
              <button
                  slot="reference"
                  type="button"
                  class="btn btn-simple dropdown-toggle"
                  :class="{ 'btn-primary': advancedFiltersCount, 'btn-default': !advancedFiltersCount }"
              >
                <i class="fa fa-filter"/>
                {{ $t('AwesomeTable.buttons.filters') }}
                {{ advancedFiltersCount ? `(${advancedFiltersCount})` : '' }}
              </button>

              <div class="popper card mt-0" style="z-index: 1;">
                <awesome-filter
                    class="card-body"
                    edit-filters
                    id="advancedFilterComponentDisplay"
                    :fields="columns"
                    @update-filter="advancedFiltering"
                    :advanced-filters="advancedFilters"
                />
              </div>
            </popper>

            <template v-if="actions && actions.itemsPerRow">
              <button class="btn " @click="setListMode()"
                      :class="itemsPerRow === 1 ? 'btn-primary' : 'btn-light'"
              >
                <i :class="'fa fa-list'"/>

              </button>
              <button
                  class="btn"
                  :class="itemsPerRow === 2 ? 'btn-primary' : 'btn-light'"
                  @click="setMediumGridMode()">
                <i :class="'fa fa-th-large'"/>
              </button>

              <button
                  class="btn"
                  :class="itemsPerRow === 3 ? 'btn-primary' : 'btn-light'"
                  @click="setGridMode()">
                <i :class="'fa fa-th'"/>
              </button>
            </template>

            <div class="btn-group" role="group">
              <button
                  v-if="actions && (actions.export || actions.import)"
                  id="dropdownMenuButton"
                  class="btn btn-secondary btn-simple dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
              >
                <i class="fa fa-plus"/>
                {{ $t("AwesomeTable.more") }}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <slot name="table-top-more-actions"/>
                <button
                    v-if="actions && actions.export"
                    class="btn btn-success btn-simple btn-block"
                    @click="exportCallBack"
                >
                  <i class="fa fa-file-excel"/>
                  {{ $t("common.buttons.excel") }}
                </button>

                <button
                    class="btn btn-default btn-simple btn-block"
                    @click="exportCurrentArrayToExcel"
                >
                  <i class="fa fa-file-excel"/>
                  {{ $t("common.buttons.excel-currentpage") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </h4>
      <p class="card-category">
        <slot name="list-subtitle"/>
      </p>
    </div>
    <awesome-filter
        display-filters
        :fields="columns"
        @update-filter="advancedFiltering"
        :advanced-filters="advancedFilters"
    />
    <div class="list-responsive" :class="styles.listWrapperClasses" v-if="_paginatedItems">
      <div
          class="pointer d-flex"
          v-for="(item, index) in _paginatedItems"
          :key="index"
          :class="itemWrapperClasses"
          @click="handleItemClick($event, item)"
      >
        <slot name="list-item" :item="item" itemsPerRow:="itemsPerRow">
          <div
              class="card mb-3 aw-list-item flex-fill"
              :style="{'flex-direction': itemsPerRow < 2 ? 'row' : 'column',
             'height': _itemHeight
          }"
          >
            <img
                class="card-img-top"
                v-if="imageField"
                :src="item[imageField]"
                :alt="item[titleField]"
                :class="imageClasses"
                :style="imageStyles"
            />
            <div class="card-body">
              <h4 class="card-title aw-list-item-title" style="" v-if="item[titleField]">{{ item[titleField] }}</h4>
              <h6 class="card-title aw-list-item-subtitle" v-if="item[subtitleField]">{{ item[subtitleField] }}</h6>

              <h3 class="card-title aw-list-item-title" style=""
                  v-if="!_useClassicLayout && _modelDisplayField && item[_modelDisplayField]">
                {{ item[_modelDisplayField] }}</h3>

              <p class="card-text aw-list-item-description" v-if="item[descriptionField]">
                <AwesomeDisplay
                    v-bind="getField(descriptionField)"
                    :value="item[descriptionField]"
                >
                </AwesomeDisplay>
              </p>
              <template v-if="columns && columns.length && !_useClassicLayout">
                <div v-for="(itemData, key) in getAllowedFields(item)" :key="key">
                  <small class="aw-list-item-field-label text-info">{{ getField(key).label || key }}</small><br/>
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
                    :class="itemsPerRow > 1 ? 'btn-block': ''"
                >
                  {{ $t("AwesomeList.buttons.itemAction") }}
                </button>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
    <hr/>
    <nav class="text-center">
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
import AwesomeDisplay from '../crud/display/AwesomeDisplay';
import AwesomeFilter from '../misc/AwesomeFilter';


export default {
  name: 'AwesomeList',
  token: `

  `,
  components: {
    Paginate, AwesomeDisplay, AwesomeFilter,
    popper: Popper,
  },
  mixins: [i18nMixin, apiErrors, apiListMixin, relationMixin, awEmitMixin],
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
    gridModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    listModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    imageField: String,
    titleField: String,
    subtitleField: String,
    descriptionField: String,
    displayFields: Array,
    translations: {
      type: Object,
      default: () => ({
        'AwesomeList.buttons.increase': 'More items per row',
        'AwesomeList.buttons.decrease': 'Less items per row',
        'AwesomeList.buttons.refresh': 'Refresh',
        'AwesomeList.buttons.itemAction': 'Open',
      })
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    imageClasses: {
      type: [Object, String],
      default: ''
    },
    imageStyles: {
      type: [Object, String],
      default: ''
    },
    actions: {
      type: Object,
      default: () => ({
        itemButton: true,
        refresh: true,
        itemsPerRow: true
      })
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: '',
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        customBulkActions: [],
      })
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note:
          'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    },
  },
  data() {
    return {
      itemsPerRow: 3,
      page: 0,
      data: [],
      advancedFilters: [],
    };
  },
  computed: {

    _listTitle() {
      if (this.title) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this._model && this._model.singularName) {
        return this.$te(this._model.singularName)
            ? this.$t(this._model.singularName)
            : _.startCase(this._model.singularName);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
            ? this.$t(`app.labels.${this.identity}`)
            : _.startCase(this.identity);
      }
      return '';
    },

    _itemHeight() {
      const height =
          this.itemsPerRow === 1
              ? this.listModeItemHeight
              : this.gridModeItemHeight;
      if (!height) {
        return 'auto';
      }
      return _.isString(height) ? height : height + 'px';
    },

    _pageCount() {
      const perPage = parseInt(this.serverParams.perPage) || this.perPage;
      return perPage && this.totalCount
          ? Math.ceil(this.totalCount / perPage)
          : 0;
    },

    itemWrapperClasses() {
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
      }
    },

    _paginatedItems: {
      get() {
        const currentPage =
            this.serverParams && this.serverParams.page
                ? this.serverParams.page
                : 1;
        const perPage = parseInt(this.serverParams.perPage) || this.perPage
        const startIndex = (currentPage - 1) * perPage;
        if (!this.data) {
          return [];
        }
        return this.mode === 'remote'
            ? this.data
            : this.data.slice(startIndex, startIndex + perPage);
      },
      set(d) {
        //eslint-disable-next-line
        console.warn(d);
      }
    },

    _useClassicLayout() {
      return this.imageField ||
          this.titleField ||
          this.subtitleField ||
          this.descriptionField;
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

      if (this.primaryKey) {
        return this.primaryKey;
      }
      return '';
    },

    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },
  },
  watch: {
    'perRow': 'resetItemsPerRow',
    rows: 'refreshLocalData'
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    if (this.perRow) {
      this.resetItemsPerRow();
    }
    this.refreshLocalData();
  },
  beforeDestroy() {
  },
  methods: {
    getAllowedFields(item) {
      let fields = {};
      Object.keys(item).forEach(key => {
        this.columns.forEach(column => {
          if (column.field === key) {
            fields = Object.assign(fields, _.pick(item, [key]))
          }
        })
      })
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
      this.$refs['filterPopover'].doClose();
      this.updateParams({
        advancedFilters: _.cloneDeep(filters),
        parsedAdvancedFilters: _.cloneDeep(parsedFilters),
        page: 0
      });
      this.getItems({ useSkeleton: true });
    },

    toggleFilter() {
      this.filterable = !this.filterable;

      if (!this.filterable) {
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems({ useSkeleton: true });
      }
      this.columns = this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled = this.filterable;
        }
        return col;
      });
    },
  }
};
</script>
<style lang="scss">
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
  }

  .pagination {
    justify-content: center;
  }

  .aw-list-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;

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


</style>
