# Next steps


## UI

- Support for an edit page in full (currently only slider and modal are supported)

## critical

- Remove dependency on bootstrap modals as it creates a dependency on jquery.
-- we extract the code for modal feature from bootstrap,
-- or we find another package that offers modals in vue
-- or we implement our own modal code (preferred, but comes with a lot of potential bugs to deal with -- i'm thinking responsive...)


## Features
- Custom Filters on top of the crud component.
- Support for custom format of api response
- implement nested schemas for crud <Badge text="DONE"/>
- forward parameters to a crud component in order to force the value of some fields
(Ex: when i create a product form a page when coming with a fixed providerCode i want to the providerCode to be auto set the value in the query.)

- Make sure that if a crud page does not have an edit/create/view action, also it does not have the route for doing so
Ex: if on product i set edit:false then the route /product/:id/edit should not exist

- Bring back client side form validation for CrudComponent
- remove dependency from bootstrap for CrudComponent <Badge text="HARD" color="danger"/>
- remove dependency from some useless components (Ex: Card)

- Create list component for listing items (like in search results)
- Inline actions buttons should appear also when you are viewing / editing a form
- Add Hability to select many items and execute custom actions on them.

## DataSource
- Make crud component work without a schema (eg. just with an url)
- Support for websockets
- Support for firebase
- Support for vuex stores


