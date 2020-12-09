<template>
  <div class="awesome-builder-content">
    <AwesomeBuilderNoContent v-if="!children.length"/>
    <Draggable
        group="module"
        animation="200"
        :list="children"
        class="awesome-builder-content-list"
        @start="dragging = true"
        @end="dragging = false"
        handle=".draggable"
    >
      <component
          v-for="(module, index) in children" :key="index"
          v-bind:is="module.name"
          :uuid.sync="module.uuid"
          @update:insideData="module.insideData = $event"
          @aw-builder-module-removed="$emit('aw-builder-module-removed', $event)"
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
    children: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dragging: false,
  }),
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
    padding: 0 10px;
  }
}
</style>