<template>
  <div>
    <multiselect
      v-bind="filteredProps"
      :value="internalValue || value"
      @input="updateSelected"
      :searchable="searchable"
      :internal-search="internalSearch"
      @search-change="loadRemoteEntities"
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
  name: 'EnyoSelect',
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
    internalSearch: [Boolean],
    searchable: {
      type: [String, Boolean, Number],
      default: false
    }
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

  watch: {},

  computed: {
    filteredProps() {
      const props = Object.assign({}, this.$props);
      delete props.vModelValue;
      delete props.input;
      delete props.value;
      return props;
    }
  },
  methods: {},

  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      /* eslint-disable-next-line */
      console.error(
        "'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!"
      );
    }
  }
};
</script>
<style lang="scss">
.multiselect__tag {
  background: orange;
}
</style>
