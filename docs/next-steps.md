# Next steps

- implement nested schemas for crud <Badge text="DONE"/>
- forward parameters to a crud component in order to force the value of some fields
(Ex: when i create a product form a page when coming with a fixed providerCode i want to the providerCode to be auto set the value in the query.)
- Make crud component work without a schema (eg. just with an url)
- Make sure  that if a crud page does not have an edit/create/view action, also it does not have the route for doing so
Ex: if on product i set edit:false then the route /product/:id/edit should not exist

- Bring back client side form validation for CrudComponent
- remove dependency from bootstrap for CrudComponent
- remove dependency from some useless components (Ex: Card)

- Support sockets and firebase
- Create list component for listing items (like in search results)
