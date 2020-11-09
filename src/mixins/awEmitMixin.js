/**
 * function to simplify emiting event and senting them to the event bus
 * */
export default {
  methods: {
    formatComponentName(debug = false) {
      const vm = this;
      if (vm.$root === vm) {
        return 'root instance';
      }
      var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
      return (
        (name || 'anonymous component') +
        (vm._isVue && vm.$options.__file && debug ? ' at ' + vm.$options.__file : '')
      );
    },

    $awEmit(event, data, ...args) {
      this.$emit(
        event,
        {
          source: this.formatComponentName(),
          context: this,
          item: this.selectedItem,
          identity: this.identity,
          parent: this.parent,
          ...data
        },
        ...args
      );
      this.$awEventBus &&
        this.$awEventBus.$emit(
          event,
          {
            source: this.formatComponentName(),
            context: this,
            item: this.selectedItem,
            identity: this.identity,
            parent: this.parent,
            ...data
          },
          ...args
        );
    }
  }
};
