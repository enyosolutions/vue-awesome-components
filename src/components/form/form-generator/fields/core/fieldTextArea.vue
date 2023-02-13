<template>
  <textarea
    class="form-control"
    :class="fieldClasses"
    :disabled="disabled"
    :id="fieldID"
    :maxlength="fieldOptions.max"
    :minlength="fieldOptions.min"
    :name="inputName"
    :placeholder="placeholder"
    :readonly="readonly"
    :required="required"
    :rows="fieldOptions.rows || 2"
    v-attributes="'input'"
    v-model="value"
  ></textarea>
</template>

<script>
import abstractField from '../abstractField';

export default {
  name: 'field-textArea', // @TODO: rename to field-textarea
  mixins: [abstractField]
};
</script>
