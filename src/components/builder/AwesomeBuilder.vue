<template>
  <div class="awesome-builder">
    <AwesomeBuilderContent :content.sync="content"/>
    <div class="awesome-builder-modules">
      <div class="card">
        <div class="card-body">
          <input v-model="search" class="form-control" type="text" placeholder="Search...">
        </div>
        <Draggable
            :group="{ name: 'module', pull: 'clone', put: false }"
            :list="modulesList"
            animation="200"
            class="awesome-builder-modules-list"
            @start="dragging = true"
            @end="dragging = false"
        >
          <component
              v-for="(module, index) in _moduleSearched"
              :key="index"
              v-bind:is="module.name"
              :placed="false"
          />
        </Draggable>
      </div>
    </div>
    <div class="debug">
      {{ content }}
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import AwesomeBuilderContent from '@/components/builder/AwesomeBuilderContent';
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import modules from '@/components/builder/modules';
import _ from 'lodash';

export default {
  name: 'AwesomeBuilder',
  components: {
    Draggable,
    AwesomeBuilderModule,
    AwesomeBuilderContent,
  },
  data: () => ({
    content: [],
    modulesList: modules,
    dragging: false,
    search: '',
  }),
  methods: {
    //
  },
  mounted() {
    this.$awEventBus.$on('aw-builder-module-removed', (uuid) => {
      this.content = _.filter(this.content, (item) => {
        return item.uuid !== uuid;
      });
    })
  },
  computed: {
    _moduleSearched() {
      if (this.search === '') {
        return this.modulesList;
      }
      return this.modulesList.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      });
    }
  }
}
</script>

<style lang="scss">
.debug {
  position: fixed;
  bottom: 0;
  background-color: rgba(0, 0, 0, .2);
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dragging {
  transition: opacity .3s ease-in-out;
  opacity: .4;
}

.awesome-builder {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 90vh;
  width: 100%;
  overflow: hidden;

  .awesome-builder-modules {
    margin: 10px;
    overflow-y: auto;
    width: 22%;
    position: relative;

    .card {
      margin-top: 10px;
      margin-bottom: 0;
    }

    .awesome-builder-modules-list {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 75px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-flow: row wrap;

      .awesome-builder-module {
        flex: 1;
        margin: 5px;
        box-sizing: border-box;

        .awesome-builder-module-header {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          .awesome-builder-module-icon {
            font-size: 24px;
          }
          .awesome-builder-module-text {
            margin-left: 0;
            .awesome-builder-module-title {
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>