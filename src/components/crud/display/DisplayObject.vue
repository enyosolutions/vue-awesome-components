<template>
  <div class="pointer text-avoid-overflow" v-bind="$props">
    |
    <template v-for="(value, key) of $props.value" class="label label-info">
      <div :key="key">
        <label>{{ key }}:</label>
        <label class="text-primary">{{ value }}</label> |
      </div>
    </template>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayObject',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
