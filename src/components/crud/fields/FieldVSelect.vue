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
      :multiple="multiple || fieldOptions.multiple || schema.multiple"
      :taggable="fieldOptions.taggable"
      :label="fieldOptions.label || 'label'"
      :filterable="!_useApiFilter"
      :options="computedOptions"
      :disabled="disabled || schema.disabled || schema.readonly"
      :required="required"
      @open="preloadFn"
      @search="onSearch"
      :value="model[schema.model]"
      @input="updateSelected"
      :reduce="reduce"
      :getOptionLabel="formatLabel"
    ></v-select>
    <div
      v-if="(schema.relation || schema.relationRoute) && !fieldOptions.disableRelationActions"
      class="aw-field-select-relation-actions"
    >
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

      <Popper
        trigger="clickToOpen"
        transition="fade"
        :append-to-body="true"
        :options="{
          placement: 'auto',
          modifiers: { offset: { offset: '0,10px' } }
        }"
        @show="displayEditModal = true"
        @hide="displayEditModal = false"
      >
        <button slot="reference" type="button" class="external-link" @click="displayEditModal = true">
          &nbsp; <i class="fa fa-plus text-info"></i>
        </button>
        <div v-show="displayEditModal" class="vselect-popup-width" ref="vselectPopup">
          <AwesomeForm
            v-if="displayEditModal"
            :identity="schema.relation"
            mode="create"
            :item="{}"
            displayMode="page"
            :standalone="false"
            @closeRequested="
              displayEditModal = false;
              loadRemoteEntities();
            "
            @cancel="displayEditModal = false"
            :useSimpleCreateForm="true"
          ></AwesomeForm>
        </div>
      </Popper>
      <!-- <router-link
        v-if="!schema.relationRoute"
        :to="'/app/' + kebabCase(schema.relation) + '/new'"
        class="external-link"
      >
        <i class="fa fa-plus text-info"></i>
      </router-link> -->

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
import vSelect from 'vue-select';
import _ from 'lodash';
import Popper from 'vue-popperjs';
import VueFormGenerator from '../../form/form-generator';
import selectMixin from '../../../mixins/selectMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';

export default {
  name: 'field-vSelect',
  components: {
    vSelect,
    Popper,
    AwesomeForm: () => import('../AwesomeForm.vue')
  },
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
    multiple: { type: Boolean, default: false },
    addNewUrl: { type: [String, Function], default: '' }
  }, // 'schema', 'disabled', 'value' are in the abstract field
  async mounted() {
    if (this.schema.fieldOptions && this.schema.fieldOptions.preload) {
      this.preloadFn();
    } else {
      this.onSearch(this.model[this.schema && this.schema.model] || '', () => null);
    }
  },
  data() {
    return {
      isDataReady: false,
      displayEditModal: false
    };
  },
  computed: {
    fieldOptions() {
      return (this.schema && this.schema.fieldOptions) || this.$props.fieldOptions || {};
    },
    // we need to override the mixin definition
    internalOptions() {
      return (
        this.apiOptions || this.fieldOptions.values || this.fieldOptions.options || (this.schema && this.schema.values)
      );
    },
    // @deprecated
    customLabel() {
      if (
        typeof this.fieldOptions !== 'undefined' &&
        typeof this.fieldOptions.customLabel !== 'undefined' &&
        typeof this.fieldOptions.customLabel === 'function'
      ) {
        return this.fieldOptions.customLabel;
      }
      // this will let the multiselect library use the default behavior if customLabel is not specified
      return undefined;
    },

    dataUrl() {
      // eslint-disable-next-line
      let url = this.url || this.fieldOptions.url;
      if (url && url.indexOf('{{') > -1) {
        url = this.templateParser(url, { ...this.$props.model, currentItem: this.$props.model, context: this });
      }
      return url;
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
      return this.model && Array.isArray(this.model[this.schema.model])
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
    },

    popupCss() {
      if (this.$refs.vselectPopup) {
        const dimensions = this.$ref.vselectPopup.getBoundingClientRect();
        return {
          position: 'fixed',
          'z-index': 9999999,
          top: `calc(50vh - ${dimensions.height / 2}px) / 2)`,
          left: `calc(50vw - ${dimensions.width / 2}px) / 2)`,
          width: dimensions.width + 'px',
          background: '#fff'
        };
      }
      const width = 300;
      const height = 300;
      return {
        position: 'fixed',
        'z-index': 9999999,
        top: `calc(50vh - ${height / 2}px)`,
        left: `calc(50vw - ${width / 2}px)`,
        width: width + 'px',
        height: height + 'px',
        background: '#fff'
      };
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
    }, 200);
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
      if (!this.dataUrl) {
        return;
      }
      this.$http
        .get(
          `${this.dataUrl}${this.dataUrl.indexOf('?') === -1 ? '?' : '&'}${this._preloadQueryParam || 'perPage=100'}`,
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
        })
        .finally(() => {
          loading(false);
          vm.isDataReady = true;
        });
    }, 150),

    templateParser(source, data) {
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      const compiled = _.template(source);
      return compiled(data);
    },

    formatLabel(item) {
      if (_.isString(item) || _.isNumber(item)) {
        return item;
      }
      let label;
      if (this._labelField.indexOf('{{') > -1) {
        try {
          label = this.templateParser(this._labelField, { ...item, currentItem: item });
        } catch (err) {
          console.warn('[vSelect][templateParser]', err.message);
        }
      } else {
        label = this.get(item, this._labelField, '');
      }

      if (this.fieldOptions.taggable) {
        return label || item;
      }
      if (this.awComponentsConfig.hideIdsInSelect) {
        return `${label}`;
      }
      return `${label} [${item[this._trackBy]}]`;
    },

    reduce(item) {
      if (_.isString(item) || _.isNumber(item)) {
        return item;
      }
      if (this.fieldOptions.taggable) {
        return item && item[this._trackBy] ? item[this._trackBy] : item;
      }
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
    },

    getCss() {
      if (this.$refs.vselectPopup) {
        const dimensions = this.$ref.vselectPopup.getBoundingClientRect();
        return {
          position: 'fixed',
          'z-index': '9999999',
          top: `calc(50vh - ${dimensions.height / 2}px) / 2)`,
          left: `calc(50vw - ${dimensions.width / 2}px) / 2)`,
          width: dimensions.width + 'px'
        };
      }
      return {};
    }
  }
};
</script>

<style lang="scss">
.vselect-popup-width {
  min-width: 30vw;
  border-radius: 15px;
  background-color: #fff;
  z-index: 99999999;
  .modal-content {
    background-color: #fff;
    box-shadow: 0 0 1.75rem 0 rgba(58, 59, 69, 0.15) !important ;
    border-radius: 15px;
  }
  .modal-header {
    padding: 5px;
    .modal-title {
      font-size: 14px;
    }
  }
}

.awesome-vue-select {
  width: 100%;
  button.external-link {
    background: transparent;
    border: none;
    padding: 0;
    &:hover {
      background: transparent;
    }
  }
}

.vue-form-generator .awesome-vue-select button.vs__clear,
.vue-form-generator .awesome-vue-select button.vs__deselect {
  border: none;
  background: transparent;
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

.awesome-vue-select .vs__selected {
  background: var(--primary, #eee) !important;
  color: white;
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
