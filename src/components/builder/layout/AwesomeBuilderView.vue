<template>
  <div class="awesome-builder-view">
    <div v-for="(module, index) in children" :key="index">
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
    children: [],
  }),
  mounted() {
    this.children = JSON.parse(localStorage.getItem('awesome-builder-view-test'));
  }
}
</script>

<style scoped lang="scss">
.awesome-builder-view {
  text-align: left;
  background-color: white;
}
</style>