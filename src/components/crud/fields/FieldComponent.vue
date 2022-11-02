<template>
  <div class="field-custom-component">
    <component :is="schema.component" v-bind="$props" v-model="model[schema.model]" v-on="$listeners"></component>
  </div>
</template>

<script>
import VueFormGenerator from '../../form/form-generator';

export default {
  name: 'FieldComponent',
  mixins: [VueFormGenerator.abstractField],
  mounted() {},
  computed: {},
  methods: {},

  beforeDestroy() {}
};
</script>

<style lang="scss"></style>
