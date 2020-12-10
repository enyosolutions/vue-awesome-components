# AwesomeTable

## presentation

AwesomeTable is a component for displaying content in a table. The content can come from an api url a property.

## features

- fetching from api
- pagination
- remote and local mode
- custom actions
- simple and advanced filtering

## default initialisation


```html
  <AwesomeTable  :title="title" :columns="tableColumns" :rows="dataSource" :tableNeedsRefresh="needsRefresh" :options="tableOptions">
  <template slot="table-actions"></template>
  <template slot="table-top-actions"></template>
  <template slot="table-top-more-actions"></template>
  <template slot="table-subtitle"></template>
  <template slot="table-row-actions"></template>

  <!-- END OF ARRAY -->
  </AwesomeTable>
```


## Styling classes :

`aw-table-card`
`aw-table-card-head`
`aw-table-card-body`

