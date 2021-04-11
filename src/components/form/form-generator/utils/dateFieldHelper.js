import dayjs from 'dayjs';
let inputFormat = 'YYYY-MM-DD hh:mm:ss';

export default {
  getDefaultInputFormat() {
    return inputFormat;
  },
  getDateFormat() {
    if (typeof this.fieldOptions.format !== 'undefined') {
      return this.fieldOptions.format;
    } else {
      return this.getDefaultInputFormat();
    }
  },
  formatValueToField(value) {
    if (value != null) {
      let dt;
      if (typeof this.fieldOptions.format !== 'undefined') {
        dt = dayjs.parse(value, this.fieldOptions.format);
      } else {
        dt = new Date(value);
      }

      return dayjs.format(dt, this.getDateFormat());
    }

    return value;
  },

  formatValueToModel(value) {
    if (value != null) {
      let m = dayjs.parse(value, this.getDateFormat());
      if (typeof this.fieldOptions.format !== 'undefined') {
        value = dayjs.format(m, this.fieldOptions.format);
      } else {
        value = m.valueOf();
      }
    }

    return value;
  }
};
