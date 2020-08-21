export default {
  methods: {
    getModelFromStore(modelId) {
      if (this.$store && this.$store.state && !this.model) {
        return this.$store.state.data.models.find((model) => model.identity === modelId || model.modelName === modelId);
      }
      return;
    },
    getRelationUrl(prop) {
      if (!prop.relationUrl && !prop.relation) {
        return;
      }
      if (prop.relationUrl) {
        return prop.relationUrl;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.url || model.apiUrl : '';
      }
    },
    getRelationKey(prop) {
      if (!prop.relationKey && !prop.relation) {
        return;
      }
      if (prop.relationKey) {
        return prop.relationKey;
      }
      if (prop.foreignKey) {
        return prop.foreignKey;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.primaryKeyField || this.primaryKey : this.primaryKey;
      }
    },
    getRelationLabel(prop) {
      if (!prop.relationLabel && !prop.relation) {
        return;
      }
      if (prop.relationLabel) {
        return prop.relationLabel;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.titleField || 'label' : 'label';
      }
    },
  }
}