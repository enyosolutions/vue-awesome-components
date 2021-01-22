<template>
  <div class="card aw-table-card aw-table">
    <div
      class="card-header"
      :class="
        'aw-table-header ' + (optionsComputed.headerStyle ? 'colored-header bg-' + optionsComputed.headerStyle : '')
      "
    >
      <div v-if="isRefreshing" style="text-align: center;">
        <div
          class="progress"
          style="height: 5px; border-radius: 0px; position: absolute; top: 0; left: 0; width: 100%;"
        >
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 5%;"
          ></div>
        </div>
      </div>
      <h3 class="card-title aw-table-header text-left">
        <slot name="table-title">
          {{ _tableTitle }}
        </slot>

        <div v-if="_actions && _actions.refresh" :class="'automatic-refresh-button ' + (autoRefresh ? ' active' : '')">
          <button
            v-if="_actions && _actions.refresh"
            type="button"
            class="btn btn-simple btn-alt-style btn-sm p-2"
            @click.prevent="getItems({ useSkeleton: true })"
          >
            <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
          </button>
          <span class="refresh-text">{{ $t('AwesomeTable.automatique-refresh') }}</span>
          <label class="switch">
            <input type="checkbox" v-model="autoRefreshInterface" />
            <span class="slider round"></span>
          </label>
        </div>
        <div class="btn-group btn-group-sm float-right mt-0">
          <slot name="table-top-actions" />
          <div v-if="canHideColumns" class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn btn-default btn-simple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ $t('AwesomeTable.columns') }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 100vh; overflow: auto;">
              <button
                v-for="(col, index) in formattedColumns"
                :key="index"
                type="button"
                class="dropdown-item"
                href="#"
                :class="{
                  'text-light bg-primary': columnsState[col.field],
                  'd-none': col.field === '__ACTIONS'
                }"
                @click="toggleColumn(col.field)"
              >
                {{ col.label }}
              </button>
            </div>
          </div>
          <popper
            trigger="clickToOpen"
            :options="{
              placement: 'bottom',
              modifiers: { offset: { offset: '0,10px' } }
            }"
            ref="filterPopover"
            v-if="_actions.filter && _actions.advancedFiltering"
          >
            <button
              slot="reference"
              type="button"
              class="btn btn-simple dropdown-toggle"
              :class="{ 'btn-primary': advancedFiltersCount, 'btn-default': !advancedFiltersCount }"
              aria-haspopup="true"
              aria-expanded="false"
              id="advancedFilterButton"
              @click="toggleAdvancedFilters"
            >
              <i class="fa fa-filter" />
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

          <div class="dropdown">
            <button
              v-if="
                _actions && (_actions.export || _actions.import || _actions.columnsFilters || _actions.dropdownActions)
              "
              id="dropdownMenuButton"
              class="btn dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-plus" />
              {{ $t('AwesomeTable.more') }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <slot name="table-top-more-actions" />
              <button
                v-if="_actions.columnsFilters"
                type="button"
                class="btn btn-simple"
                :class="{ 'btn-primary': columnsFilterState, 'btn-danger': !columnsFilterState }"
                @click="toggleFilter()"
              >
                <i class="fa fa-filter" />
                {{
                  !columnsFilterState
                    ? $t('AwesomeTable.buttons.columnsFilters.activate')
                    : $t('AwesomeTable.buttons.columnsFilters.deactivate')
                }}
              </button>
              <button
                v-if="_actions && _actions.export"
                type="button"
                class="btn btn-simple text-success btn-main-style btn-block"
                @click="exportCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeTable.buttons.excel') }}
              </button>

              <button
                v-if="_actions && _actions.export"
                type="button"
                class="btn btn-simple text-success btn-main-style btn-block"
                @click="exportCurrentArrayToExcel"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeTable.buttons.excel-currentpage') }}
              </button>
              <button
                v-if="isSaveStateEnabledCpt"
                type="button"
                class="btn btn-simple text-info btn-main-style btn-block"
                @click="clearComponentState"
              >
                <i class="fa fa-trash" />
                {{ $t('AwesomeTable.buttons.clear-state') }}
              </button>
            </div>
          </div>
        </div>
      </h3>
      <p class="card-category">
        <slot name="table-subtitle" />
      </p>
      <button
        v-if="collapsible"
        class="btn btn-i"
        data-toggle="collapse"
        :data-target="'#awTable-' + this._uid || this.uuid"
        style="position: absolute; top: 0; right: 0; padding: 0;"
      >
        <i class="fa fa-minus"></i>
      </button>
    </div>
    <div
      class="card-body aw-table-card-body collapse show"
      :class="collapsible ? 'collapse show' : ''"
      :id="'awTable-' + this._uid || this.uuid"
    >
      <awesome-filter
        display-filters
        id="advancedFilterComponent"
        v-if="_actions.filter && _actions.advancedFiltering"
        :fields="columns"
        @update-filter="advancedFiltering"
        :advanced-filters="advancedFilters"
      />
      <div class="table-responsive">
        <vue-good-table
          :ref="'table-' + entity"
          :mode="mode"
          :total-rows="totalCount"
          style-class="vgt-table table striped"
          :columns="displayedColumns"
          :fixed-header="optionsComputed && optionsComputed.fixedHeader"
          :max-height="optionsComputed.maxHeight"
          :rows="data || []"
          :filter-options="{
            enabled: _actions.filter
          }"
          :sort-options="{
            initialSortBy: initialSortBy
          }"
          :search-options="{
            enabled: _actions.search,
            placeholder: this.$t('AwesomeTable.searchInput')
          }"
          :pagination-options="{
            enabled: optionsComputed && optionsComputed.pagination,
            nextLabel: this.$t('AwesomeTable.next'),
            prevLabel: this.$t('AwesomeTable.prev'),
            rowsPerPageLabel: this.$t('AwesomeTable.rows_per_page'),
            ofLabel: this.$t('AwesomeTable.of'),
            pageLabel: this.$t('AwesomeTable.page'),
            allLabel: this.$t('AwesomeTable.all'),
            perPage: perPageComputed,
            setCurrentPage: parseInt(serverParams.page) || undefined
          }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'awesome-table-selection',
            selectionText: this.$t('AwesomeTable.bulk.row-select'),
            clearSelectionText: this.$t('AwesomeTable.bulk.clear'),
            disableSelectInfo: false,
            selectAllByGroup: true
          }"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-search="onSearch"
          @on-cell-click="clickOnLine"
          @on-selected-rows-change="onSelectionChanged"
        >
          <div slot="selected-row-actions">
            <template v-if="customBulkActions">
              <AwesomeActionList
                :actions="customBulkActions"
                :items="selectedRows"
                :columns="columns"
                :parent="parent"
                location="bulk"
                @customAction="$emit('customAction', $event)"
              />
            </template>
            <button
              v-if="_actions.bulkDelete && _actions.delete"
              class="btn btn-primary btn-simple"
              @click="$emit('bulkDelete', selectedRows)"
              type="button"
            >
              <i class="fa fa-trash" />
              {{ $t('AwesomeTable.bulk.delete') }}
            </button>
            <button
              v-if="_actions.bulkEdit && _actions.edit"
              class="btn btn-primary btn-simple"
              @click="$emit('bulkEdit', selectedRows)"
              type="button"
            >
              <i class="fa fa-pencil"></i>
              {{ $t('AwesomeTable.bulk.edit') }}
            </button>
          </div>
          <div slot="table-actions">
            <date-range-picker
              v-if="_actions.filter && _actions.dateFilter && canFilterByColumnsCpt"
              class="form-group vgt-date-range"
              :placeholder="$t('AwesomeTable.daterange.start')"
              :start-date="defaultStartDate"
              :end-date="defaultEndDate"
              :locale-data="datePicker.locale"
              :opens="'left'"
              @update="onDateFilter"
            />
            <template v-if="customTableTopActions">
              <AwesomeActionList
                :actions="customTableTopActions"
                :columns="columns"
                location="tabletop"
                @customAction="$emit('customAction', $event)"
                @permanent-filtering="permanentFiltering"
              />
            </template>
          </div>
          <template slot="table-row" slot-scope="props">
            <Skeleton v-if="showSkeleton" :count="1" :loading="true"></Skeleton>
            <template v-else>
              <awesome-display
                v-if="props.column.field !== '__ACTIONS'"
                v-bind="props.column"
                :apiResponseConfig="apiResponseConfig"
                :apiRequestHeaders="apiRequestHeaders"
                :value="props.formattedRow[props.column.field]"
                :display-label-cache="displayLabelCache"
                class="pointer text-avoid-overflow"
              >
              </awesome-display>

              <span v-else-if="props.column.field === '__ACTIONS'" class="text-right aw-table-actions-field">
                <slot name="table-row-actions" :item="props.row">
                  <template v-if="customInlineActions">
                    <AwesomeActionList
                      :actions="customInlineActions"
                      :item="props.row"
                      :parent="parent"
                      location="inline"
                      @customAction="$emit('customAction', $event)"
                    />
                  </template>
                </slot>
                <button
                  v-if="templateParseConditionalField(_actionsBeforeCalculation.view, { currentItem: props.row })"
                  class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                  @click="$emit('view', props.row)"
                  type="button"
                >
                  <i class="fa fa-eye text-info" />
                </button>
                <button
                  v-if="templateParseConditionalField(_actionsBeforeCalculation.edit, { currentItem: props.row })"
                  class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                  @click="$emit('edit', props.row)"
                  type="button"
                >
                  <i class="fa fa-pencil fa fa-pencil text-primary" />
                </button>
                <button
                  v-if="templateParseConditionalField(_actionsBeforeCalculation.delete, { currentItem: props.row })"
                  class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                  @click="$emit('delete', props.row)"
                  type="button"
                >
                  <i class="fa fa-trash text-danger" />
                </button>
              </span>
              <span
                v-else-if="props.column.type === 'list-of-value' || props.column.type === 'lov'"
                class="pointer"
                @click="clickOnLine(props)"
                >{{ getLovValue(props.formattedRow[props.column.field], props.column.listName) }}</span
              >
              <span v-else-if="props.column.type === 'list-of-data'" class="pointer" @click="clickOnLine(props)">{{
                getDataValue(props.formattedRow[props.column.field], props.column.listName)
              }}</span>
            </template>
          </template>
          <div slot="emptystate">
            <slot name="table-empty-state">
              {{ $t('AwesomeTable.empty') }}
              <a v-if="_actions.create" href="#" @click.prevent="$emit('create')">
                Click here to create your first item
              </a></slot
            >
          </div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import { VueGoodTable } from 'vue-good-table';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);
