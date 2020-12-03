module.exports = {
  $id: 'http://enyosolutions.com/model.json',
  type: 'object',
  properties: {
    identity: 'string',
    apiUrl: 'string',
    additionalProperties: 'boolean',
    autoValidate: 'boolean',
    primaryKeyField: ['string', 'null'],
    displayField: ['string', 'null'],
    schema: {
      type: 'object',
      properties: {
        '$ref': 'http://enyosolutions.com/field.json'
      }
    },
    admin: {
      type: 'object',
      properties: {
        'nestedLayoutMode': {
          type: 'string',
          enum: ['horizontal-tabs', 'vertical-tabs', 'list'],
          default: 'horizontal-tabs',
          description: 'How the awesomeform is layed out in regards to nested components'
        },
        'nestedSchemas': {
          type: 'array',
          items: {
            type: 'object',
            properties: {

            }
          }
        }
      }
    }
  },
};
