---
{
  "title": "Awesome List",
  "lang": "en-US"
}
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
<awesome-list
  :columns="columns"
/>
```

### kanbanOptions
type: `Object (default: defaultKanbanOptions)`

This is the configuration of the `Kanban` component.

| Property   |     Type      |     defaultValue      |     Usage      |
|------------|---------------|-----------------------|----------------|
| scrollSensitivity | `Number` | `200` | Value to determine the scroll sensitivity |
| animation | `Number` | `200` | Duration in milliseconds of the moved animation |
| moveList | `Number` | `false` | Allow you enabling/disabling list moving |
| moveCard | `Number` | `true` | Allow you enabling/disabling card moving |
| fields | `Object` | `{ title: 'name', 'subtitle': 'id', 'description': 'status' }` | Allows you to define which field you want display |
| filterField | `String` | `status` | Allow you to create default list |
| filterValues | `Array` | `['failed', 'completed', 'scheduled']` | Allow you to determine which value is used to create a list |
| sortField | `String` | `id` | Allow you to change to default sort the list by a `Fields`. |
| sortOrder | `String` | `DESC` | Allow you to change the sort order. Link with `sortField`. |

## Events
