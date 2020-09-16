<template>
  <AwesomeLayout :edit-mode="true" :layout="layout" @layout-updated="updateLayout"></AwesomeLayout>
</template>

<script>
import AwesomeLayout from "../../src/components/crud/layout/AwesomeLayout";
import ticket from "../fixtures/ticket";
export default {
  name: "AwesomeLayoutPage",
  components: {
    AwesomeLayout
  },
  data: () => ({
    layout: ticket.formOptions.optionsLayout.layout
  }),
  methods: {
    updateLayout(items) {
      this.layout = items;
    }
  }
};
</script>

<style scoped></style>
