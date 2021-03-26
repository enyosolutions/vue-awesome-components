<template>
  <div class="awesome-filter">
    <div class="filtering" v-if="editFilters">
      <h6 class="card-subtitle text-muted mb-2">{{ $t('AwesomeFilter.labels.filterData') }}</h6>
      <form class="container" @submit.prevent="addFilter()">
        <div class="dropdown column">
          <button
            class="btn btn-primary btn-block dropdown-toggle chip-button"
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
              v-for="(field, index) in _filterableFields"
              :key="index"
            >
              {{ field.label }}
            </a>
          </div>
        </div>
        <awesome-filter-operator :current-field="currentField" :current-filter.sync="currentFilter" in-popper />
        <awesome-filter-value
          :current-field="currentField"
          :current-filter="currentFilter"
          :current-value.sync="currentValue"
        />
      </form>
      <div class="awesome-filter-add-block">
        <button
          :disabled="!Object.keys(currentField).length"
          @click.prevent="addFilter()"
          type="button"
          class="btn btn-primary btn-block chip-button"
        >
          {{ $t('AwesomeFilter.labels.addFilter') }}
        </button>
      </div>
    </div>
    <div v-if="permanentFilter || permanentInput">
      <div class="chip-groups">
        <div class="chip chip-primary dark chip-permanent">
          <div class="chip-content">
            <span>{{ fieldLabel || field }}</span>
            <awesome-filter-operator
              :current-field="currentField"
              :current-filter.sync="currentFilter"
              :permanent-input="permanentInput"
            />
            <awesome-filter-value
              :current-field="currentField"
              :current-filter="currentFilter"
              :current-value.sync="currentValue"
              :permanent-input="permanentInput"
            />
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
              {{ filter.filter ? filter.filter.shortText || filter.filter.text : '' }}
            </strong>
            <div v-if="typeof filter.value === 'object'">
              <span v-for="(value, index) in filter.value" :key="index">
                {{ value }}
              </span>
            </div>
            <div v-else>{{ filter.value }}</div>
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
import AwesomeFilterOperator from './AwesomeFilter/AwesomeFilterOperator';
import AwesomeFilterValue from './AwesomeFilter/AwesomeFilterValue';
import i18nMixin from '../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilter',
  mixins: [i18nMixin],
  components: {
    AwesomeFilterOperator,
    AwesomeFilterValue
  },
  props: {
    advancedFilters: {
      type: Array,
      default: () => {
        return [];
      }
    },
    field: {
      type: String
    },
    fieldLabel: {
      type: String
    },
    fields: {
      type: Array
    },
    displayFilters: {
      type: Boolean,
      default: false,
      note: 'State if AwesomeFilter is for displaying active filters'
    },
    editFilters: {
      type: Boolean,
      default: false,
      note: 'State if AwesomeFilter is in a PopperJS'
    },
    permanentFilter: {
      type: Boolean,
      default: false,
      note: 'State if AwesomeFilter is in custom filter mode (Always display filter)'
    },
    permanentInput: {
      type: Boolean,
      default: false,
      note: 'State if AwesomeFilter is in custom input mode (Always display filter) that fire call on API'
    }
  },
  data: () => ({
    currentField: {},
    currentValue: '',
    currentFilter: {},
    selectedFilters: []
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
        if (!this.permanentFilter && !this.permanentInput) {
          this.currentField = {};
          this.currentValue = '';
          this.currentFilter = { shortText: '=', text: this.$t('AwesomeFilter.filters.equals'), value: '$eq' };
        }
        this.parseFilter(this.selectedFilters);
      }
    },
    removeFilter(item) {
      this.selectedFilters = _.without(this.selectedFilters, item);
      this.parseFilter(this.selectedFilters);
    },

    parseFilter(selectedFilters, options = { dispatch: true }) {
      let advancedFilters = {};
      selectedFilters.forEach((filter) => {
        const parsedFilter = { [filter.field.field]: { [filter.filter.value]: filter.value } };
        if (
          !this.permanentFilter &&
          !this.permanentInput &&
          _.has(advancedFilters, `${filter.field.field}.${filter.filter.value}`)
        ) {
          advancedFilters[filter.field.field][filter.filter.value] = _.flattenDeep([
            advancedFilters[filter.field.field][filter.filter.value],
            filter.value
          ]);
        } else if (_.has(advancedFilters, `${filter.field.field}`) || _.has(advancedFilters, '$relation')) {
          advancedFilters = parsedFilter;
        } else {
          _.merge(advancedFilters, parsedFilter);
        }
        if (this.permanentInput) {
          if (filter.field.field.split('.').length > 1) {
            advancedFilters = {
              $relation: _.cloneDeep(advancedFilters)
            };
          } else {
            _.merge(advancedFilters, parsedFilter);
          }
        }
      });
      if (options.dispatch) {
        this.$emit('update-filter', advancedFilters, selectedFilters);
      }
    }
  },

  computed: {
    _filterableFields() {
      return this.fields.filter((field) => {
        return !(field.filterOptions && !field.filterOptions.enabled);
      });
    }
  },

  watch: {
    advancedFilters(newFilters) {
      this.selectedFilters = newFilters;
    },

    currentFilter() {
      if (this.permanentFilter || this.permanentInput) {
        this.addFilter();
      }
    },

    currentValue() {
      if (this.permanentFilter || this.permanentInput) {
        this.addFilter();
      }
    }
  },
  mounted() {
    this.currentFilter = {
      shortText: '=',
      text: this.$t('AwesomeFilter.filters.equals'),
      value: '$eq'
    };
    if (this.permanentFilter || this.permanentInput) {
      if (this.fields && this.fields.length) {
        this.currentField = this.fields.filter((item) => item.field === this.field)[0];
      } else {
        this.currentField = {
          field: this.field,
          label: this.field,
          type: 'string'
        };
      }
    }
  }
};
</script>

<style lang="scss">
.awesome-filter {
  text-align: left;
  min-width: 350px;
  .aw-field-select-relation-actions {
    display: none;
  }
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
      display: flex;
      height: 100%;
      width: 100%;
      text-align: center;
      justify-content: space-between;

      .vs__search {
        width: 100%;
      }

      .vs__dropdown-toggle {
        border: none;
      }
      .awesome-filter-value {
        width: 50%;
        .aw-field-select-add-relation {
          display: none;
        }
      }

      .awesome-filter-operator {
        width: 10%;
      }

      input:not(.vs__search) {
        margin: 0 2px;
        height: calc(100% - 4px);

        &::placeholder {
          color: rgba(255, 255, 255, 0.808);
        }
      }

      span {
        display: inline-block;
        padding: 2px 4px;
        margin: 0 2px;
        background-color: rgba(#000000, 0.2);
        flex: 1;
      }

      button.chip-button {
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
      color: rgba(255, 255, 255, 0.767);

      .chip-content {
        button.chip-button {
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
        button.chip-button:hover {
          i {
            color: var(--primary);
            transition: 0.3s ease-in-out;
          }
        }
      }
    }
    &.chip-permanent {
      width: 100%;
      margin: 0;
      margin-bottom: 3px;
      border-radius: 3px;

      .dropdown-toggle {
        color: var(--default, #444);
        box-shadow: none;
      }
    }
  }

  &.permanent {
    flex-direction: column;
  }
}
</style>
