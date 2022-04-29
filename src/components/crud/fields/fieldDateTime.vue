<template>
  <div class="input-group">
    <DateRangePicker
      :input-id="inputId"
      :open="'auto'"
      v-bind="fieldOptions"
      :single-date-picker="true"
      :date-range="formatValue"
      :locale-data="dateRangePickerConfig.locale"
      :disabled="schema.disabled || schema.readonly"
      :readonly="schema.readonly"
      :ranges="false"
      opens="center"
      :class="isTimepickerOnly ? 'date-range-timepicker-only' : ''"
      @update="onDateSelected"
    >
      <template slot="input">
        <span class="text-truncate">{{ formatValueForDisplay }}</span>
        <i class="fa fa-calendar picker-icon"></i>
      </template>
    </DateRangePicker>
  </div>
</template>

<script>
import VueFormGenerator from '../../form/form-generator';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat.js');
dayjs.extend(customParseFormat);
import _ from 'lodash';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

const inputFormat = 'DD.MM.YYYY hh:mm';

export default {
  mixins: [VueFormGenerator.abstractField],
  components: {
    DateRangePicker
  },
  props: {},
  mounted() {
    this.inputId = _.uniqueId('datetime_');
  },
  computed: {
    fieldOptions() {
      const options = this.schema && this.schema.fieldOptions ? this.schema && this.schema.fieldOptions : {};
      return _.merge(
        {
          timePicker: true,
          datePicker: true,
          autoApply: false,
          showDropdowns: true,
          timePickerIncrement: 5,
          showWeekNumbers: false
        },
        options
      );
    },

    isTimepickerOnly() {
      return this.fieldOptions.timePicker && !this.fieldOptions.datePicker;
    },
    formatValue() {
      if (!this.value) {
        return { startDate: '' };
      }
      if (this.value instanceof Date) {
        return { startDate: this.value.toISOString ? this.value.toISOString() : this.value || '' };
      }
      if (typeof this.value === 'object' && this.value.startDate) {
        return this.value;
      }

      return { startDate: this.value.toISOString ? this.value.toISOString() : this.value || '' };
    },

    getDateFormat() {
      if (this.fieldOptions.format) {
        return this.fieldOptions.format;
      }
      return inputFormat;
    },

    formatValueForDisplay() {
      if (this.value) {
        return dayjs(this.value).format(this.getDateFormat);
      }
      return this.value;
    }
  },
  data() {
    return {
      inputId: '',
      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      },
      dateRangePickerConfig: {
        startDate: new Date().toISOString(),
        locale: {
          direction: 'ltr', // direction of text
          separator: ' - ', // separator between the two ranges
          applyLabel: 'Select',
          cancelLabel: 'Cancel',
          weekLabel: 'W',
          customRangeLabel: 'Custom Range',
          daysOfWeek: dayjs.weekdaysMin(),
          monthNames: dayjs.monthsShort(),
          firstDay: 1
        }
      }
    };
  },
  methods: {
    getDefaultInputFormat() {
      return inputFormat;
    },

    onDateSelected($event) {
      if (!$event || !$event.startDate) {
        this.value = '';
        return;
      }
      this.value = $event.startDate;
    }
  },

  beforeDestroy() {}
};
</script>

<style scoped>
.field-dateTime .vue-daterange-picker {
  width: 100%;
}
.field-dateTime .input-group {
  z-index: unset;
}
.field-dateTime .picker-icon {
  float: right;
  margin-right: -5px;
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
.date-range-timepicker-only .calendar-table {
  display: none;
}
</style>
