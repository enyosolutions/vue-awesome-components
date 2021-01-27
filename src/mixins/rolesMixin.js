export default {
  methods: {
    userIs(role, $store = null) {
      $store = this.$store || $store;
      return $store && $store.state && $store.state.user && $store.state.user.roles
        && $store.state.user.roles.indexOf(role) > -1;
    },

    userHasRole(role, $store = null) {
      $store = this.$store || $store;
      const state = $store && $store.state && $store.state.userExtendedRoles
        && $store.state.userExtendedRoles.indexOf(role) > -1;
      return state;
    }
  }
};
