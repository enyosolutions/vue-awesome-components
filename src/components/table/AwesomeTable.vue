<template>
  <div class="card ajax-table-card">
    <div
      class="card-header"
      :class="'ajax-table-header ' + (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')"
    >
      <h3 class="card-title ajax-table-header text-primary text-left">
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
          <div v-if="isRefreshing" style="text-align: center">
            <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw" style="color:orange;margin-left:10px" />
          </div>
          <button
            v-if="_actions.filter"
            type="button"
            class="btn btn-link btn-alt-style"
            :class="{ 'btn-primary': filterable, 'btn-default': !filterable }"
            @click="toggleFilter()"
          >
            <i class="fa fa-filter" />
            {{ $t("AwesomeTable.buttons.filters") }}
          </button>
          <div class="dropdown">
            <button v-if="_actions && _actions.refresh" class="btn btn-link btn-alt-style" @click="getItems()">
              <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t("AwesomeTable.buttons.refresh") }}
            </button>
            <button
              v-if="_actions && (_actions.export || _actions.import || _actions.dropdownActions)"
              id="dropdownMenuButton"
              class="btn btn-secondary btn-main-style dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-plus" />
              {{ $t("AwesomeTable.more") }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <slot name="table-top-more-actions" />
              <button
                v-if="_actions && _actions.export"
                class="btn btn-link text-success btn-main-style btn-block"
                @click="exportCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t("AwesomeTable.buttons.excel") }}
              </button>

              <button
                v-if="_actions && _actions.export"
                class="btn btn-link text-success btn-main-style btn-block"
                @click="exportCurrentArrayToExcel"
              >
                <i class="fa fa-file-excel" />
                {{ $t("AwesomeTable.buttons.excel-currentpage") }}
              </button>
            </div>
          </div>
        </div>
      </h3>
      <p class="card-category">
        <slot name="table-subtitle" />
      </p>
    </div>

    <div class="card-body ajax-table-card-body">

      <awesome-filter v-if="true || _actions.filter && _actions.advancedFilter && filterable" :fields="columns" @update-filter="advancedFiltering"/>

      <div class="table-responsive">
        <vue-good-table
          :mode="mode"
          :total-rows="totalCount"
          style-class="vgt-table table striped"
          :columns="displayedColumns"
          :fixed-header="opts && opts.fixedHeader"
          :max-height="opts.maxHeight"
          :rows="data || []"
          :filter-options="{
            enabled: _actions.filter
          }"
          :search-options="{
            enabled: _actions.search,
            placeholder: this.$t('AwesomeTable.searchInput')
          }"
          :pagination-options="{
            enabled: opts && opts.pagination,
            nextLabel: this.$t('AwesomeTable.next'),
            prevLabel: this.$t('AwesomeTable.prev'),
            rowsPerPageLabel: this.$t('AwesomeTable.rows_per_page'),
            ofLabel: this.$t('AwesomeTable.of'),
            pageLabel: this.$t('AwesomeTable.page'),
            allLabel: this.$t('AwesomeTable.all'),
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
                    v-if="_actions.filter && _actions.dateFilter && filterable"
                    class="form-group vgt-date-range"
                    :placeholder="$t('AwesomeTable.daterange.start')"
                    :start-date="defaultStartDate"
                    :end-date="defaultEndDate"
                    :locale-data="datePicker.locale"
                    :opens="'left'"
                    @update="onDateFilter"
            />

            <template v-if="opts && opts.customTableTopActions">
              <template v-for="(action, index) in opts.customTableTopActions">
                <button
                  v-if="!action.canDisplay || action.canDisplay({ item: props.row }, this)"
                  :key="index"
                  class="btn btn-xs btn-main-style"
                  :class="action.class"
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
          </div>
          <template slot="table-row" slot-scope="props">
            <awesome-display
              v-bind="props.column"
              :apiResponseConfig="apiResponseConfig"
              :apiRequestHeaders="apiRequestHeaders"
              :value="props.formattedRow[props.column.field]"
              @clickEvent="clickOnLine(props.row)"
            >
            </awesome-display>

            <span v-if="props.column.field === 'ACTIONS'" class="text-right">
              <slot name="table-row-actions" :item="props.row">
                <template v-if="opts && opts.customInlineActions">
                  <template v-for="(action, index) in opts.customInlineActions">
                    <button
                      v-if="!action.canDisplay || action.canDisplay({ item: props.row }, this)"
                      :key="index"
                      class="btn btn-xs btn-alt-style"
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
                v-if="_actions.view"
                class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                @click="$emit('view', props.row)"
              >
                <i class="fa fa-eye text-info" />
              </button>
              <button
                v-if="_actions.edit"
                class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                @click="$emit('edit', props.row)"
              >
                <i class="fa fa-pencil fa fa-pencil text-primary" />
              </button>
              <button
                v-if="_actions.delete"
                class="btn btn-xs btn-simple btn-awtable-inline-action btn-icon"
                @click="$emit('delete', props.row)"
              >
                <i class="fa fa-trash text-danger" />
              </button>
            </span>
            <span
              v-else-if="props.column.type === 'list-of-value' || props.column.type === 'lov'"
              class="pointer"
              @click="clickOnLine(props.row)"
              >{{ getLovValue(props.formattedRow[props.column.field], props.column.listName) }}</span
            >
            <span v-else-if="props.column.type === 'list-of-data'" class="pointer" @click="clickOnLine(props.row)">{{
              getDataValue(props.formattedRow[props.column.field], props.column.listName)
            }}</span>
          </template>
          <div slot="emptystate">
            {{ $t("AwesomeTable.empty") }}
          </div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import DateRangePicker from "vue2-daterange-picker";
