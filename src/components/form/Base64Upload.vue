<template>
  <div class="base64-upload">
    <img :src="src" v-if="type == 'image'" :style="imageStyle" />
    <p v-if="type != 'image'" :class="inputClass">{{ name || placeholder }}</p>
    <input
      type="file"
      :disabled="disabled || readonly"
      :accept="type == 'image' ? 'image/*' : '*'"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: String,
    inputClass: String,
    disabled: [String, Boolean],
    readonly: [String, Boolean],
    imageStyle: Object,
    type: { type: String, default: "image" },
    placeholder: { type: String, default: "Choose a file" },
    accept: { type: String, default: "" }
  },
  data() {
    return {
      src: this.imageSrc,
      name: ""
    };
  },
  methods: {
    onChange(event) {
      if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.addEventListener("load", (e) => {
          this.src = e.target.result;
          let [, base64] = this.src.split(",");
          this.name = file.name;
          this.$emit("change", {
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
  border: 1px solid #999;
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