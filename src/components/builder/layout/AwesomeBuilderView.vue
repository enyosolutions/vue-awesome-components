<template>
  <div class="awesome-builder-view">
    <div v-for="(module, index) in content" :key="index">
      {{module}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'AwesomeBuilderView',
  data: () => ({
    content: [],
    eventBus: null,
  }),
  mounted() {
    if (this.$awEventBus) {
      this.eventBus = this.$awEventBus;
    }
    this.content = JSON.parse(localStorage.getItem('awesome-builder-view-test'));
  }
}
</script>

<style scoped lang="scss">
.awesome-builder-view {
  text-align: left;
}
</style>