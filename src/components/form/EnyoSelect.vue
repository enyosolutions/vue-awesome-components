<template>
  <div>
    <multiselect
    v-bind="filteredProps"
    :value="internalValue || value"
    @input="updateSelected"
    :searchable="searchable"
    :internal-search="false"
    @search-changed="loadRemoteEntities"
    :loading="isLoading"
    :options="internalOptions"
    :label="label"
    >
    <span slot="noResult">
      {{ noResult }}
    </span>
  </multiselect>
</div>
</template>
<script>

import multiselectMixin from 'vue-multiselect';
import selectMixin from '../../mixins/selectMixin';

export default {
  name: 'enyo-select',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    label: String,
    trackBy: [String, Number],
    vModelValue: [String, Number, Array, Object],
    noResult: String,
    url: String,
    multiple: [String, Boolean],
    searchable: {
      type: [String, Boolean, Number],
      default: false
    },
  },
  model: {
    prop: 'vModelValue',
    event: 'input'
  },
  mixins: [multiselectMixin, selectMixin],
  data() {
    return {
      isLoading: false,
      apiOptions: false
    };
  },

  watch: {
    // 'vModelValue': function (newValue, oldValue) {
    //   this.setIncomingValue(newValue);
    // }
  },

  computed: {
    internalOptions() {
      return this.apiOptions || this.options;
    },

    filteredProps() {
      const props = Object.assign({}, this.$props);
      delete props.vModelValue;
      delete props.input;
      delete props.value;
      return props;
    },

  },
  methods: {

  },

  created() {
  // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
       /* eslint-disable-next-line */
      console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    }
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
<style lang="scss">
.multiselect__tag {
  background: orange;
}

</style>