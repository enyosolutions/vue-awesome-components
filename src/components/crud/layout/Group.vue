<template>
  <div class="awesome-layout-group" :class="computedCols + ' ' + wrapperClasses" :style="styles">
    <div
      v-if="theme === 'card'"
      :class="
        styleClasses + ' ' + (theme === 'card' ? ' card card-primary' : '')
      "
      :style="styles"
    >
      <div class="card-header" :class="headerClasses">{{ $t(legend) }}</div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
    <div v-else :class="styleClasses" :style="styles" :title="legend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import layoutMixin from "../../../mixins/layoutMixin";
import i18nMixin from "../../../mixins/i18nMixin";
import { uniqueId } from "lodash";

export default {
  mixins: [i18nMixin, layoutMixin],
  props: {
    id: { type: String, default: "" },
    theme: { type: String, default: "card" },
    fields: { type: Array, default: () => [] },
    formOptions: { type: [String, Object], default: "" }
  },
  computed: {},
  data() {
    return {
      fieldId: uniqueId(this.id + "_")
    };
  },
  methods: {}
};
</script>

<style lang="scss"></style>
