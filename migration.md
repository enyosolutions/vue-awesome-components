# migration guide


This a is a migration guide to move your project to the new version of the api:


## Config variables that changed

- rename your api consumption mode :
-- `mode` => `dataPaginationMode`

- use kebab case for your events consumption :
-- `dataChanged`  => `data-changed`


## DEPRECATIONS :

### nestedSchemas

*where ?* awesomeCrud and awesomeForm

use `nestedModels` instead

### css class modal-full

*where ?* awesomeForm css (in the component and in modal.scss)

use `modal-fullscreen` instead


### prop nestedCrudNeedRefresh

*what ?* this props sends a signal for refreshing nested components
*where ?* awesomeForm and awesomeCrud

use `nestedElementsNeedRefresh` instead


### prop crudNeedsRefresh

*what ?* this props sends a signal for refreshing various parts of the awesomecrud
*where ?* awesomeForm and awesomeCrud

use `needsRefresh` instead
