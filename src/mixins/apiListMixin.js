/**
 * Mixin for components that render lists from an arg or an api
 */

import qs from "qs";
import moment from "moment";
import _ from "lodash";
import apiConfigMixin from './apiConfigMixin';

export default {
  mixins: [apiConfigMixin],
  props: {
    rows: { type: Array, default: () => [] },
    primaryKey: { type: String, default: "id" },
    url: { type: String, default: "" },
    apiRequestConfig: {
      type: Object,
      note: `This object define the configuration for talking to the api : filters, sort, pagination, etc`,
      default: () => ({
        dataPath: "",
        perPageField: "perPage",
        pageField: "page",
        filtersField: "filters",
        sortField: "sort",
        searchField: "search"
      })
    },
    apiResponseConfig: {
      type: Object,
      note: `This object define the configuration for processing data coming from the api : count, data path`,
      default: () => ({
        dataPath: "data.body",
        totalCountPath: "data.totalCount"
      })
    },
    apiQueryParams: {
      type: Object,
      default: () => ({}),
      note:
        "A params object containing parameters that will be passed as query params to the api request.\n It's up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back."
    },
    apiRequestHeaders: { type: Object, default: () => ({}) },
    routerMode: {
      type: Boolean,
      default: true,
    },
    entity: {
      type: String,
      default: "",
      note:
        "Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations"
    },
    title: { type: String, default: "" },
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
      default: 1000,
      note: `Limit serves in case of local pagination to limit the number of results from the api, in order to avoid memory overflows`
    },
    options: {
      type: Object,
      default: () => ({})
    },
    mode: {
      default: "local",
      type: String
    }
  },
  data() {
    return {
      totalCount: 0,
      isRefreshing: false,
      serverParams: {
        // a map of column filters example: {name: 'john', age: '20'}
        filters: {},
        range: {},
        sort: {},

        page: 1, // what page I want to show
        perPage: this.mode === "remote" ? this.perPage : this.limit // how many items I'm showing per page
      },
      data: []
    };
  },
  computed: {
    // @todo delete in future version
    params() {
      // eslint-disable-next-line
      console.info(
        "BC this.params is deprecated, use this.apiQueryParams instead", this.params
      );
      return this.apiQueryParams;
    },

    opts() {
      return _.merge(this.defaultOptions, this.options);
    },

    _translatedServerParams() {
      const translatedParams = {};
      Object.keys(this.serverParams).forEach(field => {
        const newKey = this.apiRequestConfig[field + "Field"] || field;
        translatedParams[newKey] = this.serverParams[field];
      });
      return translatedParams;
    }
  },

  watch: {
    needsRefresh: "refreshLocalData",
    apiQueryParams() {
      this.serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
      this.getItems();
    },
    entity: "entityChanged",
    // store: changed => {},
    rows: "refreshLocalData",
    $route(to) {
      this.connectRouteToPagination(to);
    }
  },

  created() {
    if (!this.$http) {
      try {
        const axios = require("axios");
        this.$http = axios;
      } catch (err) {
        // console.warn(err.message);
      }
    }
  },
  beforeMount() {
    const userLang = window.navigator
      ? navigator.language || navigator.userLanguage
      : "en";
    moment.locale(userLang);
  },

  mounted() {
    this.refreshLocalData();
    if (this.routerMode) {
      this.connectRouteToPagination(this.$route);
    }

  },
  beforeDestroy() { },
  methods: {
    startCase: _.startCase,

    // eslint-disable-next-line
    async refreshLocalData(changed) {
      if (this.url) {
        this.data = [];
        this.serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
        await this.getItems();
      } else {
        this.data = this.rows;
        this.totalCount = this.rows ? this.rows.length : 0;
        this.$forceUpdate();
      }
      this.localRefreshCompleted();
    },

    entityChanged() {
      this.data = this.url ? [] : this.rows;
      this.serverParams = {};
      this.getItems();
    },

    localRefreshCompleted() {
      this.$emit("update:needsRefresh", false);
      this.$emit("afterRefresh", { data: this.data });
    },

    /** GET ENTITY ITEMS */
    getItems() {
      this.$emit("refresh");
      // if i got a refresh function
      if (this.refresh) {
        this.refresh();
        return;
      }

      if (!this.url) {
        return;
      }
      this.isRefreshing = true;
      return this.$http
        .get(
          `${this.url}?${qs.stringify(this._translatedServerParams, {})}`,
          {}
        )
        .then(res => {
          this.data =
            this.apiResponseConfig &&
              this.apiResponseConfig.dataPath &&
              this.apiResponseConfig.dataPath != false
              ? _.get(res, this.apiResponseConfig.dataPath)
              : res.data;

          this.totalCount =
            this.apiResponseConfig &&
              this.apiResponseConfig.totalCountPath &&
              this.apiResponseConfig.totalCountPath != false
              ? _.get(res, this.apiResponseConfig.totalCountPath)
              : res.data.totalCount;
          this.$emit("crud-list-updated", this.data);
          this.$emit("dataChanged", this.data);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.warn(err);
        })
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    onClick(item) {
      // @todo stop emitting the view event. itemClicked is enough
      this.opts &&
        this.opts.actions &&
        this.opts.actions.view &&
        this.$emit("view", item);
      this.$emit("itemClicked", item);
    },

    updateParams(newProps = { page: undefined, search: undefined, perPage: undefined, columnFilters: undefined, filters: undefined }) {
      const columnFilters = newProps.columnFilters || {};
      delete newProps.columnFilters;
      this.serverParams = Object.assign(
        {},
        this.apiQueryParams,
        this.serverParams,
        newProps,
        columnFilters
      );
    },

    // sort functions for unkown types
    // eslint-disable-next-line
    sortFn(x, y, col, rowX, rowY) {
      return x < y ? -1 : x > y ? 1 : 0;
    },

    onPageChange(params) {
      window.App = { vue: this };
      if (this.routerMode) {
        this.$router.push({ query: { ...this.$route.query, page: params.currentPage } });
      }
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({ page: params.currentPage });
      this.getItems();
    },

    onPerPageChange(params) {
      if (this.routerMode) {
        this.$router.push({ query: { ...this.$route.query, perPage: params.currentPerPage } });
      }
      if (this.mode !== "remote") {
        return;
      }
      this.updateParams({ perPage: params.currentPerPage });
      this.getItems();
    },

    onSearch(params) {
      if (this.routerMode) {
        this.$router.push({ query: { ...this.$route.query, search: params.searchTerm } });
      }
      if (this.mode !== "remote") {
        return;
      }
      let search = params.searchTerm;
      this.updateParams({ search, page: 1 });
      this.getItems();
    },

    connectRouteToPagination(to) {
      if (this.routerMode) {
        this.updateParams({
          page: to.query.page, search: to.query.search,
          perPage: to.query.perPage,
          sort: to.query.sort,
          filters: to.query.filters,
        });
      }
    },

    exportCurrentArrayToExcel() {
      let CsvString = "";
      // eslint-disable-next-line
      const head = this.data[0];
      Object.keys(head).forEach(ColItem => {
        CsvString += `${ColItem},`;
      });
      CsvString += "\r\n";
      this.data.forEach(RowItem => {
        // eslint-disable-next-line
        Object.values(RowItem).forEach(ColItem => {
          CsvString += `${ColItem},`;
        });
        CsvString += "\r\n";
      });
      CsvString = `data:application/csv,${encodeURIComponent(CsvString)}`;
      const x = document.createElement("A");
      x.setAttribute("href", CsvString);
      x.setAttribute("download", "somedata.csv");
      document.body.appendChild(x);
      x.click();
    }
  }
};