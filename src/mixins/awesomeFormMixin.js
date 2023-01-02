export default {
  props: {
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'table',
      values: ['view', 'edit', 'object', 'table'],
      note: 'In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form',
    },
  },
  computed: {

    _isNested() {
      return this.parent;
    },

    _isEmbedded() {
      return this._isNested && (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'edit');
    },

    _isANestedDetailView() {
      return (
        this._isNested &&
        ((this.selectedItem && this.selectedItem[this.primaryKeyFieldCpt]) ||
          this.nestedDisplayMode === 'view' ||
          this.nestedDisplayMode === 'edit')
      );
    },

    _isNestedCreate() {
      return this._isNested && this.selectedItem && this.viewMode === 'create';
    },

    _noFormActions() {
      return this._isNested && (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'edit');
    },
  },
  methods: {
  }
};
