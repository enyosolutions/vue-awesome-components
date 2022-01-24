<template>
  <div class="aw-field-array">
    <div v-for="(obj, index) in internalValue" class="env-row row" :key="index">
      <template v-if="obj !== undefined">
        <button type="button" class="btn btn-danger btn-sm btn-delete pull-right" @click="removeItem(index)">
          <i class="fa fa-trash"></i>
        </button>
        <div class="col-12">
          <template v-if="schema.itemsSchema && schema.itemsSchema.type === 'object'">
            <div class="form-group">
              <awesome-form
                mode="edit"
                displayMode="page"
                :item="internalValue[index]"
                :v-model="internalValue[index]"
                :identity="index + ''"
                :schema="schema.itemsSchema"
                :displayHeader="false"
                :displayFooter="false"
              ></awesome-form>
            </div>
          </template>
          <template v-else>
            <div class="form-group">
              <input
                class="form-control mb-2"
                :alt="schemaComputed.fieldOptions.alt"
                :class="fieldClasses"
                :dirname="schemaComputed.fieldOptions.dirname"
                :disabled="disabled"
                :files="schemaComputed.fieldOptions.files"
                :formaction="schemaComputed.fieldOptions.formaction"
                :formenctype="schemaComputed.fieldOptions.formenctype"
                :formmethod="schemaComputed.fieldOptions.formmethod"
                :formnovalidate="schemaComputed.fieldOptions.formnovalidate"
                :formtarget="schemaComputed.fieldOptions.formtarget"
                :height="schemaComputed.fieldOptions.height"
                :id="fieldID"
                :list="schemaComputed.fieldOptions.list"
                :max="schemaComputed.fieldOptions.max"
                :maxlength="schemaComputed.fieldOptions.maxlength"
                :min="schemaComputed.fieldOptions.min"
                :minlength="schemaComputed.fieldOptions.minlength"
                :multiple="schemaComputed.fieldOptions.multiple"
                :name="inputName"
                :pattern="schemaComputed.fieldOptions.pattern"
                :placeholder="placeholder"
                :readonly="readonly"
                :required="schemaComputed.required"
                :size="schemaComputed.fieldOptions.size"
                :src="schemaComputed.fieldOptions.src"
                :step="schemaComputed.fieldOptions.step"
                :type="inputType"
                :width="schemaComputed.fieldOptions.width"
                @change="schemaComputed.onChange || null"
                @blur="saveItem()"
                v-attributes="'input'"
                v-model="internalValue[index]"
              />
            </div>
          </template>
        </div>
      </template>
    </div>
    <button type="button" class="float-right btn btn-secondary btn-sm" @click="addItem()">
      <i class="fa fa-plus"></i>
    </button>
  </div>
</template>
<script>
import VueFormGenerator from '../../form/form-generator';

export default {
  name: 'field-array',
  mixins: [VueFormGenerator.abstractField],
  components: {},
  data() {
    return {
      warning: '',
      internalValue: []
    };
  },
  computed: {
    schemaComputed() {
      return {
        ...this.schema,
        model: '',
        fieldOptions: {
          ...this.schema.fieldOptions,
          inputType: null
        }
      };
    },

    inputType() {
      let { type, format } = this.schema.itemsSchema;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
            break;
          }
        }
      }

      switch (type) {
        case 'string':
          switch (format) {
            case 'email':
              return 'email';
            case 'date-time':
            case 'datetime':
              return 'date-time';
            default:
              return 'text';
          }
        case 'number':
        case 'integer':
          return 'number';
        case 'boolean':
        case 'array':
        case 'object':
          return 'string';
        default:
          // console.error("type not known ", type, property);
          return type;
      }
    }
  },
  watch: {
    // eslint-disable-next-line
    value(change, old) {
      if (change && Array.isArray(change)) {
        this.internalValue = change;
      }
    }
  },
  mounted() {
    if (this.value && Array.isArray(this.value)) {
      this.internalValue = this.value;
    }
  },

  beforeDestroy() {},
  methods: {
    addItem() {
      this.saveItem();
      let newItem;
      switch (this.schema.itemsSchema.type) {
        case 'object':
          newItem = {};
          break;
        case 'array':
          newItem = [];
          break;
        case 'number':
          newItem = 0;
          break;
        default:
          newItem = '';
      }
      this.internalValue.push(newItem);
      this.$forceUpdate();
    },

    removeItem(index) {
      this.$delete(this.internalValue, index);
      // this.saveItem();
      this.$forceUpdate();
    },

    saveItem() {
      this.value = this.internalValue;
    }
  }
};
</script>
<style lang="scss" scoped>
.vs__dropdown-toggle {
  border: none;
}

.aw-field-array {
  width: 100%;
}
.env-row {
  position: relative;
}
.field-file-input {
  cursor: pointer;

  > * {
    cursor: pointer;
    width: 100%;
    height: auto;
  }
}

button.btn-delete {
  color: red !important;
  border: none;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  position: absolute;
  right: 1px;
  z-index: 1;
}
</style>
