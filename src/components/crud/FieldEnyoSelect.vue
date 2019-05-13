<template>
  <div>
    <enyo-select
      :id="fieldOptions.id"
      v-model="myModel"
      :options="internalOptions"
      :value="internalValue"
      :multiple="fieldOptions.multiple"
      :track-by="fieldOptions.trackBy || null"
      :label="fieldOptions.label || null"
      :max="schema.max || null"
      :searchable="schema.searchable || false"
      :disabled="disabled"
      @input="updateSelected"
    />
  </div>
</template>
<script>
import VueFormGenerator from "vue-form-generator";
import selectMixin from "@/mixins/selectMixin";

export default {
  mixins: [selectMixin, VueFormGenerator.abstractField],
  props: [], // 'schema', 'disabled', 'value' are in the abstract field
  data() {
    return {
      myModel: ""
    };
  },
  computed: {
    fieldOptions() {
      return this.schema.fieldOptions || {};
    },

    customLabel() {
      if (
        typeof this.schema.fieldOptions !== "undefined" &&
        typeof this.schema.fieldOptions.customLabel !== "undefined" &&
        typeof this.schema.fieldOptions.customLabel === "function"
      ) {
        return this.schema.fieldOptions.customLabel;
      }
      // this will let the multiselect library use the default behavior if customLabel is not specified
      return undefined;
    },

    dataUrl() {
      return this.url || this.fieldOptions.url;
    }
  },
  watch: {
    // eslint-disable-next-line
    vModelValue(newValue, oldValue) {
      console.log("send new vMODELVALUE down !", newValue);
      this.setIncomingValue(newValue);
    },
    // eslint-disable-next-line
    value(newValue, oldValue) {
      console.log("send new value down from VFG !", newValue);
      this.setIncomingValue(newValue);
    }
  },
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      // eslint-disable-next-line
      console.error(
        "'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!"
      );
    }
    // console.log("this props", this.$props);
  },
  mounted() {
    // eslint-disable-next-line
    this.setIncomingValue(this.vModelValue);
    this.loadRemoteEntities().then(ok => {
      if (ok) {
        this.setIncomingValue(this.vModelValue);
      }
    });
  },

  methods: {
    addTag(newTag, id) {
      const { onNewTag } = this.fieldOptions;
      if (typeof onNewTag === "function") {
        onNewTag(newTag, id, this.options, this.value);
      }
    },

    // Sets the value from the the the v-model attribute
    setIncomingValue(value) {
      if (Array.isArray(value)) {
        this.internalValue =
          this.internalOptions &&
          this.internalOptions.filter(option => {
            const searchKey =
              typeof option === "string" ? option : option[this.fieldOptions.trackBy];
            return value.indexOf(searchKey) > -1;
          });
        return;
      }
      this.internalValue =
        this.internalOptions &&
        this.internalOptions.find(option => {
          const searchKey =
            typeof option === "string" ? option : option[this.fieldOptions.trackBy];
          return searchKey == value;
        });
      this.myModel = typeof this.internalValue === "object" ? this.internalValue[this.fieldOptions.trackBy]:
      this.internalValue;
    },

    updateSelected(value) {
      // console.log("send new value up !", value);
      this.internalValue = value;
      if (!value || typeof value === "string" || typeof value === "number") {
        this.$emit("input", value);
        this.value = value;
      } else if (Array.isArray(value)) {
        const valueArray = value.map(item =>
          this.fieldOptions.trackBy && item[this.fieldOptions.trackBy] ? item[this.fieldOptions.trackBy] : item
        );
        this.$emit("input", valueArray);
        this.value = valueArray;
      } else {
        this.$emit("input", value[this.fieldOptions.trackBy]);
        this.value = value[this.fieldOptions.trackBy];
      }
    },
    onSearchChange(searchQuery, id) {
      const { onSearch } = this.fieldOptions;
      if (typeof onSearch === "function") {
        onSearch(searchQuery, id, this.options);
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
