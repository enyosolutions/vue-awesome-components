<template>
  <div class="input-group field-file-input aw-form-field-image-picker">
    <div class="d-flex m-0 p-0">
      <base64-upload
        v-if="!urlFieldIsVisible"
        :disabled="schema.disabled"
        :readonly="schema.readonly"
        :type="type"
        :placeholder="placeholderComputed"
        :inputClass="inputClass"
        :key="refresh"
        :image-src="value"
        @change="onChangeImage"
      >
      </base64-upload>
    </div>
    <div class="image-picker-actions" v-if="value">
      <button @click.prevent="openImageInTab" type="button" class="btn">
        <i class="fa fa-external-link"></i>
      </button>
      <button @click.prevent="removeImage" type="button" class="btn">
        <i class="fa fa-trash"></i>
      </button>
    </div>
    <div class="col-12 mt-1 p-0">
      <input
        placeholder="Paste an url here"
        v-if="urlFieldIsVisible && valueIsNotObject"
        type="text"
        class="form-control image-picker-input p-1 m-0 mt-1"
        v-model="value"
      />
    </div>
    <UploadButtonToggle v-model="urlFieldIsVisible"></UploadButtonToggle>
  </div>
</template>
<script>
import VueFormGenerator from '../../form/form-generator';

// You need a specific loader for CSS files
import Base64Upload from '../../form/Base64Upload.vue';
import UploadButtonToggle from './parts/UploadButtonToggle.vue';

export default {
  components: { Base64Upload, UploadButtonToggle },
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      refresh: Date.now(),
      type: 'image',
      inputClass: this.schema && this.schema.fieldOptions && this.schema.fieldOptions.inputClass,
      urlFieldIsVisible: false
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
  .btn-file-url {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px;
    z-index: 10;
    padding: 1px !important;
    border: transparent !important;
  }
  cursor: pointer;

  > * {
    cursor: pointer;
    width: 100%;
    height: auto;
  }
}
.aw-form-field-image-picker {
  position: relative;
  cursor: pointer;
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
    > button {
      color: #fff;
      background: var(--primary, #fff);
      border-color: var(--primary, #fff) !important;
      padding: 1px !important;
      font-size: 13px;
    }
  }
}
</style>
