<template>
  <div :class="`aw-action aw-action-name-${name}`">
    <!--  TYPE DROPDOWN  -->
    <div v-if="type === 'dropdown'" class="dropdown" :class="dropdownDirection">
      <button
        class="btn dropdown-toggle"
        :class="classes"
        @click="toggleDropdown()"
        type="button"
        :id="`${name}-${index}`"
        data-toggle="dropdown"
        arias-haspopup="true"
        aria-expanded="false"
      >
        <i v-if="icon" :class="icon"></i>
        <span>{{ title ? $t(title) : '' }}</span>
      </button>
      <div
        v-if="children && children.length"
        class="dropdown-menu"
        :aria-labelledby="`${name}-${index}`"
        :class="{ show: isDropdownOpened }"
      >
        <a
          v-for="(child, idx) in children"
          :key="idx"
          class="dropdown-item"
          @click="
            $emit('customAction', {
              action: $props,
              items,
              item,
              location,
              parent,
              id: `${name}-${index}-${idx}`,
              dropdownItem: child
            }),
              toggleDropdown(false)
          "
        >
          <span>{{ child.title || child.label ? $t(child.title || child.label) : child.id || child || '' }}</span>
        </a>
      </div>
    </div>
    <!--  TYPE FILTER  -->
    <div v-if="type === 'filter'">
      <AwesomeFilter
        :key="index"
        permanent-filter
        :defaultOperator="defaultOperator"
        :disabled="computeActionField(disabled)"
        :field-label="computeActionField(label || title)"
        :field="field"
        :fields="columns"
        :showLabel="showLabel"
        :showOperator="showOperator"
        @update-filter="permanentFiltering"
      />
    </div>
    <div v-if="type === 'input'">
      <AwesomeFilter
        :key="index"
        permanent-input
        :disabled="computeActionField(disabled)"
        :field-label="computeActionField(label || title)"
        :field="field"
        :showLabel="showLabel"
        :showOperator="showOperator"
        @update-filter="permanentFiltering"
      />
    </div>
    <!--  TYPE BUTTON  -->
    <div v-if="!type || type === 'button'">
      <button
        type="button"
        :key="index"
        class="btn"
        :class="classes"
        :id="`${name}-${index}`"
        :data-title="computeActionField(title)"
        :data-tooltip="computeActionField(title)"
        :disabled="computeActionField(disabled)"
        @click="
          $emit('customAction', {
            action: $props,
            items,
            item,
            location,
            parent,
            id: `${name}-${index}`
          })
        "
      >
        <i v-if="icon" :class="icon"></i>
        <span>{{ label ? computeActionField(label) : '' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import i18nMixin from '../../../mixins/i18nMixin';
import AwesomeFilter from '../AwesomeFilter.vue';

export default {
  name: 'AwesomeAction',
  mixins: [i18nMixin],
  components: {
    AwesomeFilter
  },
  directives: {
    ClickOutside
  },
  props: {
    type: {
      type: String,
      default: 'button',
      values: ['button', 'dropdown', 'input', 'filter'],
      note: 'The type of custom action'
    },
    name: {
      type: String,
      note: 'The name of the custom action used in the identifier'
    },
    title: {
      type: [String, Function],
      note: 'The text of the element. Usually used as a tooltip'
    },
    label: {
      type: [String, Function],
      note: 'The label of the element'
    },
    disabled: {
      type: [Boolean, Function],
      note: 'Whether the element is disabled or not',
      default: false
    },
    visible: {
      type: [Boolean, Function],
      note: 'Whether the element visible or not',
      default: false
    },
    classes: {
      type: String,
      note: 'The CSS classes'
    },
    icon: {
      type: [String, Function],
      note: 'The icon of the element'
    },
    children: {
      type: Array,
      default: () => [],
      note: 'The children of the element (eg: in case of a dropdown)'
    },
    action: {
      type: Function,
      note: 'A function you want to trigger when an action on element is fire'
    },
    actionApiUrl: {
      type: String,
      note: 'an api url to call for this action. it can contain a template'
    },
    index: {
      type: Number,
      note: 'The index of the element (used in id)'
    },
    items: {
      type: Array,
      note: 'The selected items'
    },
    item: {
      type: Object,
      note: 'The selected item'
    },
    location: {
      type: String,
      values: ['top', 'tabletop', 'inline', 'topright'],
      note: 'The location of the element'
    },
    parent: {
      type: Object,
      note: 'The parent of the current element (in case of nested)'
    },
    field: {
      type: String,
      note: 'In case of type: filter || input, the field to search on. This is used for generate a simple input'
    },
    defaultOperator: {
      type: String,
      note: 'In case of type: filter || input, the defaultOperator to display'
    },
    columns: {
      type: Array,
      note: "In case of type: filter || input, the list of the model's columns" // eslint-disable-line
    },
    dropdownItemId: {
      type: String,
      note: 'In case of type: dropddown, the field to use to identify',
      default: 'id'
    },
    dropdownItemLabel: {
      type: String,
      note: 'In case of type: dropddown, the field to use to display',
      default: 'title'
    },
    dropdownDirection: {
      type: String,
      note: 'In case of type: dropddown, the direction to drop the dropdown',
      default: 'dropleft',
      values: ['dropleft', 'dropright', 'dropup', 'dropdown']
    },
    showLabel: {
      type: Boolean,
      default: true,
      note: 'Should be we show the label of the filter or not'
    },
    showOperator: {
      type: Boolean,
      default: true,
      note: 'Should be we show the operator of the filter or not'
    }
  },
  data: () => ({
    state: {},
    isDropdownOpened: false
  }),
  watch: {},
  methods: {
    permanentFiltering(parsedFilters, filters) {
      this.$emit('permanent-filtering', parsedFilters, filters);
    },

    permanentSearching(parsedFilters) {
      this.$emit('permanent-searching', parsedFilters);
    },

    computeActionField(field) {
      if (field !== undefined) {
        if (typeof field === 'function') {
          return field({ item: this.item, items: this.items, parent: this.parent }, this);
        }
        if (typeof field === 'string') {
          return this.$t(field);
        }
        return field;
      }
      return '';
    },

    toggleDropdown(value) {
      if (value !== undefined) {
        this.isDropdownOpened = value;
      } else {
        this.isDropdownOpened = !this.isDropdownOpened;
      }
    }
  },
  mounted() {
    if ((this.type === 'filter' || this.type === 'input') && !this.field) {
      console.warn('[AwesomeAction]', 'You forget to set `field` for this type:', this.type);
    }
  }
};
</script>

<style scoped></style>
