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
    displayField: String, // used to find the display field for object (similar to relationLabel)
    multiple: Boolean, // allow displaying an array of objects.
    storePath: String,
    store: Array,
    displayLabelCache: { type: Object, default: () => ({}) },
    onClickUrl: [String, Function],
    tag: { type: [String, Object], default: 'div' },
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
