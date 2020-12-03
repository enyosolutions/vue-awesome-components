import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    uuid: {
      type: String,
      required: false,
      default: () => ''
    },
    mode: {
      type: String,
      required: true,
      default: 'edit' // tile | edit | view
    },
    data: null
  },
  data: () => ({
    insideData: null,
  }),
  mounted() {
    if (this.data) {
      if (typeof this.data === 'string') {
        this.insideData = this.data
      } else {
        this.insideData = Object.assign(this.insideData, this.data);
      }
    }
  },
  methods: {
    insideDataUpdated() {
      this.$emit('update:insideData', this.insideData);
    },
  },
  computed: {
    _uuid() {
      if (!this.uuid && this.mode === 'edit') {
        const uuid = uuidv4();
        this.$emit('update:uuid', uuid);
        return uuid;
      }
      return this.uuid;
    }
  },
  watch: {
    insideData: {
      handler: function () {
        this.insideDataUpdated();
      },
      deep: true,
      immediate: true
    },
  }
}