import Swal from 'sweetalert2/dist/sweetalert2.js';
import { isObject } from 'lodash';
import iziToast from 'izitoast';


iziToast.settings({
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
      iziToast.settings({
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
      const type = payload && payload.type && iziToast[payload.type] ? payload.type : 'info';


      if (iziToast[type]) {
        iziToast[type](payload || '');
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
      }
    },

    $awConfirm(message) {
      let request = {
        title: this.$t('Notifications.messages.are_you_sure'),
        text: '',
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$t('Notifications.buttons.yes'),
        cancelButtonText: this.$t('Notifications.buttons.cancel'),
        reverseButtons: true
      };
      if (typeof message === 'object') {
        request = Object.assign({}, request, message);
      }
      else {
        request.text = message;
      }
      return Swal.fire(request)
        .then((result) => {
          return result.value;
        });
    },

    $awExport(dataJSON) {
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
