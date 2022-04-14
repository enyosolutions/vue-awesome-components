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
    title: { type: [String, Boolean] },
    name: { type: [String, Boolean] },
    pluralName: { type: [String, Boolean] },
    tabTitle: { type: [String, Boolean], required: false, default: undefined },
    pageTitle: { type: [String, Boolean], required: false, default: undefined },
  },
  computed: {
    primaryKeyFieldCpt() {
      return this.primaryKeyField || this.primaryKey || (this.awComponentsConfig && this.awComponentsConfig.primaryKey) || 'id';
    }
  },
};
