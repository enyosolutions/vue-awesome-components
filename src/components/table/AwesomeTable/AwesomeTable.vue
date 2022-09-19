<template>
  <div class="aw-table aw-listing">
    <div class="float-left col-6 pl-0">
      <slot name="table-header-left"> </slot>
      <div class="card aw-segment-table-wrapper" v-if="segmentFieldDefinitionComputed">
        <awesome-segments
          :apiRequestConfig="apiRequestConfig"
          :apiResponseConfig="apiResponseConfig"
          :field="segmentFieldDefinitionComputed"
          @change="onSegmentChange"
        />
      </div>
    </div>
    <div class="float-right text-right col-6 pr-0">
      <slot name="table-header-right"></slot>
    </div>
    <div class="card aw-table-card aw-table">
      <div
        class="card-header"
        v-if="showHeader"
        :class="
          'aw-table-header ' + (optionsComputed.headerStyle ? 'colored-header bg-' + optionsComputed.headerStyle : '')
        "
      >
        <ProgressBar v-if="isRefreshing" />
        <h3 class="card-title aw-table-title text-left">
          <slot name="table-title"
            ><template v-if="_tableTitle">
              {{ _tableTitle }} <label for="" class="badge badge-primary p-1">{{ totalCount }}</label>
            </template></slot
          >
          <auto-refresh-button
            v-if="_actions && _actions.refresh"
            v-model="isRefreshing"
            @refresh="getItems({ useSkeleton: true })"
            :auto-refresh="autoRefresh"
            :auto-refresh-interval="autoRefreshInterval"
          />
          <div class="aw-table-top-actions float-right m-0 p-0">
            <slot name="table-top-actions" />
            <popper
              trigger="clickToOpen"
              :options="{
                placement: 'top'
              }"
              ref="filterPopover"
              v-if="canHideColumns"
            >
              <button
                slot="reference"
                type="button"
                class="btn btn-sm btn-simple dropdown-toggle"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ $t('AwesomeTable.columns') }}
              </button>
              <div class="popper card mt-0" style="z-index: 1;">
                <button
                  v-for="(col, index) in formattedColumns"
                  :key="index"
                  class="dropdown-item col"
                  type="button"
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
            </popper>

            <button
              slot="reference"
              type="button"
              class="btn btn-sm btn-simple mt-0"
              :class="{ 'btn-primary': advancedFiltersCount || displayAwFilter, 'btn-default': !advancedFiltersCount }"
              aria-haspopup="true"
              aria-expanded="false"
              id="advancedFilterButton"
              @click="toggleAdvancedFilters"
              v-if="_actions.filter && _actions.advancedFiltering"
            >
              <i class="fa fa-filter" />
              {{ $t('AwesomeTable.buttons.filters') }}
              {{ advancedFiltersCount ? `(${advancedFiltersCount})` : '' }}
            </button>

            <popper
              trigger="clickToOpen"
              :options="{
                placement: 'bottom',
                modifiers: { offset: { offset: '0,10px' } }
              }"
              v-if="
                _actions &&
                  (_actions.export ||
                    _actions.exportLocal ||
                    _actions.import ||
                    _actions.columnsFilters ||
                    _actions.dropdownActions)
              "
            >
              <button
                slot="reference"
                type="button"
                class="btn btn-sm btn-simple dropdown-toggle"
                id="configurationButton"
              >
                <i class="fa fa-cog" />
                {{ $t('AwesomeTable.configuration') }}
              </button>

              <div class="popper card mt-0" style="z-index: 1;">
                <slot name="table-top-more-actions" />
                <button
                  v-if="_actions.columnsFilters"
                  type="button"
                  class="btn btn-sm btn-simple btn-main-style"
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
                  class="btn btn-sm btn-simple text-success btn-main-style btn-block"
                  @click="exportCallBack"
                >
                  <i class="fa fa-file-excel" />
                  {{ $t('AwesomeTable.buttons.excel') }}
                </button>

                <button
                  v-if="_actions && _actions.exportLocal"
                  type="button"
                  class="btn btn-sm btn-simple text-success btn-main-style btn-block"
                  @click="exportCurrentArrayToExcel"
                >
                  <i class="fa fa-file-excel" />
                  {{ $t('AwesomeTable.buttons.excel-currentpage') }}
                </button>
                <button
                  v-if="isSaveStateEnabledCpt"
                  type="button"
                  class="btn btn-sm btn-simple text-info btn-main-style btn-block"
                  @click="clearComponentState"
                >
                  <i class="fa fa-trash" />
                  {{ $t('AwesomeTable.buttons.clear-state') }}
                </button>
              </div>
            </popper>
          </div>
        </h3>
        <p class="card-category">
          <slot name="table-subtitle" />
        </p>
        <button
          v-if="collapsible"
          class="btn btn-sm btn-i"
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
          v-if="displayAwFilter"
          edit-filters
          id="advancedFilterComponentDisplay"
          :fields="columns"
          @update-filter="advancedFiltering"
          :advanced-filters="advancedFilters"
          class="p-0"
        />
        <awesome-filter
          display-filters
          id="advancedFilterComponent"
          v-if="advancedFilters.length"
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
              enabled: _actions ? _actions.pagination : true,
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
            <div slot="selected-row-actions" class="">
              <template v-if="customBulkActions">
                <AwesomeActionList
                  :actions="customBulkActions"
                  :items="selectedRows"
                  :columns="columns"
                  :parent="parent"
                  parentDisplayMode="table"
                  location="bulk"
                  @customAction="$emit('customAction', $event)"
                />
              </template>
              <button
                v-if="_actions.bulkDelete && _actions.delete"
                class="btn btn-sm btn-primary ml-2 mr-2"
                @click="$emit('bulkDelete', selectedRows)"
                type="button"
              >
                <i class="fa fa-trash" />
                {{ $t('AwesomeTable.bulk.delete') }}
              </button>
              <button
                v-if="_actions.bulkEdit && _actions.edit"
                class="btn btn-sm btn-primary"
                @click="$emit('bulkEdit', selectedRows)"
                type="button"
              >
                <i class="fa fa-pencil"></i>
                {{ $t('AwesomeTable.bulk.edit') }}
              </button>
            </div>
            <div slot="table-actions" v-if="customTableTopActions.length || _actions.dateFilter">
              <date-range-picker
                v-if="_actions.dateFilter"
                class="form-group vgt-date-range"
                :placeholder="$t('AwesomeTable.daterange.start')"
                :date-range="{
                  startDate: defaultStartDate,
                  endDate: defaultEndDate
                }"
                :locale-data="datePicker.locale"
                :opens="'left'"
                @update="onDateFilter"
              />
              <template v-if="customTableTopActions">
                <AwesomeActionList
                  class="ml-1"
                  :actions="customTableTopActions"
                  :columns="columns"
                  location="tabletop"
                  parentDisplayMode="table"
                  @customAction="$emit('customAction', $event)"
                  @permanent-filtering="permanentFiltering"
                />
                <button
                  v-if="!optionsComputed.autoSearch"
                  type="button"
                  class="btn btn-sm btn-primary btn-add-item "
                  @click="doRefresh"
                >
                  <i class="fa fa-search"></i>
                </button>
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
                  :value="getItemProperty(props.row, props.column.field)"
                  class="pointer text-avoid-overflow"
                >
                </awesome-display>

                <span v-else-if="props.column.field === '__ACTIONS'" class="text-right aw-table-actions-field">
                  <button
                    v-if="templateParseConditionalField(_actionsBeforeCalculation.view, { currentItem: props.row })"
                    class="btn btn-sm btn-simple btn-awtable-inline-action btn-icon mr-2"
                    @click="$emit('view', props.row)"
                    type="button"
                  >
                    <i class="fa fa-eye text-info" />
                  </button>
                  <button
                    v-if="templateParseConditionalField(_actionsBeforeCalculation.edit, { currentItem: props.row })"
                    class="btn btn-sm btn-simple btn-awtable-inline-action btn-icon mr-2"
                    @click="$emit('edit', props.row)"
                    type="button"
                  >
                    <i class="fa fa-pencil fa fa-pencil text-primary" />
                  </button>
                  <button
                    v-if="templateParseConditionalField(_actionsBeforeCalculation.delete, { currentItem: props.row })"
                    class="btn btn-sm btn-simple btn-awtable-inline-action btn-icon"
                    @click="$emit('delete', props.row)"
                    type="button"
                  >
                    <i class="fa fa-trash text-danger" />
                  </button>
                  <slot name="table-row-actions" :item="props.row">
                    <template v-if="customInlineActions">
                      <AwesomeActionList
                        :actions="customInlineActions"
                        :item="props.row"
                        :parent="parent"
                        location="inline"
                        parentDisplayMode="table"
                        @customAction="$emit('customAction', $event)"
                      />
                    </template>
                  </slot>
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
                <div class="text-center">
                  {{ $t('AwesomeTable.empty') }}
                  <br />
                  <i class="fa fa-file-o fa-4x"></i><br />
                  <a v-if="_actions.create" href="javascript:void(0)" @click.prevent="$emit('create')" class="">
                    {{ $t('AwesomeTable.createFirstItem') }} <i class="fa fa-plus text-primary"></i>
                  </a>
                </div>
              </slot>
            </div>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import { VueGoodTable } from 'vue-good-table';
