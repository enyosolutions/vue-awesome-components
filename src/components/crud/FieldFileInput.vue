<template>
  <div class="input-group field-file-input">
    <base64-upload :key="refresh" :imageSrc="value" @change="onChangeImage"></base64-upload>
  </div>
</template>
<script>
/* global $ */
import VueFormGenerator from 'vue-form-generator';
import { defaults } from 'lodash';
import moment from 'moment';

// You need a specific loader for CSS files
import Base64Upload from 'vue-base64-upload';

export default {
  mixins: [VueFormGenerator.abstractField],
  components: { Base64Upload },
  data() {
    return {
      refresh: new Date(),
      oldValue: ''
    };
  },
  mounted() {
    this.oldValue = this.value;
  },
  watch: {
    value(change, old) {
      if (change !== old) {
        this.refresh = Date.now();
      }
    }
  },
  computed: {},
  methods: {
    onChangeImage(file) {
      console.log('Field File input', Object.keys(file));
      this.value = file.base64;
    },

  },

  mounted() {

  },

  beforeDestroy() {

  }
};

</script>
<style lang="scss">
.field-file-input {
  cursor: pointer;

  >* {
    cursor: pointer;
    width: 100%;
    height: auto;
  }
}

</style>
