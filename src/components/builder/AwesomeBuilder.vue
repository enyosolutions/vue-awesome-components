<template>
  <div class="awesome-builder">
    <div class="awesome-builder-content">
      <AwesomeBuilderNoModule :class="dragging ? 'dragging': null" v-if="!content.length"/>
      <Draggable
        group="module"
        :list="content"
        animation="200"
        class="awesome-builder-content-list"
        @start="dragging = true"
        @end="dragging = false"
        @add="onAdd"
      >
        <component :ref="`aw-builder-content-${index}`" v-bind:is="module" v-for="(module, index) in content" :key="index"></component>
      </Draggable>
    </div>
    <div class="awesome-builder-modules">
      <Draggable
        group="module"
        :list="modulesList"
        animation="200"
        class="awesome-builder-modules-list"
        @start="dragging = true"
        @end="dragging = false"
      >
        <component v-bind:is="module" v-for="(module, index) in modulesList" :key="index"></component>
      </Draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import AwesomeBuilderModule from '@/components/builder/AwesomeBuilderModule';
import AwesomeBuilderNoModule from '@/components/builder/AwesomeBuilderNoModule';
import modules from '@/components/builder/modules';

export default {
  name: 'AwesomeBuilder',
  components: {
    Draggable,
    AwesomeBuilderModule,
    AwesomeBuilderNoModule,
  },
  data: () => ({
    content: [],
    modulesList: modules,
    dragging: false,
  }),
  methods: {
    onAdd(event) {
      const moduleUUID = this.$refs[`aw-builder-content-${event.newIndex}`][0].$children[0].uid;
      this.$awEventBus && this.$awEventBus.$emit(`aw-builder-module-placed-${moduleUUID}`)
    }
  }
}
</script>

<style scoped lang="scss">
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
    .awesome-builder-modules-list {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>