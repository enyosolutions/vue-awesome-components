<template>
  <AwesomeLayout :edit-mode="true" :layout="layout" label="1st"></AwesomeLayout>
</template>

<script>
  import AwesomeLayout from "../../src/components/crud/layout/AwesomeLayout";
  import ticket from '../fixtures/ticket';
  export default {
    name: "AwesomeLayoutPage",
    components: {
      AwesomeLayout
    },
    data: () => ({
      layout: ticket.formOptions.optionsLayout.layout,
    })
  }
</script>

<style scoped>

</style>