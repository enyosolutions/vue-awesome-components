<template>
  <AwesomeLayout :edit-mode="true" :fields-list="fields" :layout="layout" @layout-updated="updateLayout"></AwesomeLayout>
</template>

<script>
import AwesomeLayout from '../../src/components/crud/layout/AwesomeLayout';
import ticket from '../fixtures/ticket';
export default {
  name: 'AwesomeLayoutPage',
  components: {
    AwesomeLayout
  },
  data: () => ({
    // layout: ticket.formOptions.optionsLayout.layout,
    layout: [
      {
        'x': 0, 'y': 0, 'w': 3, 'h': 6, 'i': 0,
        fields: [],
      },
      {
        'x': 3, 'y': 0, 'w': 3, 'h': 3, 'i': 1,
        fields: [],
      },
      {
        'x': 6, 'y': 0, 'w': 3, 'h': 3, 'i': 2,
        fields: [],
      },
    ],
    fields: ['id', 'name', 'description', 'test1', 'test2', 'test3'],
  }),
  methods: {
    updateLayout(items) {
      this.layout = items;
    }
  }
};
</script>

<style scoped></style>
