export default {
  methods: {
    apiErrorCallback(err) {
      if (err && !err.response) {
        // network error
        // console.log(err);
        this.$notify({
          title: this.$t('common.messages.network_error'),
          type: 'warning'
        });
        return;
      }

      let message;
      if (this.$t(`common.messages.${this.parseErrorResponse(err.response || err.data || err)}`)) {
        message = this.$t(`common.messages.${this.parseErrorResponse(err.response)}`);
      } else {
        message = this.parseErrorResponse(err.response || err.data || err);
      }
      this.$notify({
        title: message,
        type: 'warning'
      });
    },
    parseErrorResponse(err) {
      if (!err) {
        return '';
      }
      if (err.data) {
        if (err.data.message) {
          return err.data.message;
        }
        if (err.data.errors) {
          if (err.data.errors[0] && err.data.errors[0].message) {
            return err.data.errors[0].message;
          }
          return JSON.stringify(err.data.errors);
        }
        return err.data instanceof String ? err.data : JSON.stringify(err.data);
      }
      return `Error status: ${err.status}`;
    }
  }
};
