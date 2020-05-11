const toOpenApi = require('json-schema-to-openapi-schema');
const path = require('path');

const arg = process.argv[2];

const schema = require(path.resolve(process.cwd(), arg));

const convertedSchema = toOpenApi(schema);

console.log(JSON.stringify(convertedSchema, null, 2));
