# Setting configuration globally

## context

Often you'll need to set some config that you'd like to apply to all instances of a component of to all components. Exemple you'd like to set the primary Key field to be `_id` (mon go like) instead of `id`. In order to do this you can set some parameters in the plugin initialization.

## setting properties on a component.

The way to achieve this is super simple. Vac provides a configuration section for that

```
Vue.use(VueAwesomeComponents, {
  config: {
    modelsStorePath: 'models',
    rolesStorePath: 'user.user.roles',
    extendedRolesStorePath: 'user.extendedRoles',
    primaryKey: 'id',
    hideIdsInSelect: false,
    displayLabelsCache: {}
  },
  AwesomeCrud: {
    props: {
      primaryKey: { type: String, default: 'id' },
      modelsStorePath: {
        type: String,
        default: 'models'
      },
      options: { detailPageMode: 'sidebar' }
    }
  },
  AwesomeTable: {
    props: {
      primaryKey: {
        type: String,
        default: 'id',
      },
      modelsStorePath: {
        type: String,
        default: 'models'
      }
    }
  },
  AwesomeList: {
    props: {
      primaryKey: {
        type: String,
        default: 'id',
      },
      modelsStorePath: {
        type: String,
        default: 'models'
      }
    }
  },
  AwesomeForm: {
    props: {
      primaryKey: {
        type: String,
        default: 'id'
      },
      modelsStorePath: {
        type: String,
        default: 'models'
      }
    },

  },
});

```

## props

| Props           | description        |
| --------------- | ------------------ |
| hideIdsInSelect | Basic string stype |
| primaryKey      | Number based field |
