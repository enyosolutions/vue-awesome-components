import { templateSettings, template, isString, isFunction, merge } from 'lodash';

export default {
  props: {
  },
  methods: {

    contextDataMerger(data = null) {
      return merge({
        parent: this.parent,
        context: this,
        currentItem: this.selectedItem,
        items: this.items,
        $state: this.$store && this.$store.state
      }, data);
    },

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
        data = this.contextDataMerger(data);
        const bool = this.templateParser(text, data);
        if (bool === '1' || bool === 'true') {
          return true;
        }
        if (bool === 0 || bool === 'false') {
          return false;
        }
        console.warn('[VAC] boolean templates must revolve to a boolean result', bool, 'returned');
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
        data = this.contextDataMerger(data);
        return func(data);

      }
      catch (err) {
        console.warn('[templateParseFunc]', err.message);
        return func;
      }
    },

    templateParseConditionalField(fieldData, data = null) {
      if (typeof (fieldData) == 'boolean') {
        return fieldData;
      }
      if (isString(fieldData)) {
        return this.templateParseBoolean(fieldData, data);
      }
      if (isFunction(fieldData)) {
        return !!this.templateParseFunc(fieldData, data);
      }
      return fieldData;
    }
  }
}