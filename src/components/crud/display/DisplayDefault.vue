<template>
  <div
    class="pointer text-avoid-overflow"
    v-bind="$props"
    :class="
      $props.class +
        ' ajax-table-col-' +
        $props.value +
        ' ajax-table-col-value-' +
        $props.value
    "
    :style="$props.style"
  >
    {{ $props.value }}
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayDefault',
  mixins: [awesomeDisplayMixin],
};
</script>

<style lang="scss">
  .ajax-table-col-failed.ajax-table-col-value-failed {
    color: #ffffff !important;
    background-color: #87cb16!important;
  }

  .ajax-table-col-scheduled.ajax-table-col-value-scheduled {
    color: #ffffff !important;
    background-color: #ddd !important;
  }

  .ajax-table-col-running.ajax-table-col-value-running {
    color: #ffffff !important;
    background-color: #17a2b8!important;
  }

  .ajax-table-col-timeout.ajax-table-col-value-timeout {
    color: #ffffff !important;
    background-color: #caca08!important;
  }
  .ajax-table-col-completed.ajax-table-col-value-completed {
    color: #ffffff !important;
    background-color: #87cb16!important;
  }
</style>
