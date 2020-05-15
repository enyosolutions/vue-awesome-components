<template>
  <div :class="'col-' + cols + ' ' + styleClasses" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: 'div' },
    cols: { type: Number, default: 0 },
    styleClasses: { type: String, default: undefined },
    style: { type: Function, default: undefined },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
