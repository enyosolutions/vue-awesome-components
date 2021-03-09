<template>
  <div
    class=""
    v-bind="$props"
    :class="
      $props.class +
        ' aw-display-field ajax-table-col-' +
        $props.field +
        ' ajax-table-col-value-' +
        valueClass +
        ' ' +
        $props.classes
    "
    :style="$props.styles"
    :is="tag"
    @click="$emit('clicked', $props)"
  >
    {{ prefix || '' }}{{ valueDisplay }}{{ suffix || '' }}
  </div>
</template>
<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';
import { isString } from 'lodash';

export default {
  name: 'DisplayDefault',
  mixins: [awesomeDisplayMixin],
  computed: {
    valueDisplay() {
      return this.value !== undefined && this.value !== null ? this.value : '...';
    },
    valueClass() {
      return this.$props.value && this.$props.value && isString(this.$props.value)
        ? this.$props.value.replace(/(<([^>]+)>)/gi, '').replace(/ /g, '')
        : '';
    }
  }
};
</script>

<style></style>
