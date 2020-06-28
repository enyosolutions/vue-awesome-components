export default {
    methods: {
        apiErrorCallback(err) {
            this.$notifications.clear();
            if (err && !err.response) {
                // network error
                // console.log(err);
                this.$notify({
                    title: this.$t('common.messages.network_error'),
                    type: 'warning'
                });
                return;
            }

            const message = this.parseErrorResponse(err.response || err.data || err);

            if (Array.isArray(message)) {
                message.forEach((m) => {
                    this.$notify({
                        title: m,
                        type: 'warning'
                    });
                })
            } else {
                this.$notify({
                    title: message,
                    type: 'warning'
                });
            }

        },

        parseErrorResponse(err) {
            if (!err) {
                return '';
            }
            let messages = [];
            if (err.data) {
                if (err.data.message) {
                    const m = this.getTranslatedMessage(err.data.message);
                    messages.push(m);
                }

                if (err.data.errors && Array.isArray(err.data.errors)) {
                    messages = messages.concat(err.data.errors.map(this.getTranslatedMessage));
                }
                if (messages.length) {
                    return messages;
                }
                return err.data instanceof String ? err.data : JSON.stringify(err.data);
            }
            return `Error status: ${err.status}`;
        },

        getTranslatedMessage(message) {
            return this.$te(`common.messages.${message}`) ? this.$t(`common.messages.${message}`) : message;
        }
    }
};
