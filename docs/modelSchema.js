module.exports = {
  $id: 'http://enyosolutions.com/schema.json',
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
        "$ref": "http://enyosolutions.com/schema.json"
      }
    },
    admin: {
      type: "object",
      properties: {
        "$ref": "http://enyosolutions.com/schema.json"
      }
    }
  },
};
