import _ from 'lodash';
export default {
  props: {
    modelsStorePath: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.modelsStorePath) || 'data.models';
      },
      note:
        'Location of the array in the vuex state that contains all the models eg if you provide data.models => we will look ink this.$store.state.data.models'
    }
  },
  methods: {
    getModelFromStore(modelId, modelsStorePath = null) {
      if (!modelId) {
        return;
      }
      modelsStorePath = modelsStorePath || this.modelsStorePath;
      // if vuex is installed
      if (this.$store && this.$store.state) {
        // if we have path
        if (modelsStorePath) {
          // we should search every where not just in the state. This is for backward compatibility
          const models = _.get(this.$store, modelsStorePath) || _.get(this.$store.state, modelsStorePath);
          // if we have a list
          if (models) {
            if (Array.isArray(models)) {
              return models.find((model) => model.identity === modelId || model.modelName === modelId);
            }
            if (typeof models === 'object') {
              return models[modelId] || models[modelId];
            }
          }
        }
        else {
          console.warn('[relationMixin][modelsStorePath] path not defined', modelsStorePath);
        }
      }
      return;
    },
    getRelation(prop) {
      return (prop.field && prop.field.relation) || prop.relation
    },
    getRelationUrl(prop) {
      const relation = this.getRelation(prop);
      const relationUrl = (prop.field && prop.field.relationUrl) || prop.relationUrl;
      if (!relationUrl && !relation) {
        return;
      }
      if (relationUrl) {
        return relationUrl;
      } else {
        let model = this.getModelFromStore(relation);
        if (!model) {
          console.warn('[relationMixin][raceCondition] model not found for', relation, 'in', this.modelsStorePath);
        }
        return model ? model.url || model.apiUrl : '';
      }
    },
    getRelationKey(prop) {
      const relation = this.getRelation(prop);
      const relationKey = (prop.field && prop.field.relationKey) || prop.relationKey;
      if (!relationKey && !relation) {
        return;
      }
      if (relationKey) {
        return relationKey;
      }
      if (prop.foreignKey) {
        return prop.foreignKey;
      } else {
        const model = this.getModelFromStore(relation);
        return model ? model.primaryKeyField || this.primaryKey : this.primaryKey;
      }
    },
    getRelationLabel(prop) {
      const relation = this.getRelation(prop);
      const relationLabel = (prop.field && prop.field.relationLabel) || prop.relationLabel;
      if (!relationLabel && !relation) {
        return;
      }
      if (relationLabel) {
        return relationLabel;
      } else {
        const model = this.getModelFromStore(relation);
        return model ? model.displayField || 'label' : 'label';
      }
    },
  }
}