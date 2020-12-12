# template parsing system

there are some cases where you want the app state to change depending on the state of some variable.

Example an api url that must change every time the current item has changed
or oa field that become visible if another was selected.

For those case VueAwesomeComponents has you covered.  The library allows to use functions and templated strings.


## templated strings

The templated string is a very powerful way to format dat that will be used in various place of the app.

Simply put Templated strings are strings with variable inside them, formatted like so


```
my best friend is {{ currentUser.firstName }}
```

Usiing that templating, you'll be able to :

- Define the condition for an item to display

```javascript
      estimatedDuration: {
        field: {
          visible: '{{ currentItem.isPublished }}' // this is templated.
        }
      },
```

- Format the display field of any item

```javascript
// in a model or in a relation label field
  primaryKeyField: 'id',
  displayField: '{{firstName}} {{lastName}}',
```


- Define the url dynamically

```javascript
// in a nested module
    nestedModels: [
      {
        'extends': 'workshop',
        config: { url: '/api/workshop?filters[moduleId]={{parent.id}}' }
      }
    ]
```


## Available items in a templated string.

Templated strings have predefined vaiable in them

- `currentItem` The item currently displayed, or in use (case ).
- `items` The list of items on display (for tables, lists and kanban).
- `parent` The currentitem on the parent context (moslty used for nestedModules) .
- `context` access to the component being sollicitated.


## functions

Templated strings have predefined vaiable in them

- `currentItem` The item currently displayed, or in use (case ).
- `items` The list of items on display (for tables, lists and kanban).
- `parent` The currentitem on the parent context (moslty used for nestedModules) .
- `context` access to the component being sollicitated.