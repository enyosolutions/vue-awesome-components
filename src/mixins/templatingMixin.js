import { templateSettings, template } from 'lodash';

export default {
  props: {
  },
  methods: {
    templateParser(source, data) {
      templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      const compiled = template(source);
      return compiled(data);
    },

    templateParseText(text, data) {
      try {
        return this.templateParser(text, data);
      }
      catch (err) {
        console.warn('[templateParser]', err.message);
        return text;
      }
    },

    templateParseUrl(text, data) {
      try {
        return this.templateParser(text, data);
      }
      catch (err) {
        console.warn('[templateParser]', err.message);
        return text;
      }
    },
  }
}