<template>
  <enyo-card
    class="card-stats"
    :class="className"
  >
    <div class="row">
      <div
        v-if="$slots.header"
        class="col-5"
      >
        <div class="icon-big text-center">
          <slot name="header" />
        </div>
      </div>
      <div
        v-if="$slots.content"
        class="col-7"
      >
        <div class="numbers">
          <slot name="content" />
        </div>
      </div>
    </div>
    <div
      v-if="$slots.footer"
      slot="footer"
      class="stats"
    >
      <slot name="footer" />
    </div>
  </enyo-card>
</template>
<script>
import EnyoCard from './EnyoCard.vue';

export default {
  name: 'EnyoStatsCard',
  components: {
    EnyoCard
  },
  props: {
    className: String
  }
};
</script>
<style>
</style>
