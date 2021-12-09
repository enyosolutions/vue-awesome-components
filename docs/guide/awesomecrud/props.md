---
pageClass: fullwidth-page
---

# Props

<ClientOnly>
<ComponentDoc :component="'AwesomeCrud'" />
</ClientOnly>

## Options prop fields

The options property is an option object that controls various behaviors of the awesomecrud component.

| Property           | type    | Description                                 | Possible Values                                                           | Default |
| ------------------ | ------- | ------------------------------------------- | ------------------------------------------------------------------------- | ------- |
| useRouterMode      | boolean | true                                        |                                                                           |         |
| dataPaginationMode | string  | the mode for fetching the data from the api | local \ remote                                                            | local   |
| detailPageMode     | string  |                                             | `modal`, `sidebar`, `page`, `fullscreen`, `sidebar-left`, `sidebar-right` | `modal` |
|                    |         |                                             |                                                                           |         |

```
  mode: 'local', // Deprecated use dataPaginationMode
  dataPaginationMode: 'local',
  defaultOptions: true,
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  autoRefreshInterval: 20, // in seconds
  initialDisplayMode: 'table', // table | list | kanban
  detailPageMode: 'sidebar', // fade | slide | full
  detailPageLayout: null, // fade | slide | full
  columnsDisplayed: 10
```

### detailPageMode:

Manages the way the form is displayed. This field is relevant mostly when using Awesome form as part of AwesomeCrud.

#### Possible values :

- modal': Display as a modal
- fade': (legacy) Display as a modal
- slide': (legacy) Display as right size side menu
- sidebar': Display as right size side menu
- sidebar-right': Display as right size side menu
- sidebar-left': Display as Left size side menu
- fullscreen': Display as a full screen component
- page': Display as a full screen component
- sideform
- bottomform

## configure forms

### Display mode

`detailPageMode: 'sidebar', // modal | sidebar |`
