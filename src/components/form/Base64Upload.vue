<template>
  <div class="base64-upload">
    <img :src="srcComputed" v-if="isImage" :style="imageStyle" />
    <p v-if="!isImage" :class="inputClass">{{ name || placeholder }}</p>
    <input type="file" :disabled="disabled || readonly" :accept="isImage ? 'image/*' : '*'" @change="onChange" />
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: [String, Object],
    inputClass: String,
    disabled: [String, Boolean],
    readonly: [String, Boolean],
    imageStyle: Object,
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: 'Click or drop a file' },
    accept: { type: String, default: '' }
  },
  data() {
    return {
      src: this.imageSrc,
      name: ''
    };
  },
  computed: {
    isImage() {
      return (
        (this.src && this.type && this.type.indexOf('image') === 0) ||
        (this.src && this.src.type && this.src.type.indexOf('image') === 0)
      );
    },
    srcComputed() {
      let src = this.src || this.imageSrc;
      if (!src) {
        return '';
      }
      if (src && src.base64) {
        src = src && src.base64 ? src.base64 : src;
        return src.indexOf('data:') === 0 ? src : `data:${this.type};base64,${src}`;
      }
      return src;
    }
  },
  methods: {
    onChange(event) {
      if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.addEventListener('load', (e) => {
          this.src = e.target.result;
          let [, base64] = this.src.split(',');
          this.name = file.name;
          this.$emit('change', {
            size: file.size,
            type: file.type,
            name: file.name,
            base64: base64
          });
        });
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
.base64-upload {
  position: relative;
}

.base64-upload p {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 3px;
  text-align: left;
  padding: 5px;
}
img {
  width: 100%;
  height: 100%;
}
input {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