import { VueGoodTable } from "vue-good-table";
import moment from "moment";
import apiErrors from "../../mixins/apiErrorsMixin";
import apiListMixin from "../../mixins/apiListMixin";
import i18nMixin from "../../mixins/i18nMixin";
import { defaultActions } from "../../mixins/defaultProps";

import _ from "lodash";
import AwesomeDisplay from "../crud/display/AwesomeDisplay";
import AwesomeFilter from "../misc/AwesomeFilter";

export default {
  name: "AwesomeTable",
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
    AwesomeFilter
  },
  mixins: [i18nMixin, apiErrors, apiListMixin],
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
    url: { type: String, default: "" },
    entity: {
      type: String,
      default: "",
      note:
        "Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations"
    },
    title: { type: String, default: "" },
    translations: {
      type: Object,
      default: () => ({
        "AwesomeTable.buttons.filters": "Filter",
        "AwesomeTable.buttons.refresh": "Refresh",
        "AwesomeTable.buttons.excel-currentpage": "Export current page",
        "AwesomeTable.searchInput": "AwesomeTable.searchInput",
        "AwesomeTable.next": "Next",
        "AwesomeTable.prev": "Previous",
        "AwesomeTable.rows_per_page": "Rows per page",
        "AwesomeTable.of": "of",
        "AwesomeTable.page": "page",
        "AwesomeTable.all": "all",
        "AwesomeTable.empty": "empty"
      })
    },
    autoRefresh: { type: Boolean, default: false },
    autoRefreshInterval: { type: Number, default: 1 },
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
        maxHeight: "",
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        filterInitiallyOn: false,
        saveSearchDatas: false
      })
    },
    actions: {
      type: Object,
      default: () => defaultActions,
      note: "actions active in this instance"
    },

    mode: {
      default: "local",
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
        .subtract(7, "days")
        .format("YYYY-MM-DD"),
      defaultEndDate: moment().format("YYYY-MM-DD"),
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},

        page: 0, // what page I want to show
        perPage: this.mode === "remote" ? this.perPage : this.limit // how many items I'm showing per page
      },
      data: [],
      refreshHandle: null,
      numberOfRefreshCalls: 0,
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

    _tableTitle() {
      return (
        this.title ||
        (this.$te && this.$te("app.labels." + this.entity)
          ? this.$t("app.labels." + this.entity)
          : _.startCase(this.entity))
      );
    },

    _actions() {
      return _.merge(
        {},
        defaultActions,
        this.actions || (this.innerOptions && this._actions) // old location kept for BC
      );
    },

    formattedColumns() {
      if (!this.columns) {
        // eslint-disable-next-line
        console.error("AwesomeTable MISSING COLUMNS");
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
          col.sortable = false;
        }

        let filterDropdownItems = col.filterOptions && col.filterOptions.filterDropdownItems;
        if (col.type && (col.type === "list-of-value" || col.type === "lov")) {
          filterDropdownItems = this.$store.state.listOfValues[col.listName];
          if (filterDropdownItems) {
            filterDropdownItems = filterDropdownItems.map((e) => ({
              value: e.code,
              text: e.label || e.code || e
            }));
          }
        }

        if (col.type && col.type === "list-of-data") {
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
      if (!newcolumns.find((col) => col.field === "ACTIONS") && !this._actions.noActions) {
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
        const cols = this.formattedColumns.filter((col) => this.columnsState[col.field]);

        if (!this.columnsState.ACTIONS) {
          const actions = this.formattedColumns.find((col) => col.field === "ACTIONS");
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
    // needsRefresh: "refreshLocalData",
    params() {
      this.serverParams = _.merge({}, this.serverParams, this.params);
      this.getItems();
    },
    entity: "entityChanged",
    // store: changed => {},
    rows: "refreshLocalData"
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
    const userLang = window.navigator ? navigator.language || navigator.userLanguage : "en";
    moment.locale(userLang);
  },
  mounted() {
    this.filterable = this.options && this.options.filterInitiallyOn;

    if (this.refresh || this.store) {
      return;
    }
    this.refreshLocalData();

    if (this.autoRefresh) {
      this.numberOfRefreshCalls = 0;
      this.refreshHandle = setInterval(() => {
        if (this.numberOfRefreshCalls > 300) {
          this.$notify({
            title: "too much calls, aborting tracking",
            type: "warning"
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

    advancedFiltering(filters) {
      this.updateParams({
        filters: _.cloneDeep(filters),
        page: 0
      });
      this.getItems();
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
      this._actions.view && this.$emit("view", item);
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

    onColumnFilter(params) {
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({
        filters: _.cloneDeep(params.columnFilters),
        page: 0
      });
      this.getItems();
    },

    onSortChange(params) {
      const fieldIndex = params[0].columnIndex;
      // eslint-disable-next-line
      if (this.mode !== "remote" || !this.columns || !this.columns[fieldIndex].field) {
        return;
      }
      const sort = {};
      sort[this.columns[fieldIndex].field] = params[0].sortType || params[0].type;
      this.updateParams({ sort });
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
      return item[column.toLowerCase()] !== "undefined";
    },

    itemValue(item, column) {
      return item[column.toLowerCase()];
    },

    exportCallBack() {
      if (!this.exportUrl) {
        this.$notify({ title: "[WARN] missing export url", type: "warning" });
        return;
      }
      this.$http
        .get(this.exportUrl, {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement("a");
            link.download = `${this.entity || ""}_export`;
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