import dayjs from 'dayjs';
const localeData = require('dayjs/plugin/localeData');
dayjs.extend(localeData);
import Popper from 'vue-popperjs';
import { Skeleton } from 'vue-loading-skeleton';

import advanceFilterMixin from '../../../mixins/advanceFilterMixin';
import apiErrors from '../../../mixins/apiErrorsMixin';
import apiListMixin from '../../../mixins/apiListMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import awEmitMixin from '../../../mixins/awEmitMixin';
import uuidMixin from '../../../mixins/uuidMixin';

import { defaultActions } from '../../../mixins/defaultProps';

import AwesomeDisplay from '../../crud/display/AwesomeDisplay.vue';
import AwesomeFilter from '../../misc/AwesomeFilter.vue';
import AwesomeActionList from '../../misc/AwesomeAction/AwesomeActionList.vue';
import AwesomeSegments from '../parts/AwesomeSegments.vue';
import AutoRefreshButton from '../parts/AutoRefreshButton.vue';
import ProgressBar from '../parts/ProgressBar.vue';

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
    AwesomeActionList,
    AwesomeDisplay,
    AwesomeFilter,
    AwesomeSegments,
    AutoRefreshButton,
    DateRangePicker,
    popper: Popper,
    ProgressBar,
    Skeleton,
    VueGoodTable
  },
  mixins: [uuidMixin, i18nMixin, apiErrors, apiListMixin, awEmitMixin, advanceFilterMixin],
  props: {
    columns: {
      type: Array,
      description: 'The columns to display in the table',
      default: () => []
    },
    columnsDisplayed: {
      type: Number,
      description: 'The number of columns to display by default',
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
        'AwesomeTable.empty': 'empty',
        'AwesomeTable.createFirstItem': 'Click here to create your first item'
      })
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
        filterInitiallyOn: false,
        autoSearch: true
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
      default: 'local',
      type: String,
      required: false,
      values: ['local', 'remote']
    },
    collapsible: {
      default: true,
      type: Boolean,
      description: 'Wether the table can be collapsed using the minus button at the topRight corner.'
    },
    showHeader: {
      type: Boolean,
      default: true
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
          format: 'yyyy-mm-dd', // fomart of the dates displayed
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
      clickTimeout: null,
      displayAwFilter: false
    };
  },
  computed: {
    optionsComputed() {
      return _.merge(this.defaultOptions, this.options);
    },

    _tableTitle() {
      if (this.title === false) {
        return '';
      }
      const title =
        this.title ||
        (this.$te && this.$te('app.labels.' + this.entity)
          ? this.$t('app.labels.' + this.entity)
          : _.startCase(this.entity));
      return (title || '').trim();
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
          col.format = 'D MMM YYYY <br/> HH:mm';
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
          filterDropdownItems = filterDropdownItems.map((e) => {
            if (typeof e === 'string') {
              if (e.includes('|')) {
                const splitted = e.split('|');
                return {
                  value: splitted[0],
                  text: splitted[1]
                };
              }
              return { value: e, text: _.startCase(e) };
            }
            if (typeof e === 'object') {
              return e;
            }
            return {
              value: e,
              text: _.startCase(e)
            };
          });
        }

        col.filterOptions = {
          enabled:
            col.filterable !== undefined ? col.filterable && this.canFilterByColumnsCpt : this.canFilterByColumnsCpt,
          filterDropdownItems
        };
        return col;
      });
      const isInitialLoad = Object.keys(this.columnsState).length < 1;
      if (isInitialLoad) {
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
        // if there are no columns displayed, show all
        if (!cols.length || (cols.length === 1 && this.columnsState.__ACTIONS)) {
          cols.push(...this.formattedColumns);
        }
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
    rows: 'refreshLocalData'
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
      Object.keys(this.apiQueryParams.filters)
        .filter((field) => this.apiQueryParams.filters[field])
        .forEach((field) => {
          tempFilters.push({ [field]: this.apiQueryParams.filters[field] });
        });
      this.advancedFilters = [];
      tempFilters.forEach((element) => {
        const filter = {};
        const [key, data] = Object.entries(element)[0];
        const [op, value] = typeof data === 'object' ? Object.entries(data)[0] : ['$eq', data];
        const field = this.columns.find((e) => e.field === key);
        if (field) {
          filter.field = field;
          const operator = AwesomeFilter.data().filters && AwesomeFilter.data().filters.find((e) => e.value === op);
          filter.value = value;
          if (operator) {
            filter.filter = operator;
            filter.value = value;
          }
          this.advancedFilters.push(filter);
        }
      });
    }
    // this.refreshLocalData();
  },
  beforeDestroy() {
    clearInterval(this.refreshHandle);
  },

  methods: {
    startCase: _.startCase,

    // permanentFiltering(parsedFilters, filters) {
    //   this.updateParams({
    //     parsedAdvancedFilters: _.cloneDeep(parsedFilters),
    //     page: 0,
    //     permanent: true
    //   });
    //   if (this.optionsComputed.autoSearch) {
    //     this.getItems({ useSkeleton: true });
    //   }
    //   this.$awEmit('permanent-filter', { filters: parsedFilters });
    //   this.$awEmit('filter', { filters: this.serverParams.filters });
    // },

    // advancedFiltering(parsedFilters, filters) {
    //   console.log('advancedFiltering', parsedFilters, filters);
    //   this.updateParams({
    //     advancedFilters: _.cloneDeep(filters),
    //     parsedAdvancedFilters: _.cloneDeep(parsedFilters),
    //     page: 0
    //   });
    //   if (this.optionsComputed.autoSearch) {
    //     this.getItems({ useSkeleton: true });
    //   }
    //   this.$awEmit('advanced-filter', parsedFilters, filters);
    //   this.$awEmit('filter', { filters: this.serverParams.filters, rawFilters: filters });
    // },

    doRefresh() {
      this.$awEmit('refresh', { filters: this.serverParams.filters });

      if (this.mode == 'remote') {
        this.getItems({ useSkeleton: true });
      }
    },

    toggleFilter() {
      this.columnsFilterState = !this.columnsFilterState;

      if (!this.columnsFilterState) {
        if (!this.serverParams) {
          this.serverParams = {};
        }
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
      this.saveComponentState();
    },

    toggleAdvancedFilters() {
      this.displayAwFilter = !this.displayAwFilter;
      if (this.displayAwFilter) {
        this.columnsFilterState = false;
        this.toggleFilter();
      } else {
        this.columnsFilterState = true;
        this.toggleFilter();
      }

      this.saveComponentState();
    },
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

    getItemProperty: _.get
  }
};
</script>
<style lang="scss">
.aw-table {
  clear: both;
  .aw-table-card {
    clear: both;
  }
  .aw-table-img {
    max-height: 50px;
  }

  .aw-display-image-img {
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

    .aw-table-top-actions {
      display: flex;
      flex-direction: row;
      > * {
        padding: 5px 10px;
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

  .aw-table-actions-field {
    white-space: nowrap;
  }
}
</style>
