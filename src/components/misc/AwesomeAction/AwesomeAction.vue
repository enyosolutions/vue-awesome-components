<template>
  <div class="aw-action">
    <!--  TYPE DROPDOWN  -->
    <div v-if="type === 'dropdown' && children.length" class="dropdown">
      <button
        class="btn dropdown-toggle"
        :class="classes"
        type="button"
        :id="`${name}-${index}`"
        data-toggle="dropdown"
        arias-haspopup="true"
        aria-expanded="false"
      >
        <i v-if="icon" :class="icon"></i>
        <span>{{ title ? $t(title) : '' }}</span>
      </button>
      <div class="dropdown-menu" :aria-labelledby="`${name}-${index}`">
        <a
          v-for="(child, index) in children"
          :key="child.id || index"
          class="dropdown-item"
          @click="
            $emit('customAction', {
              action: $props,
              items,
              item,
              location,
              parent,
              id: `${name}-${index}`,
              child
            })
          "
        >
          <span>{{ child.title ? $t(child.title) : '' }}</span>
        </a>
      </div>
    </div>
    <!--  TYPE FILTER  -->
    <div v-if="type === 'filter'">
      <AwesomeFilter
        :key="index"
        permanent-filter
        :defaultOperator="defaultOperator"
        :field="field"
        :field-label="label || title"
        :fields="columns"
        @update-filter="permanentFiltering"
      />
    </div>
    <div v-if="type === 'input'">
      <AwesomeFilter
        :key="index"
        permanent-input
        :field="field"
        :field-label="label || title"
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
        :data-title="title"
        :data-tooltip="title"
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
        <span>{{ label ? $t(label) : '' }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import i18nMixin from '../../../mixins/i18nMixin';
import AwesomeFilter from '../AwesomeFilter.vue';

export default {
  name: 'AwesomeAction',
  mixins: [i18nMixin],
  components: {
    AwesomeFilter
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
      type: String,
      note: 'The text of the element. Usually used as a tooltip'
    },
    label: {
      type: String,
      note: 'The label of the element'
    },
    classes: {
      type: String,
      note: 'The CSS classes'
    },
    icon: {
      type: String,
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
    index: {
      type: Number,
      note: 'The index of the element (use in id)'
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
      note: 'In case of type: filter || input, the field to search on'
    },
    defaultOperator: {
      type: String,
      note: 'In case of type: filter || input, the defaultOperator to display'
    },
    columns: {
      type: Array,
      note: "In case of type: filter || input, the list of the model's columns" // eslint-disable-line
    }
  },
  data: () => ({
    //
  }),
  methods: {
    permanentFiltering(parsedFilters, filters) {
      this.$emit('permanent-filtering', parsedFilters, filters);
    },

    permanentSearching(parsedFilters) {
      this.$emit('permanent-searching', parsedFilters);
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
