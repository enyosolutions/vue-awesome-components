module.exports = {
  $id: 'http://enyosolutions.com/model.json',
  type: 'object',
  properties: {
    identity: "string",
    apiUrl: "string",
    additionalProperties: "boolean",
    autoValidate: "boolean",
    primaryKeyField: ["string", "null"],
    displayField: ["string", "null"],
    schema: {
      type: "object",
      properties: {
        "$ref": "http://enyosolutions.com/field.json"
      }
    },
    admin: {
      type: "object",
      properties: {
        "nestedSchemas": {
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
