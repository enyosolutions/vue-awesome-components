<template>
  <div
    class="awesome-layout-group"
    :class="computedCols + ' ' + styleClasses"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script>
import layoutMixin from '@/mixins/layoutMixin';
import i18nMixin from '@/mixins/i18nMixin';
import { uniqueId } from 'lodash';

export default {
  mixins: [i18nMixin, layoutMixin],
  props: {
    id: { type: String, default: '' },
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