import Popper from 'vue-popperjs';
import { Skeleton } from 'vue-loading-skeleton';

import apiErrors from '../../mixins/apiErrorsMixin';
import apiListMixin from '../../mixins/apiListMixin';
import i18nMixin from '../../mixins/i18nMixin';
import awEmitMixin from '../../mixins/awEmitMixin';
import uuidMixin from '../../mixins/uuidMixin';

import { defaultActions } from '../../mixins/defaultProps';

import _ from 'lodash';
import AwesomeDisplay from '../crud/display/AwesomeDisplay';
import AwesomeFilter from '../misc/AwesomeFilter';
import AwesomeActionList from '../misc/AwesomeAction/AwesomeActionList';

export default {
  name: 'AwesomeTable',
  token: `
  <AwesomeTable  :title="title" :columns="tableColumns" :rows="dataSource" :needsRefresh="needsRefresh" :options="tableOptions">
  <template slot="table-actions"></template>
  <template slot="table-top-actions"></template>
  <template slot="table-top-more-actions"></template>
  <template slot="table-subtitle"></template>
  <template slot="table-row-actions"></template>

  </AwesomeTable>
  `,
  components: {
    AwesomeDisplay,
    DateRangePicker,
    VueGoodTable,
    AwesomeFilter,
    popper: Popper,
    Skeleton,
    AwesomeActionList
  },
  mixins: [uuidMixin, i18nMixin, apiErrors, apiListMixin, awEmitMixin],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnsDisplayed: {
      type: Number,
      default: 10
    },
    parent: {
      type: Object,
      default: () => {},
      note: 'In case of nested, pass parent to retrieve it in custom bulk actions'
    },
    rows: { type: Array, default: () => [] },
    url: { type: String, default: '' },
    entity: {
      type: String,
      default: '',
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    title: { type: String, default: '' },
    name: { type: String, default: '' },
    namePlural: { type: String, default: '' },

    translations: {
      type: Object,
      default: () => ({
        'AwesomeTable.buttons.filters': 'Filter',
        'AwesomeTable.buttons.refresh': 'Refresh',
        'AwesomeTable.buttons.excel-currentpage': 'Export current page',
        'AwesomeTable.searchInput': 'AwesomeTable.searchInput',
        'AwesomeTable.next': 'Next',
        'AwesomeTable.prev': 'Previous',
        'AwesomeTable.rows_per_page': 'Rows per page',
        'AwesomeTable.of': 'of',
        'AwesomeTable.page': 'page',
        'AwesomeTable.all': 'all',
        'AwesomeTable.empty': 'empty'
      })
    },
    autoRefresh: { type: Boolean, default: false, description: 'Should we auto refresh the page ?' },
    autoRefreshInterval: {
      type: Number,
      default: 20,
      description: 'Interval in seconds that should be used to refresh the page'
    },
    refresh: { type: Function, default: undefined },
    delete: { type: Function, default: undefined },
    create: { type: Function, default: undefined },
    exportUrl: { type: String, default: undefined },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [String, Number],
      default: 20
    },
    limit: {
      type: [String, Number],
      default: 1000
    },
    options: {
      type: Object,
      default: () => ({})
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: '',
        pagination: true,
        filterInitiallyOn: false
      })
    },
    actions: {
      type: Object,
      default: () => defaultActions,
      note: 'actions active in this instance'
    },
    customInlineActions: {
      type: Array,
      default: () => [],
      note: 'custom inline action in row'
    },
    customTableTopActions: {
      type: Array,
      default: () => [],
      note: 'custom table top actions'
    },
    customBulkActions: {
      type: Array,
      default: () => [],
      note: 'custom bulk action'
    },
    mode: {
      default: '',
      type: String,
      required: true,
      values: ['local', 'remote']
    },
    collapsible: {
      default: true,
      type: Boolean,
      description: 'Wether the table can be collapsed using the minus button at the topRight corner.'
    }
  },
  data() {
    return {
      totalCount: 0,
      columnsFilterState: null,
      isRefreshing: false,
      columnsState: {},
      defaultStartDate: dayjs()
        .subtract(7, 'days')
        .format('YYYY-MM-DD'),
      defaultEndDate: dayjs().format('YYYY-MM-DD'),
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},

        page: 0, // what page I want to show
        perPage: this.mode === 'local' ? this.limit : this.perPage // how many items I'm showing per page
      },
      data: [],
      refreshHandle: null,
      numberOfRefreshCalls: 0,
      datePicker: {
        locale: {
          direction: 'ltr', // direction of text
          format: 'DD-MM-YYYY', // fomart of the dates displayed
          separator: ' - ', // separator between the two ranges
          applyLabel: 'Appliquer',
          cancelLabel: 'Annuler',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: dayjs.weekdaysMin(),
          monthNames: dayjs.monthsShort(),
          firstDay: 1
        }
      },
      selectedRows: [],
      displayLabelCache: {},
      clickTimeout: null
    };
  },
  computed: {
    autoRefreshInterface: {
      get() {
        return this.autoRefresh;
      },
      set(val) {
        this.$emit('updateAutoRefresh', val);
      }
    },

    optionsComputed() {
      return _.merge(this.defaultOptions, this.options);
    },

    _tableTitle() {
      return (
        this.title ||
        (this.$te && this.$te('app.labels.' + this.entity)
          ? this.$t('app.labels.' + this.entity)
          : _.startCase(this.entity))
      );
    },

    formattedColumns() {
      if (!this.columns) {
        // eslint-disable-next-line
        console.error('AwesomeTable MISSING COLUMNS');
      }
      const newcolumns = this.columns.map((col) => {
        const newCol = {};

        if (_.isString(col)) {
          newCol.field = col;
          newCol.label = _.startCase(col);
          newCol.filterOptions = { enabled: this.canFilterByColumnsCpt };
          newCol.sortable = true;
          return newCol;
        }
        if (!col.label) {
          col.label = _.startCase(col.field);
        }

        if (col.type && col.type === 'datetime') {
          col.format = 'D MMM YYYY <br/> hh:mm';
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return value;
          };
        }

        if (col.type && col.type === 'date') {
          col.format = 'DD-MM-YYYY';
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return value;
          };
        }

        if (col.type && col.type === 'object') {
          // eslint-disable-next-line
          col.sortFn = (x, y, col, rowX, rowY) => {
            // x - row1 value for column
            // y - row2 value for column
            // col - column being sorted
            // rowX - row object for row1
            // rowY - row object for row2
            const x1 = JSON.stringify(x);
            const y1 = JSON.stringify(y);
            return x1 < y1 ? -1 : x1 > y1 ? 1 : 0;
          };
        }

        if (col.type && col.type === 'relation') {
          // eslint-disable-next-line
          col.sortFn = (x, y, col, rowX, rowY) => {
            // x - row1 value for column
            // y - row2 value for column
            // col - column being sorted
            // rowX - row object for row1
            // rowY - row object for row2
            // const x1 = x.toString();
            // const y1 = y.toString();
            return x < y ? -1 : x > y ? 1 : 0;
          };
        }

        if (col.type && col.type === 'checkbox') {
          col.sortable = false;
        }

        let filterDropdownItems = col.filterOptions && col.filterOptions.filterDropdownItems;
        if (col.type && (col.type === 'list-of-value' || col.type === 'lov')) {
          filterDropdownItems = this.$store.state.listOfValues[col.listName];
          if (filterDropdownItems) {
            filterDropdownItems = filterDropdownItems.map((e) => ({
              value: e.code,
              text: e.label || e.code || e
            }));
          }
        }

        if (col.type && col.type === 'list-of-data') {
          filterDropdownItems = this.$store.state.data[col.listName];
          filterDropdownItems = filterDropdownItems.map((e) => ({
            value: e.code,
            text: e.label || e.code || e
          }));
        }

        if (col.enum) {
          filterDropdownItems = col.enum;
          filterDropdownItems = filterDropdownItems.map((e) => ({
            value: e,
            text: _.startCase(e)
          }));
        }

        col.filterOptions = {
          enabled:
            col.filterable !== undefined ? col.filterable && this.canFilterByColumnsCpt : this.canFilterByColumnsCpt,
          filterDropdownItems
        };
        return col;
      });
      const isInitialLoad = Object.keys(this.columnsState).length < 1;
      if (isInitialLoad && newcolumns.length > this.columnsDisplayed) {
        newcolumns.forEach((col, idx) => {
          this.$set(this.columnsState, col.field, idx < this.columnsDisplayed);
        });
      }
      if (!newcolumns.find((col) => col.field === '__ACTIONS') && !this._actions.noActions) {
        newcolumns.push({
          field: '__ACTIONS',
          label: 'Actions',
          filterOptions: { enabled: false }
        });
        // eslint-disable-next-line
        this.columnsState.__ACTIONS = true;
      }
      return newcolumns;
    },

    canHideColumns() {
      return this.formattedColumns.length > this.columnsDisplayed;
    },
    displayedColumns() {
      this.columnsState;
      if (this.canHideColumns) {
        const cols = this.formattedColumns.filter((col) => this.columnsState[col.field]);

        if (!this.columnsState.__ACTIONS) {
          const actions = this.formattedColumns.find((col) => col.field === '__ACTIONS');
          if (actions) {
            cols.push(actions);
          }
        }
        return cols;
      }
      return this.formattedColumns;
    },

    initialSortBy() {
      if (this.serverParams.sort) {
        const entries = Object.entries(this.serverParams.sort);
        if (entries.length) {
          const [[field, direction]] = entries;
          return { field, type: direction };
        }
        return undefined;
      }
      return undefined;
    },

    advancedFiltersCount() {
      return (this.advancedFilters && this.advancedFilters.length) || 0;
    },

    advancedFiltersFormated() {
      return AwesomeFilter.methods.parseFilter(this.advancedFilters, { dispatch: false });
    },

    perPageComputed() {
      return this.mode === 'remote' ? parseInt(this.serverParams.perPage) : this.perPage;
    },

    canFilterByColumnsCpt() {
      return (
        this._actions.columnsFilters &&
        this.options &&
        (this.columnsFilterState !== null ? this.columnsFilterState : this.options.filterInitiallyOn)
      );
    }
  },
  watch: {
    // needsRefresh: "refreshLocalData",
    /**
     * @deprecated
     */
    params() {
      // this.serverParams = _.merge({}, this.serverParams, this.params);
      // this.getItems({ source: "awTable_params()" });
    },
    entity: 'entityChanged',
    // store: changed => {},
    rows: 'refreshLocalData',
    autoRefresh(value) {
      if (value) {
        this.activateAutoRefresh();
      } else {
        clearInterval(this.refreshHandle);
      }
    }
  },
  created() {
    if (!this.$t) {
      this.$t = (str) => {
        /*
        if (!window.trans) {
          window.trans = {}
        }
        window.trans[str]= str;
        */

        return this.translations[str] || str;
      };
      this.$te = (str) => !!this.translations[str];
    }
  },
  beforeMount() {
    const userLang = window.navigator ? navigator.language || navigator.userLanguage : 'en';
    dayjs().locale(userLang);
  },
  mounted() {
    if (this.refresh || this.store) {
      return;
    }
    if (this.apiQueryParams && this.apiQueryParams.filters && Object.keys(this.apiQueryParams.filters).length > 0) {
      const tempFilters = [];
      Object.keys(this.apiQueryParams.filters).forEach((field) => {
        tempFilters.push({ [field]: this.apiQueryParams.filters[field] });
      });
      this.advancedFilters = tempFilters.map((element) => {
        const filter = {};
        const [key, data] = Object.entries(element)[0];
        const [op, value] = typeof data === 'object' ? Object.entries(data)[0] : ['$eq', data];
        const field = this.columns.find((e) => e.field === key);
        if (field) {
          filter.field = field;
          const operator = AwesomeFilter.data().filters.find((e) => e.value === op);
          if (operator) {
            filter.filter = operator;
            filter.value = value;
          }
        }
        return filter;
      });
    }
    // this.refreshLocalData();
    if (this.autoRefresh) {
      this.activateAutoRefresh();
    }
  },
  beforeDestroy() {
    clearInterval(this.refreshHandle);
  },

  methods: {
    startCase: _.startCase,

    activateAutoRefresh() {
      this.numberOfRefreshCalls = 0;
      this.refreshHandle = setInterval(() => {
        if (this.numberOfRefreshCalls > 300) {
          this.$awNotify({
            title: 'too much calls, aborting tracking',
            type: 'warning'
          });
          clearInterval(this.refreshHandle);
          this.refreshHandle = null;
          return;
        }
        if (!document.hasFocus()) {
          return;
        }

        this.numberOfRefreshCalls += 1;
        this.getItems({ source: 'awTable_refreshHandle' });
      }, this.autoRefreshInterval * 1000);
    },

    permanentFiltering(parsedFilters) {
      this.updateParams({
        parsedAdvancedFilters: _.cloneDeep(parsedFilters),
        page: 0,
        permanent: true
      });
      this.getItems({ useSkeleton: true });
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
      this.columnsFilterState = !this.columnsFilterState;

      if (!this.columnsFilterState) {
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems({ useSkeleton: true });
      }
      this.columns = this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled = this.columnsFilterState;
        }
        return col;
      });
    },

    toggleAdvancedFilters() {},
    // editItem(item) {},

    clickOnLine(props, props2) {
      this.$nextTick(() => {
        if (!this.clickTimeout) {
          this.clickTimeout = setTimeout(() => {
            this.$emit('onRowClicked', props, props2);
            this.clickTimeout = null;
          }, 300);
          return;
        }
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
        this.$emit('onRowDoubleClicked', props, props2);
      });
    },

    getLovValue(item, listName) {
      if (!item || !this.$store.state.listOfValues[listName]) {
        return item;
      }
      const value = this.$store.state.listOfValues[listName].find(
        (elm) => elm[this.primaryKey] === item || elm.code === item
      );
      if (!value) {
        return item;
      }

      return value.label || value.code || value;
    },

    getDataValue(item, listName) {
      if (!item || !this.$store.state.data[listName]) {
        return item;
      }
      const value = this.$store.state.data[listName].find((elm) => elm[this.primaryKey] === item || elm.code === item);
      if (!value) {
        return item;
      }

      return value.label || value.title || value.name || value.code || value;
    },

    toggleColumn(colName) {
      this.$set(this.columnsState, colName, !this.columnsState[colName]);
      this.pushChangesToRouter();
    },

    onColumnFilter(params) {
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({
        ...params,
        page: 0
      });
      this.getItems({ useSkeleton: true });
    },

    onSortChange(params) {
      // second param is a deprecated one
      const fieldIndex = params[0].field || params[0].columnIndex;
      const field = this.columns.find((c) => c.field === fieldIndex);
      // eslint-disable-next-line
      if (!field) {
        return;
      }
      const sort = {};

      // second param is a deprecated one
      sort[field.field] = params[0].type || params[0].sortType;
      if (this.useRouterMode) {
        // @todo add change pushed change
        // this.$router.push({ query: { ...this.$route.query, sort } });
      }
      // eslint-disable-next-line
      if (this.mode !== 'remote') {
        return;
      }
      this.pushChangesToRouter({ query: { sort } });
      this.updateParams({ sort });
      this.getItems({ useSkeleton: true });
    },

    onDateFilter(value) {
      if (!value) {
        return;
      }
      this.serverParams.range.startDate = value.startDate.toISOString().slice(0, 10);
      this.serverParams.range.endDate = value.endDate.toISOString().slice(0, 10);
      this.getItems({ useSkeleton: true });
    },

    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined';
    },

    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    exportCallBack() {
      if (!this.exportUrl) {
        this.$awNotify({ title: '[WARN] missing export url', type: 'warning' });
        return;
      }
      this.$http
        .get(this.exportUrl, {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement('a');
            link.download = `${this.entity || ''}_export`;
            link.href = res.data.url;
            link.click();
            link.remove();
          }
        })
        .catch(this.apiErrorCallback);
    }
  }
};
</script>
<style lang="scss">
.aw-table-img {
  max-height: 50px;
}

