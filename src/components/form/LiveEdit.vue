<template>
    <div>
        <template v-if="isEditable || editable">
            <textarea v-if="multiline" class="live-edit" type="text" v-model="modelvalue" :placeholder="placeholder"></textarea>
            <input v-else class="live-edit" type="text" v-model="modelvalue" :placeholder="placeholder">
            <button class="btn-edit" title="Save" @click="saveEdit()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA2ElEQVQokX3RMUpEQRAE0DcfkUWWRQzFQA/hBgZewUA8iRgabmSgVzARTDXZVIy8gJEYiYGRGGywfH4bbCvjX7VgmKanq7qoKSEUpcEaGj/RhpjVjZW893GMITrM8m1elEvchGhrwjbucIYnHGCMUdbDolyFaPsWuhTZxAZecYJd7Ol5/sAFpjjEDh5DvOE+XXxbgnec9kTaDKT76teEdUwyrRq3tUhNGOWZoM3eFo7w8BuhsYjzpSI0ObO04dkivgGueyKruekcSvXTA3+jwzxEV0L8M7eMTwFuNUa403LOAAAAAElFTkSuQmCC" /></button>
            <button title="Clear / reset" class="btn-edit"  @click="clearEdit()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA60lEQVQokY3RPUpDQRQF4O89HhaP+CoJIYWluIBgYSFWggg2WroCNyFWQayyBAtXIGgpYp1S0rqFGLVRMzZ3zJTOFAP3nsP5GUmCBh3WktVFix7qPKsCvIsTPOM+SZ+VaoAzrOMGr0lawhCPSJgFqI9rzPGBS/SSpME33rHENi5wiOOw84ZF7GX/IzzgJ5S+4l2E0uAvV4SrsYdpADPpFv2yiDpUNnCELavTYAcHlaot5jqMI2C2MS3szXCaK4dNvMRyjquwV2aaoMuEFudBGkeldRRxhyfsoylDt6HUFb/cBHmYwUlSZZn/nl8EkGJCLlPUYQAAAABJRU5ErkJggg==" /></button>
        </template>
        <template v-else>
        <span v-html="modelvalue || placeholder"></span> <button title="Edit" class="btn-edit"  @click="isEditable = true"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA0ElEQVQokX3SoU4DURCF4e82G0I2TdMgKgh9A0QVD1BBeIkaLLpVGCSSJ0BUIUlwhARVh0KAQZAUDIZUIJmaS1N2u51xkzPn/jNzUwhNkaQSRYjFqhgNiQ6uMEVvVW8Qt3GKZwRu0A2h2ICxhzGOcJdf2keJ76pziUs84AvvmOCwhpSdLrL4I6O8YPDPNIt3cY6nNfEbhtX5Whn9BH3M0cMnRniszvjX0MUBrvGKsxCzEL+142SkY9zjFkO0mu6TQkhSgZ1s8FNzXV/7tq+xKZYdlHQTgFOznwAAAABJRU5ErkJggg==" /></button>
      </template>
    </div>
</template>
<script>
export default {
  name: 'LiveEdit',
  props: {
    value: {
      type: [String, Object],
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      isEditable: false,
      originalValue: this.value,
      modelvalue: this.value,
    }
  },
  watch: {
    modelvalue: function (val) {
      this.$emit('input', val);
    }
  },
  methods: {
    saveEdit() {
      this.isEditable = false;
      this.$emit('input', this.modelvalue);
    },
    clearEdit() {
      this.isEditable = false;
      this.modelvalue = this.originalValue;
    },
  }
}
</script>
<style scoped>
.live-edit {
  font-size: 1em !important;
}

.btn-edit {
  border: none;
  background: transparent;
}
</style>
