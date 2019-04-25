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
      apiOptions: false
    };
  },

  watch: {
    // eslint-disable-next-line
    vModelValue(newValue, oldValue) {
      this.setIncomingValue(newValue);
    }
  },

  computed: {
    internalOptions() {
      return this.apiOptions || this.options;
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

  },
  methods: {
    // Sets the value from the the the v-model attribute
    setIncomingValue(value) {
      if (Array.isArray(value)) {
        this.internalValue = this.internalOptions && this.internalOptions.filter(option => {
          const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
          return value.indexOf(searchKey) > -1;
        });
        return;
      }
      this.internalValue = this.internalOptions && this.internalOptions.find(option => {
        const searchKey = typeof (option) === 'string' ? option : option[this.trackBy];
        return searchKey == value;
      });
    },

    // Sends up the value selected by the multiselect component
    updateSelected(value /* , id */ ) {
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
      // console.log('LOADING remote entities');
      if (this.dataUrl) {
        this.isLoading = true;
        const promise = this.$http.get(this.dataUrl, {
          params: {
            listOfValues: true,
            search: searchString
          }
        });
        promise.then(res => {
          this.apiOptions = res.data.body;
          this.isLoading = false;
        }).catch(() => {
          // eslint-disable-next-line
          this.apiOptions = [];
          this.isLoading = false;
        });
        return promise;
      }
      return Promise.resolve();
    }
  },

  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.multiselect) {
      // eslint-disable-next-line
      console.error("'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!");
    }
  },

  mounted() {
    this.setIncomingValue(this.vModelValue);
    this.loadRemoteEntities().then(ok => {
      if (ok) {
        this.setIncomingValue(this.vModelValue);
      }
    });
  }
};
