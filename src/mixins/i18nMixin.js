import en from '../translations/en.json';
import { set, get, merge } from 'lodash';
export default {
  props: {
    translations: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    _translations() {
      return merge(this.translations, en);
      // return en;
    }
  },
  created() {
    if (!this.$t) {
      this.$t = str => {
        const val = get(this._translations, str) || str;

        if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
          if (!window.trans) {
            window.trans = Object.assign({}, this._translations);
          }
          set(window.trans, str, val);
        }
        return val;

      };
      this.$te = str => !!get(this._translations, str)
    }
  }
};
