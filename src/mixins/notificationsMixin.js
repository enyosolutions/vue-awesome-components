import Swal from "sweetalert2/dist/sweetalert2.js";

export default {
  methods: {
    $notify(message) {
      const payload = _.isObject(message)
        ? {
          timer: 3000,
          title: message,
          type: "success",
          ...message, // Placement is important to guarantee theat the display is always a notification
          toast: true,
          position: "top-end",
          showConfirmButton: false
        }
        : {
          timer: 3000,
          type: "info",
          title: message,
          toast: true,
          position: "top-end",
          showConfirmButton: false
        };
      Swal.fire(payload);
    },

    $confirm(message) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title: this.$t("common.messages.are_you_sure"),
          text: message,
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.$t("common.buttons.yes"),
          cancelButtonText: this.$t("common.buttons.cancel"),
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
