<template>
  <div class="input-group">
    <datetime
      v-bind="schema"
      class="field-date-fw"
      v-model="value"
      :input-id="inputId"
      :input-class="' form-control'"
      :type="pickerType"
      :disabled="schema.disabled || schema.readonly"
      auto
    >
    </datetime>
  </div>
</template>

<script>
import VueFormGenerator from '../../form/form-generator';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import _ from 'lodash';
import { Datetime } from 'vue-datetime';

// import dateFieldHelper from "../../form/form-generator/utils/dateFieldHelper"

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
    }
  },
  data() {
    return {
      inputId: ''
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
      if (value) {
        let dt;
        if (typeof this.fieldOptions.format !== 'undefined') {
          dt = dayjs(value, this.fieldOptions.format).toDate();
        } else {
          dt = new Date(value);
        }
        return dayjs(dt).format(this.getDateFormat());
      }

      return value;
    },

    formatValueToModel(value) {
      if (value) {
        value = dayjs(value).format(this.getDateFormat());
      } else {
        value = undefined;
      }
      return value;
    }
  },

  beforeDestroy() {}
};
</script>

<style>
.field-dateTime .input-group {
  z-index: unset;
}
.vdatetime.form-group {
  margin-bottom: 0;
}
.vdatetime {
  position: relative;
}
.vdatetime.field-date-fw {
  width: 100%;
}

.vdatetime:after {
  font-family: fontAwesome;
  content: '\f073';
  position: absolute;
  right: 3px;
  top: 0;
}
</style>
