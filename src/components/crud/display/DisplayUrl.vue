<template>
  <div class="text-avoid-overflow" v-bind="$props">
    <a :href="$props.value" target="_blank" class="ajax-table-href">{{
      $props.value
    }}</a>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';
export default {
  name: 'DisplayUrl',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
