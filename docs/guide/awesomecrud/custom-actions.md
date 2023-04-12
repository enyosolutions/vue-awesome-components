# Custom actions

In addition to the default ations on a `AwesomeCrud` it's also possible to create custom actions.
The component `AwesomeAction` is used for that.

## Location

There are multiple location where you can add custom action.

| Key                     | Location                                                                       |
| ----------------------- | ------------------------------------------------------------------------------ |
| `customTopRightActions` | Actions that appears on the top right of `Awesome Crud`                        |
| `customInlineActions`   | Actions that appears in row of `Awesome Table` and in footer of `Awesome Form` |
| `customBulkActions`     | Actions that appears when you select element(s) in `Awesome Table`             |
| `customTableTopActions` | Actions that appears on top of `Awesome Table`                                 |
| `customFormTopActions`  | Actions that appears on top of `Awesome Form`                                  |
| `customTitleBarActions` | Actions that appears on in the title bar                                       |

## Props of an action

| Key            | Location                                                                                                                                           |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`         | type of action `'button', 'dropdown', 'input', 'filter'`                                                                                           |
| `name`         | Unique Name of the action. Useful mostly to identify the action                                                                                    |
| `title`        | The text of the element. Usually used as a tooltip                                                                                                 |
| `label`        | The label of the element                                                                                                                           |
| `disabled`     | Whether the element disabled or not (boolean / Function / template )                                                                               |
| `action`       | A function you want to trigger when an action on element is fired                                                                                  |
| `actionApiUrl` | an api url to call for this action. it can contain a template. ex: '<code v-pre>/api/salary/{{item?.id}}/recalculate</code>'. The call is always done via a PUT call |

For all options See https://github.com/enyosolutions-team/vue-awesome-components/blob/master/src/components/misc/AwesomeAction/AwesomeAction.vue#L115

## Locations examples

### `customTopRightActions`

```js
customTopRightActions: [
  {
    name: 'action-name',
    label: 'Action label', // or a function that return a string
    classes: 'btn-warning',
    title: 'Action title', // or a function that return a string
    icon: 'fa fa-question',
    visible: true, // or a function that return a boolean
    disabled: false, // or a function that return a boolean
    action: ({ items, action, location, props, id }, context) => {
      // Do what you want
    }
  }
];
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
    action: ({ items, action, location, props, id }, context) => {
      // Do what you want
    }
  }
];
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
    action: ({ items, action, location, props, id }, context) => {
      // Do what you want
    }
  }
];
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
    action: ({ items, action, location, props, id }, context) => {
      // Do what you want
    }
  }
];
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
    action: ({ items, action, location, props, id }, context) => {
      // Do what you want
    }
  }
];
```

`AwesomeForm`
![Demo customFormTopActions](./customs-actions-examples/customFormTopActions.png)


## actions Types

There are 4 differents actions types, that you can use to display your custom action :

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

---

## Props

<ClientOnly>
<ComponentDoc component="AwesomeAction" />
</ClientOnly>

---

## fields available in the action configuration

Each action has acces to various fields that can be used to customize the action. They vary depending on the location of the action.

| Field name     | Description                                                                                    | Location   |
|----------------|------------------------------------------------------------------------------------------------|------------|
| `name`         | The name of the action                                                                         | `all`      |
| `label`        | The label of the action                                                                        | `all`      |
| `title`        | The title of the action                                                                        | `all`      |
| `icon`         | The icon of the action                                                                         | `all`      |
| `classes`      | The classes of the action                                                                      | `all`      |
| `visible`      | Whether the action is visible or not (boolean / Function / template )                           | `all`      |
| `disabled`     | Whether the action is disabled or not (boolean / Function / template )                          | `all`      |
| `action`       | A function you want to trigger when an action on element is fired                              | `all`      |
| `children`     | An array of actions that will be displayed in a dropdown when the action is clicked            | `dropdown` |
| `type`         | The type of the action. Can be `button`, `dropdown`, `filter` or `input`                        | `all`      |
| `filter`       | The filter you want to use for the action. Can be `text`, `select`, `date`, `datetime`, `time`  | `filter`   |
| `filterConfig` | The configuration of the filter. See [AwesomeFilter](../awesome-filter) for more informations. | `filter`   |
| `dropdownDirection` | The direction of the dropdown. Can be `dropup`, `dropdown`, `dropleft`, `dropright` | `dropdown` |




## fields available in the action functions

Each action function has acces to various fields that can be used to customize the callback behavior. exemple send the selected item to the api, or decide to execute or not the action.

They vary depending on the location of the action.

| Field name | Description                                                                                   |  Location |
| ---------- | --------------------------------------------------------------------------------------------- | --------- |
| `item`     | The current item of the action                                                                | `inline`  |
| `items`    | The current items of the action                                                               | `bulk`    |
| `action`   | The action object                                                                             | `all`     |
| `location` | The location of the action                                                                    | `all`     |
| `props`    | The props of the action                                                                       | `all`     |
| `id`       | The id of the action                                                                          | `all`     |
| `context`  | The context of the action. It contains the current component and the current component context | `all`     |
| `index`    | The index of the action                                                                       | `inline`  |
| `dropdownItem` | The selected dropdown item of the action                                                               | `dropdown`|


## Examples

```javascript
      customTopRightActions: [
        {
          name: 'clear-monitoring-list',
          label: 'Effacer',
          classes: 'btn-danger',
          title: 'Effacer tous les logs',
          icon: 'fa fa-trash',
          action: async ({ item }, context) => {
            if (await context.confirm('Êtes-vous de vouloir effectuer cette action')) {
              context.$http.delete('/monitoring/clear').then(() => {
                context.refreshComponent();
              });
            }
          },
        },
      ],
      customInlineActions: [
        {
          name: 'monitoring-list-new-hebergement-type',
          label: '',
          classes: 'btn-primary btn-simple',
          title: 'Créer la correspondance',
          icon: 'fa fa-edit',
          canDisplay({ item }, context) {
            return item.message && item.message.indexOf('Type d\'hebergement') > -1;
          },
          action: ({
            item, action, location, props, id,
          }, context) => {
            let data = item.context;
            const targetData = {};
            if (_.isString(data)) {
              data = JSON.parse(data);
              targetData.idMarchand = data.id_marchand;
              targetData.valeur = data.hebergement_type;
            }
            context.$router.push({
              path: '/app/correspondance/new',
              query: { item: targetData },
            });
          },
        },
      ],

