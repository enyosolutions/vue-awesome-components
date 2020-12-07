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
      return this.templateParser(text, data);
    },

    templateParseUrl(text, data) {
      return this.templateParser(text, data);
    },
  }
}