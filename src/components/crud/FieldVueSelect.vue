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
      :label="_label"
      :filterable="!dataUrl"
      :options="apiOptions"
      :disabled="disabled"
      :required="required"
      @search="onSearch"
      :value="model[schema.model]"
      @input="updateSelected"
      :reduce="reduce"
      :getOptionLabel="formatLabel"
    ></v-select>
  </div>
</template>
<script>
/* eslint-disable */
import VueFormGenerator from 'vue-form-generator';
import selectMixin from '../../mixins/selectMixin';
import vSelect from 'vue-select';
import _ from 'lodash';

export default {
  name: 'FieldVueSelect',
  components: { vSelect },
  mixins: [selectMixin, VueFormGenerator.abstractField],
  props: [], // 'schema', 'disabled', 'value' are in the abstract field
  mounted() {
    console.log('mounted');
    this.onSearch('', () => null);
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

    _label() {
      return this.fieldOptions.relationLabel || this.schema.relationLabel || this.fieldOptions.label || 'label';
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
      } else {
        console.warn('[WARN] ITS THE SAME INCOMING VALUE', newValue, oldValue);
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
      loading(true);
      this.search(loading, search, this);
    },
    search(loading, search, vm) {
      this.$http
        .get(this.dataUrl, {
          params: { ...this.fieldOptions.queryParams, search }
        })
        .then((res) => {
          this.apiOptions = res.data.body;
          this.$forceUpdate();
        })
        .finally(() => {
          loading(false);
          this.isDataReady = true;
        });
    },

    searchDebounced: _.debounce((loading, search, vm) => {
      vm.$http
        .get(this.dataUrl, {
          params: { ...vm.fieldOptions.queryParams, search }
        })
        .then((res) => {
          vm.apiOptions = res.data.body;
          this.$forceUpdate();
        })
        .finally(() => loading(false));
    }, 150),

    formatLabel(item) {
      return `${item[this._trackBy]} - ${this.get(item, this._label, '')}`;
    },

    reduce(item) {
      return this.get(item, this._trackBy);
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
</style>
