<template>
  <div class="btn-group pull-left">
    <button class="btn btn-link pl-0 pr-2 pv-2" @click.prevent="$emit('input', 'table')" type="button">
      <i class="fa fa-table" :class="value === 'table' ? 'text-primary' : 'text-default'" />
    </button>
    <button class="btn btn-link p-2" @click.prevent="$emit('input', 'list')" type="button">
      <i class="fa fa-list" :class="value === 'list' ? 'text-primary' : 'text-default'" />
    </button>
    <button class="btn btn-link p-2" @click.prevent="$emit('input', 'kanban')" type="button">
      <i class="fa fa-columns" :class="value === 'kanban' ? 'text-primary' : 'text-default'" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      validator: (val) => ['list', 'table', 'kanban'].includes(val),
      values: ['list', 'table', 'kanban']
    }
  }
};
</script>
