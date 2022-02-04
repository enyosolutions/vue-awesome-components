<template>
  <div
    class="pointer text-avoid-overflow aw-display-object"
    :value="$props.value"
    :field="$props.field"
    :class="$props.wrapperClasses"
    :style="$props.wrapperStyles"
  >
    <div :class="$props.classes" :style="$props.styles">
      <template v-if="!_useArrayMode && !multiple">
        {{ displayField ? value && value[displayField] : value }}
      </template>
      <template v-else>
        <template v-for="(value, key) of $props.value" class="label label-info">
          <div :key="key" class="badge badge-info aw-display-object-item mr-1">
            <template>
              {{ (value && value[displayField]) || value }}
            </template>
            <template v-if="!_valueIsArray">
              <label>{{ key }}:</label>
              <label class="">{{ value }}</label> |
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayObject',
  mixins: [awesomeDisplayMixin],
  computed: {
    _valueIsArray() {
      return Array.isArray(this.value);
    },
    _useArrayMode() {
      return this.multiple || this._valueIsArray;
    }
  }
};
</script>

<style></style>
