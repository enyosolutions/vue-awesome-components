<template>
  <div class="awesome-action-list">
    <template v-if="useDropdown">
      <template v-for="(action, index) in unFoldableActions">
        <template v-if="shouldDisplayAction(action)">
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
        <popper
          trigger="clickToOpen"
          :options="{
            placement: 'bottom'
          }"
        >
          <button
            slot="reference"
            id="dropdownMenuButton"
            class="btn btn-sm btn-outline-secondary ml-1 mr-1 dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-bars" /> {{ $t('AwesomeTable.actions') }}
          </button>
          <div class="card" style="max-height: 80vh; overflow: auto;z-index:1">
            <template v-for="(action, index) in foldableActions">
              <template v-if="shouldDisplayAction(action)">
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
        </popper>
      </div>
    </template>
    <!-- ENd dropdown zone -->
    <!-- Start no dropdown zone -->
    <template v-if="!useDropdown">
      <template v-for="(action, index) in actions">
        <template v-if="shouldDisplayAction(action)">
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
import Popper from 'vue-popperjs';
import AwesomeAction from './AwesomeAction.vue';
export default {
  name: 'AwesomeActionList',
  components: {
    AwesomeAction,
    Popper
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
      note: `In case of type: filter || input, the list of the model's columns` // eslint-disable-line
    },
    location: {
      type: String,
      note: 'The location of the element'
    },
    parent: {
      type: Object,
      note: 'The parent of the current element (in case of nested)',
      default: () => null
    },
    parentDisplayMode: {
      type: String,
      note: 'The display mode of the parent',
      default: ''
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
  },
  data() {
    return {
      state: {}
    };
  },
  methods: {
    shouldDisplayAction(action) {
      this.mode = this.parentDisplayMode;
      // legacy, use visible
      if (action.canDisplay !== undefined) {
        return this.computeActionField(action, 'canDisplay');
      }
      if (action.visible !== undefined) {
        return this.computeActionField(action, 'visible');
      }
      return true;
    },
    computeActionField(action, field) {
      if (action[field] !== undefined) {
        if (typeof action[field] === 'function') {
          return action[field]({ item: this.item, items: this.items, parent: this.parent }, this);
        }
        return action.field;
      }
      return '';
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

  .aw-action {
    display: inline-block;
    margin-left: 1px;
  }
}

.awesome-action-list-dropdown {
  display: inline-block;
}
</style>
