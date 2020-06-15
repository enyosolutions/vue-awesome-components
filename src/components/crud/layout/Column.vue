<template>
  <div :class="'col-md-' + cols + ' ' + styleClasses" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: "div" },
    cols: { type: Number, default: 0 },
    styleClasses: { type: String, default: undefined },
    styles: { type: Function, default: undefined }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
