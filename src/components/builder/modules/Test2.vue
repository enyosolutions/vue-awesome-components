<template>
  <div class="test-2">
    <AwesomeBuilderModule title="test2" description="test2">
      <template v-slot:content>
        <h2>Test 2</h2>
      </template>
    </AwesomeBuilderModule>
  </div>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
export default {
  name: 'Test2',
  components: {
    AwesomeBuilderModule,
  },
}
</script>

<style scoped>

</style>