.aw-table .aw-display-image-img {
  max-height: 200px;
}

.aw-table-checkbox {
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

.aw-table-header {
  padding-bottom: 0;
  &.card-header.colored-header {
    color: white;
    * {
      color: white;
    }
    .dropdown-menu {
      a {
        color: #000;
      }
      button {
        color: #000;
        i {
          color: #000;
        }
      }
    }
    .awesome-filter {
      * {
        color: #495057;
      }
    }
  }
}

// font-awesome icons
.font-awesome-pencil {
  color: #17a2b8;
}

.font-awesome {
  color: #6c757d;
}

.awesome-table-selection {
  background-color: transparent !important;
  border: none !important;
  color: black !important;
  font-size: 0.8rem !important;
}

.aw-table {
  .vgt-global-search {
    .vgt-global-search__input {
      margin-bottom: 5px;
      padding-left: 0;
      .input__icon .magnifying-glass {
        display: none;
      }
    }

    flex-direction: column;
    .vgt-global-search__actions {
      margin-left: 0;
    }

    @media (min-width: 720px) {
      .vgt-global-search__input {
        min-width: 350px;
        align-self: flex-end;
        padding-left: 0;
        margin-bottom: 5px;

        .input__icon .magnifying-glass {
          display: none;
        }
      }

      .vgt-global-search__actions {
        min-width: 350px;
        align-self: flex-end;
        padding-left: 0;
        margin-bottom: 5px;
      }
    }
  }
}

.aw-table-actions-field {
  white-space: nowrap;
}

.automatic-refresh-button {
  display: inline-flex;
  margin-top: -5px;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  transition: 0.3s ease-in-out;
  vertical-align: bottom;
  button {
    margin: 0;
    margin-right: 10px;
  }
  i {
    margin-right: 5px;
    font-size: 14px;
    color: #bfc3ca !important;
  }
  span {
    font-size: 12px;
    color: #bfc3ca !important;
    max-width: 0px;
    overflow: hidden;
    transition: max-width ease-in-out 300ms 300ms;
    text-overflow: hidden;
    white-space: nowrap;
    display: inline;
  }
  &:hover span {
    display: initial;
    max-width: 100%;
  }
  &.active {
    i,
    span {
      color: #6d6d6d !important;
      color: var(--primary) !important;
    }
  }
}

.switch {
  margin-left: 10px;
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin-bottom: 0 !important;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dde2e8;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: #a4aab5;
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  //box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
  background-color: white;
}
</style>
