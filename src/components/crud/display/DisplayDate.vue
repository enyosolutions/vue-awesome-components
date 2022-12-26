<template>
  <div v-bind="$props" :class="$props.classes" class="aw-display-date pointer" v-html="computedDate"></div>
</template>

<script>
import dayjs from 'dayjs';
// require is needed because plugins are not correctly inserted
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import awesomeDisplayMixin from '../../../mixins/displayMixin';

dayjs.extend(customParseFormat);

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
          return 'DD/MM/YYYY <br/> HH:mm';
        case 'date':
          return 'DD/MM/YYYY';

        case 'time':
          return 'HH:mm';
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
