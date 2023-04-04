---
pageClass: fullwidth-page
---

# Props

<ClientOnly>
<ComponentDoc :component="'AwesomeTable'">
<template v-slot:prop-col-description="{prop}">
<template v-if="prop.name == 'rows'">
  {{ prop.description || prop.note }}.<br/>
  This is an array containing the list of columns definitions. This definition ca be a string representing the field to display or an object that allow more advance configuration. <br/>
  Example:<br/>
  <code>
  {
    label: 'joined On',
    field: 'createdAt',
    type: 'date',
  }
  </code>
  <ul>
  <li>- See <a href="https://xaksis.github.io/vue-good-table/guide/configuration/column-options.html">Vue good table documentation</a> for more detail on row configuration.</li>
  <li>- See <a href="#columns-types"> Column types</a> for more info on suppoerted column types.</li>
  </ul>
</template>
</template>
</ComponentDoc>
</ClientOnly>

## columns types

The table can display various type of data. By default the value used it the string;

| Type          | description                                                     |
| ------------- | --------------------------------------------------------------- |
| string        | Basic string stype                                              |
| number        | Number based field                                              |
| boolean       | Shows a green tick(✔) or a red cross(❌) depending on the value |
| html          | html                                                            |
| url           | In app or external url                                          |
| image         | Image column (displays the actual image)                        |
| date          | Date field ("DD-MM-YYYY")                                       |
| datetime      | Date time field (exact format will depend on your browser)      |
| checkbox      | Checkox                                                         |
| relation      | relation to another model <Badge text="beta"/>                  |
| object        | objecrt or array                                                |
| list-of-value | The value is used to find the value in a vuex store             |
| list-of-data  | The value is used to find the value in a vuex store             |
| nestedColumns | This types means that there are more columns nested in the object |

## Styling classes :

`aw-table-card`
`aw-table-card-head`
`aw-table-card-body`

## events

| Type              | description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| dataChanged       | after the request to get list of items for the table is sent to the api |
| crud-list-updated | after the request to get list of items for the table is sent to the api |
| afterRefresh      | after the local refresh of the table (no api)                           |

## Awesome bus events

| Type               | description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| before-api-refresh | Before the request to get list of items for the table is sent to the api |
| table-refreshed    | after the request to get list of items for the table is sent to the api  |
