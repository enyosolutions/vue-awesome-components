<template>
  <div class>
    <textarea
      v-model="innerValue"
      class="form-control"
      @input="saveJson"
    />
    <div
      v-if="warning"
      class="text-danger"
    >
      <i class="fa fa-exclamation-circle" />
      {{ $t(warning) }}
    </div>
    <!--
      <button type="button" class="btn btn-secondary btn-block btn-sm json-textarea-button"
      @click="saveJson">Save</button>
    -->
  </div>
</template>
<script>
import VueFormGenerator from "../../form/form-generator";
// import moment from 'moment';
import _ from "lodash";

// You need a specific loader for CSS files

export default {
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      innerValue: "",
      warning: ""
    };
  },
  computed: {},
  watch: {
    // eslint-disable-next-line
    value(change, old) {
      this.innerValue = JSON.stringify(this.value, null, 2);
    }
  },
  created() {
    const that = this;
    this.saveJson = _.debounce(() => {
      that.warning = null;
      try {
        if (that.innerValue) {
          that.value = JSON.parse(that.innerValue);
        }
        that.value = that.innerValue;
      } catch (e) {
        that.warning = "common.messages.invalid_json";
      }
    }, 300);
  },

  mounted() {},

  beforeDestroy() {},
  methods: {}
};
</script>
<style lang="scss">
.field-file-input {
  cursor: pointer;

  > * {
    cursor: pointer;
    width: 100%;
    height: auto;
  }
}

button.json-textarea-button {
  background: #888888;
  color: #fff;
}
</style>
