---
{
"title": "Nested models",
"lang": "en-US"
}
---

# Nested models

The `AwesomeForm` component allows you to include some other data coming from other models, via a nesting feature. It's called the `nestedModels` features

## Presentation

Often you'll find yourself needing to display some additional data in the context of your current item. Exemple, list `comments` while browsing a `blog post`, or listing some `invoices` while browsing a `client`.

For that we created the nested models features. While browsing a item, you can display nested Tabs or list that will render in the context of the user.

## Initialisation

To create nested component, simply add the `nestedModels` property (an array) and fill it with models definitions.

## Props

| Property           | type    | Description                                                    | Possible Values | Default |
|--------------------|---------|----------------------------------------------------------------|-----------------|---------|
| initiallyCollapsed | boolean | Allow you to set the nested element to be collapsed by default | `true`, `false` | `false` |