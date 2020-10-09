<template>
  <div :class="'card ' + className">
    <div
      v-if="$slots.image"
      class="card-image"
    >
      <slot name="image" />
    </div>
    <div
      v-if="$slots.header"
      class="card-header"
      :class="headerClass"
    >
      <slot name="header" />
    </div>
    <div
      class="card-body"
      :class="bodyClass"
    >
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
      :class="footerClass"
    >
      <hr>
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'EnyoCard',
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
