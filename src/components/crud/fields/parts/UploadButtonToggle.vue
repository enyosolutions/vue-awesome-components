<template>
  <small @click="onClick" class="text-right">
    <i
      class="fa text-primary"
      :class="{
        'fa-upload': !value,
        'fa-link': value
      }"
    ></i>
    {{ value ? $t('AwesomeForm.labels.provideFileInstead') : $t('AwesomeForm.labels.provideUrlInstead') }}
  </small>
</template>
<script>
export default {
  name: 'UploadButtonToggle',
  props: {
    value: Boolean
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$emit('input', !this.value);
      this.$emit('change', !this.value);
    }
  }
};
</script>