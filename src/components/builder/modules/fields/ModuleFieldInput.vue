<template>
  <AwesomeBuilderModule :uuid="_uuid" :placed="placed" :options="options">
    {{model}}
    <div class="field-module">
      <VueFormGenerator
          :schema.sync="formSchema"
          :model="model"
          ref="form"
          class="field-configuration"
          tag="div"
      />
      <!--<form class="field-configuration">
        <div class="field-input">
          <label for="model">Model</label>
          <input v-model="field.model" class="form-control" type="text" placeholder="Model" id="model">
        </div>
        <div class="field-input">
          <label for="placeholder">Placeholder</label>
          <input v-model="field.placeholder" class="form-control" type="text" placeholder="Placeholder" id="placeholder">
        </div>
        <div class="field-input">
          <label for="label">Label</label>
          <input v-model="field.label" class="form-control" type="text" placeholder="Label" id="label">
        </div>
        <div class="field-input">
          <label for="hint">Hint</label>
          <input v-model="field.hint" class="form-control" type="text" placeholder="Hint" id="hint">
        </div>
        <div class="field-input">
          <label for="styleClasses">Style classes</label>
          <input v-model="field.styleClasses" class="form-control" type="text" placeholder="Style classes" id="styleClasses">
        </div>
        <div class="field-checkbox">
          <div class="field-input">
            <input v-model="field.required" type="checkbox" id="required">
            <label class="form-check-label" for="required">Is Required</label>
          </div>
          <div class="field-input">
            <input v-model="field.readonly" type="checkbox" id="readonly">
            <label class="form-check-label" for="readonly">Is Readonly</label>
          </div>
          <div class="field-input">
            <input v-model="field.disabled" type="checkbox" id="disabled">
            <label class="form-check-label" for="disabled">Is Disabled</label>
          </div>
          <div class="field-input">
            <input v-model="field.hasRelation" type="checkbox" id="hasRelation">
            <label class="form-check-label" for="hasRelation">has Relation</label>
          </div>
        </div>
        <div v-if="field.hasRelation" class="field-relation">
          <div class="field-input">
            <label for="relation">Relation name</label>
            <input v-model="field.relation" class="form-control" type="text" placeholder="Relation name" id="relation">
          </div>
          <div class="field-input">
            <label for="foreignKey">Foreign Key</label>
            <input v-model="field.foreignKey" class="form-control" type="text" placeholder="Foreign Key" id="foreignKey">
          </div>
          <div class="field-input">
            <label for="relationKey">Relation Key</label>
            <input v-model="field.relationKey" class="form-control" type="text" placeholder="Relation Key" id="relationKey">
          </div>
          <div class="field-input">
            <label for="relationLabel">Relation Label</label>
            <input v-model="field.relationLabel" class="form-control" type="text" placeholder="Relation Label" id="relationLabel">
          </div>
        </div>
      </form>-->
      <div class="field-preview" v-if="eventBus">
        <FormElement :event-bus="eventBus" :field="model.fields">
          <template v-slot:label>
            {{model.fields.label}}
          </template>
          <template v-slot:hint>
            {{model.fields.hint}}
          </template>
        </FormElement>
      </div>
    </div>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';
import parseJsonSchemaMixin from '@/mixins/parseJsonSchemaMixin';
import relationMixin from '@/mixins/relationMixin';
import FormElement from '@/components/form/form-generator/formElement';
import FieldSchema from '@/components/builder/modules/schemas/FieldSchema';

import {v4 as uuidv4} from 'uuid';

export default {
  name: 'ModuleFieldInput',
  mixins: [builderModuleMixin, parseJsonSchemaMixin, relationMixin],
  components: {FormElement, AwesomeBuilderModule},
  data: () => ({
    options: {
      icon: 'fa-pencil-square',
      title: 'Field input',
      description: 'Add field input'
    },
    eventBus: null,
    model: {
      fields: {
        type: 'input',
        fieldOptions: {
          inputType: 'text'
        },
      },
    },
    // field: {
    //   type: 'input',
    //   label: '',
    //   placeholder: '',
    //   values: [],
    //   required: true,
    //   hint: '',
    //   model: 'Default model',
    //   validator: ['required'],
    //   readonly: undefined,
    //   disabled: undefined,
    //   styleClasses: 'col-12',
    //   hasRelation: false,
    //   relation: undefined,
    //   foreignKey: undefined,
    //   relationKey: undefined,
    //   relationLabel: undefined,
    //   group: undefined,
    //   mode: 'edit'
    // },
    FieldSchema
  }),
  mounted() {
    // this.field.id = uuidv4();
    if (this.$awEventBus) {
      this.eventBus = this.$awEventBus;
    }
  },
  computed: {
    formSchema() {
      if (!this.FieldSchema) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this.FieldSchema);
      parsedFormSchema.styleClasses = 'row';
      parsedFormSchema.mode = this.mode;
      if (parsedFormSchema.fields) {
        parsedFormSchema.fields = parsedFormSchema.fields.map((field) => {
          if (!field.styleClasses || field.styleClasses.indexOf('col-') === -1) {
            field.styleClasses = `${field.styleClasses || ''} col-12`;
          }
          if (parsedFormSchema.mode === 'bulkEdit') {
            field.required = false;
          }
          return field;
        });
      }
      return parsedFormSchema;
    },
  }
}
</script>

<style scoped lang='scss'>
.field-module {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  .field-preview {
    margin-top: 50px;
    padding: 10px;
    border: 2px dashed rgba(0, 0, 0, .2);
    width: 100%;
    text-align: left;
  }
}
</style>