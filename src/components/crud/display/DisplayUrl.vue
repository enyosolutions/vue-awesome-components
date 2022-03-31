<template>
  <div class="text-avoid-overflow" :class="$props.classes" :style="$props.styles" v-bind="$props">
    <a
      v-if="$props.value"
      :href="$props.value"
      target="_blank"
      class="ajax-table-href "
      :class="embed ? 'pull-right' : ''"
    >
      <span v-if="!embed">
        {{ $props.value }}
      </span>
      <i class="fa fa-external-link"></i>
    </a>
    <template v-if="embed && $props.value">
      <iframe
        v-bind="$props"
        value=""
        class="aw-display-iframe "
        :class="$props.classes"
        :src="$props.value"
        frameborder="0"
      ></iframe>
    </template>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';
export default {
  name: 'DisplayUrl',
  mixins: [awesomeDisplayMixin]
};
</script>

<style></style>
