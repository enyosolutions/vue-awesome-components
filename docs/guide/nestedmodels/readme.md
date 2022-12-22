---
{ 'title': 'Nested models', 'lang': 'en-US' }
---

# Nested models

The `AwesomeForm` component allows you to include some other data coming from other models, via a nesting feature. It's called the `nestedModels` features

## Presentation

Often you'll find yourself needing to display some additional data in the context of your current item. Exemple, list `comments` while browsing a `blog post`, or listing some `invoices` while browsing a `client`.

For that we created the nested models features. While browsing a item, you can display nested Tabs or list that will render in the context of the user.

## Initialisation

To create nested component, simply add the `nestedModels` property (an array) and fill it with models definitions.

## Props

| Property           | type          | Description                                                                                                                  | Possible Values | Default   |
| ------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------- | --------- |
| initiallyCollapsed | boolean       | Allow you to set the nested element to be collapsed by default                                                               | `true`, `false` | `false`   |
| component          | string/object | Allow you to the type of component to use to render the component. See the Model definition to see all the available fields. |                 | undefined |

## Examples

Show a tab with a list of comments

```
{

  ...
   nestedModels: [
      {
        extends: 'comment',
        config: {
          name: 'Actions & comments',
          namePlural: 'Actions & comments',
          apiUrl: '{{ parent && parent.id ? "/api/candidate/" + parent.id + "/comment?filters[includeModelData]=true" : "" }}',
          detailPageMode: 'modal',
          title: 'Actions and comments',
          actions: {
            dateFilter: false,
            pagination: true,
          },
          schema: {
            properties: {
              createdBy: {
                type: 'string',
                column: {
                  type: 'relation',
                  label: 'Created by',
                  hidden: false,
                  displayActions: false,
                },
                field: {
                  readonly: true
                }
              },
              AllModelRelations: {
                type: 'object',
                column: {
                  type: 'object',
                  label: 'Context',
                  format: '{{ currentItem && currentItem.modelData? currentItem.model + ": " + (currentItem.modelData.name || currentItem.modelData.title || currentItem.modelData.username || currentItem.modelId ): currentItem }}',
                },
                field: {
                  readonly: true,
                  displayOptions: {
                    format: '{{ currentItem && currentItem.modelData? currentItem.model + ": " + (currentItem.modelData.name || currentItem.modelData.title || currentItem.modelData.username || currentItem.modelId ): currentItem }}',
                  }
                }
              }
            }
          }
        }
      },
    ],
...
}

```

Show a tab with a full page component

```
    nestedModels: [
      {
        identity: 'cv',
        name: 'Curriculum',
        title: 'Curriculum',
        tabIsVisible: '{{ parent && parent.cv ? true : false }}',
        apiUrl: '/api/candidate',
        itemId: '{{ parent ? parent.id : "" }}',
        detailPageMode: 'page',
        displayMode: 'page',
        nestedDisplayMode: 'page',
        component: 'AwesomeForm',
        displayHeader: false,
        mode: 'view',
        actions: {
          edit: false,
          view: false,
          delete: false,
          changeDisplayMode: false
        },
        options: {
        },
        schema: {
          properties: {
            cv: {
              field: {
                label: '',
                cols: 12,
                classes: 'vh-100',
                visible: true,
                displayOptions: {
                  type: 'url',
                  embed: true,
                  classes: 'h-100',
                  styleClasses: 'h-100',
                  styles: 'height:100%',
                },
              }
            }
          }
        }
      },
      {
        extends: 'recruitmentProcess',
        config: {
          apiUrl: '{{ parent && parent.id ? "/api/recruitment-process?filters[candidateId]=" + parent.id + "" : "" }}',
          detailPageMode: 'modal',
          name: 'Recruitment',
          namePlural: 'Recruitments',
          title: 'Recruitments',
          actions: {
            edit: false,
            delete: false,
            changeDisplayMode: false
          },
          options: {
            viewPath: '/app/recruitment-process/:id',
          },
          schema: {
            properties: {
              candidateId: {
                field: {
                  readonly: true,
                  default: '{{ parent && parent.id ? parent.id : undefined }}',
                  // value: '{{ parent && parent.id ? parent.id : null }}',
                }
              }
            }
          }
        }
      },
      {
        extends: 'interview',
        config: {
          title: 'Interviews',
          name: 'Interviews',
          namePlural: 'Interviews',
          apiUrl: '{{ parent && parent.id ? "/api/interview?filters[candidateId]=" + parent.id + "" : "" }}',
          detailPageMode: 'modal',
          actions: {
            search: false,
            pagination: false,
            noActions: true,
            create: true,
          },
          schema: {
            properties: {
              candidateId: {
                field: {
                  readonly: true,
                  default: '{{ parent && parent.id ? parent.id : undefined }}',
                  // value: '{{ parent && parent.id ? parent.id : null }}',
                }
              }
            }
          }
        }
      },
      {
        extends: 'comment',
        config: {
          name: 'Actions & comments',
          namePlural: 'Actions & comments',
          apiUrl: '{{ parent && parent.id ? "/api/candidate/" + parent.id + "/comment?filters[includeModelData]=true" : "" }}',
          detailPageMode: 'modal',
          title: 'Actions and comments',
          actions: {
            dateFilter: false,
            pagination: true,
          },
          schema: {
            properties: {
              createdBy: {
                type: 'string',
                column: {
                  type: 'relation',
                  label: 'Created by',
                  hidden: false,
                  displayActions: false,
                },
                field: {
                  readonly: true
                }
              },
              AllModelRelations: {
                type: 'object',
                column: {
                  type: 'object',
                  label: 'Context',
                  format: '{{ currentItem && currentItem.modelData? currentItem.model + ": " + (currentItem.modelData.name || currentItem.modelData.title || currentItem.modelData.username || currentItem.modelId ): currentItem }}',
                },
                field: {
                  readonly: true,
                  displayOptions: {
                    format: '{{ currentItem && currentItem.modelData? currentItem.model + ": " + (currentItem.modelData.name || currentItem.modelData.title || currentItem.modelData.username || currentItem.modelId ): currentItem }}',
                  }
                }
              }
            }
          }
        }
      },
    ],
```

if you are using Axel framework to serve your model from the api, you can also use the extend style of writing nested models;

```
    nestedModels: [
      {
        extends: 'workshop',
        config: { url: '/api/workshop?filters[moduleId]={{parent.id}}' }
      },
      {
        extends: 'message',
        config: {
          url: '{{ parent && parent.id ? "/api/request/" + parent.id + "/message" : "" }}',
          options: { initialDisplayMode: 'list', },
          actions: { create: true, },
        },
      },
      {
        extends: 'modelComment',
        config: {
          identity: 'requestComment',
          name: 'Commentaire interne',
          namePlural: 'Commentaires internes',
          title: 'Commentaires internes',
          options: { initialDisplayMode: 'list', },
          url: '{{ parent && parent.id ? "/api/request/" + parent.id + "/comment" : "" }}',
          actions: { create: true, },
        },
      },
    ],

```
