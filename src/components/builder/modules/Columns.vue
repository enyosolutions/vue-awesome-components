<template>
  <AwesomeBuilderModule :options="options" :uuid="_uuid" :placed="placed">
    <div class="module-columns">
      <div class="column">
        <AwesomeBuilderContent :content.sync="list1"></AwesomeBuilderContent>
      </div>
      <div class="column">
        <AwesomeBuilderContent :content.sync="list2"></AwesomeBuilderContent>
      </div>
    </div>
  </AwesomeBuilderModule>
</template>

<script>
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';
import AwesomeBuilderContent from '@/components/builder/AwesomeBuilderContent';
import _ from "lodash";

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
    list1: [],
    list2: [],
  }),
  mounted() {
    this.$awEventBus.$on('aw-builder-module-removed', (uuid) => {
      this.list1 = _.filter(this.list1, (item) => {
        return item.uuid !== uuid;
      });
      this.list2 = _.filter(this.list2, (item) => {
        return item.uuid !== uuid;
      });
    })
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