
<template>
  <div>
    <enyo-select
    :id="fieldOptions.id"
    :options="internalOptions"
    :value="internalValue"
    :multiple="fieldOptions.multiple"
    :track-by="fieldOptions.trackBy || null"
    :label="fieldOptions.label || null"
    :max="schema.max || fieldOptions.max || null"
    :searchable="schema.searchable || fieldOptions.searchable || false"
    :disabled="disabled"

    v-model="myModel"

    @input="updateSelected"
    >
  </enyo-select>
</div>
</template>
<script>

/* eslint-disable */
import VueFormGenerator from 'vue-form-generator';
import selectMixin from '../../mixins/selectMixin';

export default {
  mixins: [selectMixin, VueFormGenerator.abstractField],
  props: [], // 'schema', 'disabled', 'value' are in the abstract field
  data() {
    return {
      myModel: '',
    };
  },
  computed: {
    fieldOptions() {
      return this.schema.fieldOptions || {};
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
      console.log("URL", this.url || this.fieldOptions.url)
      return this.url || this.fieldOptions.url;
    },

    trackBy() {
      return this.$props.trackBy || this.fieldOptions.trackBy || this.schema.foreignKey;
    }
  },
  watch: {
    vModelValue(newValue) {
      this.setIncomingValue(newValue);
    },

    value(newValue) {
      this.setIncomingValue(newValue);
    },
  },

  methods: {
    addTag(newTag, id) {
      const onNewTag = this.fieldOptions.onNewTag;
      if (typeof onNewTag === 'function') {
        onNewTag(newTag, id, this.options, this.value);
      }
    },

    // Sets the value from the the the v-model attribute
    async setIncomingValue(value, loop) {
      console.log('', this.internalOptions.length , this.apiOptions.length);
      if (this.dataUrl && (!this.internalOptions || this.internalOptions.length < 1)) {
        console.log('', "list is empty i'm going to searhc more options");
        await this.loadRemoteEntities(value);
      }
      if (Array.isArray(value)) {
        this.internalValue = this.internalOptions && this.internalOptions.filter(option => {
          const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
          return value.indexOf(searchKey) > -1;
        });
        return;
      }
      this.internalValue = this.internalOptions && this.internalOptions.find(option => {
        console.log('this.trackBy', this.trackBy);
        const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
        return searchKey == value;
      });

      console.log('incoming vlaue ', value, this.dataUrl,  this.internalValue);

      if (!this.internalValue && this.dataUrl && !loop) {
        console.log('[fieldES]', "remote load", value);
        this.loadRemoteEntities(value).then(ok => {
        if (ok) {
          console.log('', "take 2", value, this.internalOptions.length);
          this.setIncomingValue(value, true)
        }
      });
      }
    // this.myModel = this.internalValue;
  },

  updateSelected(value) {
    this.internalValue = value;
    if (!value || typeof (value) === 'string' || typeof (value) === 'number') {
      this.$emit('input', value);
      this.value = value;
    } else if (Array.isArray(value)) {
      const valueArray = value.map(item => (this.trackBy && item[this.trackBy] ? item[this.trackBy] : item));
      this.$emit('input', valueArray);
      this.value = valueArray;
    } else {
      this.$emit('input', value[this.trackBy]);
      this.value = value[this.trackBy];
    }
  },

  onSearchChange(searchQuery, id) {
    const onSearch = this.fieldOptions.onSearch;

    console.log('onSearch', searchQuery );
    if (typeof onSearch === 'function') {
      onSearch(searchQuery, id, this.options);
    }
    else {
      this.loadRemoteEntities(searchQuery)
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
  },
  created() {
  // Check if the component is loaded globally
},
mounted() {
  this.setIncomingValue(this.vModelValue);
  this.loadRemoteEntities().then(ok => {
    if (ok) {
      this.setIncomingValue(this.vModelValue);
    }
  });
}
};
</script>