<template>
  <div class="card-body">
    <p class="card-text">{{ data }}</p>
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