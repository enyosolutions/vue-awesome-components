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
      <option
        v-for="filter in _getFilters"
        :key="filter.value"
        :value="filter.value"
        :selected="filter.value === (currentOperator && currentOperator.value)"
      >
        {{ formatLabel(filter) }}
      </option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash';
import i18nMixin from '../../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilterOperator',
  mixins: [i18nMixin],
  model: {
    prop: 'currentOperator',
    event: 'update'
  },
  props: {
    currentField: {
      required: true,
      description: 'Field to use for filtering'
    },
    currentOperator: {
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
    filters: [
      { shortText: '=', value: '$eq' },
      { shortText: '', value: '$in' },
      { shortText: '!=', value: '$ne' },
      { shortText: '>', value: '$gt' },
      { shortText: '>=', value: '$gte' },
      { shortText: '<', value: '$lt' },
      { shortText: '<=', value: '$lte' },
      { value: '$between' },
      { value: '$notBetween' },
      { value: '$like' },
      { value: '$notLike' },
      { value: '$startsWith' },
      { value: '$endsWith' },
      { value: '$isNull' },
      { value: '$isNotNull' },
      { value: '$isDefined' },
      { value: '$isNotDefined' }
    ],
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
        '$isDefined',
        '$isNotDefined'
      ],
      object: [
        '$eq',
        '$ne',
        '$like',
        '$notLike',
        '$startsWith',
        '$endsWith',
        '$substring',
        '$isNull',
        '$isNotNull',
        '$isDefined',
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
        '$isDefined',
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
      time: ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$isNull', '$isNotNull', '$isDefined', '$isNotDefined'],
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

      this.$emit('update', selectedFilter);
    },
    formatLabel(filter) {
      if (this.currentOperator && filter.value === this.currentOperator.value) {
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
      return this.currentOperator && Object.keys(this.currentOperator).length > 0;
    }
  },
  mounted() {
    this.filters.forEach((filter) => {
      filter.text = this.$t(`AwesomeFilter.filters.${filter.value}`);
    });
  }
};
</script>

<style scoped></style>
