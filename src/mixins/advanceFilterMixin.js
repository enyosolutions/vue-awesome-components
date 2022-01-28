const _ = require('lodash');
import AwesomeFilter from '../components/misc/AwesomeFilter.vue';

export default {
  computed: {
    advancedFiltersCount() {
      return (this.advancedFilters && this.advancedFilters.length) || 0;
    },

    advancedFiltersFormated() {
      return AwesomeFilter.methods.parseFilter(this.advancedFilters, { dispatch: false });
    }
  },
  methods: {
    advancedFiltering(parsedFilters, filters) {
      this.updateParams({
        advancedFilters: _.cloneDeep(filters),
        parsedAdvancedFilters: _.cloneDeep(parsedFilters),
        page: 0
      });
      if (!this.optionsComputed || this.optionsComputed.autoSearch) {
        this.getItems({ useSkeleton: true });
      }
      this.$awEmit('advanced-filter', parsedFilters, filters);
      this.$awEmit('filter', { filters: this.serverParams.filters, rawFilters: filters });
    },

    permanentFiltering(parsedFilters, filters) {
      this.updateParams({
        parsedAdvancedFilters: _.cloneDeep(parsedFilters),
        page: 0,
        permanent: true
      });
      if (this.optionsComputed.autoSearch) {
        this.getItems({ useSkeleton: true });
      }
      this.$awEmit('permanent-filter', { filters: parsedFilters });
      this.$awEmit('filter', { filters: this.serverParams.filters });
    },
  }
};
