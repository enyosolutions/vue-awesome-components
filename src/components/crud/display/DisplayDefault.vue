<template>
  <div
    class="pointer text-avoid-overflow"
    v-bind="$props"
    :class="$props.class + ' ajax-table-col-' + $props.field + ' ajax-table-col-value-' + valueClass"
    :style="$props.style"
    @click="$emit('clicked', $props)"
  >
    {{ $props.value || "..." }}
  </div>
</template>

<script>
import awesomeDisplayMixin from "../../../mixins/displayMixin";
import { isString } from "lodash";

export default {
  name: "DisplayDefault",
  mixins: [awesomeDisplayMixin],
  computed: {
    valueClass() {
      return this.$props.value && this.$props.value && isString(this.$props.value)
        ? this.$props.value.replace(/(<([^>]+)>)/gi, "").replace(/ /g, "")
        : "";
    }
  }
};
</script>

<style></style>
