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

    /**
     * Takes an expression and return the computed boolean corresponding rto the expression
     *
     * @param {*} text
     * @param {*} [data=null]
     * @returns
     */
    templateParseBoolean(text, data = null) {
      try {
        if (!text || text.indexOf('{{') === -1) {
          return text;
        }
        if (!data) {
          data = {
            parent: this.parent,
            context: this,
            currentItem: this.selectedItem,
            items: this.items
          };
        }
        const bool = this.templateParser(text, data);
        if (bool === '1' || bool === 'true') {
          return true;
        }
        return false;
      }
      catch (err) {
        console.warn('[templateParseBoolean]', err.message);
        return false;
      }
    },

    templateParseFunc(func, data = null) {
      try {
        if (!func || typeof (func) !== 'function') {
          return func;
        }
        if (!data) {
          data = {
            parent: this.parent,
            context: this,
            currentItem: this.selectedItem,
            items: this.items
          };
        }
        return func(data);

      }
      catch (err) {
        console.warn('[templateParseFunc]', err.message);
        return func;
      }
    },
  }
}