<template>
  <AwesomeBuilderModule :options="options" :uuid="_uuid" :mode="mode">
    <template v-slot:editor>
      <div class="module-columns">
        <div class="column">
          <AwesomeBuilderContent
              @aw-builder-module-removed="removeModule('0', $event)"
              :children.sync="insideData.list1"
          />
        </div>
        <div class="column">
          <AwesomeBuilderContent
              @aw-builder-module-removed="removeModule('1', $event)"
              :children.sync="insideData.list2"
          />
        </div>
      </div>
    </template>
    <template v-slot:view>
      <div class="container">
        <div class="row">
          <div class="col-6" v-for="(list, index) in insideData" :key="index">
            <div v-for="(module, index) in list" :key="index">
              <component v-bind:is="module.name"
                         mode="view"
                         :data="module.insideData"
              />
            </div>
          </div>
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
  methods: {
    removeModule(list, uuid) {
      if (list === '0') {
        this.insideData.list1 = _.filter(this.insideData.list1, (item) => {
          return item.uuid !== uuid;
        })
      } else if (list === '1') {
        this.insideData.list2 = _.filter(this.insideData.list2, (item) => {
          return item.uuid !== uuid;
        })
      }
    }
  },
  mounted() {
    this.$set(this.insideData, 'list1', []);
    this.$set(this.insideData, 'list2', []);
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