/**
 * Mixin for components that render lists from an arg or an api
 */

import qs from 'qs';
import dayjs from 'dayjs';
import _ from 'lodash';
import apiConfigMixin from './apiConfigMixin';
import awEmitMixin from './awEmitMixin';

export default {
  mixins: [apiConfigMixin, awEmitMixin],
  props: {
    rows: { type: Array, default: () => [] },
    primaryKey: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.primaryKey) || 'id';
      },
      description: 'Which field to use as primary key. By default it\'s `id` but it can be `_id`  or anything that you want',

    },
    url: { type: String, default: '' },

    useRouterMode: {
      type: Boolean,
      default: false,
      description: 'Determine whether the component should interact with the vue-router.'
    },
    entity: {
      type: String,
      default: '',
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    identity: {
      type: [String, Number], required: false,
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },

    title: { type: [String, Boolean], default: '' },
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
    },
    savePaginationState: { type: Boolean, default: false, description: 'Whether we should save the state of the navigation page, perPage' },
    saveColumnsState: { type: Boolean, default: false, description: 'Whether we should save the state of the navigation (columns, sort etc' },
    segmentField: {
      type: String,
      title: 'The field to use for segmenting the lists',
      description: 'This field is used for segmenting the top section'
    },
    segment: {
      type: [Object, String],
      title: 'The field to use for segmenting the lists',
      description: 'This field is used for segmenting the top section'
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
        perPage: this.perPage// how many items I'm showing per page
      },
      columnFilters: {},
      advancedFilters: [],
      parsedAdvancedFilters: {},
      data: [],
      showSkeleton: false,
      routeQueryParams: {},
      segmentQueryField: '',
      segmentValue: ''
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
      this.injectSegmentFilter(this.segmentQueryField, this.segmentValue);
      const serverParams = _.merge({}, this.serverParams, this.apiQueryParams, this.apiRequestPermanentQueryParams);


      Object.keys(serverParams).forEach(field => {
        const newKey = this.apiRequestConfig[field + 'Field'] || field;
        translatedParams[newKey] = serverParams[field];
      });
      if (this.mode === 'local') {
        translatedParams.perPage = this.limit;
      }
      return translatedParams;
    },

    isSaveStateEnabledCpt() {
      return this.saveColumnsState || this.savePaginationState;
    },

    _actions() {
      const actions = _.cloneDeep(this._actionsBeforeCalculation);

      Object.entries(actions).forEach(([field, fieldData]) => {
        if (typeof fieldData !== 'boolean') {
          actions[field] = this.templateParseConditionalField(fieldData);
        }
      });
      return actions;
    },


    _actionsBeforeCalculation() {
      return _.merge(
        {},
        this.actions
        || (this.mergedOptions && this.mergedOptions.actions) // old location kept for BC
        || (this.optionsComputed && this.optionsComputed.actions) // old location kept for BC
        || (this.options && this.options.actions)
      );
    },

    segmentFieldDefinitionComputed() {
      if (!this.segmentField) {
        return '';
      }
      if (this.columns) {
        const field = this.columns.find((f) => f.field === this.segmentField);
        if (field) {
          return field;
        }
      }
      return '';
    },

  },

  watch: {
    needsRefresh: 'refreshLocalData',
    apiQueryParams(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }
      // not sure this is needed...
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.log('apiQueryParams refreshed', newValue, oldValue);
      }
      this.serverParams = _.merge({}, this.serverParams, this.apiQueryParams);
      this.getItems({ useSkeleton: true, source: '[apiListMixin] apiQueryParams' });
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
    dayjs().locale(userLang);
  },

  mounted() {
    this.$awEventBus && this.$awEventBus.$on('aw-table-needs-refresh', this.refreshLocalData);
    this.restoreComponentState();
    this.connectRouteToPagination(this.$route);
    this.refreshLocalData();
  },
  beforeDestroy() {
    this.$awEventBus && this.$awEventBus.$off('aw-table-needs-refresh', this.refreshLocalData);

  },
  methods: {
    startCase: _.startCase,

    // eslint-disable-next-line
    async refreshLocalData(changed) {
      if (this._url) {
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
      this.data = this._url ? [] : this.rows;
      this.serverParams = {};
      this.getItems({ useSkeleton: true, source: '[apiListMixin] entityChanged' });
    },

    localRefreshCompleted() {
      this.$emit('update:needsRefresh', false);
      this.$emit('afterRefresh', { data: this.data });
    },

    /** GET ENTITY ITEMS */
    getItems(options = { useSkeleton: false }) {

      // this.$emit('refresh');
      // if i got a refresh function
      if (this.refresh) {
        this.refresh({
          filters: this.serverParams && this.serverParams.filters,
          translatedParams: this._translatedServerParams
        });
        return;
      }

      if (!this._url) {
        return;
      }
      if (options.useSkeleton) {
        this.showSkeleton = options.useSkeleton; ''
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.debug("[getItems]", this.showSkeleton, options.source, this._translatedServerParams);
      }
      this.isRefreshing = true;
      this.$awEmit('before-api-refresh', { component: 'aw-table', url: this._url })
      return this.$http
        .get(
          `${this._url}${this._url.indexOf('?') === -1 ? '?' : '&'}${qs.stringify(this._translatedServerParams, {})}`,
          {}
        )
        .then(res => {
          this.data =
            this.apiResponseConfig &&
              this.apiResponseConfig.dataPath
              ? _.get(res, this.apiResponseConfig.dataPath)
              : res.data;

          this.totalCount =
            this.apiResponseConfig &&
              this.apiResponseConfig.totalCountPath
              ? _.get(res, this.apiResponseConfig.totalCountPath)
              : res.data.totalCount;
          this.$emit('crud-list-updated', this.data); // @deprecated
          this.$awEmit('table-refreshed', { component: 'aw-table', url: this.url, data: this.data })
          this.$emit('dataChanged', this.data); // @deprecated
          this.$awEmit('data-changed', { component: 'aw-table', url: this.url, data: this.data })
        })

        .catch(err => {
          // eslint-disable-next-line
          console.warn(err);
          this.apiErrorCallback(err);
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

    updateParams(newProps = { page: undefined, search: undefined, perPage: undefined, columnFilters: undefined, advancedFilters: undefined, parsedAdvancedFilters: undefined, filters: undefined, columns: undefined, sort: undefined, permanent: false }) {
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
      if (newProps.columns) {
        this.columnsState = newProps.columns;
      }

      // store new advanced filter values
      if (newProps.sort) {
        this.serverParams.sort = newProps.columns;
      }
      // store new advanced filter values
      if (newProps.advancedFilters) {
        this.advancedFilters = newProps.advancedFilters;
        delete newProps.advancedFilters;
      }
      if (newProps.parsedAdvancedFilters) {
        this.parsedAdvancedFilters = newProps.parsedAdvancedFilters;
        delete newProps.parsedAdvancedFilters;
      }
      // delete old values
      if (!newProps.permanent) {
        delete this.serverParams.filters;
      } else {
        Object.keys(this.parsedAdvancedFilters).forEach((filter) => {
          if (this.serverParams.filters[filter]) {
            if (filter !== '$relation') {
              delete this.serverParams.filters[filter];
            }
          }
          Object.keys(this.parsedAdvancedFilters[filter]).forEach((item) => {
            if (filter === '$relation') {
              Object.keys(this.parsedAdvancedFilters[filter][item]).forEach((el) => {
                if (!this.parsedAdvancedFilters[filter][item][el]) {
                  delete this.parsedAdvancedFilters[filter][item];
                  if (this.serverParams.filters[filter] && this.serverParams.filters[filter][item]) {
                    delete this.serverParams.filters[filter][item];
                  }
                }
              })
            } else if (!this.parsedAdvancedFilters[filter][item]) {
              delete this.serverParams.filters[filter];
              delete this.parsedAdvancedFilters[filter];
            }
          })
        })
      }

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
      this.saveComponentState();
      return;
      // disable url update for now
      //@todo replace by a push state function
      /*
      if (options && options.query) {
        if (options.query.sort) {
          this.routeQueryParams.sort = options.query.sort;
        }
        this.routeQueryParams = _.merge(this.routeQueryParams, options.query);
      }
      console.warn('pushChangesToRouter', this.routeQueryParams)
      this.saveComponentState();

      if (!this.useRouterMode) {
        return;
      }

      // window.history.pushState({}, null, '?' + qs.stringify(this.routeQueryParams));
      console.log('Final push to router', { ...options, query: this.routeQueryParams });

      this.$router.push({ path: this.$route.path, ...options, query: { ...this.routeQueryParams, sort: undefined } }).catch(err => {
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
      // @fixme
      if (this.useRouterMode) {
        //        console.warn("to.query", to.query);
        if (Object.keys(to.query).length) {
          this.updateParams({
            page: to.query.page,
            search: to.query.search || '',
            perPage: to.query.perPage || '',
            filters: to.query.filters || '',
            //  columns: to.query.columns || '',
            //   sort: to.query.sort || '',
          });
          this.routeQueryParams = {
            page: to.query.page || '',
            search: to.query.search || '',
            perPage: to.query.perPage || '',
            filters: to.query.filters || '',
            // columns: to.query.columns || '',
            // sort: to.query.sort || '',
          }
          return;
        }

        if (Object.keys(this.routeQueryParams).length) {
          this.updateParams({ ...this.routeQueryParams, columns: undefined });
          this.pushChangesToRouter();
          return;
        }

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
    },

    saveComponentState() {
      if (this.isSaveStateEnabledCpt && this.uuid && window.localStorage) {
        try {
          localStorage.setItem(`${this.uuid}-${this.$options.name}-state`, JSON.stringify({
            routeQueryParams: this.savePaginationState ? this.routeQueryParams : undefined,
            columnsState: this.saveColumnsState ? this.columnsState : undefined,
            columnFilters: this.saveColumnsState ? this.columnFilters : undefined,
            advancedFilters: this.saveColumnsState ? this.advancedFilters : undefined,
          }));
        }
        catch (err) {
          console.warn(err.message);
        }
      }
    },

    async restoreComponentState() {
      if (this.isSaveStateEnabledCpt && this.uuid && window.localStorage) {
        try {
          let parsedState = await localStorage.getItem(`${this.uuid}-${this.$options.name}-state`);
          if (parsedState) {
            parsedState = JSON.parse(parsedState);
            if (this.savePaginationState) {
              this.routeQueryParams = parsedState.routeQueryParams;
            }
            if (parsedState.columnsState && this.saveColumnsState) {
              this.columnsState = parsedState.columnsState;
            }
            // @fixme
            // this.pushChangesToRouter();
          }
        }
        catch (err) {
          console.warn(err.message);
        }
      }
    },

    clearComponentState() {
      try {
        window.localStorage && localStorage.removeItem(`${this.uuid}-${this.$options.name}-state`);
      }
      catch (err) {
        console.warn(err);
      }
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
    },

    injectSegmentFilter(segmentField, segmentValue) {
      if (segmentValue === 'ALL') {
        delete this.serverParams[segmentField];
        const filtersField = this.apiRequestConfig.filtersField;
        if (this.serverParams[filtersField] && this.serverParams[filtersField][segmentField]) {
          delete this.serverParams[filtersField][segmentField];
        }
        this.segmentValue = '';
      }
      else {
        if (!this.serverParams.filters) {
          this.serverParams.filters = {};
        }
        if (!this.apiRequestConfig.filtersField) {
          this.serverParams[segmentField] = this.segmentValue;
        }
        else {
          if (!this.serverParams[this.apiRequestConfig.filtersField][segmentField]) {
            this.serverParams[this.apiRequestConfig.filtersField][segmentField] = {};
          }
          if (this.apiRequestConfig.filtersOperator) {

            this.serverParams[this.apiRequestConfig.filtersField][segmentField][this.apiRequestConfig.filtersOperator] = this.segmentValue;
          }
          else {
            this.serverParams[this.apiRequestConfig.filtersField][segmentField] = this.segmentValue;
          }
        }
      }
    },
    onSegmentChange({ segmentField, segmentValue }) {
      this.segmentValue = segmentValue;
      this.segmentQueryField = segmentField;
      this.injectSegmentFilter(segmentField, segmentValue);
      this.getItems({ useSkeleton: true, source: '[apiListMixin] segmentChanged' });
    }
  }
};