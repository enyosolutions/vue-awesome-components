<template>
  <AwesomeBuilderModule :options="options" :uuid="_uuid" :mode="mode">
    <template v-slot:editor>
      <div class="module-columns">
        <div class="column">
          <AwesomeBuilderContent :content.sync="insideData.list1"></AwesomeBuilderContent>
        </div>
        <div class="column">
          <AwesomeBuilderContent :content.sync="insideData.list2"></AwesomeBuilderContent>
        </div>
      </div>
    </template>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/layout/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';
import AwesomeBuilderContent from '@/components/builder/layout/AwesomeBuilderContent';
import _ from 'lodash';

export default {
  name: 'Columns',
  mixins: [builderModuleMixin],
  components: {AwesomeBuilderModule, AwesomeBuilderContent},
  data: () => ({
    options: {
      title: 'Columns',
      description: 'Allow you to separate content two column',
      icon: 'fa-columns'
    },
  }),
  mounted() {
    this.insideData.list1 = [];
    this.insideData.list2 = [];
    // this.$awEventBus.$on('aw-builder-module-removed', (uuid) => {
    //   this.insideData.list1 = _.filter(this.insideData.list1, (item) => {
    //     return item.uuid !== uuid;
    //   });
    //   this.insideData.list2 = _.filter(this.insideData.list2, (item) => {
    //     return item.uuid !== uuid;
    //   });
    // })
  }
}
</script>

<style scoped lang="scss">
.module-columns {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .column {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    height: 50vh;
    width: 100%;
    .awesome-builder-content {
      width: 100%;
    }
  }
}

</style>