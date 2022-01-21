import Swal from 'sweetalert2/dist/sweetalert2.js';
import { isObject } from 'lodash';
import toaster from 'izitoast';


toaster.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'fontAwesome',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
});

export default {
  methods: {
    $awNotify(message) {
      toaster.settings({
        timeout: 5000,
        resetOnHover: true,
        icon: 'fontAwesome',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        position: 'topRight',
      });

      const payload = isObject(message)
        ? {
          title: message,
          ...message, // Placement is important to guarantee that the display is always a notification
        }
        : {
          icon: 'fa fa-info',
          title: message,
        };
      const type = payload && payload.type && toaster[payload.type] ? type : 'info';


      if (toaster[type]) {
        toaster[type](payload || '');
      }
      else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('missing izitoast', type, payload);
        }
        Swal.fire({
          title: payload.title,
          text: payload.message,
          type: payload.type,
          showCancelButton: false,
        })
        // alert(payload.title);
      }
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
