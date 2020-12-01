---
{
  "title": "Awesome Builder module old",
  "lang": "en-US"
}
---

# Awesome Builder Module (WIP)

The Awesome Builder module allows you to create a module that can be used in Awesome Builder

## Props

### icon
type: `String (required: false, default:'fa-th-large')`

The icon that represent the module (FontAwesome 4)

```vue
<AwesomeBuilderModule
  icon="fa-picture-o"
/>
```

### title
type: `String (required: false, default:'Title')`

The title of the module

```vue
<AwesomeBuilderModule
  icon="fa-picture-o"
  title="My title"
/>
```

### description
type: `String (required: false, default: 'Default description for builder's module')`

The description that explain the usage of the module

```vue
<AwesomeBuilderModule
  icon="fa-picture-o"
  title="My title"
  description="My description"
/>
```

### placed
type: `Boolean (required: false, default: false)`

Show the module content (WYSIWYG, Video, File) if is placed in content section

```vue
<AwesomeBuilderModule
  icon="fa-picture-o"
  title="My title"
  description="My description"
  :placed="true"
/>
```