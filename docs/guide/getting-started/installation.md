# Installalation

```
## add yarn to your project
yarn add vue-aw-components
```

Add in your main.js

```
import VueAwesomeComponents from 'vue-aw-components/plugin';
Vue.use(VueAwesomeComponents);
## OR
Vue.use(VueAwesomeComponents, {
  config: {
    primaryKey: '_id',
    hideIdsInSelect: false,
    ...
  }
});

## or to import separately the components you need

import {EnyoCard, AwesomeTable} from 'vue-aw-components';

```

And for the styling you'll also need :

```
import VueAwesomeComponents from 'vue-aw-components/src/main.scss';

```
