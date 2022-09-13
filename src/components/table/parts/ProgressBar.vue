<template>
  <div style="text-align: center;">
    <div
      class="progress"
      style="height: 5px; border-radius: 0px; position: absolute; top: 0; left: 0; width: 100%;z-index:10000"
    >
      <div
        class="bg-primary progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
        style="width: 5%;"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProgressBar',
  components: {},
  mixins: [],
  emits: ['input', 'refresh'],
  props: {
    value: { default: '' },
    autoRefresh: { type: [Boolean] },
    autoRefreshInterval: { type: [Number], default: 30 }
  }
};
</script>
<style lang="scss"></style>
