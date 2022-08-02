export default {
  props: {
    options: {
    },
    value: [String, Boolean, Array, Object, Number, Date, Function],
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

    component: [String, Object],

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
    displayActions: {
      type: [Boolean, Number], default: true,
      description: 'display contextual actions when hovering the item '
    },
    isClickable: {
      type: [Boolean, Number], default: undefined,
      description: 'Whether it\'s possible to click on the item'
    },
    tag: { type: [String, Object], default: 'div' },
    prefix: String,
    suffix: String,
    label: String,
    styles: String,
    classes: String,
    imageClasses: [String, Array, Object],
    imageStyles: [String, Array, Object],
    isSafe: { type: Boolean, default: false },
    striptags: { type: Boolean, default: false, description: 'Strip HTML tags from the html' },
    tagsToKeep: { type: Array, default: ['br', 'p'], description: 'tags to keep the html' },
    embed: { type: Boolean, default: false, description: 'Embed the target content into an iframe' },
    displayExpandButton: { type: Boolean, default: true, description: 'Display a button to expand the size of the iframe' }
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
