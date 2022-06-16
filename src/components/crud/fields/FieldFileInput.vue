<template>
  <div class="input-group field-file-input row">
    <div class="col-12">
      <base64-upload
        :disabled="schema.disabled"
        :readonly="schema.readonly"
        :type="type"
        :placeholder="placeholderComputed"
        :inputClass="inputClass"
        :key="refresh"
        :image-src="value"
        @change="onChangeImage"
      />
    </div>
    <div class="col-12 p-0 mt-1">
      <input v-if="valueIsNotObject" type="text" class="form-control mt-1" placeholder="url" v-model="value" />
    </div>
  </div>
</template>
<script>
import VueFormGenerator from '../../form/form-generator';

// You need a specific loader for CSS files
import Base64Upload from '../../form/Base64Upload.vue';

export default {
  name: 'field-filePicker',
  components: { Base64Upload },
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      refresh: Date.now(),
      type:
        this.schema &&
        this.schema.fieldOptions &&
        (this.schema.fieldOptions.type || this.schema.fieldOptions.inputType),
      inputClass: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.inputClass
    };
  },
  computed: {
    placeholderComputed() {
      return this.placeholder || (this.schema && this.schema.fieldOptions && this.schema.fieldOptions.placeholder);
    },
    valueIsNotObject() {
      return !this.value || typeof this.value !== 'object';
    }
  },
  watch: {
    value(change, old) {
      if (change !== old) {
        this.refresh = Date.now();
      }
    }
  },
  mounted() {
    this.oldValue = this.value;
  },

  beforeDestroy() {},
  methods: {
    onChangeImage(file) {
      if (file && file.type.indexOf('image') > -1) {
        this.type = file.type;
      }
      this.value = file;
    }
  }
};
</script>
<style lang="scss">
.field-file-input {
  cursor: pointer;

  > * {
    cursor: pointer;
    width: 100%;
    height: auto;
  }
}
</style>
