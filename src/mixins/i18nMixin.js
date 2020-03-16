export default {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (!this.$t) {
      this.$t = str => {
        /*
        if (!window.trans) {
          window.trans = {}
        }
        window.trans[str]= str;
        */

        return this.translations[str] || str;
      };
      this.$te = str => !!this.translations[str];
    }
  }
};
