<template>
  <div class="field-json-text-editor">
    <textarea
      v-model="innerValue"
      class="form-control field-json-textarea"
      @input="saveJson"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    />
    <div class="text-right">
      <div v-if="warning" class="text-danger">
        <i class="fa fa-exclamation-circle" />
        {{ $t(warning) }}
      </div>
      <div v-if="!warning && !typing && this.innerValue" class="text-success">
        <i class="fa fa-check" />
      </div>
      <div v-if="typing" class="text-info">
        ...
      </div>
    </div>
    <!--
      <button type="button" class="btn btn-secondary btn-block btn-sm json-textarea-button"
      @click="saveJson">Save</button>
    -->
  </div>
</template>
<script>
import VueFormGenerator from '../../form/form-generator';

// You need a specific loader for CSS files

export default {
  name: 'field-json-textarea',
  mixins: [VueFormGenerator.abstractField],
  data() {
    return {
      innerValue: '',
      warning: '',
      typing: false,
      debounce: null
    };
  },
  computed: {},
  watch: {
    // eslint-disable-next-line
    value(change, old) {
      if (change !== old) {
        this.innerValue = JSON.stringify(change, null, 2);
      }
    }
  },
  beforeDestroy() {},
  methods: {
    saveJson(event) {
      this.typing = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.warning = '';
        this.typing = null;
        this.innerValue = event.target.value;
        try {
          if (this.innerValue) {
            this.value = JSON.parse(this.innerValue);
          }
        } catch (e) {
          this.warning = 'common.messages.invalid_json';
        }
      }, 300);
    }
  }
};
</script>
<style lang="scss">
.vue-form-generator {
  .field-json-text-editor {
    width: 100%;
    textarea.form-control {
      background: #333;
      color: #fff;
      width: 100%;
      min-height: 200px;
    }
  }
  button.json-textarea-button {
    background: #888888;
    color: #fff;
  }
}
</style>
