export default {
  methods: {
    apiErrorCallback(err) {
      if (err && !err.response) {
        // network error
        // console.log(err);
        this.$awNotify({
          title: this.$t('common.messages.network_error'),
          type: 'warning'
        });
        return;
      }

      let message;
      if (this.$te(`aw.messages.${this.parseErrorResponse(err.response || err.data || err)}`)) {
        message = this.$t(`aw.messages.${this.parseErrorResponse(err.response)}`);
      } else {
        message = this.parseErrorResponse(err.response || err.data || err);
      }
      const errorBody = (err.response && err.response.data) || err.data || err;
      const subErrors = errorBody && errorBody.errors;
      const subErrorsHtml = subErrors && Array.isArray(subErrors) ? subErrors.map(e => e.message || e).map(e => `</li>${this.$te(e) ? this.$t(e) : e}</li>`).join('') : '';
      this.$awNotify({
        title: message,
        html: '<ul>' + subErrorsHtml + '</ul>',
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
            message += '<br/>' + error.errors.map(e => e.message || e).join('<br/>');
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
