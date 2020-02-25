# Enyo Ajax table

## presentation



## features

## default initialisation


```
  <EnyoAjaxTable  :title="title" :columns="tableColumns" :rows="dataSource" :tableNeedsRefresh="needsRefresh" :options="tableOptions">
  <template slot="table-actions"></template>
  <template slot="table-top-actions"></template>
  <template slot="table-top-more-actions"></template>
  <template slot="table-subtitle"></template>
  <template slot="table-row-actions"></template>

  <!-- END OF ARRAY -->
  </EnyoAjaxTable>
  ```


## props


<ComponentDoc :component="'EnyoAjaxTable'" />


## columns types

| Type   |     description      |
|----------|---------------|
| string | Basic string stype |
| number | Number based field   |
| booelan | Shows a green tick(✔) or a red cross(❌) depending on the value |
| url | In app or external url |
| image | Image column (displays the actual image) |
| date | Date field ("DD-MM-YYYY") |
| datetime | Date time field (exact format will depend on your browser) |
| checkbox | Checkox |
| relation | Date time field (exact format will depend on your browser) <Badge text="beta"/> |
| object | Date time field (exact format will depend on your browser) |
| list-of-value | The value is used to find the value in a vuex store |
| list-of-data | The value is used to find the value in a vuex store |


## Styling classes :

`ajax-table-card`
`ajax-table-card-head`
`ajax-table-card-body`

## Examples

<AjaxTableDemo />