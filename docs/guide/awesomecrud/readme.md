---
{
  "title": "Awesome Crud",
  "lang": "en-US"
}
---


# Vue Awesome Crud


The Awesome Crud is one of the most powerful components of the package. It allows you to quickly build and CRUD capable interface in vue, with a table list, and forms for creating / editing items.

<video width="800" height="600" controls autoplay="true">
  <source src="./awesomecrud-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Presentation

This component magically create lists and edit data based on a json schema.

  ## Initialisation


  There are 3 ways of using the Awesome Crud.
  - 1 - The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based awesome crud

  - 2 - If you want to further personalize your page, it's possible to create your own component, use the awesome crud in the body, and then use slots to create the desired features.

  - 3 - The 3rd way of reusing the awesome crud if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.
  Whatever the reason for you to modify the component, we suggest that you read the html code as source for your edits. Then you can extend it/

  ### 1 - configuration with the router

  #### 1.1 Connecting the AwesomeCrud to the router


  ```
  // example of route for awsome crud
  {
   name: 'contact',
   path: 'contact',
   component: AwesomeCrud,
   beforeEnter: authGuard,
   props: {
     modelName: 'contact',
     options: {
       url: '/contact',
       stats: true,
       actions: {
         view: true,
         delete: true,
       }
     }
   },
   children: [{
     name: 'contact-view',
     path: ':id',
     component: AwesomeCrud,
     props: {
       modelName: 'contact',
       options: {
         actions: {
           view: true,
           delete: true,
         }
       }
     }
   }, {
     name: 'contact-edit',
     path: ':id/edit',
     component: AwesomeCrud,
     props: {
       modelName: 'contact',
       options: {
         actions: {
           edit: true,
           view: true,
           delete: true,
         }
       }
     }
   }]
 }
```


  #### 1.2 - automatically loading routes REST routes when needed;


  ```
  if (config.automaticModels && config.automaticModels.length) {
  const appRoute = routes.find(route => route.path === '/app');
  config.automaticModels.forEach((model) => {
    const options = {
      mode: 'remote',
      url: null,
      columns: null,
      viewPath: null,
      stats: false,
      detailPageMode: 'sidebar', // sidebar | modal
      initialDisplayMode: 'table', // list | table
      nestedDisplayMode: 'list', // list | object
      actions: {
        noActions: false,
        create: false,
        edit: false,
        filter: true,
        dateFilter: true,
        view: true,
        delete: false,
        import: false,
        export: true,
      },
    };
    appRoute.children.push({
      name: model.name,
      path: model.route || model.name,
      component: AwesomeCrud,
      beforeEnter: authGuard,
      props: {
        name: model.name,
        modelName: model.modelName || model.name,
        options: _.merge(options, model.options, model.listOptions),
        nestedSchemas: model.nestedSchemas,
        nestedDisplayMode: 'object',
      },
      children: [{
        name: `${model.name}-view`,
        path: ':id',
        component: AwesomeCrud,
        props: {
          name: model.name,
          modelName: model.modelName || model.name,
          options: _.merge(options, model.options, model.displayOptions),
          nestedSchemas: model.nestedSchemas,
          nestedDisplayMode: 'object',
        },
      }, {
        name: `${model.name}-edit`,
        path: ':id/edit',
        component: AwesomeCrud,
        props: {
          name: model.name,
          modelName: model.modelName || model.name,
          options: _.merge(options, model.options, model.editOptions),
          nestedSchemas: model.nestedSchemas,
          nestedDisplayMode: 'object',
        },
      }],
    });
  });
}

```

 ## configure forms


 ### Display mode

   `detailPageMode: 'sidebar', // modal | sidebar | `

 ### fields types


  ### Actions

  The crud compoenent allows to define which actions are enabled on a component. There are many default actions that can be configured.

  - create
  - edit
  - noActions (globally disable all actions)
  - search
  - filter
  - create
  - view
  - delete
  - export
  - import
  - dateFilter
  - refresh


  ### custom actions

  In addition to the default actions on a awesome crud it's also possible to create custom actions.



## props

<ClientOnly>
<ComponentDoc :component="'AwesomeCrud'" />
</ClientOnly>

## Options prop fields

The options property is an option object that controls various behaviors of the awesomecrud component.

###  detailPageMode:

Manages the way the form is displayed. This field is relevant mostly when using Awesome form as part of AwesomeCrud.

####  Possbile values :

- modal': Display as a modal
- fade': (legacy)  Display as a modal
- slide': (legacy)  Display as right size side menu
- sidebar':   Display as right size side menu
- sidebar-right':   Display as right size side menu
- sidebar-left':  Display as Left size side menu
- fullscreen':   Display as a full screen component
- page':   Display as a full screen component