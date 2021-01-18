<template>
  <div class="awesome-filter">
    <div class="filtering" v-if="editFilters">
      <h6 class="card-subtitle text-muted mb-2">{{ $t('AwesomeFilter.labels.filterData') }}</h6>
      <form class="container" @submit.prevent="addFilter()">
        <div class="dropdown column">
          <button
              class="btn btn-primary btn-block dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
          >
            {{ Object.keys(currentField).length ? currentField.label : $t('AwesomeFilter.labels.fields') }}
          </button>
          <div class="dropdown-menu" aria-labelledby="field">
            <a href="" @click.prevent="currentField = {}" class="dropdown-item">{{
                $t('AwesomeFilter.labels.fields')
              }}</a>
            <a
                href=""
                @click.prevent="currentField = field"
                class="dropdown-item"
                v-for="(field, index) in fields"
                :key="index"
            >
              {{ field.label }}
            </a>
          </div>
        </div>

        <div class="dropdown column">
          <button
              class="btn btn-primary btn-block dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              :disabled="!(currentField && currentField.field)"
          >
            {{ Object.keys(currentFilter).length ? currentFilter.text : $t('AwesomeFilter.labels.filters') }}
          </button>
          <div class="dropdown-menu" aria-labelledby="filter">
            <a href="" @click.prevent="currentFilter = {}" class="dropdown-item">{{
                $t('AwesomeFilter.labels.filters')
              }}</a>
            <a
                href=""
                @click.prevent="currentFilter = filter"
                class="dropdown-item"
                v-for="filter in getFilters"
                :key="filter.value"
            >{{ filter.text }}</a
            >
          </div>
        </div>
        <div
            v-if="!['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].includes(currentFilter.value)"
            class="column"
        >
          <div v-if="Object.keys(currentField).length">
            <!-- TYPE NUMBER -->
            <input
                v-if="
                (currentField.type === 'number' || currentField.type === 'integer') &&
                  currentFilter.value !== '$between' &&
                  currentFilter.value !== '$notBetween'
              "
                v-model.number="currentValue"
                type="number"
                class="form-control"
                :placeholder="$t('AwesomeFilter.labels.filterValue')"
            />
            <!-- TYPE STRING/TEXT -->
            <input
                v-if="
                (currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
                  !currentField.enum
              "
                v-model="currentValue"
                type="text"
                class="form-control"
                :placeholder="$t('AwesomeFilter.labels.filterValue')"
            />
            <!-- TYPE STRING/TEXT WITH ENUM -->
            <div
                class="dropdown"
                v-if="
                (currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
                  currentField.enum
              "
            >
              <button
                  class="btn btn-primary btn-block dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
              >
                {{ Object.keys(currentValue).length ? currentValue : $t('AwesomeFilter.labels.values') }}
              </button>
              <div class="dropdown-menu" aria-labelledby="field">
                <a href="" @click.prevent="currentValue = ''" class="dropdown-item">{{
                    $t('AwesomeFilter.labels.values')
                  }}</a>
                <a
                    href=""
                    @click.prevent="currentValue = field"
                    class="dropdown-item"
                    v-for="(field, index) in currentField.enum"
                    :key="index"
                >
                  {{ field }}
                </a>
              </div>
            </div>
            <!-- TYPE NUMBER BETWEEN/NOTBETWEEN -->
            <div
                class="form-element between"
                v-if="
                (currentField.type === 'number' || currentField.type === 'integer') &&
                  (currentFilter.value === '$between' || currentFilter.value === '$notBetween')
              "
            >
              <input
                  v-model.number="currentValue.from"
                  type="number"
                  class="form-control"
                  :placeholder="$t('AwesomeFilter.labels.from')"
              />
              <input
                  v-model.number="currentValue.to"
                  type="number"
                  class="form-control"
                  :placeholder="$t('AwesomeFilter.labels.to')"
              />
            </div>
            <!-- TYPE BOOLEAN -->
            <div v-if="currentField.type === 'boolean'" class="form-element">
              <select v-model="currentValue" class="form-control">
                <option value="true">true</option>
                <option value="false">false</option>
                <option :value="'NULL'">Null</option>
              </select>
            </div>
            <!-- TYPE DATETIME/DATE SIMPLE -->
            <div
                class="form-element"
                v-if="
                (currentField.type === 'datetime' || currentField.type === 'date') &&
                  currentFilter.value !== '$notBetween' &&
                  currentFilter.value !== '$between'
              "
            >
              <datetime
                  type="datetime"
                  v-model="currentValue"
                  :input-class="' form-control'"
                  auto
                  title="Filter value"
                  input-id="date"
              >
              </datetime>
            </div>
            <!-- TYPE DATETIME/DATE RANGE-->
            <div
                class="form-element"
                v-if="
                (currentField.type === 'datetime' || currentField.type === 'date') &&
                  (currentFilter.value === '$notBetween' || currentFilter.value === '$between')
              "
            >
              <date-range-picker
                  class="form-group vgt-date-range"
                  :start-date="dateRangePicker.startDate"
                  :end-date="dateRangePicker.endDate"
                  :locale-data="dateRangePicker.locale"
                  @update="onDateFilter"
              />
            </div>
            <!-- ADD SELECT FOR RELATION / OBJECT -->
            <div class="form-element" v-if="currentField.type === 'relation'">
              <input
                  v-model="currentValue"
                  class="form-control"
                  type="text"
                  :placeholder="$t('AwesomeFilter.labels.filterValue')"
              />
            </div>
          </div>
        </div>
      </form>
      <div class="awesome-filter-add-block">
        <button
            :disabled="!Object.keys(currentField).length"
            @click.prevent="addFilter()"
            type="button"
            class="btn btn-primary btn-block"
        >
          {{ $t('AwesomeFilter.labels.addFilter') }}
        </button>
      </div>
    </div>
    <div v-if="permanentFilter">
      <div class="chip-groups">
        <div class="chip chip-primary bg-primary dark chip-permanent">
          <div class="chip-content">
            <span>{{ field }}</span>
            <div class="dropdown column">
              <button
                  class="btn btn-default dropdown-toggle p-0 mr-2 ml-2"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  :disabled="!(currentField && currentField.field)"
              >
                {{ Object.keys(currentFilter).length ? currentFilter.text : $t('AwesomeFilter.labels.filters') }}
              </button>
              <div class="dropdown-menu" aria-labelledby="filter">
                <a href="" @click.prevent="currentFilter = {}" class="dropdown-item">{{
                    $t('AwesomeFilter.labels.filters')
                  }}</a>
                <a
                    href=""
                    @click.prevent="currentFilter = filter"
                    class="dropdown-item"
                    v-for="filter in getFilters"
                    :key="filter.value"
                >{{ filter.text }}</a
                >
              </div>
            </div>
            <div
                v-if="!['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].includes(currentFilter.value)"
                class="column"
            >
              <div v-if="Object.keys(currentField).length">
                <!-- TYPE NUMBER -->
                <input
                    v-if="
                (currentField.type === 'number' || currentField.type === 'integer') &&
                  currentFilter.value !== '$between' &&
                  currentFilter.value !== '$notBetween'
              "
                    v-model.number="currentValue"
                    type="number"
                    class="form-control input-group-sm"
                    :placeholder="$t('AwesomeFilter.labels.filterValue')"
                />
                <!-- TYPE STRING/TEXT -->
                <input
                    v-if="
                (currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
                  !currentField.enum
              "
                    v-model="currentValue"
                    type="text"
                    class="form-control input-group-sm"
                    :placeholder="$t('AwesomeFilter.labels.filterValue')"
                />
                <!-- TYPE STRING/TEXT WITH ENUM -->
                <div
                    class="dropdown"
                    v-if="
                (currentField.type === 'text' || currentField.type === 'string' || currentField.type === 'url') &&
                  currentField.enum
              "
                >
                  <button
                      class="btn btn-default dropdown-toggle p-0 mr-2 ml-2"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                  >
                    {{ Object.keys(currentValue).length ? currentValue : $t('AwesomeFilter.labels.values') }}
                  </button>
                  <div class="dropdown-menu" aria-labelledby="field">
                    <a href="" @click.prevent="currentValue = ''" class="dropdown-item">{{
                        $t('AwesomeFilter.labels.values')
                      }}</a>
                    <a
                        href=""
                        @click.prevent="currentValue = field"
                        class="dropdown-item"
                        v-for="(field, index) in currentField.enum"
                        :key="index"
                    >
                      {{ field }}
                    </a>
                  </div>
                </div>
                <!-- TYPE NUMBER BETWEEN/NOTBETWEEN -->
                <div
                    class="form-element between"
                    v-if="
                (currentField.type === 'number' || currentField.type === 'integer') &&
                  (currentFilter.value === '$between' || currentFilter.value === '$notBetween')
              "
                >
                  <input
                      v-model.number="currentValue.from"
                      type="number"
                      class="form-control"
                      :placeholder="$t('AwesomeFilter.labels.from')"
                  />
                  <input
                      v-model.number="currentValue.to"
                      type="number"
                      class="form-control"
                      :placeholder="$t('AwesomeFilter.labels.to')"
                  />
                </div>
                <!-- TYPE BOOLEAN -->
                <div v-if="currentField.type === 'boolean'" class="form-element">
                  <select v-model="currentValue" class="form-control">
                    <option value="true">true</option>
                    <option value="false">false</option>
                    <option :value="'NULL'">Null</option>
                  </select>
                </div>
                <!-- TYPE DATETIME/DATE SIMPLE -->
                <div
                    class="form-element"
                    v-if="
                (currentField.type === 'datetime' || currentField.type === 'date') &&
                  currentFilter.value !== '$notBetween' &&
                  currentFilter.value !== '$between'
              "
                >
                  <datetime
                      type="datetime"
                      v-model="currentValue"
                      :input-class="' form-control'"
                      auto
                      title="Filter value"
                      input-id="date"
                  >
                  </datetime>
                </div>
                <!-- TYPE DATETIME/DATE RANGE-->
                <div
                    class="form-element"
                    v-if="
                (currentField.type === 'datetime' || currentField.type === 'date') &&
                  (currentFilter.value === '$notBetween' || currentFilter.value === '$between')
              "
                >
                  <date-range-picker
                      class="form-group vgt-date-range"
                      :start-date="dateRangePicker.startDate"
                      :end-date="dateRangePicker.endDate"
                      :locale-data="dateRangePicker.locale"
                      @update="onDateFilter"
                  />
                </div>
                <!-- ADD SELECT FOR RELATION / OBJECT -->
                <input
                    v-if="currentField.type === 'relation'"
                    v-model="currentValue"
                    class="form-control input-group-sm"
                    type="text"
                    :placeholder="$t('AwesomeFilter.labels.filterValue')"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="active-filter" v-if="displayFilters && advancedFilters && advancedFilters.length">
      <h6 class="card-subtitle mb-2 text-muted">{{ $t('AwesomeFilter.labels.activeFilter') }}</h6>
      <div class="chip-groups">
        <div class="chip chip-primary bg-primary dark" v-for="(filter, index) in advancedFilters" :key="index">
          <div class="chip-content">
            <span>{{ filter.field ? filter.field.label : '' }}</span>
            <strong class="ml-2 mr-2">
              {{ filter.filter ? filter.filter.text : '' }}
            </strong>
            <div v-if="typeof filter.value === 'object'">
              <span v-for="(value, index) in filter.value" :key="index">
                {{ value }}
              </span>
            </div>
            <div
                v-if="['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].indexOf(filter.filter.value) > -1"
            ></div>
            <div v-else>
              <span>{{ filter.value || '""' }}</span>
            </div>
            <button type="button" @click.prevent="removeFilter(filter)">
              <i class="fa fa-times-circle"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { Datetime } from 'vue-datetime';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);
import i18nMixin from '../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilter',
  mixins: [i18nMixin],
  components: {
    Datetime,
    DateRangePicker
  },
  props: {
    advancedFilters: {
      type: Array,
      default: () => {
        return [];
      }
    },
    field: {
      type: String,
    },
    fields: {
      type: Array,
    },
    displayFilters: { type: Boolean, default: false },
    editFilters: { type: Boolean, default: false },
    permanentFilter: { type: Boolean, default: false }
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
    currentField: {},
    currentValue: '',
    currentFilter: {},
    selectedFilters: [],
    dateRangePicker: {
      startDate: dayjs(),
      endDate: dayjs().add(7, 'days'),
      locale: {
        direction: 'ltr', // direction of text
        format: 'DD-MM-YYYY', // fomart of the dates displayed
        separator: ' - ', // separator between the two ranges
        applyLabel: '',
        cancelLabel: '',
        weekLabel: '',
        customRangeLabel: '',
        daysOfWeek: dayjs.weekdaysMin(),
        monthNames: dayjs.monthsShort(),
        firstDay: 1
      }
    }
  }),
  methods: {
    addFilter() {
      const value =
          ['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].indexOf(this.currentFilter.value) > -1
              ? true
              : this.currentValue;
      if (Object.keys(this.currentField).length) {
        let filter = {
          field: this.currentField,
          value,
          filter: this.currentFilter
        };
        this.selectedFilters.push(filter);
        if (!this.permanentFilter) {
          this.currentField = {};
          this.currentValue = '';
          this.currentFilter = { text: this.$t('AwesomeFilter.filters.equals'), value: '$eq' };
        }
        this.parseFilter(this.selectedFilters);
      }
    },
    removeFilter(item) {
      this.selectedFilters = _.without(this.selectedFilters, item);
      this.parseFilter(this.selectedFilters);
    },

    parseFilter(selectedFilters, options = { dispatch: true }) {
      const advancedFilters = {};
      selectedFilters.forEach((filter) => {
        const parsedFilter = { [filter.field.field]: { [filter.filter.value]: filter.value } };
        if (!this.permanentFilter && _.has(advancedFilters, `${filter.field.field}.${filter.filter.value}`)) {
          advancedFilters[filter.field.field][filter.filter.value] = _.flattenDeep([
            advancedFilters[filter.field.field][filter.filter.value],
            filter.value
          ]);
        } else {
          _.merge(advancedFilters, parsedFilter);
        }
      });
      if (options.dispatch) {
        this.$emit('update-filter', advancedFilters, selectedFilters);
      }
    },

    onDateFilter(value) {
      if (!value) {
        return;
      }
      this.currentValue = {
        from: value.startDate.toISOString().slice(0, 10),
        to: value.endDate.toISOString().slice(0, 10)
      };
    }
  },

  computed: {
    getFilters() {
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
  watch: {
    advancedFilters(newFilters) {
      this.selectedFilters = newFilters;
    },

    currentField(newField) {
      this.currentFilter = this.getFilters[0];
      if (Object.keys(newField).length) {
        if (newField.type === 'datetime' || newField.type === 'date') {
          this.currentValue = new Date().toISOString();
        } else if (newField.type === 'boolean') {
          this.currentValue = true;
        } else {
          this.currentValue = '';
        }
      } else {
        this.currentValue = '';
      }
    },

    currentFilter(newFilter) {
      if (newFilter.value === '$between' || newFilter.value === '$notBetween') {
        this.currentValue = {
          from: '',
          to: ''
        };
      }
    },

    currentValue() {
      if (this.permanentFilter) {
        this.addFilter();
      }
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
    this.currentFilter = {
      text: this.$t('AwesomeFilter.filters.equals'),
      value: '$eq'
    };
    this.dateRangePicker.locale.applyLabel = this.$t('dateRangePicker.applyLabel');
    this.dateRangePicker.locale.cancelLabel = this.$t('dateRangePicker.cancelLabel');
    this.dateRangePicker.locale.weekLabel = this.$t('dateRangePicker.weekLabel');
    this.dateRangePicker.locale.customRangeLabel = this.$t('dateRangePicker.customRangeLabel');
    if (this.permanentFilter) {
      this.currentField = this.fields.filter((item) => item.field === this.field)[0]
    }
  }
};
</script>

<style scoped lang="scss">
.awesome-filter {
  text-align: left;
  min-width: 350px;

  .container {
    display: flex;
    padding: 0;
    margin-bottom: 5px;
    flex-direction: row;
    flex-wrap: wrap;

    .column {
      padding: 5px;
      flex-grow: 1;

      .between {
        display: flex;

        &.form-element {
          margin-bottom: 0;
        }
      }
    }
  }

  h6 {
    text-transform: initial;
  }

  strong {
    font-weight: bold;
  }

  .chip-groups {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    height: auto;

    .chip {
      display: inline-flex;
      background-color: #e0e0e0;
      border-color: #e0e0e0;
      font-size: 14px;
      height: 32px;
      align-items: center;
      line-height: 20px;
      max-width: 100%;
      outline: none;
      padding: 0 12px;
      position: relative;
      text-decoration: none;
      vertical-align: middle;
      white-space: nowrap;
      color: black;
      margin: 4px;

      .chip-content {
        align-items: center;
        display: inline-flex;
        height: 100%;
        max-width: 100%;
        text-align: center;

        input {
          margin: 0 2px;
          height: calc(100% - 4px);

          &::placeholder {
            color: white;
          }
        }

        span {
          display: inline-block;
          padding: 2px 4px;
          margin: 0 2px;
          background-color: rgba(#000000, 0.2);
        }

        button {
          margin-right: -4px;
          appearance: none;
          -moz-appearance: none;
          outline: none;
          border: none;
          background-color: transparent;
          line-height: 18px;
          height: 18px;

          i {
            color: black;
            font-size: 18px;
            transition: color 0.3s ease-in-out;
          }

          &:hover {
            i {
              color: #7f7f7f;
              transition: color 0.3s ease-in-out;
            }
          }
        }
      }

      &.dark {
        color: white;

        .chip-content {
          button {
            i {
              color: white;
            }

            &:hover {
              i {
                color: #7f7f7f;
                transition: color 0.3s ease-in-out;
              }
            }
          }
        }
      }

      &.chip-primary {
        .chip-content {
          button:hover {
            i {
              color: var(--primary);
              transition: 0.3s ease-in-out;
            }
          }
        }
      }
      &.chip-permanent {
        width: 100%;
      }
    }

    &.permanent {
      flex-direction: column;
    }
  }

  &.card-body {
    padding: 10px;

    .container {
      .awesome-filter-add-block {
        flex: auto;

        button {
          display: flex;
          margin-top: 15px;
          text-align: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
