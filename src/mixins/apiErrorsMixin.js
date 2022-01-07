export default {
  methods: {
    apiErrorCallback(err) {
      if (err && !err.response && !err.message) {
        // network error
        // console.log(err);
        this.$awNotify({
          title: this.$t('common.messages.network_error'),
          type: 'warning'
        });
        return;
      }

      const messageOriginal = err.response || err.data || err;
      let message = this.parseErrorResponse(messageOriginal);
      if (this.$te(`aw.messages.${message}`)) {
        message = this.$t(`aw.messages.${message}`);
      } else {
        if (this.$te(message)) {
          message = this.$t(message);
        }
      }
      const errorBody = (err.response && err.response.data) || err.data || err;
      const subErrors = errorBody && errorBody.errors;
      const subErrorsHtml = subErrors && Array.isArray(subErrors) ? subErrors.map(e => e.message || e).filter(e => e !== messageOriginal).map(e => `</li>${this.$te(e) ? this.$t(e) : e}</li>`).join('') : '';
      this.$awNotify({
        title: message,
        message: '<ul>' + subErrorsHtml + '</ul>',
        type: 'warning',
        timer: 3000
      });
    },
    parseErrorResponse(err) {
      if (!err) {
        return '';
      }
      const error = err.response || err.data || err;
      if (error) {
        let message = '';
        if (error.message) {
          return error.message;
        }
        if (error.errors) {
          if (error.errors && error.errors.length) {
            message += '\n' + error.errors.map(e => e.message || e).join('<br/>');
          }
          else {
            message += JSON.stringify(error.errors);
          }
          return message;
        }
        return error instanceof String ? error : JSON.stringify(error);
      }
      return `Error status: ${err.status}`;
    }
  }
};
