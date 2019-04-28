# vue-enyo-components

## Dependencies

This package depends on certain packages that must be intalled separately.

- bootstrap
- vue-form-generator https://github.com/vue-generators/vue-form-generator  
```
npm install vue-form-generator@3.0.0-beta.4
```

## install
```
yarn add vue-enyo-components
```

Add in your main.js 
```
import VueEnyoComponents from 'vue-enyo-components/plugin';

// or to import separately the components you need

import {EnyoCard, EnyoAjaxTable} from 'vue-enyo-components';

```

And for the styling you'll also need :

```
import VueEnyoComponents from 'vue-enyo-components/build/style.css';

```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
