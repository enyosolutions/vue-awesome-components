<template>
  <AwesomeBuilderModule :uuid="_uuid" :mode="mode">
    <template v-slot:editor>
      <input v-model="insideData.text" type="text">
    </template>
    <template v-slot:view>
      {{insideData.text}}
    </template>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/layout/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';

export default {
  name: 'Default',
  mixins: [builderModuleMixin],
  components: {
    AwesomeBuilderModule,
  },
}
</script>

<style scoped>

</style>