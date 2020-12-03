<template>
  <div class="awesome-builder">
    <AwesomeBuilderEditor v-if="mode === 'edit'"/>
    <AwesomeBuilderView v-if="mode === 'view'"/>
  </div>
</template>

<script>

import AwesomeBuilderEditor from '@/components/builder/layout/AwesomeBuilderEditor';
import AwesomeBuilderView from '@/components/builder/layout/AwesomeBuilderView';
export default {
  name: 'AwesomeBuilder',
  components: {AwesomeBuilderView, AwesomeBuilderEditor},
  props: {
    mode: {
      type: String,
      required: true,
      default: () => 'edit'
    }
  },
}
</script>

<style scoped lang="scss">
.debug {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .2);
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.awesome-builder {

}
</style>