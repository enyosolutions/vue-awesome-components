<template>
  <enyo-card
    :header-class="'ajax-table-header '+ (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')"
  >
    <template slot="header">
      <h4 class="card-title ajax-table-header">
        <slot name="table-title">
          {{ title || $t('app.labels.' + entity) }}
        </slot>
        <div class="btn-group btn-group-sm float-right">
          <slot name="table-top-actions" />
          <div
            v-if="canHideColumns"
            class="dropdown"
          >
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
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              style="max-height:100vh; overflow: auto;"
            >
              <button
                v-for="(col, index) in formattedColumns"
                :key="index"
                type="button"
                class="dropdown-item"
                href="#"
                :class="{'text-light bg-primary': columnsState[col.field], 'bg-info': col.field === 'ACTIONS'}"
                :disabled="col.field === 'ACTIONS'"
                @click="toggleColumn(col.field)"
              >
                {{ col.label }}
              </button>
            </div>
          </div>
          <div
            v-if="isRefreshing"
            style="text-align: center"
          >
            <i
              class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"
              style="color:orange;margin-left:10px"
            />
          </div>
          <button
            v-if="opts.actions.filter"
            type="button"
            class="btn btn-simple"
            :class="{'btn-primary': filterable, 'btn-default': !filterable}"
            @click="toggleFilter()"
          >
            <i class="font-awesome enyo-fa-filter" />
            {{ $t('common.buttons.filters') }}
          </button>
          <div class="dropdown">
            <button
              v-if="opts.actions && (opts.actions.refresh)"
              class="btn btn-simple"
              @click="getItems()"
            >
              <i
                :class="'font-awesome enyo-fa-arrows-cw' + (isRefreshing ? ' fa-spin' : '') "
              />
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
              <i class="font-awesome enyo-fa-plus" />
              {{ $t('table.more') }}
            </button>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <slot name="table-top-more-actions" />
              <upload-button
                v-if="opts.actions && opts.actions.import"
                name="import"
                :options="{
                  upload: true,
                  targetUrl: opts.uploadUrl || url + '/import',
                  method: 'POST',
                  headers: {},
                  base64: false,
                  maxSize: 1,
                  label: $t('common.buttons.import'),
                  class: 'btn btn-success btn-simple btn-block',
                  icon: 'file-upload'
                }"
                @uploaded="importResponse"
              />
              <button
                v-if="opts.actions && opts.actions.export"
                class="btn btn-success btn-simple btn-block"
                @click="exportCallBack"
              >
                <i class="font-awesome enyo-fa-file-excel" />
                {{ $t('common.buttons.excel') }}
              </button>
            </div>
          </div>
        </div>
      </h4>
      <p class="card-category">
        <slot name="table-subtitle" />
      </p>
    </template>
    <div class="table-responsive">
      <vue-good-table
        :mode="mode"
        :total-rows="totalCount"
        style-class="vgt-table table striped"
        :columns="displayedColumns"
        :rows="data || []"
        :filter-options="{
          enabled: opts && opts.actions && opts.actions.filter
        }"
        :search-options="{
          enabled: opts && opts.actions && opts.actions.search,
          placeholder: this.$t('table.searchInput'),
        }"
        :pagination-options="{
          enabled: opts && opts.pagination,
          nextLabel: this.$t('table.next'),
          prevLabel: this.$t('table.prev'),
          rowsPerPageLabel: this.$t('table.rows_per_page'),
          ofLabel: this.$t('table.of'),
          pageLabel: this.$t('table.page'),
          allLabel: this.$t('table.all'),
          perPage: perPage
        }"
        @on-page-change="onPageChange"
        @on-sort-change="onSortChange"
        @on-column-filter="onColumnFilter"
        @on-per-page-change="onPerPageChange"
        @on-search="onSearch"
      >
        <div slot="table-actions">
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
        <template
          slot="table-row"
          slot-scope="props"
        >
          <span
            v-if="props.column.field === 'ACTIONS'"
            class="text-right"
          >
            <slot
              name="table-row-actions"
              :item="props.row"
            >
              <span v-if="opts && opts.customActions">
                <button
                  v-for="(action, index) in opts.customActions"
                  :key="index"
                  class="btn btn-xs btn-simple"
                  :class="action.class"
                  :data-title="action.title || action.label"
                  @click="$emit('customAction',{action, item: props.row})"
                >
                  {{ action.label ? $t(action.label) : '' }}
                  <i
                    v-if="action.icon"
                    :class="action.icon"
                  />
                </button>
              </span>
            </slot>
            <button
              v-if="opts && opts.actions && opts.actions.view"
              class="btn btn-xs btn-simple btn-icon"
              @click="$emit('view', props.row)"
            >
              <i class="font-awesome enyo-fa-eye text-info" />
            </button>
            <button
              v-if="opts && opts.actions && opts.actions.edit"
              class="btn btn-xs btn-simple btn-icon"
              @click="$emit('edit', props.row)"
            >
              <i class="font-awesome-pencil enyo-fa-pencil" />
            </button>
            <button
              v-if="opts && opts.actions && opts.actions.delete"
              class="btn btn-xs btn-simple btn-icon"
              @click="deleteItem(props.row)"
            >
              <i class="font-awesome enyo-fa-cancel text-danger" />
            </button>
          </span>
          <span
            v-else-if="props.column.type === 'image'"
            class="pointer"
            @click="clickOnLine(props.row)"
          >
            <img
              :src="props.formattedRow[props.column.field]"
              alt="image"
              class="ajax-table-img"
            >
          </span>
          <div
            v-else-if="props.column.type === 'url'"
            class="text-avoid-overflow"
          >
            <a
              :href="props.formattedRow[props.column.field]"
              target="_blank"
              class="ajax-table-href"
            >{{ props.formattedRow[props.column.field] }}</a>
          </div>
          <div
            v-else-if="props.column.type === 'html'"
            class="pointer"
            @click="clickOnLine(props.row)"
            v-html="props.formattedRow[props.column.field]"
          />
          <div
            v-else-if="props.column.type === 'relation'"
            class="text-avoid-overflow"
          >
            <router-link
              :to="'/app' + props.column.relation + '/' + props.formattedRow[props.column.field]"
              class="ajax-table-href"
            >
              <span class="badge badge-info">
                {{
                  props.column.listName ? getLovValue(props.formattedRow[props.column.field], props.column.listName)
                  : props.formattedRow[props.column.field] }}
              </span>
            </router-link>
          </div>
          <span
            v-else-if="props.column.type === 'list-of-value' || props.column.type === 'lov'"
            class="pointer"
            @click="clickOnLine(props.row)"
          >{{ getLovValue(props.formattedRow[props.column.field], props.column.listName) }}</span>
          <span
            v-else-if="props.column.type === 'list-of-data'"
            class="pointer"
            @click="clickOnLine(props.row)"
          >{{ getDataValue(props.formattedRow[props.column.field], props.column.listName) }}</span>
          <div
            v-else-if="props.column.type === 'object'"
            class="pointer text-avoid-overflow"
            @click="clickOnLine(props.row)"
          >
            |
            <template
              v-for="(value, key) of props.formattedRow[props.column.field]"
              class="label label-info"
            >
              <label :key="key">{{ key }}:</label>
              <label
                :key="key"
                class="text-primary"
              >{{ value }}</label> |
            </template>
          </div>
          <div v-else-if="props.column.type === 'checkbox'" class="pointer text-avoid-overflow"
               @click="clickOnLine(props.row)">
          <input v-if="props.formattedRow[props.column.field] === true"
                 class="ajax-table-checkbox" type="checkbox" checked disabled />
          <input class="ajax-table-checkbox" v-else type="checkbox" disabled />
          </div>
          <div
            v-else
            class="pointer text-avoid-overflow"
            @click="clickOnLine(props.row)"
          >
            {{ props.formattedRow[props.column.field] }}
          </div>
        </template>
        <div slot="emptystate">
          {{ $t('table.empty') }}
        </div>
      </vue-good-table>
    </div>
  </enyo-card>
