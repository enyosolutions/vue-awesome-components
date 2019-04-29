<template>
  <div :class="'card ' + className">
    <div class="card-image" v-if="$slots.image">
      <slot name="image"></slot>
    </div>
    <div class="card-header" :class="headerClass" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body" :class="bodyClass">
      <slot></slot>
    </div>
    <div class="card-footer" :class="footerClass" v-if="$slots.footer">
      <hr>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "enyo-card",
  props: {
    className: String,
    headerClass: String,
    bodyClass: String,
    footerClass: String
  }
};
</script>
<style>
</style>
