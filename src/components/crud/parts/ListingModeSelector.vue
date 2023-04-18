<template>
  <div class="btn-group aw-list-mode-selector">
    <button
      v-if="!enabledModes || enabledModes.includes('table')"
      class="btn btn-link p-1"
      @click.prevent="$emit('input', 'table')"
      title="table"
      type="button"
    >
      <i class="fa fa-table" :class="value === 'table' ? 'text-primary' : 'text-default'" />
    </button>
    <button
      v-if="!enabledModes || enabledModes.includes('list')"
      class="btn btn-link p-1"
      @click.prevent="$emit('input', 'list')"
      title="list"
      type="button"
    >
      <i class="fa fa-list" :class="value === 'list' ? 'text-primary' : 'text-default'" />
    </button>
    <button
      v-if="!enabledModes || enabledModes.includes('kanban')"
      class="btn btn-link p-1"
      @click.prevent="$emit('input', 'kanban')"
      title="kanban"
      type="button"
    >
      <i class="fa fa-columns" :class="value === 'kanban' ? 'text-primary' : 'text-default'" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      validator: (val) => !val || ['list', 'table', 'kanban'].includes(val),
      values: ['list', 'table', 'kanban']
    },
    enabledModes: {
      type: Array,
      default: () => ['list', 'table', 'kanban']
    }
  }
};
</script>
<style scoped>
.btn-link {
  color: unset;
}
</style>
