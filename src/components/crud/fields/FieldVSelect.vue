<template>
  <div class="awesome-vue-select">
    <!--
    <enyo-select
      :id="fieldOptions.id"
      :options="internalOptions"
      :value="internalValue"
      :multiple="fieldOptions.multiple"
      :track-by="_trackBy || null"
      :label="fieldOptions.label || null"
      :max="schema.max || fieldOptions.max || null"
      :searchable="schema.searchable || fieldOptions.searchable || true"
      :internal-search="
        schema.internalSearch || fieldOptions.internalSearch || !dataUrl
      "
      :disabled="disabled"
      @search-change="apiRequestDebounced"
      :url="dataUrl"
      v-model="value"
      @input="updateSelected"
    >
    </enyo-select>
    -->

    <v-select
      v-if="!isAjax || isDataReady"
      v-bind="fieldOptions"
      :label="fieldOptions.label || 'label'"
      :filterable="!_useApiFilter"
      :options="computedOptions"
      :disabled="disabled"
      :required="required"
      @search="onSearch"
      :value="model[schema.model]"
      @input="updateSelected"
      :reduce="reduce"
      :getOptionLabel="formatLabel"
    ></v-select>
    <div v-if="schema.relation || schema.relationRoute" class="aw-field-select-add-relation">
      <template v-if="model && model[schema.model]">
        <router-link
          v-if="!schema.relationRoute"
          :to="'/app/' + kebabCase(schema.relation) + '/' + model[schema.model] + ''"
          class="external-link"
        >
          <i class="fa fa-eye text-info"></i>
        </router-link>
        <router-link
          v-if="!schema.relationRoute"
          :to="'/app/' + kebabCase(schema.relation) + '/' + model[schema.model] + '/edit'"
          class="external-link"
        >
          <i class="fa fa-edit text-info"></i>
        </router-link>
      </template>
      <router-link
        v-if="!schema.relationRoute"
        :to="'/app/' + kebabCase(schema.relation) + '/new'"
        class="external-link"
      >
        <i class="fa fa-plus text-info"></i>
      </router-link>

      <div
        v-if="schema.relationRoute && isFunction(schema.relationRoute)"
        @click="addNewUrl('new')"
        class="external-link"
      >
        &nbsp; <i class="fa fa-plus text-info"></i>
      </div>
      <router-link
        v-if="schema.relationRoute && !isFunction(schema.relationRoute)"
        :to="addNewUrl + '/new'"
        class="external-link"
      >
        &nbsp; <i class="fa fa-plus text-info"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import VueFormGenerator from '../../form/form-generator';
import selectMixin from '../../../mixins/selectMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';
import vSelect from 'vue-select';
import _ from 'lodash';

