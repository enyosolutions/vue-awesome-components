<template>
  <div class="input-group" >
    <datetime
    v-bind="schema"
    class="form-group" v-model="value"
    :input-id="inputId"
    :input-class=" ' form-control'"
    :type="pickerType"
    :disabled="schema.disabled"
    auto
    >
  </datetime>
  <div class="input-group-addon">
    <i class="fa fa-calendar"></i>
  </div>
</div>
</template>

<script>
import VueFormGenerator from 'vue-form-generator';
import moment from 'moment';
import _ from 'lodash';
import { Datetime } from 'vue-datetime';

// import dateFieldHelper from "vue-form-generator/src/utils/dateFieldHelper"

// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css';


const inputFormat = 'YYYY-MM-DDTHH:mm:ssZ';

export default {
  mixins: [VueFormGenerator.abstractField],
  components: {
    datetime: Datetime
  },
  mounted() {
    this.inputId = _.uniqueId('datetime_');
  },
  computed: {
    pickerType() {
      return (this.schema.fieldOptions && this.schema.fieldOptions.type) || 'datetime';
    },
  },
  data() {
    return {
      inputId: '',
    };
  },
  methods: {
    getDateFormat() {
      if (this.schema.fieldOptions && this.schema.fieldOptions.format) {
        return this.schema.fieldOptions.format;
      }
      return inputFormat;
    },

    getDefaultInputFormat() {
      return inputFormat;
    },

    formatValueToField(value) {
      if (value != null) {
        let dt;
        if (typeof this.fieldOptions.format !== 'undefined') {
          dt = moment(value, this.fieldOptions.format).toDate();
        } else {
          dt = new Date(value);
        }
        return moment(dt).format(this.getDateFormat());
      }

      return value;
    },

    formatValueToModel(value) {
      if (value != null) {
        const m = moment(value, this.getDateFormat());
        value = m.format(this.getDateFormat());
      }
      return value;
    },
  },

  beforeDestroy() {

  },
};
</script>


<style>
.field-dateTime .input-group {
  z-index: unset;
}
.vdatetime.form-group {
  margin-bottom: 0
}
</style>
