# Accessing events from nested items.

## context

Often you'll find yourself needing to access some events triggered by some children components of the library. Exemple a nested item item was created.

## \$awEventBus to the rescue.

The way to achieve this is super simple. Vac provides a global event bus just for that. `awEventBus`

## Example

```javascript
      this.$awEventBus.$on('before-create', (payload) {
      // eslint-disable-next-line
      const { identity, context, parent, parentIdentity } = payload;
      if (
        (identity === 'page')
        && parent
        && parentIdentity === 'chapter'
      ) {
        context.selectedItem.chapterId = parent.id;
      }
    });
```

## Content of the payload

```javascript
payload = {
  source: this.formatComponentName(),
  context: this,
  item: Object.assign({}, { ...this.selectedItem }),
  identity: this.identity,
  parent: this.parent
};
```

## source

https://github.com/enyosolutions-team/vue-awesome-components/blob/master/src/mixins/awEmitMixin.js
