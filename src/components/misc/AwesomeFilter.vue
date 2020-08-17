<template>
  <div class="awesome-filter">
    <div class="filtering" v-if="editFilters">
      <h6 class="card-subtitle text-muted mb-2">Filter data</h6>
      <form class="container">
        <div class="row">
          <div class="dropdown col">
            <button
              class="btn btn-primary btn-block dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ Object.keys(currentField).length ? currentField.label : "Fields" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="field">
              <a href="" @click.prevent="currentField = {}" class="dropdown-item">Fields</a>
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

          <div class="dropdown col">
            <button
              class="btn btn-primary btn-block dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              :disabled="!(currentField && currentField.field)"
            >
              {{ Object.keys(currentFilter).length ? currentFilter.text : "Filters" }}
            </button>
            <div class="dropdown-menu" aria-labelledby="filter">
              <a href="" @click.prevent="currentFilter = {}" class="dropdown-item">Filters</a>
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
          <div class="col">
            <div v-if="Object.keys(currentField).length">
              <input
                v-if="currentField.type === 'number' && currentFilter.value !== '$between' && currentFilter.value !== '$notBetween'"
                v-model.number="currentValue"
                type="number"
                class="form-control"
                placeholder="Filter value"
              />
              <input
                v-if="currentField.type === 'text'"
                v-model="currentValue"
                type="text"
                class="form-control"
                placeholder="Filter value"
              />
              <div class="form-element"
                v-if="currentField.type === 'number' && (currentFilter.value === '$between' || currentFilter.value === '$notBetween')"
              >
                <input
                        v-model.number="currentValue.from"
                        type="number"
                        class="form-control"
                        placeholder="From"
                />
                <input
                        v-model.number="currentValue.to"
                        type="number"
                        class="form-control"
                        placeholder="To"
                />
              </div>
              <div v-if="currentField.type === 'boolean'" class="form-element">
                <select v-model="currentValue" class="form-control">
                  <option value="true">true</option>
                  <option value="false">false</option>
                  <option :value="'NULL'">Null</option>
                </select>
              </div>
              <div class="form-element"
                      v-if="(currentField.type === 'datetime' || currentField.type === 'date') &&
                    currentFilter.value !== '$notBetween' &&
                    currentFilter.value !== '$between'">
                <datetime
                        v-model="currentValue"
                        :input-class="' form-control'"
                        auto
                        title="Filter value"
                        input-id="date"
                >
                </datetime>
              </div>
              <div class="form-element"
                v-if="(currentField.type === 'datetime' || currentField.type === 'date') &&
                (currentFilter.value === '$notBetween' || currentFilter.value === '$between')"
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
            </div>
            <input v-else v-model="currentValue" class="form-control" type="text" placeholder="Filter value" />
          </div>
          <div class="col awesome-filter-add-block">
            <button
              :disabled="!Object.keys(currentField).length"
              @click.prevent="addFilter()"
              type="button"
              class="btn btn-primary btn-block"
            >
              Add filter
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="active-filter" v-if="displayFilters && selectedFilters && selectedFilters.length">
      <h6 class="card-subtitle mb-2 text-muted">Active Filters</h6>
      <div class="chip chip-primary bg-primary dark" v-for="(filter, index) in selectedFilters" :key="index">
        <div class="chip-content">
          <span>{{ filter.field ? filter.field.label : "" }}</span>
          <strong class="ml-2 mr-2">
            {{ filter.filter ? filter.filter.text : "" }}
          </strong>
          <div v-if="typeof filter.value === 'object'">
            <span v-for="(value, index) in filter.value" :key="index">
              {{value}}
            </span>
          </div>
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
</template>

<script>
import _ from "lodash";
import { Datetime } from "vue-datetime";
import DateRangePicker from "vue2-daterange-picker";
import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'
import moment from "moment";

