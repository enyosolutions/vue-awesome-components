const generate = require('json-schema-test-data-generator/lib/index.js');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));



const schema = require(path.resolve(process.cwd(), argv._[0]));
const data = generate(schema, { min: argv.min || 20 });
const validData = data.filter(data => data.valid).map(d => d.data)
console.log(JSON.stringify(validData, null, 2));
