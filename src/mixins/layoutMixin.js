export default {
    props: {
        tag: { type: String, default: 'div' },
        cols: { type: Number, default: 0 },
        styleClasses: { type: String, default: '' },
        wrapperClasses: { type: String, default: '' },
        headerClasses: { type: String, default: '' },
        styles: { type: String, default: '' },
        legend: { type: String, default: '' },
        schema: { type: Object, default: null },
    },
    computed: {
        computedCols() {
            return this.cols ? 'col-md-' + this.cols + ' ' : '';
        }
    },
    methods: {

    }
};
