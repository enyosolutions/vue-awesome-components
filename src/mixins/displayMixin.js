export default {
  props: {
    options: {
    },
    value: [String, Boolean, Array, Object, Number],
    type: {
      type: String,
      values: [
        'image',
        'boolean',
        'url',
        'html',
        'object',
        'array',
        'date',
        'relation',
        'checkbox',
      ]
    },
    src: String,
    row: Array,
    format: [String, Function],
    inputFormat: String,
    field: String,

    relation: String,
    relationUrl: String,
    relationLabel: String,
    relationKey: String,
    displayField: String, // used to find the display field for object (similar to relationLabel)
    multiple: Boolean, // allow displaying an array of objects.
    storePath: String,
    store: Array,
    displayLabelCache: { type: Object, default: () => (null) },
    onClickUrl: [String, Function],
    tag: { type: [String, Object], default: 'div' },
    prefix: String,
    suffix: String,
    styles: String,
    classes: String,
    imageClasses: [String, Array, Object],
    imageStyles: [String, Array, Object],
    isSafe: { type: Boolean, default: false },
    embed: { type: Boolean, default: false, description: 'Embed the target content into an iframe' }
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
