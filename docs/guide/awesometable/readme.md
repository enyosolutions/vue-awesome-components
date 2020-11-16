# AwesomeTable

## presentation



## features

## default initialisation


```
  <AwesomeTable  :title="title" :columns="tableColumns" :rows="dataSource" :tableNeedsRefresh="needsRefresh" :options="tableOptions">
  <template slot="table-actions"></template>
  <template slot="table-top-actions"></template>
  <template slot="table-top-more-actions"></template>
  <template slot="table-subtitle"></template>
  <template slot="table-row-actions"></template>

  <!-- END OF ARRAY -->
  </AwesomeTable>
  ```


## props


<ClientOnly>
<ComponentDoc :component="'AwesomeTable'" />
</ClientOnly>


## columns types

| Type          | description                                                                     |
|---------------|---------------------------------------------------------------------------------|
| string        | Basic string stype                                                              |
| number        | Number based field                                                              |
| booelan       | Shows a green tick(✔) or a red cross(❌) depending on the value                  |
| url           | In app or external url                                                          |
| image         | Image column (displays the actual image)                                        |
| date          | Date field ("DD-MM-YYYY")                                                       |
| datetime      | Date time field (exact format will depend on your browser)                      |
| checkbox      | Checkox                                                                         |
| relation      | Date time field (exact format will depend on your browser) <Badge text="beta"/> |
| object        | Date time field (exact format will depend on your browser)                      |
| list-of-value | The value is used to find the value in a vuex store                             |
| list-of-data  | The value is used to find the value in a vuex store                             |


## Styling classes :

`aw-table-card`
`aw-table-card-head`
`aw-table-card-body`


## events


| Type              | description                                                             |
|-------------------|-------------------------------------------------------------------------|
| dataChanged       | after the request to get list of items for the table is sent to the api |
| crud-list-updated | after the request to get list of items for the table is sent to the api |
| afterRefresh      | after the local refresh of the table (no api)                           |


## Awesome bus events


| Type               | description                                                              |
|--------------------|--------------------------------------------------------------------------|
| before-api-refresh | Before the request to get list of items for the table is sent to the api |
| table-refreshed    | after the request to get list of items for the table is sent to the api  |



## Examples

<   AjaxTableDemo />