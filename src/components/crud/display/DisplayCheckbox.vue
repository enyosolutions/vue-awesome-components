<template>
  <div class="pointer text-avoid-overflow" v-bind="$props">
    <label v-if="$props.value === true">
      <input class="ajax-table-checkbox" type="checkbox" checked disabled />
    </label>
    <label v-else>
      <input class="ajax-table-checkbox" type="checkbox" disabled />
    </label>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayCheckbox',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
