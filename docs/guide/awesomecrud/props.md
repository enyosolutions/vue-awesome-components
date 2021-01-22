---
pageClass: fullwidth-page
---

# Props


<ClientOnly>
<ComponentDoc :component="'AwesomeCrud'" />
</ClientOnly>



## Options prop fields

The options property is an option object that controls various behaviors of the awesomecrud component.

| Property       | type    | Description | Possible Values                                                           | Default |
|----------------|---------|-------------|---------------------------------------------------------------------------|---------|
| useRouterMode  | boolean | true        |                                                                           |         |
| detailPageMode | string  |             | `modal`, `sidebar`, `page`, `fullscreen`, `sidebar-left`, `sidebar-right` | `modal` |
|                |         |             |                                                                           |         |


###  detailPageMode:

Manages the way the form is displayed. This field is relevant mostly when using Awesome form as part of AwesomeCrud.

####  Possible values :

- modal': Display as a modal
- fade': (legacy)  Display as a modal
- slide': (legacy)  Display as right size side menu
- sidebar':   Display as right size side menu
- sidebar-right':   Display as right size side menu
- sidebar-left':  Display as Left size side menu
- fullscreen':   Display as a full screen component
- page':   Display as a full screen component



 ## configure forms


 ### Display mode

   `detailPageMode: 'sidebar', // modal | sidebar | `


