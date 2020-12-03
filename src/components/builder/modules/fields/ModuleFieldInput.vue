<template>
  <AwesomeBuilderModule :uuid="_uuid" :mode="mode" :options="options">
    <template v-slot:editor>
      {{insideData.model}}
      <div class="field-module">
        <VueFormGenerator
            :schema.sync="formSchema"
            :model="insideData.model"
            ref="form"
            class="field-configuration"
            tag="div"
        />
        <div class="field-preview" v-if="eventBus">
          <FormElement :event-bus="eventBus" :field="insideData.model.fields">
            <template v-slot:label>
              {{insideData.model.fields.label}}
            </template>
            <template v-slot:hint>
              {{insideData.model.fields.hint}}
            </template>
          </FormElement>
        </div>
      </div>
    </template>
    <template v-slot:view>
      <FormElement :event-bus="$awEventBus" :field="insideData.model.fields">
        <template v-slot:label>
          {{insideData.model.fields.label}}
        </template>
        <template v-slot:hint>
          {{insideData.model.fields.hint}}
        </template>
      </FormElement>
    </template>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/layout/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';
import parseJsonSchemaMixin from '@/mixins/parseJsonSchemaMixin';
import relationMixin from '@/mixins/relationMixin';
import FormElement from '@/components/form/form-generator/formElement';
import FieldSchema from '@/components/builder/modules/schemas/FieldSchema';

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
    FieldSchema
  }),
  created() {
    this.insideData = {
      model: {
        fields: {
          type: 'input',
          fieldOptions: {
            inputType: 'text'
          },
        },
      },
    };
    this.renderingComponent = 'form-element'
  },
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