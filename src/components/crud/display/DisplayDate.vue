<template>
  <div v-bind="$props" :class="$props.classes" class="aw-display-date pointer" v-html="computedDate"></div>
</template>

<script>
import dayjs from 'dayjs';
// require is needed because plugins are not correctly inserted
const customParseFormat = require('dayjs/plugin/customParseFormat.js');
dayjs.extend(customParseFormat);
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayDate',
  mixins: [awesomeDisplayMixin],
  computed: {
    computedFormat() {
      if (this.format) {
        return this.format;
      }
      switch (this.type) {
        case 'datetime':
          return 'DD/MM/YYYY <br/> hh:mm';
        case 'date':
          return 'DD/MM/YYYY';

        case 'time':
          return 'hh:mm';
        default:
          return '';
      }
    },
    computedDate() {
      if (!this.value) {
        return '...';
      }
      let dt;
      if (typeof this.inputFormat !== 'undefined') {
        dt = dayjs(this.value, this.inputFormat).toDate();
      } else {
        dt = new Date(this.value);
      }
      let df = dayjs(dt).format(this.computedFormat);
      return df.replace(/<(?!br\s*\/?)[^>]+>/g, '');
    }
  }
};
</script>

<style>
.aw-display-date.badge {
  display: block;
}
</style>
