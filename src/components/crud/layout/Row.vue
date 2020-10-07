<template>
  <div class="row" :class="styleClasses + ' ' + computedCols" :style="styleComputed">
    <div :class="computedCols">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import layoutMixin from '../../../mixins/layoutMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import { uniqueId } from 'lodash';

export default {
  mixins: [i18nMixin, layoutMixin],
  props: {
    id: { type: String, default: '' },
    negativeMargin: { type: Boolean, default: false }
  },
  computed: {
    styleComputed() {
      return {
        marginLeft: this.negativeMargin ? '-15px' : '0px',
        marginRight: this.negativeMargin ? '-15px' : '0px'
      };
    }
  },
  data() {
    return {
      fieldId: uniqueId(this.id + '_')
    };
  },
  methods: {}
};
</script>

<style lang="scss">
</style>
