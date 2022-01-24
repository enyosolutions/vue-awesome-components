import { templateSettings, template, isString, isFunction, merge } from 'lodash';
import rolesMixin from './rolesMixin';
import dayjs from 'dayjs';
import _ from 'lodash';

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);


export default {
  props: {
  },
  mixins: [rolesMixin],
  methods: {

    contextDataMerger(data = null) {
      return merge({
        parent: this.parent,
        context: this,
        currentItem: this.selectedItem || data,
        items: this.items,
        $state: this.$store && this.$store.state,
        userHasRole: this.userHasRole,
        componentMode: this.mode || this.displayMode,
        moment: dayjs,
      }, data);
    },

    templateParser(source, data) {
      data = this.contextDataMerger(data);
      templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      const compiled = template(source);
      return compiled(data);
    },

    templateParseText(text, data) {
      try {
        return this.templateParser(text, data);
      }
      catch (err) {
        console.warn('[templateParserText]', err.message, data);
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
        const bool = this.templateParser(text, data);
        if (bool === '1' || bool === 'true') {
          return true;
        }
        if (bool === 0 || bool === '0' || bool === 'false') {
          return false;
        }
        console.warn('[VAC] boolean templates must revolve to a boolean result.', bool, 'was returned for template', text);
        return false;
      }
      catch (err) {
        console.warn('[templateParseBoolean]', err.message);
        if (process.env.NODE_ENV === 'development') {
          console.warn('[templateParseBoolean]', text, err.message);
        }


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
    },

    getItemProperty(item, path) {
      if (!item) {
        return '';
      }
      if (path && path.indexOf('{{') > -1 && path.indexOf('}}') > -1) {
        let result = this.templateParseText(path, { ...item, currentItem: item });
        return result;
      }
      return _.get(item, path);
    },
  }
}