module.exports = {
  $id: 'http://enyosolutions.com/schema-field.json',
  type: 'object',
  properties: {
    title: {
      type: 'object',
      title: 'The title of the property, used in form fields and columns',
      column: {
        type: 'image',
      },
    },
    type: {
      type: 'object',
      title: 'The title of the property, used in form fields and columns',
      column: {
        type: 'image',
      },
    },
    relation: {
      type: 'string',
      title: 'The object that this property is related to',
      example: 'user',
    },
    relationKey: {
      type: 'string',
      title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
      example: '_id',
    },
    relationUrl: {
      type: 'string',
      title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
      example: '_id',
    },
    relationLabel: {
      type: 'string',
      title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
      example: '_id',
    },
    min: {
      type: 'number',
      title: 'the minimum number of characters',
    },
    max: {
      type: 'number',
      title: 'the maximum number of characters',
    },
    field: {
      type: 'object',
      title: 'Configuration of the behavior of the property in forms',
      properties: {
        title: {
          type: 'string',
          title: 'The title of the field',
        },
        type: {
          type: 'string',
          title: 'The type of the field, comming from https://vue-generators.gitbook.io/vue-generators/fields',
          example: 'EnyoSelect, dateTime, textArea',
          enum: ['string', 'input', 'number', 'list-of-value', 'list-of-data', 'EnyoSelect', 'dateTime', 'textArea'],
        },
        inputType: {
          type: 'string',
          title:
            'The type of the field, when its a text input comming from https://vue-generators.gitbook.io/vue-generators/fields',
          example: 'file',
          enum: ['text', 'date', 'number', 'radio', 'checkbox', 'datetime', 'masked'],
        },
        required: {
          type: 'boolean',
          title: 'If the form field is required',
        },
        readonly: {
          type: 'boolean',
          title: 'If the form field is readlonly',
        },
        hidden: {
          type: 'boolean',
          title: 'If the form field is displayed',
        },
        styleClasses: {
          type: 'string',
          title: 'The class that will be around the field',
          example: 'col-md-12',
        },
        min: {
          type: 'number',
          title: 'the minimum number of characters',
        },
        max: {
          type: 'number',
          title: 'the maximum number of characters',
        },
        fieldOptions: {
          title: 'Options to be used on custom forms fields like multiselect, toggle etc',
          properties: {
            type: {
              type: 'string',
              title:
                'The type that links to the field option. In case of a dateTime selector, this would be date or datetime',
              enum: ['date', 'datetime'],
            },
            multiple: {
              type: 'boolean',
              title: 'If the select is multiple (for selects)',
            },
            enum: {
              type: ['string', 'array'],
              title:
                'The list of values to use for the select. If the value is string and starts with $store then the value is taken from the vuejs $store',
              example: '$store.listOfValues.users',
            },
            url: {
              type: 'string',
              title: 'The url to use to load the data for the select (ajax)',
              example: '/user',
            },
            trackBy: {
              type: 'string',
              title: 'The field to use as the value in the select',
              example: '_id',
            },

            label: {
              type: 'string',
              title: 'The field to use as the Label in the select',
              example: 'username',
            },
          },
        },
        validator: {
          type: 'Array',
          title:
            'the validators used to validate fields https://vue-generators.gitbook.io/vue-generators/validation/built-in-validators',
          example: ['string'],
        },
      },
    },
    column: {
      type: 'object',
      title: 'Configuration of the behavior of the property in lists',
      properties: {
        title: {
          type: 'string',
          title: 'The title of the field',
        },
        type: {
          type: 'string',
          title: 'The type of the column, comming from vuegoodtable and some coming from awesomedisplay',
          enum: ['image', 'string', 'number', 'date', 'datetime', 'list-of-value'],
        },
        hidden: {
          type: 'string',
          title: 'If the form field is displayed',
        },
      },
    },
  },
};
