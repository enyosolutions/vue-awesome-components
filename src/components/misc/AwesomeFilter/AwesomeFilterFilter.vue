<template>
  <div class="dropdown column awesome-filter-filter">
    <button
        class="btn dropdown-toggle"
        :class="inPopper ? 'btn-block btn-primary': 'btn-default p-0 mr-2 ml-2'"
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        :disabled="!(currentField && currentField.field) || permanentInput"
    >
      {{ Object.keys(currentFilter).length ? currentFilter.text : $t('AwesomeFilter.labels.filters') }}
    </button>
    <div class="dropdown-menu" aria-labelledby="filter">
      <a href="" @click.prevent="updateFilter({})" class="dropdown-item">{{
          $t('AwesomeFilter.labels.filters')
        }}</a>
      <a
          href=""
          @click.prevent="updateFilter(filter)"
          class="dropdown-item"
          v-for="filter in _getFilters"
          :key="filter.value"
      >{{ filter.text }}</a
      >
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import i18nMixin from '../../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilterFilter',
  mixins: [i18nMixin],
  props: {
    currentField: {
      type: Object,
      required: true,
    },
    currentFilter: {
      type: Object,
      required: true,
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
      relation: ['$eq', '$ne', '$isNull', '$isNotNull', '$isDefined', '$isNotDefined'], // temporary solution, soon we'll need to provide a relation picker.
      boolean: ['$eq', '$ne', '$isNull', '$isNotNull', '$isDefined', '$isNotDefined']
    },
  }),
  methods: {
    updateFilter(data) {
      this.$emit('update:current-filter', data);
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
    }
  },
  mounted() {
    this.filters = [
      { text: this.$t('AwesomeFilter.filters.equals'), value: '$eq' },
      { text: this.$t('AwesomeFilter.filters.not-equals'), value: '$ne' },
      { text: this.$t('AwesomeFilter.filters.greater-than'), value: '$gt' },
      { text: this.$t('AwesomeFilter.filters.greater-or-equals'), value: '$gte' },
      { text: this.$t('AwesomeFilter.filters.lesser-than'), value: '$lt' },
      { text: this.$t('AwesomeFilter.filters.lesser-or-equals'), value: '$lte' },
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
}
</script>

<style scoped>

</style>