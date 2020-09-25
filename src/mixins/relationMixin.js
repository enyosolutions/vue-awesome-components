import _ from 'lodash';

export default {
  methods: {
    getModelFromStore(modelId, modelsStorePath = null) {
      modelsStorePath = modelsStorePath || this.modelsStorePath;
      // if vuex is installed
      if (this.$store && this.$store.state && !this.model) {
        // if we have path
        if (modelsStorePath) {
          const models = _.get(this.$store.state, modelsStorePath);
          // if we have a list
          if (models && Array.isArray(models)) {
            return models.find((model) => model.identity === modelId || model.modelName === modelId);
          }
        }
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
        const model = this.getModelFromStore(prop.relation, this.modelsStorePath);
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