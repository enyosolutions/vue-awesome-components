# Using models

This page will document what is a model in Vac, how to create one and reuse them.

## Presentation

A model is a json document that contains all the informations needed to render correctly a page with a list of information in Vac.

## JSON schema Definition of a model

It controls general behavior of the page :

- naming of the page
- structure of the page (table / list / kanban)
- structure of the detail page (modal, sidebar, page, fullscreen, sideform)
- Options and actions available in the page (which actions i can do, custom actions, displayed columns / informations, tabs, nested informations etc)

[https://github.com/enyosolutions-team/axel-core/blob/master/src/models/schema/AxelModelConfig.js]()

## JSON schema Definition of a field

It controls general behavior of a field :

- labelling of the field
- type of the field
- how the field is displayed in listing pages, in view page, and in edit pages.
- validations on the field
- etc

[https://github.com/enyosolutions-team/axel-core/blob/master/src/models/schema/AxelModelFieldConfig.js]()
