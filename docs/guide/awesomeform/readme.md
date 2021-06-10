---
pageClass: fullwidth-page
---

## Presentation

## features

## default initialisation

```
<awesome-form :schema="{schema of the fields}" mode="create" :item="{}" />
```

## props

<ClientOnly>
<ComponentDoc :component="'AwesomeForm'" />
</ClientOnly>
displayMode

## field types

| Type         | description                                                    |
|--------------|----------------------------------------------------------------|
| string       | Basic string stype                                             |
| integer      | Number based field                                             |
| number       | Number based field                                             |
| input        | Number based field                                             |
| booelan      | Shows a green tick(✔) or a red cross(❌) depending on the value |
| image        | Image column (displays the actual image)                       |
| date         | Date field ("DD-MM-YYYY")                                      |
| datetime     | Date time field (exact format will depend on your browser)     |
| EnyoSelect   | @deprecated use VSelect                                        |
| textArea     | textArea                                                       |
| JsonTextarea | textArea that presents json data                               |
| VSelect      | Select  using VSelect mode                                     |
| fileInput    | fileInput  using base64 picker                                 |
| ImagePicker  | Image Picker using base64 picker                               |
| time         | time picker                                                    |

## field definition schema

```
module.exports = {
  $id: 'http://enyosolutions.com/field.json',
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
          enum: ['string', 'input', 'number', 'list-of-value', 'list-of-data', 'EnyoSelect', 'dateTime', 'textArea', 'JsonTextarea', 'VSelect', 'date', 'datetime', 'time', 'fileInput', 'ImagePicker'],
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
              description:
                'The type that links to the field option. In case of a dateTime selector, this would be date or datetime',
              enum: ['date', 'datetime'],
            },
            multiple: {
              type: 'boolean',
              description: 'If the select is multiple (for selects)',
            },
            enum: {
              type: ['string', 'array'],
              description:
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

            prefix: {
              type: 'string',
              title: 'Text displayed before the value',
              description: 'example : £',
              example: 'username',
            },

            suffix: {
              type: 'string',
              title: 'Text displayed before the value',
              description: 'example : cm | €',
              example: 'username',
            },

            displayContextActions: {
              type: 'boolean',
              title: 'Should we display the add/edit button?',
              description: 'When the field type is VueSelect and when the field is used to display a relation then this serve to create a new item',
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

```

## events

| Type                    | description |
|-------------------------|-------------|
| create                  |             |
| edit                    |             |
| bulkEdit                |             |
| aw-select-previous-item |             |
| aw-select-next-item     |             |

## Styling classes :

`aw-form`

## Examples
