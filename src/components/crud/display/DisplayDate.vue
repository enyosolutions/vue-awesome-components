<template>
  <div v-bind="$props" :class="$props.classes" class="aw-display-date pointer">
    {{ computedDate }}
  </div>
</template>

<script>
import moment from "moment";
import awesomeDisplayMixin from "../../../mixins/displayMixin";

export default {
  name: "DisplayDate",
  mixins: [awesomeDisplayMixin],
  computed: {
    computedFormat() {
      if (this.format) {
        return this.format;
      }
      switch (this.type) {
        case "datetime":
          return "DD/MM/YYYY - HH:MM";
        case "date":
          return "DD/MM/YYYY";

        case "time":
          return "HH:MM";
        default:
          return "";
      }
    },
    computedDate() {
      if (!this.value) {
        return "...";
      }
      let dt;
      if (typeof this.inputFormat !== "undefined") {
        dt = moment(this.value, this.inputFormat).toDate();
      } else {
        dt = new Date(this.value);
      }
      return moment(dt).format(this.computedFormat);
    }
  }
};
</script>

<style>

.aw-display-date.badge {
  display: block;
}
</style>
