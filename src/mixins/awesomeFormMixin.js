export default {
  props: {
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'table',
      note: 'In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form',
    },
  },
  computed: {

    _isNested() {
      return this.parent;
    },
    _isNestedDetail() {
      return (
        this._isNested &&
        ((this.selectedItem && this.selectedItem[this.primaryKey]) ||
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
