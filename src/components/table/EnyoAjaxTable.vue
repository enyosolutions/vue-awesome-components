<template>
  <div class="card ajax-table-card">
    <div
      class="card-header"
      :class="'ajax-table-header ' + (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')"
    >
      <div v-if="isRefreshing" style="text-align: center">
        <div
          class="progress"
          style="
    height: 5px;
    border-radius: 0px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%
"
        >
          <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 5%"
          ></div>
        </div>
      </div>
      <h4 class="card-title ajax-table-header">
        <slot name="table-title">
          {{ _tableTitle }}
        </slot>
        <div class="btn-group btn-group-sm float-right">
          <slot name="table-top-actions" />
          <div v-if="canHideColumns" class="dropdown">
            <button
              id="dropdownMenuButton"
              class="btn btn-secondary btn-simple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Columns
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height:100vh; overflow: auto;">
              <button
                v-for="(col, index) in formattedColumns"
                :key="index"
                type="button"
                class="dropdown-item"
                href="#"
                :class="{
                  'text-light bg-primary': columnsState[col.field],
                  'bg-info': col.field === 'ACTIONS'
                }"
                :disabled="col.field === 'ACTIONS'"
                @click="toggleColumn(col.field)"
              >
                {{ col.label }}
              </button>
            </div>
          </div>

          <button
            v-if="opts.actions.filter"
            type="button"
            class="btn btn-simple"
            :class="{ 'btn-primary': filterable, 'btn-default': !filterable }"
            @click="toggleFilter()"
          >
            <i class="fa fa-filter" />
            {{ $t('common.buttons.filters') }}
          </button>
          <div class="dropdown">
            <button
              v-if="opts.actions && opts.actions.refresh"
              class="btn btn-simple"
              @click="getItems()"
              type="button"
            >
              <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t('common.buttons.refresh') }}
            </button>
            <button
              v-if="opts.actions && (opts.actions.export || opts.actions.import)"
              id="dropdownMenuButton"
              class="btn btn-secondary btn-simple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-plus" />
              {{ $t('EnyoAjaxTable.more') }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <slot name="table-top-more-actions" />
              <button
                v-if="opts.actions && opts.actions.export"
                class="btn btn-success btn-simple btn-block"
                @click="exportCallBack"
                type="button"
              >
                <i class="fa fa-file-excel" />
                {{ $t('common.buttons.excel') }}
              </button>

              <button class="btn btn-default btn-simple btn-block" @click="exportCurrentArrayToExcel" type="button">
                <i class="fa fa-file-excel" />
                {{ $t('common.buttons.excel-currentpage') }}
              </button>
            </div>
          </div>
        </div>
      </h4>
      <p class="card-category">
        <slot name="table-subtitle" />
      </p>
    </div>

    <div class="card-body ajax-table-card-body">
      <div class="table-responsive">
        <vue-good-table
          :mode="mode"
          :totalRows="totalCount"
          :totalRecords="totalCount"
          style-class="vgt-table table striped"
          :columns="displayedColumns"
          :fixed-header="opts && opts.fixedHeader"
          :max-height="opts.maxHeight"
          :rows="data || []"
          :filter-options="{
            enabled: opts && opts.actions && opts.actions.filter
          }"
          :search-options="{
            enabled: opts && opts.actions && opts.actions.search,
            placeholder: this.$t('EnyoAjaxTable.searchInput')
          }"
          :pagination-options="{
            enabled: opts && opts.pagination,
            nextLabel: this.$t('EnyoAjaxTable.next'),
            prevLabel: this.$t('EnyoAjaxTable.prev'),
            rowsPerPageLabel: this.$t('EnyoAjaxTable.rows_per_page'),
            ofLabel: this.$t('EnyoAjaxTable.of'),
            pageLabel: this.$t('EnyoAjaxTable.page'),
            allLabel: this.$t('EnyoAjaxTable.all'),
            perPage: perPage,
            mode: 'pages'
          }"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-search="onSearch"
        >
          <div slot="table-actions">
            <template v-if="opts && opts.customTableTopActions">
              <template v-for="(action, index) in opts.customTableTopActions">
                <button
                  v-if="!action.canDisplay || action.canDisplay({ item: props.row }, this)"
                  :key="index"
                  class="btn btn-xs btn-simple"
                  :class="action.class"
                  type="button"
                  :data-title="action.title || action.label"
                  :tooltip="action.title || action.label"
                  :data-tooltip="action.title || action.label"
                  @click="$emit('customAction', { action, location: 'tabletop' })"
                >
                  <i v-if="action.icon" :class="action.icon" /><span
                    v-html="action.label ? $t(action.label) : ''"
                  ></span>
                </button>
              </template>
            </template>

            <date-range-picker
              v-if="opts.actions && opts.actions.filter && opts.actions.dateFilter && filterable"
              class="form-group vgt-date-range"
              :placeholder="$t('common.field.start')"
              :start-date="defaultStartDate"
              :end-date="defaultEndDate"
              :locale-data="datePicker.locale"
              :opens="'left'"
              @update="onDateFilter"
            />
          </div>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field === 'ACTIONS'" class="text-right">
              <slot name="table-row-actions" :item="props.row">
                <template v-if="opts && opts.customInlineActions">
                  <template v-for="(action, index) in opts.customInlineActions">
                    <button
                      v-if="!action.canDisplay || action.canDisplay({ item: props.row }, this)"
                      :key="index"
                      type="button"
                      class="btn btn-xs btn-simple"
                      :class="action.class"
                      :id="action.name + '-' + props.index"
                      :data-title="action.title || action.label"
                      :data-tooltip="action.title || action.label"
                      @click="
                        $emit('customAction', {
                          action,
                          item: props.row,
                          location: 'inline',
                          props,
                          id: action.name + '-' + props.index
                        })
                      "
                    >
                      <i v-if="action.icon" :class="action.icon" /><span
                        v-html="action.label ? $t(action.label) : ''"
                      ></span>
                    </button>
                  </template>
                </template>
              </slot>
              <button
                v-if="opts && opts.actions && opts.actions.view"
                class="btn btn-xs btn-simple btn-icon"
                @click="$emit('view', props.row)"
                type="button"
              >
                <i class="fa fa-eye text-info" />
              </button>
              <button
                v-if="opts && opts.actions && opts.actions.edit"
                class="btn btn-xs btn-simple btn-icon"
                @click="$emit('edit', props.row)"
                type="button"
              >
                <i class="fa fa-pencil fa fa-pencil" />
              </button>
              <button
                v-if="opts && opts.actions && opts.actions.delete"
                class="btn btn-xs btn-simple btn-icon"
                @click="deleteItem(props.row)"
                type="button"
              >
                <i class="fa fa-trash text-danger" />
              </button>
            </span>
            <span v-else-if="props.column.type === 'image'" class="pointer" @click="clickOnLine(props.row)">
              <img :src="props.formattedRow[props.column.field]" alt="image" class="ajax-table-img" />
            </span>
            <div
              v-else-if="props.column.type === 'boolean'"
              class="text-avoid-overflow"
              :data-value="props.formattedRow[props.column.field]"
            >
              <i
                class="fa"
                :class="{
                  'fa-check text-success': props.formattedRow[props.column.field],
                  'fa-times text-danger':
                    !props.formattedRow[props.column.field] && props.formattedRow[props.column.field] !== undefined
                }"
              ></i>
            </div>
            <div v-else-if="props.column.type === 'url'" class="text-avoid-overflow">
              <a :href="props.formattedRow[props.column.field]" target="_blank" class="ajax-table-href">{{
                props.formattedRow[props.column.field]
              }}</a>
            </div>
            <div
              v-else-if="props.column.type === 'html'"
              class="pointer"
              @click="clickOnLine(props.row)"
              v-html="props.formattedRow[props.column.field]"
            ></div>
            <div v-else-if="props.column.type === 'relation'" class="text-avoid-overflow">
              <router-link
                :to="'/app/' + props.column.relation + '/' + props.formattedRow[props.column.field]"
                class="ajax-table-href"
              >
                <span class="badge badge-info">
                  {{
                    props.column.listName
                      ? getLovValue(props.formattedRow[props.column.field], props.column.listName)
                      : getDisplayLabel(props.formattedRow[props.column.field], props.column)
                  }}
                </span>
              </router-link>
            </div>
            <span
              v-else-if="props.column.type === 'list-of-value' || props.column.type === 'lov'"
              class="pointer"
              @click="clickOnLine(props.row)"
              >{{ getLovValue(props.formattedRow[props.column.field], props.column.listName) }}</span
            >
            <span v-else-if="props.column.type === 'list-of-data'" class="pointer" @click="clickOnLine(props.row)">{{
              getDataValue(props.formattedRow[props.column.field], props.column.listName)
            }}</span>
            <div
              v-else-if="props.column.type === 'object'"
              class="pointer text-avoid-overflow"
              @click="clickOnLine(props.row)"
            >
              |
              <template v-for="(value, key) of props.formattedRow[props.column.field]" class="label label-info">
                <label :key="key">{{ key }}:</label>
                <label :key="key" class="text-primary">{{ value }}</label> |
              </template>
            </div>
            <div
              v-else-if="props.column.type === 'checkbox'"
              class="pointer text-avoid-overflow"
              @click="clickOnLine(props.row)"
            >
              <input
                v-if="props.formattedRow[props.column.field] === true"
                class="ajax-table-checkbox"
                type="checkbox"
                checked
                disabled
              />
              <input class="ajax-table-checkbox" v-else type="checkbox" disabled />
            </div>
            <div
              v-else
              class="pointer text-avoid-overflow"
              :class="
                props.column.class +
                  ' ajax-table-col-' +
                  props.column.field +
                  ' ajax-table-col-value-' +
                  props.formattedRow[props.column.field]
              "
              :style="props.column.style"
              @click="clickOnLine(props.row)"
            >
              {{ props.formattedRow[props.column.field] }}
            </div>
          </template>
          <div slot="emptystate">
            {{ $t('EnyoAjaxTable.empty') }}
          </div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import DateRangePicker from 'vue2-daterange-picker';