export default {
  name: "AwesomeFilter",
  components: {
    Datetime,
    DateRangePicker
  },
  props: {
    fields: Array,
    displayFilters: { type: Boolean, default: true },
    editFilters: { type: Boolean, default: true },
    value: Array
  },
  data: () => ({
    filters: [
      { text: "Equals", value: "$eq" },
      { text: "Not equals", value: "$ne" },
      { text: "Is", value: "$is" },
      { text: "Is not", value: "$not" },
      { text: "Greater than", value: "$gt" },
      { text: "Greater or equals ", value: "$gte" },
      { text: "Lesser than", value: "$lt" },
      { text: "Lesser or equals", value: "$lte" },
      { text: "Between", value: "$between" },
      { text: "Not between", value: "$notBetween" },
      { text: "Contains", value: "$like" },
      { text: "Does not contains", value: "$notLike" },
      { text: "Starts with", value: "$startsWith" },
      { text: "Ends with", value: "$endsWith" },
      { text: "Contains also", value: "$substring" },
      { text: "Contains(case insensitive)", value: "$iLike" },
      { text: "Does not contains(case insensitive)", value: "$notILike" }
    ],
    rules: {
      text: ["$like", "$notLike", "$startsWith", "$endsWith", "$substring", "$iLike", "$notILike"],
      datetime: ["$gt", "$gte", "$lt", "$lte", "$between", "$notBetween"],
      number: ["$gt", "$gte", "$lt", "$lte", "$between", "$notBetween"],
      boolean: ["$is", "$not"],
      global: ["$eq", "$ne"]
    },
    currentField: {},
    currentValue: "",
    currentFilter: { text: "Equals", value: "$eq" },
    selectedFilters: [],
    dateRangePicker: {
      startDate: moment(),
      endDate: moment().add(7, 'days'),
      locale: {
        direction: "ltr", // direction of text
        format: "DD-MM-YYYY", // fomart of the dates displayed
        separator: " - ", // separator between the two ranges
        applyLabel: "Appliquer",
        cancelLabel: "Annuler",
        weekLabel: "W",
        customRangeLabel: "Custom Range",
        daysOfWeek: moment.weekdaysMin(), // array of days - see moment documenations for details
        monthNames: moment.monthsShort(), // array of month names - see moment documenations for details
        firstDay: 1 // ISO first day of week - see moment documenations for details
      }
    },
  }),
  methods: {
    addFilter() {
      if (Object.keys(this.currentField).length) {
        let filter = {
          field: this.currentField,
          value: this.currentValue,
          filter: this.currentFilter
        };
        this.selectedFilters.push(filter);
        this.currentField = {};
        this.currentValue = "";
        this.currentFilter = { text: "Equals", value: "$eq" };
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
        if (_.has(advancedFilters, `${filter.field.field}.${filter.filter.value}`)) {
          advancedFilters[filter.field.field][filter.filter.value] = _.flattenDeep([
            advancedFilters[filter.field.field][filter.filter.value],
            filter.value
          ]);
        } else {
          _.merge(advancedFilters, parsedFilter);
        }
      });

      if (options.dispatch) {
        this.$emit("update-filter", advancedFilters);
        this.$emit("input", selectedFilters);
      }
      return advancedFilters;
    },

    onDateFilter(value) {
      if (!value) {
        return;
      }
      this.currentValue = {
        "from": value.startDate.toISOString().slice(0, 10),
        "to": value.endDate.toISOString().slice(0, 10)
      };
    }
  },

  computed: {
    getFilters() {
      if (this.currentField && Object.keys(this.currentField).length) {
        return _.filter(this.filters, (filter) => {
          if (
            _.includes(this.rules[this.currentField.type], filter.value) ||
            _.includes(this.rules.global, filter.value)
          ) {
            return filter;
          }
        });
      }
      return this.filters;
    }
  },
  watch: {
    value() {
      if (!this.value || !this.value.length) {
        return;
      }
      this.selectedFilters = this.value.map((element) => {
        if (element.filter) {
          return element;
        }
        const filter = {};
        const [key, data] = Object.entries(element)[0];
        const [op, value] = typeof data === "object" ? Object.entries(data)[0] : ["$eq", data];
        const field = this.fields.find((e) => e.field === key);

        if (field) {
          filter.field = field;
          const operator = this.filters.find((e) => e.value === op);
          if (operator) {
            filter.filter = operator;
            filter.value = value;
          }
        }
        return filter;
      });
    },

    currentField(newValue, oldValue) {
      if (Object.keys(oldValue).length && oldValue.type !== newValue.type) {
        if (Object.keys(this.currentField).length) {
          if (this.currentField.type === 'datetime' || this.currentField.type === 'date') {
            this.currentValue = new Date().toISOString();
          } else {
            this.currentValue = "";
          }
        } else {
          this.currentValue = "";
        }
      }
    },

    currentFilter(newFilter) {
      if (newFilter.value === '$between' || newFilter.value === '$notBetween') {
        this.currentValue = {
          "from": "",
          "to": "",
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.awesome-filter {
  text-align: left;
  h6 {
    text-transform: initial;
  }
  strong {
    font-weight: bold;
  }
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
    overflow: hidden;
    padding: 0 12px;
    position: relative;
    text-decoration: none;
    vertical-align: middle;
    white-space: nowrap;
    color: black;
    margin: 0 4px;
    .chip-content {
      align-items: center;
      display: inline-flex;
      height: 100%;
      max-width: 100%;
      text-align: center;
      span {
        display: inline-block;
        padding: 2px 4px;
        margin: 0 2px;
        background-color: rgba(#000000, .2);
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
  }
}
.awesome-filter.card-body {
  padding: 10px;
  .container {
    padding: 0;
    .awesome-filter-add-block {
      flex: auto;
      button {
        display: block;
        margin-top: 15px;
        text-align: center;
        justify-content: center;
      }
    }
  }
}
</style>
