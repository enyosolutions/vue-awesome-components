/**
 * Mixin for components that talks to apis
 */

import _ from "lodash";

export default {
  props: {
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
    entity: {
      type: String,
      default: "",
      note:
        "Unique name of the currently displayed list. This serve to retrieve and display titles from the vue-i8n translations"
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
  computed: {
    // @todo delete in future version
    params() {
      // eslint-disable-next-line
      console.info(
        "BC this.params is deprecated, use this.apiQueryParams instead"
      );
      return this.apiQueryParams;
    },

    opts() {
      return _.merge(this.defaultOptions, this.options);
    },


    _url() {
      const url =
        this.url ||
        (this.options && this.options.url) ||
        (this._model && this._model.url) ||
        (this.mergedOptions && this.mergedOptions.url) ||
        `/${this.modelName}`;
      if (typeof url === "function") {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem,
          items: this.items
        });
      }
      return url;
    },
    _translatedServerParams() {
      const translatedParams = {};
      Object.keys(this.serverParams || {}).forEach(field => {
        const newKey = this.apiRequestConfig[field + "Field"] || field;
        translatedParams[newKey] = this.serverParams[field];
      });
      return translatedParams;
    },

    _selectedItemUrl() {
      let url;
      if (this._url.indexOf("?") > -1) {
        url = new URL(this._url.indexOf("http") === 0 ? this._url : `http://localhost${this._url}`);
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
        const axios = require("axios");
        this.$http = axios;
      } catch (err) {
        // console.warn(err.message);
      }
    }
  },
};