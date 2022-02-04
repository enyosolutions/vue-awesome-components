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
          if (models && Array.isArray(models)) {
            return models.find((model) => model.identity === modelId || model.modelName === modelId);
          }
        }
        else {
          console.warn('[relationMixin][modelsStorePath] path not defined', modelsStorePath);
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
        let model = this.getModelFromStore(prop.relation);
        if (!model) {
          console.warn('[relationMixin][raceCondition] model not found for', prop.relation, 'in', this.modelsStorePath);
        }
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
        return model ? model.displayField || 'label' : 'label';
      }
    },
  }
}