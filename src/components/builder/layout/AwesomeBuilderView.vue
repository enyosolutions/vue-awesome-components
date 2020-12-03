<template>
  <div class="awesome-builder-view">
    <div v-for="(module, index) in content" :key="index">
      <component v-bind:is="module.name"
                 mode="view"
                 :data="module.insideData"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'AwesomeBuilderView',
  data: () => ({
    content: [],
  }),
  mounted() {
    this.content = JSON.parse(localStorage.getItem('awesome-builder-view-test'));
  }
}
</script>

<style scoped lang="scss">
.awesome-builder-view {
  text-align: left;
  background-color: white;
}
</style>