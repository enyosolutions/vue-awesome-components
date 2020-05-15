export default {
  props: {
    model: { type: Object },
    selectedItem: { type: Object },
    formSchema: { type: Object },
    formOptions: { type: Object },
  },
  computed: {
    computedCols() {
      return this.cols ? 'col-' + this.cols + ' ' : '';
    }
  },
  methods: {
    getShemaForFields(fields) {
      const fieldsDefinition = this.formSchema.fields.filter((f) => {
        return fields.indexOf(f.model) > -1;
      });
      return { ...this.formSchema, fields: fieldsDefinition };
    },

  }
};
