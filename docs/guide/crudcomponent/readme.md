---
{
  "title": "Enyo crud component",
  "lang": "en-US"
}
---


# Vue Crud component


The crud component is one of the most powerful components of the package. It allows you to quickly build and CRUD capable interface in vue, with a table list, and forms for creating / editing items.

<video width="800" height="600" controls autoplay="true">
  <source src="./crudcomponent-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>


## Presentation

This component magically create lists and edit data based on a json schema.

  ### Usage.

  There are 3 ways of using the Crud Component.
  The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based crud component.

  If you want to further personalize your page, it's possible to create your own component, use the crud component in the body, and then use slots to create the desired features.

  The 3rd way of reusing the Crud component if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.
  Whatever the reason for you to modify the component, we suggest that you read the html code as source for your edits. Then you can extend it/

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


  ## Passing configuration with the router

  ### automatically loading routes REST routes when needed;

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
      modalMode: 'slide', // fade | slide
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
      component: CrudComponent,
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
        component: CrudComponent,
        props: {
          name: model.name,
          modelName: model.modelName || model.name,
          options: _.merge(options, model.options, model.viewOptions),
          nestedSchemas: model.nestedSchemas,
          nestedDisplayMode: 'object',
        },
      }, {
        name: `${model.name}-edit`,
        path: ':id/edit',
        component: CrudComponent,
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

  ### custom actions

  In addition to the default actions on a crud component it's also possible to create custom actions.

  ```
  // example of route for crud component
  {
   name: 'contact',
   path: 'contact',
   component: CrudComponent,
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
     component: CrudComponent,
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
     component: CrudComponent,
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



## props

<ComponentDoc :component="'EnyoCrudComponent'" />

