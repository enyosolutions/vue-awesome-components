<template>
  <div class="awesome-action-list">
    <template v-if="useDropdown">
      <template v-for="(action, index) in unFoldableActions">
        <template v-if="!action.canDisplay || action.canDisplay({ item }, this)">
          <AwesomeAction
            v-bind="{ ...action, class: undefined }"
            :classes="action.class || action.classes"
            style="display: inline-block;"
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

      <div class="dropdown awesome-action-list-dropdown">
        <button
          id="dropdownMenuButton"
          class="btn btn-outline-secondary ml-1 mr-1 dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fa fa-info-circle" /> {{ $t('AwesomeTable.actions') }}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 100vh; overflow: auto;">
          <template v-for="(action, index) in foldableActions">
            <template v-if="!action.canDisplay || action.canDisplay({ item }, this)">
              <AwesomeAction
                v-bind="{ ...action, class: undefined }"
                :classes="action.class || action.classes"
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
      </div>
    </template>
    <!-- ENd dropdown zone -->
    <!-- Start no dropdown zone -->
    <template v-if="!useDropdown">
      <template v-for="(action, index) in actions">
        <template v-if="!action.canDisplay || action.canDisplay({ item }, this)">
          <AwesomeAction
            v-bind="{ ...action, class: undefined }"
            :classes="action.class || action.classes"
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
      note: "In case of type: filter || input, the list of the model's columns"
    },
    location: {
      type: String,
      note: 'The location of the element'
    },
    parent: {
      type: Object,
      note: 'The parent of the current element (in case of nested)'
    },
    useDropdown: {
      type: Boolean,
      note: 'if the slect items should be in a dropdown'
    }
  },
  computed: {
    foldableActions() {
      return this.actions.filter((a) => !a.type || (a.type === 'button' && !a.sticky));
    },

    unFoldableActions() {
      return this.actions.filter((a) => (a.type && a.type !== 'button') || a.sticky);
    }
  }
};
</script>

<style scoped lang="scss">
.awesome-action-list {
  display: inline-block;

  .dropdown-menu {
    button {
      width: 100%;
    }
  }
}

.awesome-action-list-dropdown {
  display: inline-block;
}
</style>
