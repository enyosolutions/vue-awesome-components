<template>
  <div v-bind="$props">
    <span class="pointer">
      <img :src="$props.src" alt="image" class="ajax-table-img" />
    </span>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayImage',
  mixins: [awesomeDisplayMixin],
};
</script>

<style></style>
