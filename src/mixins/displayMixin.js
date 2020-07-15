export default {
  props: {
    options: {
    },
    value: [String, Boolean, Array],
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
    relation: String,
    field: String,
    style: String,
    class: String
  },
  data() {
    return {
    };
  },
  methods: {
    clickOnItem(item) {
      this.$emit('view', item);
    }
  }
};
