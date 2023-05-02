import { get } from 'lodash';

export default {
  props: {
    rolesStorePath: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.rolesStorePath) || 'user.roles';
      },
      note:
        'Location of the array in the vuex state that contains all the roles of the current users eg if you provide user.roles => we will look ink this.$store.state.user.roles'
    },
    extendedRolesStorePath: {
      type: String,
      default: function () {
        return (this.awComponentsConfig && this.awComponentsConfig.extendedRolesStorePath) || 'extendedRolesStorePath';
      },
      note:
        'Location of the array in the vuex state that contains all the extended roles of the current users eg if you provide user.roles => we will look ink this.$store.state.user.roles'
    },
  },
  methods: {
    userIs(role, $store = null) {
      $store = this.$store || $store;
      const roles = get($store, this.rolesStorePath) || get($store.state, this.rolesStorePath);
      return roles && Array.isArray(roles)
        && roles.indexOf(role) > -1;
    },

    userHasRole(role, $store = null) {
      $store = this.$store || $store;
      const userExtendedRoles = get($store, this.rolesStorePath) || get($store.state, this.rolesStorePath);
      return userExtendedRoles && Array.isArray(userExtendedRoles)
        && userExtendedRoles.indexOf(role) > -1;
    }
  }
};
