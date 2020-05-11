<template>
  <div
    class="awesome-layout-group"
    :class="computedCols + ' ' + wrapperClasses"
    :style="style"
  >
    <div
      v-if="theme === 'card'"
      :class="
        styleClasses + ' ' + (theme === 'card' ? ' card card-primary' : '')
      "
      :style="style"
    >
      <div class="card-header">
        {{ $t(legend) }}
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
    <div v-else="" :class="styleClasses" :style="style" :title="legend">
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
    wrapperClasses: { type: String, default: '' },
    theme: { type: String, default: 'card' },
  },
  computed: {},
  data() {
    return {
      fieldId: uniqueId(this.id + '_'),
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
