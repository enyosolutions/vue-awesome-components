<template>
  <fieldInput v-bind="$props" type="number" />
</template>

<script>
import abstractField from '../abstractField';
import fieldInput from './fieldInput';

export default {
  name: 'field-number',
  mixins: [abstractField],
  components: {
    fieldInput
  },
  computed: {},
  methods: {},

  mounted() {
    if (this.schema.fieldOptions && !this.schema.fieldOptions.inputType) {
      this.schema.fieldOptions.inputType = 'number';
    }
  },

  created() {}
};
</script>

<style lang="scss"></style>