import { VueGoodTable } from 'vue-good-table';
import qs from 'qs';
import moment from 'moment';
import apiErrors from '../../mixins/apiErrorsMixin';
import _ from 'lodash';

export default {
  name: 'EnyoAjaxTable',
  token: `
  <EnyoAjaxTable  :title="title" :columns="tableColumns" :rows="dataSource" :tableNeedsRefresh="needsRefresh" :options="tableOptions">
  <template slot="table-actions"></template>
  <template slot="table-top-actions"></template>
  <template slot="table-top-more-actions"></template>
  <template slot="table-subtitle"></template>
  <template slot="table-row-actions"></template>

  <!-- END OF ARRAY -->
  </EnyoAjaxTable>
  `,
  components: {
    DateRangePicker,
    VueGoodTable
  },
  mixins: [apiErrors],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnsDisplayed: {
      type: Number,
      default: 8
    },
    rows: { type: Array, default: () => [] },
    primaryKey: { type: String, default: 'id' },
    responseField: {
      type: [String, Boolean],
      default: 'body',
      note: 'This field dictates where in the response should the component search for the results '
    },
    url: { type: String, default: '' },
    params: {
      type: Object,
      default: () => ({}),
      note:
        "A params object containing parameters that will be passed as query params to the api request.\n It's up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back."
    },
    queryHeaders: { type: Object, default: () => ({}) },
    entity: {
      type: String,
      default: '',
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    title: { type: String, default: '' },
    translations: {
      type: Object,
      default: () => ({
        'common.buttons.filters': 'Filter',
        'common.buttons.refresh': 'Refresh',
        'common.buttons.excel-currentpage': 'Export current page',
        'EnyoAjaxTable.searchInput': 'EnyoAjaxTable.searchInput',
        'EnyoAjaxTable.next': 'Next',
        'EnyoAjaxTable.prev': 'Previous',
        'EnyoAjaxTable.rows_per_page': 'Rows per page',
        'EnyoAjaxTable.of': 'of',
        'EnyoAjaxTable.page': 'page',
        'EnyoAjaxTable.all': 'all',
        'EnyoAjaxTable.empty': 'empty'
      })
    },
    autoRefresh: { type: Boolean, default: false },
    autoRefreshInterval: { type: Number, default: 1 },
    refresh: { type: Function, default: undefined },
    delete: { type: Function, default: undefined },
    create: { type: Function, default: undefined },
    exportUrl: { type: String, default: undefined },
    tableNeedsRefresh: {
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
        customInlineActions: [], // {key, label, action: function(item, context{}}
        filterInitiallyOn: false,
        saveSearchDatas: false,
        actions: {
          noActions: false,
          search: true,
          filter: true,
          create: true,
          edit: true,
          view: true,
          delete: true,
          export: false,
          import: false,
          dateFilter: false,
          refresh: true
        }
      })
    },
    mode: {
      default: 'local',
      type: String
    }
  },
  data() {
    return {
      totalCount: 0,
      filterable: this.options.filterInitiallyOn,
      isRefreshing: false,
      columnsState: {},
      defaultStartDate: moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD'),
      defaultEndDate: moment().format('YYYY-MM-DD'),
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},

        page: 0, // what page I want to show
        perPage: this.mode === 'remote' ? this.perPage : this.limit // how many items I'm showing per page
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
          daysOfWeek: moment.weekdaysMin(), // array of days - see moment documenations for details
          monthNames: moment.monthsShort(), // array of month names - see moment documenations for details
          firstDay: 1 // ISO first day of week - see moment documenations for details
        }
      },
      displayLabelCache: {}
    };
  },
  computed: {
    opts() {
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
        console.error('EnyoAjaxTable MISSING COLUMNS');
        return [];
      }
      const newcolumns = this.columns.map((col) => {
        const newCol = {};

        if (_.isString(col)) {
          newCol.field = col;
          newCol.label = _.startCase(col);
          newCol.filterOptions = { enabled: this.filterable };
          newCol.sortable = true;
          return newCol;
        }
        if (!col.label) {
          col.label = _.startCase(col.field);
        }

        if (col.type && col.type === 'datetime') {
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return moment(value).format('lll');
          };
        }

        if (col.type && col.type === 'date') {
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return moment(value).format('DD-MM-YYYY');
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
          filterDropdownItems = filterDropdownItems.map((e) =>
            _.isObject(e)
              ? e
              : {
                  value: e,
                  text: _.startCase(e)
                }
          );
        }

        col.filterOptions = {
          enabled: col.filterable !== undefined ? col.filterable && this.filterable : this.filterable,
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
      if (!newcolumns.find((col) => col.field === 'ACTIONS') && !this.opts.actions.noActions) {
        newcolumns.push({
          field: 'ACTIONS',
          label: 'Actions',
          filterOptions: { enabled: false }
        });
        // eslint-disable-next-line
        this.columnsState.ACTIONS = true;
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

        if (!this.columnsState.ACTIONS) {
          const actions = this.formattedColumns.find((col) => col.field === 'ACTIONS');
          if (actions) {
            cols.push(actions);
          }
        }
        return cols;
      }
      return this.formattedColumns;
    }
  },
  watch: {
    tableNeedsRefresh: 'refreshTableData',
    params() {
      this.serverParams = _.merge({}, this.serverParams, this.params);
      this.getItems();
    },
    entity: 'entityChanged',
    // store: changed => {},
    rows: 'refreshTableData'
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
    if (!this.$http) {
      try {
        const axios = require('axios');
        this.$http = axios;
      } catch (err) {
        // console.warn(err.message);
      }
    }
  },
  beforeMount() {
    const userLang = window.navigator ? navigator.language || navigator.userLanguage : 'en';
    moment.locale(userLang);
  },
  mounted() {
    this.filterable = this.options && this.options.filterInitiallyOn;

    if (this.refresh || this.store) {
      return;
    }
    this.refreshTableData();

    if (this.autoRefresh) {
      this.numberOfRefreshCalls = 0;
      this.refreshHandle = setInterval(() => {
        if (this.numberOfRefreshCalls > 300) {
          this.$notify({
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
        this.getItems();
      }, this.autoRefreshInterval * 60000);
    }
  },
  beforeDestroy() {
    clearInterval(this.refreshHandle);
  },
  methods: {
    startCase: _.startCase,
    // eslint-disable-next-line
    async refreshTableData(changed) {
      // console.log("my url ", this.url);
      if (this.url) {
        this.data = [];
        // console.log("this.serverParams", this.serverParams);
        this.serverParams = _.merge({}, this.serverParams, this.params);
        await this.getItems();
      } else {
        this.data = this.rows;
        this.$forceUpdate();
      }
      this.tableRefreshCompleted();
    },

    entityChanged() {
      this.data = this.url ? [] : this.rows;
      this.serverParams = {};
      this.getItems();
    },

    tableRefreshCompleted() {
      this.$emit('update:tableNeedsRefresh', false);
      this.$emit('afterRefresh', { data: this.data });
    },

    /**
     * @description get the label of the field from the api or from the local cache.
     */
    getDisplayLabel(value, props) {
      const url = `${props.relationUrl}/${value}`;
      if (!props.relationUrl || !value || !props.relationLabel) {
        return value;
      }
      if (props.relationUrl && value && this.displayLabelCache[url]) {
        return this.displayLabelCache[url];
      }
      const promise = this.$http
        .get(url)
        .then((res) => {
          const data =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
          if (res.data.totalCount) {
            this.totalCount = res.data.totalCount;
          }
          const result = `${_.get(data, props.relationKey)} - ${_.get(data, props.relationLabel, '')}`;

          if (result) {
            this.$set(this.displayLabelCache, url, result);
          }
          return result;
        })
        .catch(() => {
          this.$set(this.displayLabelCache, url, value);
        });
      this.$set(this.displayLabelCache, url, promise);
      return this.displayLabelCache[url];
    },

    /** GET ENTITY ITEMS */
    getItems() {
      this.$emit('refresh');
      // if i got a refresh function
      if (this.refresh) {
        this.refresh();
        return;
      }

      if (!this.url) {
        // console.log("[AJAXTABLE] no refresh url or refresh function");
        return;
      }
      this.isRefreshing = true;
      return this.$http
        .get(`${this.url}${this.url.indexOf('?') > -1 ? '&' : '?'}${qs.stringify(this.serverParams, {})}`, {})
        .then((res) => {
          this.data =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
          this.totalCount = res.data.totalCount;
          if (this.options.saveSearchDatas && this.mode === 'remote') {
            this.$emit('crud-list-updated', this.data);
          }
          this.$emit('dataChanged', this.data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.warn(err);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    deleteItem(item) {
      this.$emit('delete', item);
    },

    toggleFilter() {
      this.filterable = !this.filterable;

      if (!this.filterable) {
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems();
      }
      this.columns = this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled = this.filterable;
        }
        return col;
      });
    },

    // editItem(item) {},

    clickOnLine(item) {
      this.opts && this.opts.actions && this.opts.actions.view && this.$emit('view', item);
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
    },

    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.params, this.serverParams, newProps);
    },

    // sort functions for unkown types
    // eslint-disable-next-line
    sortFn(x, y, col, rowX, rowY) {
      // x - row1 value for column
      // y - row2 value for column
      // col - column being sorted
      // rowX - row object for row1
      // rowY - row object for row2
      return x < y ? -1 : x > y ? 1 : 0;
    },

    onPageChange(params) {
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({ page: params.currentPage - 1 });
      this.getItems();
    },

    onPerPageChange(params) {
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({ perPage: params.currentPerPage });
      this.getItems();
    },

    onSortChange(params) {
      const fieldIndex = params[0].columnIndex;
      // eslint-disable-next-line
      if (this.mode !== 'remote' || !this.columns || !this.columns[fieldIndex].field) {
        return;
      }
      const sort = {};
      sort[this.columns[fieldIndex].field] = params[0].sortType || params[0].type;
      this.updateParams({ sort });

      this.getItems();
    },

    onSearch(params) {
      if (this.mode !== 'remote') {
        return;
      }
      let search = params.searchTerm;
      this.updateParams({ search, page: 0 });
      this.getItems();
    },

    onColumnFilter(params) {
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({
        filters: _.cloneDeep(params.columnFilters),
        page: 0
      });
      this.getItems();
    },

    onDateFilter(value) {
      // console.log("new value", value);
      if (!value) {
        return;
      }
      this.serverParams.range.startDate = value.startDate.toISOString().slice(0, 10);
      this.serverParams.range.endDate = value.endDate.toISOString().slice(0, 10);
      this.getItems();
    },

    hasValue(item, column) {
      return item[column.toLowerCase()] !== 'undefined';
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    exportCallBack() {
      if (!this.exportUrl) {
        this.$notify({ title: '[WARN] missing export url', type: 'warning' });
        return;
      }
      this.$http
        .get(this.exportUrl, {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement('a');
            link.download = `${this.entity}_export`;
            link.href = res.data.url;
            link.click();
            link.remove();
          }
        })
        .catch(this.apiErrorCallback);
    },

    exportCurrentArrayToExcel() {
      let CsvString = '';
      // eslint-disable-next-line
      const head = this.data[0];
      Object.keys(head).forEach((ColItem) => {
        CsvString += `${ColItem},`;
      });
      CsvString += '\r\n';
      this.data.forEach((RowItem) => {
        // eslint-disable-next-line
        Object.values(RowItem).forEach((ColItem) => {
          CsvString += `${ColItem},`;
        });
        CsvString += '\r\n';
      });
      CsvString = `data:application/csv,${encodeURIComponent(CsvString)}`;
      const x = document.createElement('A');
      x.setAttribute('href', CsvString);
      x.setAttribute('download', 'somedata.csv');
      document.body.appendChild(x);
      x.click();
    }
  }
};
</script>
<style lang="scss">
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
