<template>
  <div
    class="pointer text-avoid-overflow"
    v-bind="$props"
    :class="
      $props.class +
        ' ajax-table-col-' +
        $props.value +
        ' ajax-table-col-value-' +
        $props.value
    "
    :style="$props.style"
  >
    {{ $props.value }}
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayDefault',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
