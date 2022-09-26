<template>
  <div class="awesome-filter">
    <div class="filtering" v-if="editFilters">
      <h6 class="card-subtitle text-muted mb-2">{{ $t('AwesomeFilter.labels.filterData') }}</h6>
      <form class="container" @submit.prevent="addFilter()">
        <div class="dropdown column  pl-0">
          <select
            ref="filterField"
            class="form-control btn-outline-primary"
            :placeholder="Object.keys(currentField).length ? currentField.label : $t('AwesomeFilter.labels.fields')"
            @change="selectFilter"
          >
            <option value class="text-primary" @click.prevent="currentField = {}">{{
              $t('AwesomeFilter.labels.fields')
            }}</option>
            <option class="text-center" disabled>_________</option>
            <option
              @click="currentField = field"
              v-for="(field, index) in _filterableFields"
              :key="index"
              :value="field.field"
            >
              {{ field.label }}
            </option>
          </select>
        </div>
        <awesome-filter-operator :current-field="currentField" :current-filter.sync="currentOperator" in-popper />
        <awesome-filter-value
          :current-field="currentField"
          :current-filter="currentOperator"
          :current-value.sync="currentValue"
          :current-value-label.sync="currentValueLabel"
        />
        <div class="awesome-filter-add-block pt-1 ">
          <button
            :disabled="!Object.keys(currentField).length"
            @click.prevent="addFilter()"
            type="button"
            class="btn btn-primary btn-block chip-button"
          >
            <i class="fa fa-save"></i>
          </button>
        </div>
      </form>
    </div>
    <div v-if="permanentFilter || permanentInput">
      <div class="chip-groups">
        <div
          class="chip chip-primary dark chip-permanent"
          :class="{
            'aw-filter-no-label': !showLabel,
            'aw-filter-no-operator': !showOperator
          }"
        >
          <div class="chip-content">
            <span class="form-control" v-if="showLabel">{{ fieldLabel || field }}</span>
            <awesome-filter-operator
              v-if="showOperator"
              :current-field="currentField"
              :current-filter.sync="currentOperator"
              :permanent-input="permanentInput"
            />
            <awesome-filter-value
              :current-field="currentField"
              :current-filter="currentOperator"
              :current-value.sync="currentValue"
              :current-value-label.sync="currentValueLabel"
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
            <span class="form-control">{{ filter.field ? filter.field.label : '' }}</span>
            <strong class="ml-2 mr-2">
              {{ filter.filter ? filter.filter.shortText || filter.filter.text : '' }}
            </strong>
            <div v-if="typeof filter.value === 'object'">
              <span v-for="(value, index) in filter.value" :key="index">
                {{ value }}
              </span>
            </div>
            <div v-else>
              <span v-if="filter.valueLabel"> {{ filter.valueLabel }}</span>
              <span v-else-if="filter.field.type === 'relation'">
                <AwesomeDisplay
                  :field="filter.field.field"
                  type="relation"
                  v-bind="filter.field"
                  :value="filter.value"
                  :isClickable="false"
                />
              </span>
              <span v-else>{{ filter.value }}</span>
            </div>
            <button type="button" class="btn text-muted" @click.prevent="removeFilter(filter)">
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
import AwesomeDisplay from '../crud/display/AwesomeDisplay.vue';
import AwesomeFilterOperator from './AwesomeFilter/AwesomeFilterOperator.vue';
import AwesomeFilterValue from './AwesomeFilter/AwesomeFilterValue.vue';
import i18nMixin from '../../mixins/i18nMixin';

export default {
  name: 'AwesomeFilter',
  mixins: [i18nMixin],
  components: {
    AwesomeDisplay,
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
    defaultOperator: {
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
    },
    showLabel: {
      type: Boolean,
      default: true,
      note: 'Should be we show the label of the filter or not'
    },
    showOperator: {
      type: Boolean,
      default: true,
      note: 'Should be we show the operator of the filter or not'
    }
  },
  data: () => ({
    currentField: {},
    currentValue: '',
    currentValueLabel: '',
    currentOperator: {},
    selectedFilters: []
  }),
  methods: {
    addFilter() {
      const value =
        ['$isNull', '$isNotNull', '$isDefined', '$isNotDefined'].indexOf(this.currentOperator.value) > -1
          ? true
          : this.currentValue;
      if (Object.keys(this.currentField).length) {
        let filter = {
          field: this.currentField,
          value,
          valueLabel: this.currentValueLabel || '',
          filter: this.currentOperator
        };
        this.selectedFilters.push(filter);
        // if the selected field is not a permanent one then reset the current field
        if (!this.permanentFilter && !this.permanentInput) {
          this.currentField = {};
          this.currentValue = '';
          // this.currentValueLabel = '';
          this.currentOperator = { shortText: '=', text: this.$t('AwesomeFilter.filters.equals'), value: '$eq' };
          this.$refs['filterField'].value = '';
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
    },

    selectFilter(event) {
      if (event.target.value) {
        this.currentField = this._filterableFields.find((f) => f.field === event.target.value);
      } else {
        this.currentField = {};
      }
    }
  },

  computed: {
    _filterableFields() {
      return this.fields.filter((field) => {
        // no option defined
        return !field.filterOptions || field.filterOptions.enabled == undefined || field.filterOptions.enabled;
      });
    }
  },

  watch: {
    advancedFilters(newFilters) {
      this.selectedFilters = newFilters;
    },

    currentOperator() {
      if (this.permanentFilter || this.permanentInput) {
        this.addFilter();
      }
    },

    currentValue() {
      if (this.permanentFilter || this.permanentInput) {
        this.addFilter();
      }
    },
    currentValueLabel(val) {}
  },
  mounted() {
    this.currentOperator = this.defaultOperator
      ? {
          shortText: this.defaultOperator,
          text: this.$t(`AwesomeFilter.filters.${this.defaultOperator}`),
          value: this.defaultOperator
        }
      : {
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
  .aw-field-select-relation-actions {
    display: none;
  }
  @media (min-width: 720px) {
    .container {
      flex-direction: column;
    }
  }
  .container {
    display: flex;
    padding: 0;
    margin-left: 0px;
    margin-right: 0;
    margin-bottom: 5px;
    flex-direction: row;
    flex-wrap: wrap;

    .column {
      padding: 5px;
      // flex-grow: 1;

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
    background-color: transparent;
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

    &.aw-filter-no-label {
      .chip-content {
        .vs__search {
          min-width: 1%;
          max-width: unset;
          width: auto;
        }
        .awesome-filter-value {
          width: 100%;
          max-width: 100%;
          .aw-field-select-add-relation {
            display: none;
          }
        }
      }
    }
    .chip-content {
      align-items: center;
      display: flex;
      height: 100%;
      width: 100%;
      text-align: center;
      justify-content: space-between;

      .vs__search {
        min-width: 40%;
        width: auto;
      }

      .vs__dropdown-toggle {
        border: none;
      }
      .awesome-filter-value {
        max-width: 50%;
        .aw-field-select-add-relation {
          display: none;
        }
      }

      .awesome-filter-operator {
        max-width: 10%;
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
