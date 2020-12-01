---
{
  "title": "Awesome Builder module",
  "lang": "en-US"
}
---

# Create a module (WIP)

The Awesome Builder module system allow you to create a module that can be used in `Awesome Builder`

## Usage

To create a new module you have to create a Vue component in `components/builder/modules`.

In this component you should import `AwesomeBuilderModule`.

```js
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';

export default {
  name: 'MyModule',
  components: { AwesomeBuilderModule },
}
```

When `AwesomeBuilderModule` is imported, you can pass all elements you want in the slot `content` and for customize your module you can pass some props to `AwesomeBuilderModule` (title, icon, description, ...).

```vue
<AwesomeBuilderModule icon="fa-times" title="myModuleTitle" description="myModuleDescription">
  <template v-slot:content>
    <h1>My module</h1>
  </template>
</AwesomeBuilderModule>
```

All the modules in `components/builder/modules` is automatically load by `AwesomeBuilder`