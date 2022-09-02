/* eslint-disable */
export default {
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
    searchable: {
      type: [String, Boolean, Number],
      default: false
    }
  },
  model: {
    prop: 'vModelValue',
    event: 'input'
  },
  data() {
    return {
      internalValue: '',
      isLoading: false,
      apiOptions: null
    };
  },

  watch: {
    url() {
      this.setIncomingValue(this.vModelValue);
    },
    vModelValue(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.setIncomingValue(newValue, oldValue);
      }
    }
  },

  computed: {
    computedOptions() {
      return this.apiOptions || (this.options && this.options.length && this.options)
        || (this.schema && this.schema.options)
        || (this.schema && this.schema.fieldOptions && this.schema.fieldOptions.options)
        || [];
    },

    internalOptions() {
      return this.computedOptions;
    },

    dataUrl() {
      return this.url;
    },

    filteredProps() {
      const props = Object.assign({}, this.$props);
      delete props.vModelValue;
      delete props.input;
      delete props.value;
      return props;
    },

    isAjax() {
      return !!this.dataUrl;
    }
  },
  methods: {
    // Sets the value from the the the v-model attribute
    setIncomingValue(value, oldValue) {
      if (value == oldValue) {
        return;
      }
      if (Array.isArray(value)) {
        this.internalValue = this.computedOptions && this.computedOptions.filter(option => {
          const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
          return value.indexOf(searchKey) > -1;
        });
        return;
      }
      this.internalValue = this.computedOptions && this.computedOptions.find(option => {
        const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
        return searchKey == value;
      });
      if (!this.internalValue && this.url) {
        this.loadRemoteEntities(value);
      }
    },

    // Sends up the value selected by the multiselect component
    updateSelected(value /* , id */) {
      this.internalValue = value;
      if (!value || typeof (value) === 'string' || typeof (value) === 'number') {
        this.$emit('input', value);
      } else if (Array.isArray(value)) {
        const valueArray = value.map(item => item[this.trackBy]);
        this.$emit('input', valueArray);
      } else {
        this.$emit('input', value[this.trackBy]);
      }
    },

    loadRemoteEntities(searchString = undefined) {
      /* eslint-disable-next-line */
      if (this.dataUrl) {
        this.isLoading = true;
        const promise = this.$awApi.get(this.dataUrl, {
          params: { listOfValues: this.fieldOptions.queryParams && this.fieldOptions.queryParams.listOfValues || false, search: searchString }
        });
        promise.then(res => {
          this.apiOptions = this.apiResponseConfig &&
            this.apiResponseConfig.dataPath
            ? _.get(res, this.apiResponseConfig.dataPath)
            : res.data.body;
          this.isLoading = false;
          /* eslint-disable-next-line */
        }).catch(err => {
          console.error(err);
          this.isLoading = false;
        });
        return promise;
      }
      return Promise.resolve();
    }
  },

  created() {
  },

  mounted() {
    this.setIncomingValue(this.vModelValue);
  }
};
