# Introduction

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
      nestedModels: model.nestedModels,
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
        nestedModels: model.nestedModels,
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
        nestedModels: model.nestedModels,
        nestedDisplayMode: 'object',
      },
    }],
  });
});
}

```

## configuring the list mode

initialDisplayMode: 'table', // list | table | 'kanban'
