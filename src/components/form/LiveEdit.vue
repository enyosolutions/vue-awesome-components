<template>
  <div>
    <template v-if="isEditable">
      <!-- input text -->
      <template v-if="type === 'text' ">
        <input
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          type="text"
          :placeholder="placeholder"
        >
      </template>
      <!-- input number -->
      <template v-if="type === 'number' ">
        <input
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          type="number"
          :placeholder="placeholder"
        >
      </template>
      <!-- checkbox -->
      <template v-if="type === 'checkbox' ">
        <input
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          type="checkbox"
          :value="true"
          :placeholder="placeholder"
        >
      </template>
      <!-- input date -->
      <template v-if="type === 'date' ">
        <input
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          type="date"
          :placeholder="placeholder"
        >
      </template>
      <!-- select -->
      <template v-if="type === 'select' ">
        <select
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          :placeholder="placeholder"
          :multiple="selectOptions.multiple"
        >
          <option
            v-for="(option, index) of _selectValues"
            :key="index"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </template>
      <!-- textarea -->
      <template v-if="type === 'textarea' ">
        <textarea
          v-model="modelvalue"
          :class="'live-edit ' + editClass"
          type="text"
          :placeholder="placeholder"
        />
      </template>
      <button
        class="btn-edit"
        title="Save"
        @click="saveEdit()"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA2ElEQVQokX3RMUpEQRAE0DcfkUWWRQzFQA/hBgZewUA8iRgabmSgVzARTDXZVIy8gJEYiYGRGGywfH4bbCvjX7VgmKanq7qoKSEUpcEaGj/RhpjVjZW893GMITrM8m1elEvchGhrwjbucIYnHGCMUdbDolyFaPsWuhTZxAZecYJd7Ol5/sAFpjjEDh5DvOE+XXxbgnec9kTaDKT76teEdUwyrRq3tUhNGOWZoM3eFo7w8BuhsYjzpSI0ObO04dkivgGueyKruekcSvXTA3+jwzxEV0L8M7eMTwFuNUa403LOAAAAAElFTkSuQmCC">
      </button>
      <button
        title="Clear / reset"
        class="btn-edit"
        @click="clearEdit()"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA60lEQVQokY3RPUpDQRQF4O89HhaP+CoJIYWluIBgYSFWggg2WroCNyFWQayyBAtXIGgpYp1S0rqFGLVRMzZ3zJTOFAP3nsP5GUmCBh3WktVFix7qPKsCvIsTPOM+SZ+VaoAzrOMGr0lawhCPSJgFqI9rzPGBS/SSpME33rHENi5wiOOw84ZF7GX/IzzgJ5S+4l2E0uAvV4SrsYdpADPpFv2yiDpUNnCELavTYAcHlaot5jqMI2C2MS3szXCaK4dNvMRyjquwV2aaoMuEFudBGkeldRRxhyfsoylDt6HUFb/cBHmYwUlSZZn/nl8EkGJCLlPUYQAAAABJRU5ErkJggg==">
      </button>
    </template>
    <template v-else>
      <span v-html="modelvalue || placeholder" /> <button
        title="Edit"
        class="btn-edit"
        @click="isEditable = true"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAA0ElEQVQokX3SoU4DURCF4e82G0I2TdMgKgh9A0QVD1BBeIkaLLpVGCSSJ0BUIUlwhARVh0KAQZAUDIZUIJmaS1N2u51xkzPn/jNzUwhNkaQSRYjFqhgNiQ6uMEVvVW8Qt3GKZwRu0A2h2ICxhzGOcJdf2keJ76pziUs84AvvmOCwhpSdLrL4I6O8YPDPNIt3cY6nNfEbhtX5Whn9BH3M0cMnRniszvjX0MUBrvGKsxCzEL+142SkY9zjFkO0mu6TQkhSgZ1s8FNzXV/7tq+xKZYdlHQTgFOznwAAAABJRU5ErkJggg==">
      </button>
    </template>
  </div>
</template>
<script>
export default {
    name: 'LiveEdit',
    props: {
        value: {
            type: [Number, String, Object],
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        editClass: {
            type: String,
            default: '',
        },
        selectValues: {
            type: Array,
            default: function () {
                return [];
            },
        },
        selectOptions: {
            type: Object,
            default: function () {
                return {value: 'value', label: 'label', multiple: false };
            },
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            isEditable: false,
            originalValue: this.value,
            modelvalue: this.value,
        }
    },
    computed: {
        _selectValues() {
            if (this.selectValues) {
                return this.selectValues.map(val => {
                    if (typeof(val) === 'object') {
                       return {
                           value: val[this.selectOptions.value],
                           label: val[this.selectOptions.label],
                       }
                    } else {
                        return {
                          value: val,
                          label: val,
                        }
                    }
                })
            }

            return [];
        },
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
            this.$emit('change', this.modelvalue);
        },
        clearEdit() {
            this.isEditable = false;
            this.modelvalue = this.originalValue;
            this.$emit('change', this.modelvalue);
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
