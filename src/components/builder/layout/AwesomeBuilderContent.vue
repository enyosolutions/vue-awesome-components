<template>
  <div class="awesome-builder-content">
    <AwesomeBuilderNoContent v-if="!content.length"/>
    <Draggable
        group="module"
        animation="200"
        :list="content"
        class="awesome-builder-content-list"
        @start="dragging = true"
        @end="dragging = false"
        handle=".draggable"
    >
      <component
          v-for="(module, index) in content" :key="index"
          v-bind:is="module.name"
          :uuid.sync="module.uuid"
          @update:insideData="module.insideData = $event"
          mode="edit"
      />
    </Draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import AwesomeBuilderNoContent from '@/components/builder/layout/AwesomeBuilderNoContent';

export default {
  name: 'AwesomeBuilderContent',
  components: {
    Draggable,
    AwesomeBuilderNoContent
  },
  props: {
    content: {
      type: Array
    }
  },
  data: () => ({
    dragging: false,
  }),
  methods: {
    //
  },
}
</script>

<style scoped lang="scss">
.awesome-builder-content {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  overflow-y: auto;

  .awesome-builder-content-list {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>