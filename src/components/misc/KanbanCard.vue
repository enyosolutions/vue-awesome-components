<template>
  <div class="card-body">
    <p class="card-text" v-for="(item, index) in data" :key="index">{{index}}:{{ item }}</p>
  </div>
</template>

<script>
  export default {
    name: "KanbanCard",
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>

</style>