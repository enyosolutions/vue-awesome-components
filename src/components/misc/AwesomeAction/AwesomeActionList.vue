<template>
  <div class="awesome-action-list">
    <template v-for="(action, index) in actions">
      <template v-if="!action.canDisplay || action.canDisplay({ item }, this)">
        <AwesomeAction
            v-bind="action"
            :key="index"
            :index="index"
            :items="items"
            :item="item"
            :columns="columns"
            :location="location"
            :parent="parent"
            @customAction="$emit('customAction', $event)"
            @permanent-filtering="$emit('permanent-filtering', $event)"
        />
      </template>
    </template>
  </div>
</template>

<script>
import AwesomeAction from './AwesomeAction';
export default {
  name: 'AwesomeActionList',
  components: {
    AwesomeAction
  },
  props: {
    actions: {
      type: Array,
      required: true,
      note: 'List of actions'
    },
    items: {
      type: Array,
      note: 'List of items'
    },
    item: {
      type: Object,
      note: 'Selected item'
    },
    columns: {
      type: Array,
      note: 'In case of type: filter || input, the list of the model\'s columns'
    },
    location: {
      type: String,
      note: 'The location of the element'
    },
    parent: {
      type: Object,
      note: 'The parent of the current element (in case of nested)'
    }
  },
}
</script>

<style scoped>

</style>