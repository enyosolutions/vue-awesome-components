---
{ 'title': 'Awesome List', 'lang': 'en-US' }
---

# Awesome List

The Awesome List allows you to create view in a grid style, perfect for search results.

![Demo Gif]()

## Dependencies

## Props

### columns

type: `Array (default: [], required: false)`
This is the columns provided by schema to display.
This allows to not display all the values in schema, only the values selected.

```vue
<awesome-list :columns="columns" />
```

### slots

#### list-item

This slot is for creating your own style and layout for items

```
<slot name="list-item" :item="item" changeItemsPerRow:="itemsPerRow" :index="index">
```

Works best when used in conjuction with `useGridSystem: false`

## Events
