<template>
  <div
    class="pointer text-avoid-overflow aw-display-object"
    :class="$props.classes"
    :style="$props.styles"
    v-bind="$props"
  >
    <template v-if="displayField && !_useArrayMode && !multiple">
      {{ value && value[displayField] }}
    </template>
    <template v-else>
      <template v-for="(value, key) of $props.value" class="label label-info">
        <div :key="key" class="badge badge-info aw-display-object-item mr-1">
          <template v-if="multiple">
            {{ value && value[displayField] }}
          </template>
          <template v-if="!_valueIsArray">
            <label>{{ key }}:</label>
            <label class="text-primary">{{ value }}</label> |
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import awesomeDisplayMixin from "../../../mixins/displayMixin";

export default {
  name: "DisplayObject",
  mixins: [awesomeDisplayMixin],
  computed: {
    _valueIsArray() {
      return Array.isArray(this.value);
    },
    _useArrayMode() {
      return this.multiple && this.displayField;
    }
  }
};
</script>

<style></style>
