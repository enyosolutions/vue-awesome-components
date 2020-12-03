<template>
  <div class="awesome-builder-nocontent">
    <h2>Drag & Drop items</h2>
    <p>Drag & drop items onto this canvas to start building your page.</p>
  </div>
</template>

<script>
export default {
  name: 'AwesomeBuilderNoContent'
}
</script>

<style scoped lang="scss">
.awesome-builder-nocontent {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  min-height: 20vh;
  margin: 10px 0;
  padding: 80px;
  transition: opacity .2s ease-in-out;
  h2 {
    color: var(--primary);
    font-weight: bold;
  }
}
</style>