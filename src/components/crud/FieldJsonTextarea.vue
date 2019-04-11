<template>
  <div class="">
    <textarea class="form-control" v-model="innerValue" @input="saveJson"></textarea>
    <div v-if="warning" class="text-danger"><i class="fa fa-exclamation-circle"></i>{{ $t(warning) }}</div>
    <!--
      <button type="button" class="btn btn-secondary btn-block btn-sm json-textarea-button"
      @click="saveJson">Save</button>
-->
  </div>
</template>
<script>
/* global $ */
import VueFormGenerator from 'vue-form-generator';
import moment from 'moment';
import _ from 'lodash';

// You need a specific loader for CSS files

export default {
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      innerValue: '',
      warning: '',
    };
  },
  created() {
    const that = this;
    this.saveJson = _.debounce(
      () => {
        that.warning = null;
        try {
          if (that.innerValue) {
            that.value = JSON.parse(that.innerValue);
          }
          that.value = that.innerValue;
        } catch (e) {
          that.warning = 'common.messages.invalid_json';
        }
      }, 300
    );
  },
  watch: {
    value(change, old) {
      this.innerValue = JSON.stringify(this.value, null, 2);
    }
  },
  computed: {},
  methods: {},

  mounted() {

  },

  beforeDestroy() {

  }
};

</script>
<style lang="scss">
.field-file-input {
  cursor: pointer;

  >* {
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
