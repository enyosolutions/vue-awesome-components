export default {
  props: {
    tag: { type: String, default: 'div' },
    cols: { type: Number, default: 0 },
    styleClasses: { type: String, default: '' },
    style: { type: Function, default: '' },
    legend: { type: Function, default: '' },
  },
  computed: {
    computedCols() {
      return this.cols ? 'col-' + this.cols + ' ' : '';
    }
  },
  methods: {

  }
};
