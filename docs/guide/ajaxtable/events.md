# Events of Ajax table

The AjaxTable component features some events to create some interaction.

## refresh

Called when the refresh button is clicked
['image']!(./images/ajaxtable-refresh.png)


## create

Called when the create button is clicked. For this button to appear :
- the special `ACTIONS` column must be added to the list of columns
- The create action must be set to `true` (it is by default)

## view

Called when the `view` button is clicked or when the user clicks on the row. For this to work the view action must be set to `true` in the options (it is by default)

Additionally for the button to appear the special `ACTIONS` column must be added to the list of columns


## edit

Called when the `edit` button is clicked  <i class="fa fa-edit"></i> . For this but``
ton to appear :
- the special `ACTIONS` column must be added to the list of columns
- The edit action must be set to `true` (it is by default)


## delete

Called when the ## delete button is clicked  <i class="fa fa-edit"></i> . For this button to appear :
- the special `ACTIONS` column must be added to the list of columns
- The ## delete action must be set to `true` (it is by default)


## customAction

Called when the a custom action button is clicked. For the button to appear :
- the special `ACTIONS` column must be added to the list of columns (if the action is an inline action)

The `customAction` event return an object with various properties to help you treat the action.


| Property   |     Type      |     Usage      |
|----------|---------------|---------------|
| action | Object | the action definition that was passed at the creation of the action |
| location | string (inline | tabletop)| The location of the action |
| item | Object | the object being clicked on if the action is an inline action |
| id | string | the unique id of the button being clicked on (its basically the name of the action plus the index of the row) |



## afterRefresh

Emitted after the refresh of the page has completed.
> Note: this event is only fired if the refresh was called by the user

This event return the current list of items in the body.
`this.$emit("afterRefresh", {data: this.data});`


## dataChanged

Called when the list of rows has changed. Most often its because a new set of data came from the api.
It return the new list of items received from the api.

This is useful for having table that will independently talk to a endpoint, while being able to access that data outside of the table if needed.


