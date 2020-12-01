<template>
  <div class="awesome-builder">
    <div class="awesome-builder-content">
      <AwesomeBuilderNoContent :class="dragging ? 'dragging': null" v-if="!content.length"/>
      <Draggable
        group="module"
        :list="content"
        animation="200"
        class="awesome-builder-content-list"
        @start="dragging = true"
        @end="dragging = false"
        @change="onChange"
      >
        <component
            v-for="(module, index) in content"
            :key="index"
            v-bind:is="module.name"
            @uuid-generated="module.uuid = $event"
            :uuid="module.uuid"
            :placed="true"
        />
      </Draggable>
    </div>
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
      {{content}}
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import AwesomeBuilderNoContent from '@/components/builder/AwesomeBuilderNoContent';
import modules from '@/components/builder/modules';
import _ from 'lodash';

export default {
  name: 'AwesomeBuilder',
  components: {
    Draggable,
    AwesomeBuilderModule,
    AwesomeBuilderNoContent,
  },
  data: () => ({
    content: [],
    modulesList: modules,
    dragging: false,
    search: '',
  }),
  methods: {
    onChange(event) {
      if (event.added) {
        this.content[event.added.newIndex].placed = true;
      }
    }
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
        return item.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
      });
    }
  }
}
</script>

<style scoped lang="scss">
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
  opacity: .8;
}
.awesome-builder {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 90vh;
  width: 100%;
  overflow: hidden;
  .awesome-builder-content {
    margin: 10px 50px;
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    overflow-y: auto;
    .awesome-builder-content-list {
      height: 100%;
      width: 80%;
      position: absolute;
      top: 0;
      left: 10%;
      right: 0;
      bottom: 0;
    }
  }
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
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>