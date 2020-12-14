<template>
  <div class="input-group field-file-input aw-form-field-image-picker">
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
    <div class="image-picker-actions" v-if="value">
      <button @click.prevent="openImageInTab" type="button" class="btn btn-alt-style btn-sm p-2">
        <i class="fa fa-external-link"></i>
      </button>
      <button @click.prevent="removeImage" type="button" class="btn btn-alt-style btn-sm p-2">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<script>
import VueFormGenerator from '../../form/form-generator';

// You need a specific loader for CSS files
import Base64Upload from '../../form/Base64Upload';

export default {
  components: { Base64Upload },
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      refresh: Date.now(),
      type: 'image',
      inputClass: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.inputClass
    };
  },
  computed: {
    placeholderComputed() {
      return this.placeholder || (this.schema && this.schema.fieldOptions && this.schema.fieldOptions.placeholder);
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
    openImageInTab() {
      window.open(this.value, '_blank');
    },
    removeImage() {
      this.value = '';
    },
    onChangeImage(file) {
      if (!file || !file.type.indexOf('image') === -1) {
        return;
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
.aw-form-field-image-picker {
  position: relative;
  .image-picker-actions {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 5px;
    button {
      color: #fff;
      background: var(--primary, #fff);
      border-color: var(--primary, #fff) !important;
    }
  }
}
</style>
