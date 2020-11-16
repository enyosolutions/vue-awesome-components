import Swal from 'sweetalert2/dist/sweetalert2.js';
import _ from 'lodash';
export default {
  methods: {
    $awNotify(message) {
      const payload = _.isObject(message)
        ? {
          timer: 3000,
          title: message,
          type: 'success',
          ...message, // Placement is important to guarantee theat the display is always a notification
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        }
        : {
          timer: 3000,
          type: 'info',
          title: message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        };
      Swal.fire(payload);
    },

    $awConfirm(message) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title: this.$t('Notifications.messages.are_you_sure'),
          text: message,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$t('Notifications.buttons.yes'),
          cancelButtonText: this.$t('Notifications.buttons.cancel'),
          reverseButtons: true
        })
          .then((result) => {
            resolve(result.value);
          })
          .catch(reject);
      });
    },

    $export(dataJSON) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title: 'Data exported',
          input: 'textarea',
          inputValue: JSON.stringify(dataJSON),
          type: 'success',
          showCancelButton: false,
          showConfirmButton: '#3075d6',
          confirmButtonText: this.$t('Notifications.buttons.close'),
          reverseButtons: true
        })
          .then((result) => {
            resolve(result.value);
          })
          .catch(reject);
      });
    },
  }
};
