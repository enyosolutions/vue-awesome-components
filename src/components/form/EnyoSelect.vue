<template>
  <div>
    <multiselect
      v-bind="filteredProps"
      :value="internalValue"
      :searchable="searchable"
      :internal-search="false"
      :loading="isLoading"
      :options="internalOptions"
      :label="label"
      @input="updateSelected"
      @search-changed="loadRemoteEntities"
    >
      <span slot="noResult">{{ noResult }}</span>
    </multiselect>
  </div>
</template>
<script>
import multiselectMixin from "vue-multiselect";
import selectMixin from "@/mixins/selectMixin";

export default {
    name: "EnyoSelect",
    mixins: [multiselectMixin, selectMixin],
    model: {
        prop: "vModelValue",
        event: "input"
    },
    props: {
        options: {
            type: Array,
            default: () => []
        },
        label: { type: String, default: '' },
        trackBy: { type: [String, Number], default: '' },
        vModelValue: { type: [String, Number, Array, Object], default: '' },
        noResult: { type: String, default: '' },
        url: { type: String, default: '' },
        multiple: { type: [String, Boolean], default: '' },
        searchable: {
            type: [String, Boolean, Number],
            default: false
        }
    },
    data() {
        return {
            isLoading: false,
            apiOptions: false
        };
    },

    computed: {
        internalOptions() {
            return this.apiOptions || this.options;
        },

        filteredProps() {
            const props = Object.assign({}, this.$props);
            delete props.vModelValue;
            delete props.input;
            delete props.value;
            return props;
        }
    },

    watch: {
        // 'vModelValue': function (newValue, oldValue) {
        //   this.setIncomingValue(newValue);
        // }
    },

    created() {
        // Check if the component is loaded globally
        if (!this.$root.$options.components.multiselect) {
            // eslint-disable-next-line
            console.error(
                "'vue-multiselect' is missing. Please download from https://github.com/monterail/vue-multiselect and register the component globally!"
            );
        }
    },

    mounted() {
        this.setIncomingValue(this.vModelValue);
        this.loadRemoteEntities().then(ok => {
            if (ok) {
                this.setIncomingValue(this.vModelValue);
            }
        });
    },
    methods: {}
};
</script>
<style lang="scss">
// @TODO: Fix after finding where is the scss
// @import "../../../src/assets/sass/theme/_variables.scss";

// .multiselect__tag {
//   background: $primary-bg !important;
// }
</style>
