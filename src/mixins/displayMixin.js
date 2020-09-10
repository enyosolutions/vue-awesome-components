export default {
  props: {
    options: {
    },
    value: [String, Boolean, Array, Object, Number],
    type: {
      type: String,
      values: ['image',
        'boolean',
        'url',
        'html',
        'object',
        'checkbox',]
    },
    src: String,
    row: Array,
    format: [String, Function],
    inputFormat: String,
    field: String,
    styles: String,
    classes: String,
    relation: String,
    relationUrl: String,
    relationLabel: String,
    relationKey: String,
    storePath: String,
    store: Array,
    displayLabelCache: { type: Object, default: () => ({}) },
    onClickUrl: [String, Function]
  },
  data() {
    return {
    };
  },
  methods: {
    clickOnItem(item) {
      this.$emit('on-awesome-display-clicked', item);
    }
  }
};
