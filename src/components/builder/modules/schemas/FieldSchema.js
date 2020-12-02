module.exports = {
  $id: 'http://enyosolutions.com/field.json',
  type: 'object',
  properties: {
    // relation: {
    //   type: 'string',
    //   title: 'The object that this property is related to',
    //   example: 'user',
    // },
    // relationKey: {
    //   type: 'string',
    //   title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
    //   example: '_id',
    // },
    // relationUrl: {
    //   type: 'string',
    //   title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
    //   example: '_id',
    // },
    // relationLabel: {
    //   type: 'string',
    //   title: 'The field of the object that this property is related to (eg relation[foreignKey] == this property',
    //   example: '_id',
    // },
    // min: {
    //   type: 'number',
    //   title: 'the minimum number of characters',
    // },
    // max: {
    //   type: 'number',
    //   title: 'the maximum number of characters',
    // },
    fields: {
      type: 'object',
      field: {
        styleClasses: 'col-12'
      },
      properties: {
        title: {
          type: 'string',
          title: 'The title of the field',
          field: {
            styleClasses: 'col-3',
          }
        },
        type: {
          type: 'string',
          title: 'The type of the field',
          example: 'EnyoSelect, DateTime, textArea',
          enum: ['input', 'EnyoSelect', 'FileInput', 'JsonTextarea', 'DateTime', 'VSelect', 'ImagePicker', 'checkbox', 'checklist', 'label', 'radios', 'select', 'submit', 'textArea', 'upload'],
          field: {
            styleClasses: 'col-3',
          }
        },
        required: {
          type: 'boolean',
          title: 'If the form field is required',
          field: {
            styleClasses: 'col-3',
          }
        },
        readonly: {
          type: 'boolean',
          title: 'If the form field is readlonly',
          field: {
            styleClasses: 'col-3',
          }
        },
        hidden: {
          type: 'boolean',
          title: 'If the form field is displayed',
          field: {
            styleClasses: 'col-3',
          }
        },
        label: {
          type: 'string',
          title: 'The field to use as the Label in the select',
          example: 'username',
          field: {
            styleClasses: 'col-3',
          }
        },
        styleClasses: {
          type: 'string',
          title: 'The class that will be around the field',
          example: 'col-md-12',
          field: {
            styleClasses: 'col-3',
          }
        },
        min: {
          type: 'number',
          title: 'the minimum number of characters',
          field: {
            styleClasses: 'col-3',
          }
        },
        max: {
          type: 'number',
          title: 'the maximum number of characters',
          field: {
            styleClasses: 'col-3',
          }
        },
        fieldOptions: {
          title: 'Options to be used on custom forms fields like multiselect, toggle etc',
          properties: {
            inputType: {
              type: 'string',
              title: 'The type of the field, when its a text input',
              example: 'file',
              enum: ['text', 'date', 'number', 'radio', 'checkbox', 'datetime', 'masked'],
              field: {
                styleClasses: 'col-3',
              }
            },
            type: {
              type: 'string',
              description:
                'The type that links to the field option. In case of a dateTime selector, this would be date or datetime',
              enum: ['date', 'datetime'],
              field: {
                styleClasses: 'col-3',
              }
            },
            multiple: {
              type: 'boolean',
              description: 'If the select is multiple (for selects)',
              field: {
                styleClasses: 'col-3',
              }
            },
            enum: {
              type: ['string', 'array'],
              description:
                'The list of values to use for the select. If the value is string and starts with $store then the value is taken from the vuejs $store',
              example: '$store.listOfValues.users',
              field: {
                styleClasses: 'col-3',
              }
            },
            url: {
              type: 'string',
              title: 'The url to use to load the data for the select (ajax)',
              example: '/user',
              field: {
                styleClasses: 'col-3',
              }
            },
            trackBy: {
              type: 'string',
              title: 'The field to use as the value in the select',
              example: '_id',
              field: {
                styleClasses: 'col-3',
              }
            },
            displayContextActions: {
              type: 'boolean',
              title: 'Should we display the add/edit button?',
              description: 'When the field type is VueSelect and when the field is used to display a relation then this serve to create a new item',
              field: {
                styleClasses: 'col-3',
              }
            }
          },
        },
        validator: {
          type: ['string', 'array', 'function'],
          title: 'Validator',
          description: 'Custom validator to use to validate the field. can be default validators, or custom ones. Default validators are : required | number | integer | double | string | array | date | regexp (using field.pattern) | email | url | credit card | alpha | alphaNumeric',
          example: ['string'],
        },
      },
    },
  },
};
