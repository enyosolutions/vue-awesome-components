export default {
  props: {
    primaryKey: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.primaryKey) || 'id';
      },
      description: 'Which field to use as primary key. By default it\'s `id` but it can be `_id`  or anything that you want',

    },
    primaryKeyField: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.primaryKey) || 'id';
      },
      description: 'Which field to use as primary key. By default it\'s `id` but it can be `_id`  or anything that you want',

    },
    identity: { type: String, required: true },
    displayField: { type: String },
    name: { type: String },
    pluralName: { type: String },
  },
  computed: {
    primaryKeyFieldCpt() {
      return this.primaryKeyField || this.primaryKey || (this.awComponentsConfig && this.awComponentsConfig.primaryKey) || 'id';
    }
  },
};
