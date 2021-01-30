# Custom actions

In addition to the default ations on a `Awesome Crud` it's also possible to create custom actions.
The component `AwesomeAction` is used for that.

## Location

There are multiple location where you can add custom action.

|   Key                   |     Location                                                                         |
|-------------------------|--------------------------------------------------------------------------------------|
| `customTopRightActions` | Actions that appears on the top right of `Awesome Crud`                              |
| `customInlineActions`   | Actions that appears in row of `Awesome Table` and in footer of `Awesome Form`       |
| `customBulkActions`     | Actions that appears when you select element(s) in `Awesome Table`                   |
| `customTableTopActions` | Actions that appears on top of `Awesome Table`                                       |
| `customFormTopActions`  | Actions that appears on top of `Awesome Form`                                        |

## Locations examples

### `customTopRightActions`

```js
customTopRightActions: [
  {
    name: 'action-name',
    label: 'Action label',
    classes: 'btn-warning',
    title: 'Action title',
    icon: 'fa fa-question',
    action: ({items, action, location, props, id}, context) => {
      // Do what you want
    },
  },
]
```

`AwesomeTable`
![Demo customTopRightActions](./customs-actions-examples/customTopRightActions.png)

### `customInlineActions`

```js
customInlineActions: [
  {
    name: 'action-name',
    label: 'Action label',
    classes: 'btn-warning',
    title: 'Action title',
    icon: 'fa fa-question',
    action: ({items, action, location, props, id}, context) => {
      // Do what you want
    },
  },
]
```

`AwesomeTable`

![Demo customInlineActions2](./customs-actions-examples/customInlineActions.png)

`AwesomeForm`

![Demo customInlineActions2](./customs-actions-examples/customInlineActions2.png)

### `customBulkActions`

```js
customBulkActions: [
  {
    name: 'action-name',
    label: 'Action label',
    classes: 'btn-warning',
    title: 'Action title',
    icon: 'fa fa-question',
    action: ({items, action, location, props, id}, context) => {
      // Do what you want
    },
  },
]
```

`AwesomeTable`

![Demo customBulkActions](./customs-actions-examples/customBulkActions.png)


### `customTableTopActions`

```js
customTableTopActions: [
  {
    name: 'action-name',
    label: 'Action label',
    classes: 'btn-warning',
    title: 'Action title',
    icon: 'fa fa-question',
    action: ({items, action, location, props, id}, context) => {
      // Do what you want
    },
  },
]
```

`AwesomeTable`

![Demo customTableTopActions](./customs-actions-examples/customTableTopActions.png)

### `customFormTopActions`

```js
customFormTopActions: [
  {
    name: 'action-name',
    label: 'Action label',
    classes: 'btn-warning',
    title: 'Action title',
    icon: 'fa fa-question',
    action: ({items, action, location, props, id}, context) => {
      // Do what you want
    },
  },
]
```

`AwesomeForm`
![Demo customFormTopActions](./customs-actions-examples/customFormTopActions.png)

## Props

<ClientOnly>
<ComponentDoc component="AwesomeAction" />
</ClientOnly>

## Types

There are 4 differents types, that you can use to display your custom action :

### `button`

This is the default type, that display only a simple button

### `dropdown`

To use this type you need to pass an array `children` with the element inside

### `filter`

Filter is a permanent `AwesomeFilter` that allow to search on model columns

### `input`

Input is a permanent `AwesomeFilter` that allow to search on what you want.

::: warning
The element you search need to be in the current model or in relation with this model

Eg: For a model `residences` that in relation with `produits` and a model `disponibilites` that in relation with `produit`, i can do:
`produits.id` or `produits.disponibilites.id` from the `residence` model.

:::
