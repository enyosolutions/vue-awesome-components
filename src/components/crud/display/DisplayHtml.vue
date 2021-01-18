<template>
  <!--  -->
  <div>
    <div
      v-if="isSafe"
      v-bind="$props"
      class="pointer"
      :class="$props.classes"
      :style="$props.styles"
      v-html="$props.value"
    ></div>
    <iframe
      v-if="!isSafe"
      v-bind="$props"
      value=""
      class="aw-display-iframe"
      :class="$props.classes"
      :style="$props.styles"
      :srcdoc="$props.value"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayHtml',
  mixins: [awesomeDisplayMixin]
};
</script>

<style>
.aw-display-iframe {
  width: 100%;
}
</style>
