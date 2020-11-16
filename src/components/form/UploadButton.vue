<template>
  <div class="clearfix">
    <button type="button" :class="options.class || 'btn btn-info'" @click="buttonClick">
      <i class="fa fa-file-excel"></i> {{ options.label || 'Upload' }}
    </button>
    <input ref="inputButton" type="file" name="file" style="display: none" visbility="hidden" @change="filesChange" />
  </div>
</template>
<script>
// import apiErrors from '@/mixins/api-errors';

export default {
  name: 'UploadButton',
  inheritAttrs: false,
  props: {
    name: String,
    options: Object
  },
  computed: {},
  mounted() {
    this.reset();
  },
  methods: {
    reset() {
      const elem = this.$refs.inputButton;
      if (elem) {
        elem.value = '';
      }
    },
    // eslint-disable-next-line
    buttonClick($event) {
      const elem = this.$refs.inputButton;
      if (elem) {
        elem.click();
      }
    },
    filesChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      const file = files[0];

      if (this.options.maxSize) {
        const size = file.size && file.size / Math.pow(1000, 2);
        if (size > this.options.maxSize) {
          this.$awNotify({
            message: `Upload ${size} size exceeding`,
            type: 'warning'
          });
          return;
        }
      }

      if (this.options.upload) {
        this.uploadFiles(e);
      }

      if (this.options.base64) {
        this.base64(e, file);
      }
    },
    uploadFiles(e) {
      const formData = new FormData();
      const fieldName = e.target.name;
      const fileList = e.target.files;

      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      if (!this.options.targetUrl) {
        this.$awNotify({ message: 'Upload Url is Required', type: 'warning' });
        return;
      }

      if (!this.options.method) {
        this.$awNotify({ message: 'Upload Method is Required', type: 'warning' });
        return;
      }

      this.$http[this.options.method.toLowerCase()](this.options.targetUrl, formData)
        .then((res) => {
          this.$emit('uploaded', res.data);
          setTimeout(() => {
            this.reset();
          }, 300);
        })
        .catch(this.apiErrorCallback);
    },
    base64(e, file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURI = e.target.result;
        if (dataURI) {
          this.$emit('base64', dataURI);
        }
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>
<style></style>
