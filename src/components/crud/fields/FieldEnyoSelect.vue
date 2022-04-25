<template>
  <div>
    <enyo-select
      :id="fieldOptions.id"
      :options="internalOptions"
      :value="internalValue"
      :multiple="fieldOptions.multiple"
      :track-by="_trackBy || null"
      :label="fieldOptions.label || null"
      :max="schema.max || fieldOptions.max || null"
      :searchable="schema.searchable || fieldOptions.searchable || true"
      :internal-search="schema.internalSearch || fieldOptions.internalSearch || !dataUrl"
      :disabled="disabled"
      @search-change="apiRequestDebounced"
      :url="dataUrl"
      v-model="value"
      @input="updateSelected"
    >
    </enyo-select>
  </div>
</template>
<script>
/* eslint-disable */
import VueFormGenerator from '../../form/form-generator';
import selectMixin from '../../../mixins/selectMixin';

export default {
  mixins: [selectMixin, VueFormGenerator.abstractField],
  props: [], // 'schema', 'disabled', 'value' are in the abstract field
  data() {
    return {
      myModel: ''
    };
  },
  computed: {
    fieldOptions() {
      return (this.schema && this.schema.fieldOptions) || {};
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
      return this.$props.trackBy || this.fieldOptions.trackBy || this.schema.foreignKey;
    }
  },
  watch: {
    vModelValue(newValue, oldValue) {
      if (newValue != oldValue) {
        this.setIncomingValue(newValue, oldValue);
      } else {
        console.warn('[WARN] ITS THE SAME INCOMING VALUE', newValue, oldValue);
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
      console.warn('', 'DEBOUNCED', this);
      return this.loadRemoteEntities(value);
    }, 2000);
  },

  methods: {
    addTag(newTag, id) {
      const onNewTag = this.fieldOptions.onNewTag;
      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value);
      }
    },

    // Sets the value from the the the v-model attribute
    async setIncomingValue(value, oldValue, loop) {
      if (value === oldValue) {
        console.warn('[WARN] ', 'SAME VALUE', value);
        return;
      } else {
        console.warn('[WARN] ', 'NEW VALUE => setIncomingValue', oldValue, loop);
      }

      console.warn('', 'INCOMING VALUE REQUESTED IN setIncomingValue SELECT', value, oldValue);
      if (this.dataUrl && (!this.internalOptions || this.internalOptions.length < 1) && !loop) {
        console.warn('', "list is empty i'm going to search more options");
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

      console.warn('incoming value ', value, this.dataUrl, this.internalValue);

      if (!this.internalValue && this.dataUrl && !loop) {
        console.warn('[fieldES]', 'remote load', value);
        const ok = await this.apiRequestDebounced(value);
        if (ok) {
          console.warn('', 'take 2', value, this.internalOptions.length);
          this.setIncomingValue(value, null, true);
        }
      }
      // this.myModel = this.internalValue;
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

    onSearchChange(searchQuery, id) {
      const onSearch = this.fieldOptions.onSearch;

      console.warn('onSearch', searchQuery);
      if (typeof onSearch === 'function') {
        onSearch(searchQuery, id, this.options);
      } else {
        this.apiRequestDebounced(searchQuery);
      }
    },
    onSelect(/* selectedOption, id */) {
      // console.log("onSelect", selectedOption, id);
    },
    onRemove(/* removedOption, id */) {
      // console.log("onRemove", removedOption, id);
    },
    onOpen(/* id */) {
      // console.log("onOpen", id);
    },
    onClose(/* value, id */) {
      // console.log("onClose", value, id);
    }
  }
};
</script>
