---
{
  "title": "Awesome Event Bus",
  "lang": "en-US"
}
---

# Awesome Event Bus

This is a simple event bus that allows you to received and communicate  with the component internals


## Dependencies
- none

## Props

## List of Events
### @removeList
Event emitted when a list is removed
Return list name.
```vue
<awesome-kanban
   :lists="lists"
   :columns="columns"
   @removeList="onListRemoved"
/>
```
```js
methods: {
  onListRemoved(listName) {
    //
  }
}
```
### @listChanged
Event emitted when a list is changed.
```vue
<awesome-kanban
   :lists="lists"
   :columns="columns"
   @listChanged="onListChanged"
/>
```
```js
methods: {
  onListChanged(event) {
    // event = { moved: { element: { content: [], title:"Shopping list" }, newIndex: 3, oldIndex: 2} }
  }
}
```
### @cardChanged
Event emitted when a card is moved/changed/sorted.
```vue
<awesome-kanban
  :lists="lists"
  :columns="columns"
  @cardChanged="onCardChanged"
/>
```
```js
methods: {
  onCardChanged(event) {
    // event = [{ removed: { element: { value, ... }, oldIndex: 1 }, "list_name"]
  }
}
```
### @cardClicked
Event emitted when a card is clicked.
```vue
<awesome-kanban
  :lists="lists"
  :columns="columns"
  @cardClicked="onCardClicked"
/>
```
```js
methods: {
  onCardClicked(item) {
    // item = [{ id: 1, name: 'test', ... }]
  }
}
```
### @customListAction


## Examples
Event emitted when a custom list action is clecked.
For the button to appear :
``
The `@customListAction` event return an object with various properties to help you treat the action.

| Property   |     Type      |     Usage      |
|----------|---------------|---------------|
| action | Object | the action definition that was passed at the creation of the action |
| location | string | The location of the action |
| item | Object | the object being clicked on if the action is an inline action |
| id | string | the unique id of the button being clicked on (its basically the name of the action plus the index of the row) |

```vue
<awesome-kanban
  :lists="lists"
  :columns="columns"
  @customListAction="onCustomListAction"
/>
```
```js
methods: {
  onCustomListAction(body) {
    const { action } = body;
    this.$emit(this.identity + "-custom-list-action", action);
    return action && action.action && action.action(body, this);
  }
}
````