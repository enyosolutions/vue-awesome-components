<template>
    <div class="awesome-filter">
        {{currentField.type}}
        {{currentValue}}
        <div class="filtering mb-4">
            <h6 class="card-subtitle text-muted mb-2">Filter data</h6>
            <form class="container">
                <div class="row justify-content-between">
                    <div class="dropdown col">
                        <button class="btn btn-primary btn-block dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ Object.keys(currentField).length ? currentField.label : 'Fields' }}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="field">
                            <a href="" @click.prevent="currentField = {}" class="dropdown-item">Fields</a>
                            <a href="" @click.prevent="currentField = field" class="dropdown-item" v-for="(field, index) in fields" :key="index">
                                {{field.label}}
                            </a>
                        </div>
                    </div>

                    <div class="dropdown col">
                        <button class="btn btn-primary btn-block dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{ Object.keys(currentFilter).length ? currentFilter.text : 'Filters' }}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="filter">
                            <a href="" @click.prevent="currentFilter = {}" class="dropdown-item">Filters</a>
                            <a href="" @click.prevent="currentFilter = filter" class="dropdown-item" v-for="filter in getFilters" :key="filter.value">{{filter.text}}</a>
                        </div>
                    </div>
                    <div class="col">
                        <div v-if="Object.keys(currentField).length">
                            <input v-if="currentField.type === 'number'" v-model="currentValue" type="number" class="form-control" placeholder="Filter value">
                            <input v-if="currentField.type === 'text'"  v-model="currentValue" type="text" class="form-control" placeholder="Filter value">
                            <div v-if="currentField.type === 'boolean'" class="form-element field-checkbox">
                                <input v-model="currentValue" type="checkbox" class="ajax-table-checkbox form-control" id="checkbox">
                                <label for="checkbox" class="form-check-label">
                                    Filter value
                                </label>
                            </div>
                            <date-range-picker
                                    v-if="currentField.type === 'datetime'"
                                    class="form-group vgt-date-range"
                                    placeholder="Filter value"
                                    v-model="currentValue"
                            />
                        </div>
                        <input v-else v-model="currentValue" class="form-control" type="text" placeholder="Filter value">
                        <!--<div v-if="Object.keys(currentField).length">
                            RELATION
                            OBJECT
                            DATETIME
                            <input v-else type="text" class="form-control" placeholder="Value">
                        </div> -->
                        <!-- <input type="text" class="form-control" placeholder="Value" v-model="currentValue">-->
                    </div>
                    <div class="col">
                        <button :disabled="!(Object.keys(currentField).keys() && Object.keys(currentFilter).length)" @click.prevent="addFilter()" type="button" class="btn btn-primary btn-block">Add filter</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="active-filter" v-if="selectedFilters && selectedFilters.length">
            <h6 class="card-subtitle mb-2 text-muted">Active Filters</h6>
            <div class="chip chip-primary dark" v-for="(filter, index) in selectedFilters" :key="index">
                <div class="chip-content">
                    {{filter.field.label}}
                    <strong class="ml-3 mr-3">
                        {{filter.filter.text}}
                    </strong>
                    {{filter.value || '""'}}
                    <button type="button" @click.prevent="removeFilter(filter)">
                        <i class="fa fa-times-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import _ from 'lodash';
  import DateRangePicker from "vue2-daterange-picker";
  export default {
    name: "AwesomeFilter",
    components: {
      DateRangePicker
    },
    props: {
      fields: Array
    },
    data: () => ({
      filters: [
        {text: 'Equals', value: '$eq'},
        {text: 'Not equals', value: '$ne'},
        {text: 'Is', value: '$is'},
        {text: 'Is not', value: '$not'},
        {text: 'Greater', value: '$gt'},
        {text: 'Greater or equals', value: '$gte'},
        {text: 'Less than', value: '$lt'},
        {text: 'Less than or equals', value: '$lte'},
        {text: 'Between', value: '$between'},
        {text: 'Not between', value: '$notBetween'},
        {text: 'Like', value: '$like'},
        {text: 'Not like', value: '$notLike'},
        {text: 'Starts with', value: '$startsWith'},
        {text: 'Ends with', value: '$endsWith'},
        {text: 'Substring', value: '$substring'},
        {text: 'Like insensitive', value: '$iLike'},
        {text: 'Not like insensitive', value: '$notILike'}
      ],
      rules: {
        text: ['$eq', '$ne'],
        datetime: ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$between', '$notBetween'],
        number: ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$between', '$notBetween'],
        boolean: ['$eq', '$ne', '$is', '$not'],
        global: ['$is', '$not', '$like', '$notLike', '$startsWith', '$endsWith', '$substring', '$iLike', '$notILike'],
      },
      currentField: {},
      currentValue: "",
      currentFilter: {},
      selectedFilters: [],
    }),
    methods: {
      addFilter() {
        if (Object.keys(this.currentField).length) {
          let filter = {
            field: this.currentField,
            value: this.currentValue,
            filter: this.currentFilter
          }
          this.selectedFilters.push(filter);
          this.currentField = {};
          this.currentValue = "";
          this.currentFilter = {};
          this.parseFilter();
        }
      },
      removeFilter(item) {
        this.selectedFilters = _.without(this.selectedFilters, item)
        this.parseFilter();
      },

      parseFilter() {
        const advancedFilters = {};
        this.selectedFilters.forEach(filter => {
          const parsedFilter = {[filter.field.field]: {[filter.filter.value]: filter.value }}
          if (_.has(advancedFilters, `${filter.field.field}.${filter.filter.value}`)) {
            advancedFilters[filter.field.field][filter.filter.value] = _.flattenDeep([advancedFilters[filter.field.field][filter.filter.value], filter.value]);
          } else {
            _.merge(advancedFilters, parsedFilter);
          }
        })
        this.$emit('update-filter', advancedFilters);
      }
    },
    computed: {
      getFilters () {
        if (this.currentField && Object.keys(this.currentField).length) {
          return _.filter(this.filters, (filter) => {
            if (_.includes(this.rules[this.currentField.type], filter.value) || _.includes(this.rules.global, filter.value)) {
              return filter;
            }
          });
        }
        return this.filters;
      }
    },
    watch: {
      currentField() {
        this.currentValue = "";
      }
    },
  }
</script>

<style scoped lang="scss">
    .awesome-filter {
        text-align: left;
        h6 {
            text-transform: initial;
        }
        .filtering {
            .form-inline {
                justify-content: space-between;
                .dropdown {
                    width: 25%;
                }
                .form-control {
                    width: 25%;
                }
            }
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
                        transition: color .3s ease-in-out;
                    }
                    &:hover {
                        i {
                            color: #7f7f7f;
                            transition: color .3s ease-in-out;
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
                                transition: color .3s ease-in-out;
                            }
                        }
                    }
                }
            }
            &.chip-primary {
                background-color: #9c27b0;
                border-color: #9c27b0;
                .chip-content {
                    button:hover {
                        i {
                            color: #f37bfc;
                            transition: .3s ease-in-out;
                        }
                    }
                }
            }
        }
    }
</style>