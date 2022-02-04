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

    $awEmit(event, ...args) {
      this.$emit(
        event,
        ...args,
        {
          source: this.formatComponentName(),
          context: this,
          item: Object.assign({}, { ...this.selectedItem }),
          identity: this.identity,
          parent: this.parent,
        },

      );
      this.$awEventBus &&
        this.$awEventBus.$emit(
          event,
          ...args,
          {
            source: this.formatComponentName(),
            context: this,
            item: Object.assign({}, { ...this.selectedItem }),
            identity: this.identity,
            parent: this.parent,
          },
        );
    }
  }
};