export default {
  components: { vSelect },
  mixins: [selectMixin, VueFormGenerator.abstractField],
  props: {
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
        "A params object containing parameters that will be passed as query params to the api request.\n It's up to the server to treat these requests. Example of uses incluse passing a `filter` object, or an options object. In one of our projects we pass the args options.searchMode = `exact|startWith|wildcard|regex` to determine how the filtering options will ve treated in the back."
    },
    apiRequestHeaders: { type: Object, default: () => ({}) },
    preloadQueryParam: { type: String, default: 'perPage=10000' },
    addNewUrl: { type: [String, Function], default: '' }
  }, // 'schema', 'disabled', 'value' are in the abstract field
  mounted() {
    if (this.schema.fieldOptions && this.schema.fieldOptions.preload) {
      this.preloadFn();
    } else {
      this.onSearch(this.model[this.schema && this.schema.model] || '', () => null);
    }
  },
  data() {
    return {
      isDataReady: false
    };
  },
  computed: {
    fieldOptions() {
      return this.schema.fieldOptions || {};
    },
    // we need to override the mixin definition
    internalOptions() {
      return (
        this.apiOptions || this.schema.fieldOptions.values || this.schema.fieldOptions.options || this.schema.values
      );
    },
    // @deprecated
    customLabel() {
      if (
        typeof this.schema.fieldOptions !== 'undefined' &&
        typeof this.schema.fieldOptions.customLabel !== 'undefined' &&
        typeof this.schema.fieldOptions.customLabel === 'function'
      ) {
        return this.schema.fieldOptions.customLabel;
      }
      // this will let the multiselect library use the default behavior if customLabel is not specified
      return undefined;
    },

    dataUrl() {
      // eslint-disable-next-line
      return this.url || this.fieldOptions.url;
    },

    _trackBy() {
      return (
        this.$props.trackBy ||
        this.fieldOptions.trackBy ||
        this.fieldOptions.relationKey ||
        this.schema.relationKey ||
        this.schema.foreignKey
      );
    },

    _labelField() {
      return this.fieldOptions.relationLabel || this.schema.relationLabel || this.fieldOptions.label || 'label';
    },
    _values() {
      return Array.isArray(this.model[this.schema.model])
        ? this.model[this.schema.model].map((v) => v[this._trackBy])
        : this.model[this.schema.model];
    },
    _preloadQueryParam() {
      return this.fieldOptions.preloadQueryParam || this.preloadQueryParam;
    },

    _usePreloadMode() {
      return this.fieldOptions && this.fieldOptions.preload;
    },

    _useApiFilter() {
      return this.dataUrl && !this._usePreloadMode;
    }
  },
  watch: {
    vModelValue(newValue, oldValue) {
      if (newValue != oldValue) {
        this.setIncomingValue(newValue, oldValue);
      }
    },

    value(newValue, oldValue) {
      if (newValue != oldValue) {
        this.setIncomingValue(newValue, oldValue);
      }
    }
  },
  created() {
    this.apiRequestDebounced = _.debounce((value) => {
      return this.loadRemoteEntities(value);
    }, 2000);
  },

  methods: {
    get: _.get,
    kebabCase: _.kebabCase,
    isFunction: _.isFunction,
    addTag(newTag, id) {
      const onNewTag = this.fieldOptions.onNewTag;
      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value);
      }
    },

    // Sets the value from the the the v-model attribute
    async setIncomingValue(value, oldValue, loop) {
      if (value === oldValue) {
        return;
      }

      if (this.dataUrl && (!this.internalOptions || this.internalOptions.length < 1) && !loop) {
        await this.apiRequestDebounced(value);
      }
      if (Array.isArray(value)) {
        this.internalValue =
          this.internalOptions &&
          this.internalOptions.filter((option) => {
            const searchKey = typeof option === 'string' ? option : option[this._trackBy];
            return value.indexOf(searchKey) > -1;
          });
        return;
      }
      this.internalValue =
        this.internalOptions &&
        this.internalOptions.find((option) => {
          const searchKey = typeof option === 'string' ? option : option[this._trackBy];
          return searchKey == value;
        });

      if (!this.internalValue && this.dataUrl && !loop) {
        const ok = await this.apiRequestDebounced(value);
        if (ok) {
          this.setIncomingValue(value, null, true);
        }
      }
    },

    updateSelected(value) {
      this.internalValue = value;
      if (!value || typeof value === 'string' || typeof value === 'number') {
        this.$emit('input', value);
        this.value = value;
      } else if (Array.isArray(value)) {
        const valueArray = value.map((item) => (this._trackBy && item[this._trackBy] ? item[this._trackBy] : item));
        this.$emit('input', valueArray);
        this.value = valueArray;
      } else {
        this.$emit('input', value[this._trackBy]);
        this.value = value[this._trackBy];
      }
    },

    onSearch(search, loading) {
      if (!this._useApiFilter) {
        return;
      }
      loading(true);
      this.search(loading, search, this);
    },

    preloadFn() {
      this.$http
        .get(
          `${this.dataUrl}${this.dataUrl.indexOf('?') === -1 ? '?' : '&'}${this._preloadQueryParam || 'perPage=10000'}`,
          {
            params: { ...this.fieldOptions.queryParams }
          }
        )
        .then((res) => {
          this.apiOptions = this.getData(res);
        })
        .finally(() => {
          this.isDataReady = true;
        });
    },

    search(loading, search, vm) {
      this.$http
        .get(this.dataUrl, {
          params: { ...this.fieldOptions.queryParams, search }
        })
        .then((res) => {
          this.apiOptions = this.getData(res);
        })
        .finally(() => {
          loading(false);
          this.isDataReady = true;
        });
    },

    searchDebounced: _.debounce((loading, search, vm) => {
      vm.$http
        .get(vm.dataUrl, {
          params: { ...vm.fieldOptions.queryParams, search }
        })
        .then((res) => {
          vm.apiOptions = vm.getData(res);
          console.log(this.apiOptions, this.apiResponseConfig);
        })
        .finally(() => {
          loading(false);
          vm.isDataReady = true;
        });
    }, 150),

    templateParser(source, data) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      var compiled = _.template(source);
      return compiled(data);
    },

    formatLabel(item) {
      let label;
      if (this._labelField.indexOf('{{') > -1) {
        label = this.templateParser(this._labelField, item);
      } else {
        label = this.get(item, this._labelField, '');
      }

      return `${item[this._trackBy]} - ${label}`;
    },

    reduce(item) {
      return this.get(item, this._trackBy);
    },

    getData(res) {
      return this.apiResponseConfig && this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
        ? _.get(res, this.apiResponseConfig.dataPath)
        : res.data;
    },

    getDataCount(res) {
      return this.apiResponseConfig &&
        this.apiResponseConfig.totalCountPath &&
        this.apiResponseConfig.totalCountPath != false
        ? _.get(res, this.apiResponseConfig.totalCountPath)
        : res.data.totalCount;
    }
  }
};
</script>

<style scoped>
.awesome-vue-select {
  width: 100%;
}

.awesome-vue-select .vs__clear {
  border: none;
}

.awesome-vue-select .v-select:not(.vs--open) {
  overflow-x: hidden;
}

.vs--searchable .vs__dropdown-toggle span {
  white-space: nowrap;
}

.awesome-vue-select .vs__clear {
  border: none;
}

.aw-field-select-add-relation {
  position: absolute;
  top: 6px;
  right: 15px;
}
.aw-field-select-add-relation a {
  text-decoration: none;
  font-weight: 500;
}
.aw-field-select-add-relation span {
  opacity: 0;
  max-width: 0;
  transition: all linear 200ms;
  text-decoration: none;
}
.aw-field-select-add-relation:hover span {
  opacity: 1;
  max-width: 100px;
}
</style>