```

### inline actions with `visible` and `disabled`
```javascript
  customInlineActions: [{
    name: 'send-mail',
    label: 'app.buttons.contact-candidate-button',
    class: 'btn btn-sm btn-simple btn-awtable-inline-action btn-icon ml-2',
    icon: 'fa fa-envelope',
    visible: ({ item }) => item.canBecontacted,
    disabled: ({ item }) => !item.email,
    action: ({
      item, action, location, props, id,
    }, context) => {
      context.$store.dispatch('email/setShowEmailComposerModal', { show: true, recipientAdress: item && item.email });
    },
  }],
```

### inline actions with dropdown
```javascript
  customInlineActions: [{
    name: 'call',
    label: 'app.buttons.contact-candidate-button',
    class: 'btn btn-sm btn-simple btn-awtable-inline-action btn-icon ml-2',
    icon: 'fa fa-phone',
    type: 'dropdown',
    dropdownDirection: 'bottom',
    children: ['send-mail', 'send-sms', 'send-whatsapp'],
    // you can also use objects like so:
    //children: [{id: 'send-mail', label: 'some label'}, {id: 'send-sms'}, {id: 'send-whatsapp', label: 'send whatsapp'}],
    visible: ({ item }) => item.canBecontacted,
    action: ({
      item, action, location, props, id, dropdownItem
    }, context) => {
      switch (dropdownItem) {
        case 'send-mail':
          context.$store.dispatch('email/showEmailComposerModal', { recipientAdress: item && item.email });
          break;
        case 'send-sms':
          ...
          break;

      }
    },
  }],
```
