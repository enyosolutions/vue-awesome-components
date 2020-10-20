export default {
  props: {
    model: { type: Object },
    schema: { type: Object, required: true },
    formOptions: { type: Object },
  },
  computed: {
    computedCols() {
      return this.cols ? 'col-md-' + this.cols + ' ' : '';
    }
  },
  methods: {
    getShemaForFields(fields) {
      const fieldsDefinition = this.schema.fields.filter((f) => {
        return fields.indexOf(f.model) > -1;
      });
      return { ...this.schema, fields: fieldsDefinition };
    },

  }
};
