<template>
  <AwesomeBuilderModule title="test2" description="test2" :uuid="_uuid" :placed="placed">
    <template>
      <h2>Test 2</h2>
    </template>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';

export default {
  name: 'Test2',
  mixins: [builderModuleMixin],
  components: {
    AwesomeBuilderModule,
  },
}
</script>

<style scoped>

</style>