</template>
<script>
import EnyoCard from "../card/EnyoCard.vue";
import DateRangePicker from "vue2-daterange-picker";
import { VueGoodTable } from "vue-good-table";
import qs from "qs";
import moment from "moment";
import apiErrors from "../../mixins/apiErrorsMixin";
import "vue-good-table/dist/vue-good-table.css";
import _ from "lodash";


export default {
  name: "AjaxTable",
  token: `
  <AjaxTable  :title="title" :columns="tableColumns" :rows="dataSource" :tableNeedsRefresh="needsRefresh" :options="tableOptions">
    <template slot="table-actions"></template>
    <template slot="table-top-actions"></template>
    <template slot="table-top-more-actions"></template>
    <template slot="table-subtitle"></template>
    <template slot="table-row-actions"></template>

    <!-- END OF ARRAY -->
  </AjaxTable>
  `,
  components: {
    EnyoCard,
    DateRangePicker,
    VueGoodTable
  },
  mixins: [apiErrors],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    columnsDisplayed: {
      type: Number,
      default: 8
    },
    rows: {type: Array, default: () => ([])},
    url: {type: String, default: ''},
    params: {type: Object, default: () => ({})},
    headers: {type: Object, default: () => ({})},
    entity: {type: String, default: ''},
    title: {type: String, default: ''},
    refresh: {type: Function, default: undefined},
    delete: {type: Function, default: undefined},
    create: {type: Function, default: undefined},
    tableNeedsRefresh: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: [String, Number],
      default: 20
    },
    options: {
      type: Object,
      default: () => ({})
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        pagination: true,
        customActions: [], // {key, label, action: function(item, context{}}
        filterInitialyOn: false,
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
          dateFilter: true,
          refresh: true
        }
      })
    },
    mode: {
      default: "locale",
      type: String
    },
  },
  data() {
    return {
      totalCount: 0,
      filterable: this.options.filterInitialyOn,
      isRefreshing: false,
      columnsState: {},
      defaultStartDate: moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD"),
      defaultEndDate: moment().format("YYYY-MM-DD"),
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},

        page: 0, // what page I want to show
        perPage: this.mode === "remote" ? this.perPage : 1000 // how many items I'm showing per page
      },
      data: [],
      datePicker: {
        locale: {
          direction: "ltr", // direction of text
          format: "DD-MM-YYYY", // fomart of the dates displayed
          separator: " - ", // separator between the two ranges
          applyLabel: "Appliquer",
          cancelLabel: "Annuler",
          weekLabel: "W",
          customRangeLabel: "Custom Range",
          daysOfWeek: moment.weekdaysMin(), // array of days - see moment documenations for details
          monthNames: moment.monthsShort(), // array of month names - see moment documenations for details
          firstDay: 1 // ISO first day of week - see moment documenations for details
        }
      }
    };
  },
  computed: {
    opts() {
      return _.merge(this.defaultOptions, this.options);
    },
    formattedColumns() {
      if (!this.columns) {
        // eslint-disable-next-line
        console.error("AJAXTABLE MISSING COLUMNS");
        return [];
      }
      const newcolumns = this.columns.map(col => {
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

        if (col.type && col.type === "datetime") {
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return moment(value).format("lll");
          };
        }

        if (col.type && col.type === "date") {
          col.formatFn = function(value) {
            if (!value) {
              return value;
            }
            return moment(value).format("DD-MM-YYYY");
          };
        }

        if (col.type && col.type === "object") {
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

        if (col.type && col.type === "relation") {
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

       if (col.type && col.type === "checkbox") {
          col.sortable = false
        }

        let filterDropdownItems = col.filterOptions && col.filterOptions.filterDropdownItems;
        if (col.type && (col.type === "list-of-value" || col.type === "lov")) {
          filterDropdownItems = this.$store.state.listOfValues[col.listName];
          if (filterDropdownItems) {
            filterDropdownItems = filterDropdownItems.map(e => ({
              value: e.code,
              text: e.label || e.code || e
            }));
          }
        }

        if (col.type && col.type === "list-of-data") {
          filterDropdownItems = this.$store.state.data[col.listName];
          filterDropdownItems = filterDropdownItems.map(e => ({
            value: e.code,
            text: e.label || e.code || e
          }));
        }

        if (col.enum) {
          filterDropdownItems = col.enum;
          filterDropdownItems = filterDropdownItems.map(e => ({
            value: e,
            text: _.startCase(e)
          }));
        }

        col.filterOptions = { enabled: this.filterable, filterDropdownItems };
        return col;
      });
      const isInitialLoad = Object.keys(this.columnsState).length < 1;
      if (isInitialLoad && newcolumns.length > this.columnsDisplayed) {
        newcolumns.forEach((col, idx) => {
          this.$set(this.columnsState, col.field, idx < this.columnsDisplayed);
        });
      }
      if (
        !newcolumns.find(col => col.field === "ACTIONS") &&
        !this.opts.actions.noActions
      ) {
        newcolumns.push({
          field: "ACTIONS",
          label: "Actions",
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
        const cols = this.formattedColumns.filter(
          col => this.columnsState[col.field]
        );

        if (!this.columnsState.ACTIONS) {
          const actions = this.formattedColumns.find(
            col => col.field === "ACTIONS"
          );
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
    tableNeedsRefresh: "refreshTableData",
    params() {
      this.serverParams = _.merge({}, this.serverParams, this.params);
      this.getItems();
    },
    entity: "entityChanged",
    // store: changed => {},
    rows: "refreshTableData"
  },
  created() {},
  mounted() {
    this.filterable = this.props.options && this.props.options.filterInitiallyOn;

    if (this.refresh && this.store) {
      return;
    }
    this.refreshTableData();
  },
  beforeDestroy() {},
  methods: {
    // eslint-disable-next-line
    refreshTableData(changed) {
      // console.log("my url ", this.url);
      if (this.url) {
        this.data = [];
        // console.log("this.serverParams", this.serverParams);
        this.serverParams = _.merge({}, this.serverParams, this.params);
        this.getItems();
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
      this.$emit("update:tableNeedsRefresh", false);
      this.$emit("afterRefresh");
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
      this.$http
        .get(`${this.url}?${qs.stringify(this.serverParams, {})}`, {})
        .then(res => {
          this.data = res.data.body;
          this.totalCount = res.data.totalCount;
           if(this.options.saveSearchDatas && this.mode === 'remote'){
            this.$emit('crud-list-updated', this.data);
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.warn(err);
        }).finally(()=> {
          this.isRefreshing = false;
        });
    },

    deleteItem(item) {
      this.$emit("delete", item);
    },

    toggleFilter() {
      this.filterable = !this.filterable;

      if (!this.filterable) {
        this.serverParams.range = {};
        this.serverParams.filters = {};
        this.getItems();
      }
      this.columns = this.columns.map(col => {
        if (col.filterOptions) {
          col.filterOptions.enabled = this.filterable;
        }
        return col;
      });
    },

    // editItem(item) {},

    clickOnLine(item) {
      this.opts &&
        this.opts.actions &&
        this.opts.actions.view &&
        this.$emit("view", item);
    },

    getLovValue(item, listName) {
      if (!item || !this.$store.state.listOfValues[listName]) {
        return item;
      }
      const value = this.$store.state.listOfValues[listName].find(
        elm => elm._id === item || elm.code === item
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
      const value = this.$store.state.data[listName].find(
        elm => elm._id === item || elm.code === item
      );
      if (!value) {
        return item;
      }

      return value.label || value.title || value.name || value.code || value;
    },

    toggleColumn(colName) {
      this.$set(this.columnsState, colName, !this.columnsState[colName]);
    },
    updateParams(newProps) {
      this.serverParams = Object.assign(
        {},
        this.params,
        this.serverParams,
        newProps
      );
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
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({ page: params.currentPage - 1 });
      this.getItems();
    },

    onPerPageChange(params) {
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({ perPage: params.currentPerPage });
      this.getItems();
    },

    onSortChange(params) {
      if (this.mode !== "remote") {
        return;
      }
      const sort = {};
      sort[this.columns[params.columnIndex].field] = params.sortType;
      this.updateParams({ sort });
      this.getItems();
    },

    onSearch(params){
      if (this.mode !== "remote") {
        return;
      }
      let search = params.searchTerm;
      this.updateParams({ search });
      this.getItems();
    },

    onColumnFilter(params) {
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({ filters: _.cloneDeep(params.columnFilters) });
      this.getItems();
    },

    onDateFilter(value) {
      // console.log("new value", value);
      if (!value) {
        return;
      }
      this.serverParams.range.startDate = value.startDate
        .toISOString()
        .slice(0, 10);
      this.serverParams.range.endDate = value.endDate
        .toISOString()
        .slice(0, 10);
      this.getItems();
    },

    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    exportCallBack() {
      this.$http
        .get(this.exportUrl || `/crud/${this.entity}/export`, {})
        .then(res => {
          if (res.data.url) {
            const link = document.createElement("a");
            link.download = `${this.entity}_export`;
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
<style lang='scss'>
.ajax-table-img {
  max-height: 50px;
}

.ajax-table-checkbox{
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
