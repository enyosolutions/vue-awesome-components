/**
 * Mixin for components that talks to apis
 */

import _ from 'lodash';
import templatingMixin from './templatingMixin';

export default {
  mixins: [templatingMixin],
  props: {
    primaryKey: {
      type: String,
      default: function () {
        return this.awComponentsConfig && this.awComponentsConfig.primaryKey ? this.awComponentsConfig.primaryKey : 'id';
      }
    },
    url: { type: [String, Function], default: '' },
    apiUrl: { type: [String, Function], default: '' },
    apiRequestConfig: {
      type: Object,
      note: 'This object define the configuration for talking to the api : filters, sort, pagination, etc',
      default: () => ({
        dataPath: '',
        perPageField: 'perPage',
        pageField: 'page',
        filtersField: 'filters',
        filtersOperator: '',
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
      default: () => (undefined),
      note:
        'A params object containing parameters that will be passed as query params to the api request.\n It\'s up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back.'
    },
    apiRequestPermanentBodyParams: {
      type: Object,
      default: () => ({}),
      description: 'Object of data that will always be merged in the request sent to the server'
    },
    apiRequestPermanentQueryParams: {
      type: Object,
      default: () => ({}),
      description: 'A params object containing parameters that will be passed as query params to the api request.\n It\'s up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back.'
    },
    apiRequestHeaders: { type: Object, default: () => ({}) },
    entity: {
      type: String,
      default: '',
      note:
        'Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations'
    },
    refresh: { type: Function, default: undefined },
    delete: { type: Function, default: undefined },
    create: { type: Function, default: undefined },
    exportUrl: { type: String, default: undefined },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    },
  },
  mounted() {
    if (this.url) {
      console.warn('Url is @deprecated. Please use api url instead.');
    }
  },
  computed: {
    // @todo delete in future version
    params() {
      // eslint-disable-next-line
      console.info(
        'BC this.params is deprecated, use this.apiQueryParams instead'
      );
      return this.apiQueryParams;
    },

    opts() {
      return _.merge(this.defaultOptions, this.options);
    },


    _url() {
      const url = this.apiUrl || this.url || this.getApiUrl('apiUrl') || this.getApiUrl('url');
      // `/${this.identity}`; // removed because this is magic and it is hazardous (no way to no have an url)
      if (typeof url === 'function') {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem,
          items: this.items
        });
      }
      if (url && url.includes('{{')) {
        return this.templateParseUrl(url, {
          ...this.selectedItem,
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem,
          items: this.items
        })
      }
      return url;
    },

    _translatedServerParams() {
      const translatedParams = {};
      Object.keys(this.serverParams || {}).forEach(field => {
        const newKey = this.apiRequestConfig[field + 'Field'] || field;
        translatedParams[newKey] = this.serverParams[field];
      });
      return translatedParams;
    },

    _selectedItemUrl() {
      let url;
      if (this._url.indexOf('?') > -1) {
        url = new URL(this._url.indexOf('http') === 0 ? this._url : `http://localhost${this._url}`);
        url = `${url.pathname}/${this.selectedItem[this.primaryKey]}${url.search}`;
      } else {
        url = `${this._url}/${this.selectedItem[this.primaryKey]}`;
      }
      return url;
    },
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

  methods: {
    getData(res) {
      return this.apiResponseConfig &&
        this.apiResponseConfig.dataPath &&
        this.apiResponseConfig.dataPath != false
        ? _.get(res, this.apiResponseConfig.dataPath)
        : res.data;
    },

    getDataCount(res) {
      return this.apiResponseConfig &&
        this.apiResponseConfig.totalCountPath &&
        this.apiResponseConfig.totalCountPath != false
        ? _.get(res, this.apiResponseConfig.totalCountPath)
        : res.data.totalCount
    },

    mergeSelectedItemWithRequestProps() {
      if (this.apiRequestPermanentBodyParams) {
        this.selectedItem = _.merge(this.selectedItem, this.apiRequestPermanentBodyParams);
      }
    },

    getApiUrl(field) {
      return this[field] ||
        (this.mergedOptions && this.mergedOptions[field]) ||
        (this.options && this.options[field]) ||
        (this._model && this._model[field]) ||
        (this.field && this.field.url) ||
        (this.field && this.field.fieldoptions.url);
    }
  }
};