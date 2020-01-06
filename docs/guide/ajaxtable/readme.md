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



## Examples

This basic table..
```
<EnyoAjaxTable
:columns="['col1', 'col2', 'col3']"
:rows="[
{col1: 'qq', col2:'some data', col3: 'oopsie',
 notDisplayedColumn: 'ghosted'},
{col1: 'qq2', col2:'some moore data', col3: 'oopsie',
 notDisplayedColumn: 'ghosted'},
{col1: 'qq3', col2:'a third data', col3: 'oopsie',
 notDisplayedColumn: 'ghosted'},
 ]"
:options="{actions: {noActions: true}}"
 />
```

... wiill result in this
<AjaxTableDemo/>