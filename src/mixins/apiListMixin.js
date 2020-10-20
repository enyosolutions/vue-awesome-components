/**
 * Mixin for components that render lists from an arg or an api
 */

import qs from 'qs';
import moment from 'moment';
import _ from 'lodash';
import apiConfigMixin from './apiConfigMixin';

export default {
  mixins: [apiConfigMixin],
  props: {
    rows: { type: Array, default: () => [] },
    primaryKey: { type: String, default: 'id' },
    url: { type: String, default: '' },
    apiRequestConfig: {
      type: Object,
      note: 'This object define the configuration for talking to the api : filters, sort, pagination, etc',
      default: () => ({
        dataPath: '',
        perPageField: 'perPage',
        pageField: 'page',
        filtersField: 'filters',
        sortField: 'sort',
        searchField: 'search'
      })
    },
    apiResponseConfig: {
      type: Object,
      note: 'This object define the configuration for processing data coming from the api : count, data path',
      default: () => ({
        dataPath: 'data.body',
        totalCountPath: 'data.totalCount'
      })
    },
    apiQueryParams: {
      type: Object,
      default: () => ({}),
      note:
        'A params object containing parameters that will be passed as query params to the api request.\n It\'s up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back.'
    },
    apiRequestHeaders: { type: Object, default: () => ({}) },
    useRouterMode: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: String,
      default: '',
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    title: { type: String, default: '' },
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
      note: 'Limit serves in case of local pagination to limit the number of results from the api, in order to avoid memory overflows'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    mode: {
      default: 'local',
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

        page: 0, // what page I want to show
        perPage: this.mode === 'remote' ? this.perPage : this.limit // how many items I'm showing per page
      },
      columnFilters: {},
      advancedFilters: [],
      parsedAdvancedFilters: {},
      data: [],
      showSkeleton: false,
    };
  },
  computed: {
    // @todo delete in future version
    params() {
      return this.apiQueryParams;
    },

    opts() {
      return _.merge(this.defaultOptions, this.options);
    },

    _translatedServerParams() {
      const translatedParams = {};
      const serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
      Object.keys(serverParams).forEach(field => {
        const newKey = this.apiRequestConfig[field + 'Field'] || field;
        translatedParams[newKey] = serverParams[field];
      });
      return translatedParams;
    }
  },

  watch: {
    needsRefresh: 'refreshLocalData',
    apiQueryParams() {
      // not sure this is needed...
      // this.serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
      // this.getItems({ useSkeleton: true, source: '[apiListMixin] apiQueryParams' });
    },
    entity: 'entityChanged',
    // store: changed => {},
    rows: 'refreshLocalData',
    $route(to) {
      this.connectRouteToPagination(to);
    }
  },

  created() {
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
    const userLang = window.navigator
      ? navigator.language || navigator.userLanguage
      : 'en';
    moment.locale(userLang);
  },

  mounted() {
    this.connectRouteToPagination(this.$route);
    this.refreshLocalData();
  },
  beforeDestroy() { },
  methods: {
    startCase: _.startCase,

    // eslint-disable-next-line
    async refreshLocalData(changed) {
      if (this.url) {
        //   this.data = [];
        // this.serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
        await this.getItems({ useSkeleton: true, source: '[apiListMixin] refreshLocalData' });
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
      this.getItems({ useSkeleton: true, source: '[apiListMixin] entityChanged' });
    },

    localRefreshCompleted() {
      this.$emit('update:needsRefresh', false);
      this.$emit('afterRefresh', { data: this.data });
    },

    /** GET ENTITY ITEMS */
    getItems(options = { useSkeleton: false }) {

      this.$emit('refresh');
      // if i got a refresh function
      if (this.refresh) {
        this.refresh();
        return;
      }

      if (!this.url) {
        return;
      }
      if (options.useSkeleton) {
        this.showSkeleton = options.useSkeleton;
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.info("[getItems]", this.showSkeleton, options.source, this._translatedServerParams);
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
          this.$emit('crud-list-updated', this.data);
          this.$emit('dataChanged', this.data);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.warn(err);
        })
        .finally(() => {
          this.showSkeleton = false;
          this.isRefreshing = false;
        });
    },

    onClick(item) {
      // @todo stop emitting the view event. itemClicked is enough
      this.opts &&
        this.opts.actions &&
        this.opts.actions.view &&
        this.$emit('view', item);
      this.$emit('itemClicked', item);
    },

    updateParams(newProps = { page: undefined, search: undefined, perPage: undefined, columnFilters: undefined, advancedFilters: undefined, parsedAdvancedFilters: undefined, filters: undefined }) {
      const columnFilters = newProps.columnFilters && Object.keys(newProps.columnFilters).length ? Object.assign({}, newProps.columnFilters) : {};


      // Format column values and present empty string from being sent to the server
      if (Object.keys(columnFilters).length > 0) {
        this.columnFilters = {};
        Object.keys(columnFilters).forEach(key => {
          if (columnFilters[key] != undefined && columnFilters[key] != '') {
            this.columnFilters[`${key}`] = {
              '$default': columnFilters[key]
            };
          }
        });
        delete newProps.columnFilters;
      }
      // store new advanced filter values
      if (newProps.advancedFilters) {
        this.advancedFilters = newProps.advancedFilters;
        this.parsedAdvancedFilters = newProps.parsedAdvancedFilters;
        delete newProps.advancedFilters;
        delete newProps.parsedAdvancedFilters;

      }
      // delete old values
      delete this.serverParams.filters;
      this.serverParams = _.merge(
        {},
        this.serverParams,
        newProps,
        {
          advancedFilters: undefined,
          filters: {
            ...this.parsedAdvancedFilters,
            ...this.columnFilters,
          }
        },
        this.apiQueryParams,
      );
      //      console.warn("updateParams", this.serverParams);
    },

    // sort functions for unkown types
    // eslint-disable-next-line
    sortFn(x, y, col, rowX, rowY) {
      return x < y ? -1 : x > y ? 1 : 0;
    },

    onPageChange(params) {
      window.App = { vue: this };
      this.pushChangesToRouter({ query: { ...this.$route.query, page: params.currentPage } });
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({ page: params.currentPage });
      this.getItems({ useSkeleton: true, source: '[apiListMixin] onPageChange' });
    },

    onPerPageChange(params) {
      this.pushChangesToRouter({ query: { ...this.$route.query, perPage: params.currentPerPage } });
      if (this.mode !== 'remote') {
        return;
      }
      this.updateParams({ perPage: params.currentPerPage });
      this.getItems({ useSkeleton: true, source: '[apiListMixin] onPerPageChange' });
    },

    onSearch(params) {
      // this.pushChangesToRouter({ query: { ...this.$route.query, search: params.searchTerm } });
      if (this.mode !== 'remote') {
        return;
      }
      let search = params.searchTerm;
      this.updateParams({ search, page: 1 });
      this.getItems({ useSkeleton: true, source: '[apiListMixin] onSearch' });
    },

    onSelectionChanged(selection) {
      if (selection) {
        this.selectedRows = selection.selectedRows;
      }
    },

    pushChangesToRouter(options) {
      // disable url update for now
      return;
      /*
      //@todo replace by a push state function
      if (!this.useRouterMode) {
        return;
      }
      this.$router.push(options).catch(err => {
        // Ignore the vueRouter err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          // But print any other errors to the console
          console.warn(err);
        }
      })
      */
    },

    connectRouteToPagination(to) {
      if (this.useRouterMode) {
        //        console.warn("to.query", to.query);
        this.updateParams({
          page: to.query.page, search: to.query.search,
          perPage: to.query.perPage,
          //   sort: to.query.sort,
          filters: to.query.filters,
        });
      }
    },

    exportCurrentArrayToExcel() {
      let CsvString = '';
      // eslint-disable-next-line
      const head = this.data[0];
      Object.keys(head).forEach(ColItem => {
        CsvString += `${ColItem},`;
      });
      CsvString += '\r\n';
      this.data.forEach(RowItem => {
        // eslint-disable-next-line
        Object.values(RowItem).forEach(ColItem => {
          CsvString += `${ColItem},`;
        });
        CsvString += '\r\n';
      });
      CsvString = `data:application/csv,${encodeURIComponent(CsvString)}`;
      const x = document.createElement('A');
      x.setAttribute('href', CsvString);
      x.setAttribute('download', `${this.entity || this.$options.name}.csv`);
      document.body.appendChild(x);
      x.click();
    }
  }
};