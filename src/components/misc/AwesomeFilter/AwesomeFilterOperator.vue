<template>
  <div class="dropdown column awesome-filter-operator">
    <select
      class="btn form-control btn-outline-primary"
      :class="{
        'font-weight-bold': _filterSelected
      }"
      :disabled="!(currentField && currentField.field) || permanentInput"
      @change="updateFilter"
    >
      <option disabled class="dropdown-item">{{ $t('AwesomeFilter.labels.filters') }}</option>
      <option class="text-center" disabled>_________</option>
      <option v-for="filter in _getFilters" :key="filter.value" :value="filter.value">{{ formatLabel(filter) }}</option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash';
import i18nMixin from '../../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilterOperator',
  mixins: [i18nMixin],
  props: {
    currentField: {
      type: Object,
      required: true
    },
    currentFilter: {
      type: Object,
      required: true
    },
    permanentInput: {
      type: Boolean
    },
    inPopper: {
      type: Boolean
    }
  },
  data: () => ({
    filters: [],
    rules: {
      text: [
        '$eq',
        '$ne',
        '$like',
        '$notLike',
        '$startsWith',
        '$endsWith',
        '$substring',
        '$isNull',
        '$isNotNull',
        '$isNotDefined'
      ],
      datetime: [
        '$eq',
        '$ne',
        '$gt',
        '$gte',
        '$lt',
        '$lte',
        '$between',
        '$notBetween',
        '$isNull',
        '$isNotNull',
        '$isNotDefined'
      ],
      number: [
        '$eq',
        '$ne',
        '$gt',
        '$gte',
        '$lt',
        '$lte',
        '$between',
        '$notBetween',
        '$isNull',
        '$isNotNull',
        '$isDefined',
        '$isNotDefined'
      ],
      integer: [
        '$eq',
        '$ne',
        '$gt',
        '$gte',
        '$lt',
        '$lte',
        '$between',
        '$notBetween',
        '$isNull',
        '$isNotNull',
        '$isDefined',
        '$isNotDefined'
      ],
      relation: ['$eq', '$ne', '$in', '$isNull', '$isNotNull', '$isDefined', '$isNotDefined'], // temporary solution, soon we'll need to provide a relation picker.
      boolean: ['$eq', '$ne', '$isNull', '$isNotNull', '$isDefined', '$isNotDefined']
    }
  }),
  methods: {
    updateFilter(event) {
      let selectedFilter = {};
      if (event.target.value) {
        selectedFilter = this.filters.find((f) => f.value === event.target.value);
      }

      this.$emit('update:current-filter', selectedFilter);
    },
    formatLabel(filter) {
      if (this.currentFilter && filter.value === this.currentFilter.value) {
        return filter.shortText || filter.text;
      }
      return filter.text;
    }
  },
  computed: {
    _getFilters() {
      if (this.currentField && Object.keys(this.currentField).length) {
        const filters = _.filter(this.filters, (filter) => {
          if (_.includes(this.rules[this.currentField.type], filter.value)) {
            return filter;
          }
        });
        if (filters.length) {
          return filters;
        }
      }
      return this.filters;
    },
    _filterSelected() {
      return this.currentFilter && Object.keys(this.currentFilter).length > 0;
    }
  },
  mounted() {
    this.filters = [
      { shortText: '=', text: this.$t('AwesomeFilter.filters.equals'), value: '$eq' },
      { shortText: '', text: this.$t('AwesomeFilter.filters.in'), value: '$in' },
      { shortText: '!=', text: this.$t('AwesomeFilter.filters.not-equals'), value: '$ne' },
      { shortText: '>', text: this.$t('AwesomeFilter.filters.greater-than'), value: '$gt' },
      { shortText: '>=', text: this.$t('AwesomeFilter.filters.greater-or-equals'), value: '$gte' },
      { shortText: '', text: this.$t('AwesomeFilter.filters.lesser-than'), value: '$lt' },
      { shortText: '', text: this.$t('AwesomeFilter.filters.lesser-or-equals'), value: '$lte' },
      { text: this.$t('AwesomeFilter.filters.between'), value: '$between' },
      { text: this.$t('AwesomeFilter.filters.not-between'), value: '$notBetween' },
      { text: this.$t('AwesomeFilter.filters.contains'), value: '$like' },
      { text: this.$t('AwesomeFilter.filters.not-contains'), value: '$notLike' },
      { text: this.$t('AwesomeFilter.filters.starts-with'), value: '$startsWith' },
      { text: this.$t('AwesomeFilter.filters.ends-with'), value: '$endsWith' },
      { text: this.$t('AwesomeFilter.filters.is-null'), value: '$isNull' },
      { text: this.$t('AwesomeFilter.filters.is-not-null'), value: '$isNotNull' },
      { text: this.$t('AwesomeFilter.filters.is-defined'), value: '$isDefined' },
      { text: this.$t('AwesomeFilter.filters.is-not-defined'), value: '$isNotDefined' }
    ];
  }
};
</script>

<style scoped></style>
