/**
 * Mixin for components that render lists from an arg or an api
 */

import Qs from 'qs';
import dayjs from 'dayjs';
import { cloneDeep, debounce, merge, get, startCase } from 'lodash';
import apiConfigMixin from './apiConfigMixin';
import componentStateMixin from './componentStateMixin';
import awEmitMixin from './awEmitMixin';

export default {
  mixins: [apiConfigMixin, awEmitMixin, componentStateMixin],
  props: {
    autoRefresh: { type: Boolean, default: false, description: 'Should we auto refresh the page ?' },
    autoRefreshInterval: {
      type: Number,
      default: 20,
      description: 'Interval in seconds that should be used to refresh the page'
    },
    rows: { type: Array, default: () => [] },

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
      return merge(this.defaultOptions, this.options);
    },

    _translatedServerParams() {
      const translatedParams = {};
      this.injectSegmentFilter(this.segmentQueryField, this.segmentValue);
      const serverParams = merge({}, this.serverParams, this.apiQueryParams, this.apiRequestPermanentQueryParams);


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
      const actions = cloneDeep(this._actionsBeforeCalculation);

      Object.entries(actions).forEach(([field, fieldData]) => {
        if (typeof fieldData !== 'boolean') {
          actions[field] = this.templateParseConditionalField(fieldData);
        }
      });
      return actions;
    },


    _actionsBeforeCalculation() {
      return merge(
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

    _saveStateKey() {
      return `${this.identity}-${this.$options.name}-${window.location.pathname}-state`;
    },
    /*
        serverParams2() {
          const params = merge({}, this.apiQueryParams, this.apiRequestPermanentQueryParams);
          Object.keys(params).forEach(field => {
            if (params[field] === undefined) {
              delete params[field];
            }
          });

          return params;
        }
        */
  },

  watch: {
    needsRefresh: 'refreshLocalData',
    apiQueryParams: {
      deep: true,
      handler(newValue, oldValue) {
        if (!newValue || JSON.stringify(newValue) === JSON.stringify(oldValue)) {
          return;
        }
        // not sure this is needed...
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line
          console.log('apiQueryParams refreshed', newValue, oldValue);
        }
        this.serverParams = merge({}, this.apiQueryParams, this.serverParams);
        this.getItems({ useSkeleton: true, source: '[apiListMixin] apiQueryParams' });
      },
    },
    entity: 'entityChanged',
    // store: changed => {},
    rows: 'refreshLocalData',
    url: 'refreshLocalData',
    $route(to) {
      this.connectRouteToPagination(to);
    }
  },

  created() {
  },
  beforeMount() {
    const userLang = window.navigator
      ? navigator.language || navigator.userLanguage
      : 'en';
    dayjs().locale(userLang);
  },

  mounted() {
    this.$awEventBus && this.$awEventBus.$on('aw-table-needs-refresh', this.refreshLocalData);
    this.onSearch = debounce(this.onSearchFresh, 300);
    this.restoreComponentState();
    this.connectRouteToPagination(this.$route);
    this.serverParams = merge({}, this.serverParams, this.apiQueryParams);
    this.getItems({ useSkeleton: true, source: '[apiListMixin] refreshLocalData' });
  },

  beforeDestroy() {
    this.$awEventBus && this.$awEventBus.$off('aw-table-needs-refresh', this.refreshLocalData);
  },

  methods: {
    startCase: startCase,

    // eslint-disable-next-line
    async refreshLocalData(changed) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('refreshLocalData', changed);
      }
      if (this._url && this.mode !== 'local') {
        //   this.data = [];
        this.serverParams = merge({}, this.serverParams, this.apiQueryParams);
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
      this.$emit('after-local-refresh', { data: this.data });
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
      // Attention ne pas interdire les appels si on en mode remote

      if (options.useSkeleton) {
        this.showSkeleton = options.useSkeleton; ''
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.debug("[getItems]", this.showSkeleton, options.source, this._translatedServerParams);
      }
      this.isRefreshing = true;
      this.$awEmit('before-api-refresh', { component: 'aw-listing', url: this._url })
      return this.$awApi
        .get(
          `${this._url}${this._url.indexOf('?') === -1 ? '?' : '&'}${Qs.stringify(this._translatedServerParams, {})}`,
          {}
        )
        .then(res => {
          this.$awEmit('after-api-refresh', { response: res, component: 'aw-listing', url: this._url });
          this.data =
            this.apiResponseConfig &&
              this.apiResponseConfig.dataPath
              ? get(res, this.apiResponseConfig.dataPath)
              : res.data;

          this.totalCount =
            this.apiResponseConfig &&
              this.apiResponseConfig.totalCountPath
              ? get(res, this.apiResponseConfig.totalCountPath)
              : res.data.totalCount;
          this.$emit('crud-list-updated', this.data); // @deprecated
          this.$emit('afterRefresh', this.data);
          this.$awEmit('table-refreshed', { component: 'aw-listing', url: this.url, data: this.data })
          this.$emit('dataChanged', this.data); // @deprecated
          this.$awEmit('data-changed', { component: 'aw-listing', url: this.url, data: this.data })
          this.$awEmit('after-refresh', { component: 'aw-listing', url: this.url, data: this.data })
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
      if (newProps.page !== undefined) {
        this.serverParams.page = newProps.page;
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

      this.serverParams = merge(
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
      this.updateParams({ page: params.currentPage });
      this.pushChangesToRouter({ query: { ...this.$route.query, page: params.currentPage } }, false);
      if (this.mode !== 'remote') {
        return;
      }

      this.getItems({ useSkeleton: true, source: '[apiListMixin] onPageChange' });
    },

    onPerPageChange(params) {
      // reset pagination in case of perPage change
      this.updateParams({ perPage: params.currentPerPage });
      this.pushChangesToRouter({
        query: {
          ...this.$route.query,
          // page: 1,
          perPage: params.currentPerPage
        }
      }, true);
      if (this.mode !== 'remote') {
        return;
      }
      this.getItems({ useSkeleton: true, source: '[apiListMixin] onPerPageChange' });
    },

    onSearch: () => null,
    /**
     * En mode local si on push les changements dans le router, cela lance une requete
     *
     * @param {*} params
     * @returns
     */
    onSearchFresh(params) {
      let search = params.searchTerm;
      this.updateParams({ search, page: 0 });
      if (this.mode !== 'remote') {
        return;
      }
      this.pushChangesToRouter({ query: { ...this.$route.query, search: params.searchTerm } }, true);
      this.getItems({ useSkeleton: true, source: '[apiListMixin] onSearch' });
    },

    onSelectionChanged(selection) {
      if (selection) {
        this.selectedRows = selection.selectedRows;
      }
    },

    pushChangesToRouter(options = {}, replace = false) {
      this.saveComponentState();
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.info('PUSH CHANGES TO ROUTER', {
          path: this.$route.path,
          ...options,
          query: {
            ...options.query,
            ...this.routeQueryParams,
            // sort: undefined,
          }
        }, JSON.stringify(options));
      }
      if (!this.useRouterMode) {
        return;
      }
      const method = replace ? 'replace' : 'push';
      const query = {
        ...this.routeQueryParams,
        ...this.$route.query,
        ...options.query,
        // sort: undefined
      };
      Object.keys(query).forEach((key) => {
        if (query[key] === undefined) {
          delete query[key];
        }
      });

      this.$router[method]({
        path: this.$route.path,
        ...options,
        query,
      }).catch(err => {
        // Ignore the vueRouter err regarding  navigating to the page they are already on.
        if (
          err.name !== 'NavigationDuplicated' &&
          !err.message.includes('Avoided redundant navigation to current location')
        ) {
          // But print any other errors to the console
          console.warn(err);
        }
      });
      // disable url update for now
      //@todo replace by a push state function
      /*
      if (options && options.query) {
        if (options.query.sort) {
          this.routeQueryParams.sort = options.query.sort;
        }
        this.routeQueryParams = merge(this.routeQueryParams, options.query);
      }
      console.warn('pushChangesToRouter', this.routeQueryParams)
      this.saveComponentState();



      // window.history.pushState({}, null, '?' + Qs.stringify(this.routeQueryParams));
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
            search: to.query.search || undefined,
            perPage: to.query.perPage || undefined,
            filters: to.query.filters || undefined,
            //  columns: to.query.columns || '',
            sort: to.query.sort || '',
          });
          this.routeQueryParams = {
            page: to.query.page || undefined,
            search: to.query.search || undefined,
            perPage: to.query.perPage || undefined,
            filters: to.query.filters || undefined,
            // columns: to.query.columns || '',
            sort: to.query.sort || '',
          }
          return;
        }

        if (Object.keys(this.routeQueryParams).length) {
          this.updateParams({ ...this.routeQueryParams, columns: undefined });
          this.pushChangesToRouter(undefined, true);
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
      x.setAttribute('download', `${this.entity || this.identity || this.name || this.title || this.$options.name
        }.csv`);
      document.body.appendChild(x);
      x.click();
    },

    saveComponentState() {
      if (this.isSaveStateEnabledCpt && this.identity && window.localStorage) {
        try {
          const columnsState = { ...this.columnsState };
          delete columnsState.__ACTIONS;
          // @fixme probably not a good idea to save the state of filters
          localStorage.setItem(this._saveStateKey, JSON.stringify({
            routeQueryParams: this.savePaginationState ? { ...this.routeQueryParams, filters: undefined } : undefined,
            columnsState: this.saveColumnsState ? columnsState : undefined,
            columnsFilterState: this.saveColumnsState ? this.columnsFilterState : undefined,
            columnFilters: this.saveColumnsState ? this.columnFilters : undefined,
            advancedFilters: this.saveColumnsState ? this.advancedFilters : undefined,
            listingDisplayMode: this.listingDisplayMode
          }));
        }
        catch (err) {
          console.warn('saveComponentState', err.message);
        }
      }
    },

    async restoreComponentState() {
      if (this.isSaveStateEnabledCpt && this.identity && window.localStorage) {
        try {
          let parsedState = await localStorage.getItem(this._saveStateKey);
          if (parsedState) {
            parsedState = JSON.parse(parsedState);
            if (this.savePaginationState) {
              this.routeQueryParams = parsedState.routeQueryParams;
            }
            if (parsedState.columnsState && this.saveColumnsState) {
              this.columnsState = parsedState.columnsState;
            }
            if (parsedState.columnsFilterState && this.saveColumnsState) {
              this.columnsFilterState = parsedState.columnsFilterState;
            }
            // restore listing stage only if the state is saved and is  known a
            if (parsedState.listingDisplayMode && this.listingDisplayMode && this.enabledListingModes && this.enabledListingModes.includes(parsedState.listingDisplayMode)) {
              this.listingDisplayMode = parsedState.listingDisplayMode;
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
        window.localStorage && localStorage.removeItem(this._saveStateKey);
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
      this.$awApi
        .get(this.exportUrl, {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement('a');
            const name = res.data.url.split('/').pop();
            link.download = `${this.entity || ''}_export_${name || ''}`;
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
      // reset pagination for search.
      this.updateParams({ page: 0 });
      this.getItems({ useSkeleton: true, source: '[apiListMixin] segmentChanged' });
    }
  }
};