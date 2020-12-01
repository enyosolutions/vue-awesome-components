import { v4 as uuidv4 } from 'uuid';

export default {
  props: {
    uuid: {
      type: String,
      required: false,
      default: () => ''
    },
    placed: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    //
  }),
  methods: {
    //
  },
  computed: {
    _uuid() {
      if (!this.uuid) {
        const uuid = uuidv4();
        this.$emit('update:uuid', uuid);
        return uuid;
      }
      return this.uuid;
    }
  },
}