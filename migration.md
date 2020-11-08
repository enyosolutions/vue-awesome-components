# migration guide


This a is a migration guide to move your project to the new version of the api:


## Config variables that changed

- rename your api consumption mode :
-- `mode` => `dataPaginationMode`

- use kebab case for your events consumption :
-- `dataChanged`  => `data-changed`