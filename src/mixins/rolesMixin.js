export default {
  methods: {
    userIs(role, $store = null) {
      $store = this.$store || $store;
      return $store.state.user.roles
      && $store.state.user.roles.indexOf(role) > -1;
    },

    userHasRole(role, $store = null) {
      $store = this.$store || $store;
      return $store.state.userExtendedRoles
      && $store.state.userExtendedRoles.indexOf(role) > -1;
    }
  }
};
