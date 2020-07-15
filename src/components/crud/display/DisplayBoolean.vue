<template>
  <div
    class="text-avoid-overflow"
    v-bind="$props"
    :data-value="$props.value"
    :class="$props.classes"
    :style="$props.styles"
  >
    <i
      class="fa"
      :class="{
        'fa-check text-success': $props.value,
        'fa-times text-danger': !$props.value && $props.value !== undefined,
      }"
    ></i>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';
export default {
  name: 'DisplayBoolean',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
