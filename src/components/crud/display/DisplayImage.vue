<template>
  <div v-bind="$props" :class="$props.classes" :style="$props.styles">
    <span class="pointer" v-if="$props.src">
      <img :src="$props.src" alt="image" class="aw-display-image-img" />
    </span>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayImage',
  mixins: [awesomeDisplayMixin]
};
</script>

<style>
.aw-display-image-img {
  width: 100%;
}
</style>
