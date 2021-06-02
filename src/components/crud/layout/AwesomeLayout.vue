<template>
  <div class="awesome-layout">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="80"
      :is-draggable="isDraggable"
      :is-resizable="isResizable"
      :vertical-compact="verticalCompact"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="onLayoutUpdated"
    >
      <grid-item
        class="item"
        v-for="(item, index) in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i || index"
        :key="item.i"
        :maxW="12"
        :minH="3"
        dragIgnoreFrom="a, button, .form-element, .draggable-item"
      >
        <div :class="editMode ? 'awesome-layout-list card card-primary p-0' : 'p-0'">
          <div v-if="item.legend || editMode" class="draggable-header bg-primary">
            <div class="legend">
              <i class="fa fa-pencil" v-if="editMode"></i>
              <input
                v-if="editMode"
                class="form-control ml-2 aw-layout-legend-input"
                type="text"
                v-model="item.legend"
              />
              <p v-else>{{ item.legend }}</p>
            </div>
            <a v-if="editMode" @click="removeItemFromGrid(index)">
              <i class="fa fa-trash"></i>
            </a>
          </div>
          <div class="item-draggable">
            <Draggable
              class="draggable-list"
              :list="item.fields"
              group="fields"
              :disabled="!editMode"
              @change="fieldChanged"
              ghost-class="moving-card"
            >
              <template v-if="editMode">
                <div v-for="(field, index) in item.fields" :key="index">
                  <div :class="editMode ? 'draggable-item card' : ''">
                    <div :class="editMode ? 'card-body p-2' : ''">
                      <slot name="field" :field="field">{{ field }}</slot>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="!editMode">
                <slot name="fields" :fields="item.fields">
                  {{ item.fields }}
                </slot>
              </template>
            </Draggable>
            <div v-if="item.layout">
              <AwesomeLayout
                :edit-mode="editMode"
                :layout.sync="item.layout"
                @layout-updated="onLayoutUpdated"
                @change="fieldChanged"
              >
                <div slot="field" slot-scope="{ field }">
                  <slot name="field" :fields="field" v-if="!editMode && field">
                    {{ field }}
                  </slot>
                </div>
                <div slot="fields" slot-scope="{ fields }">
                  <template v-if="!editMode && fields">
                    <slot name="fields" :fields="fields">
                      {{ fields }}
                    </slot>
                  </template>
                </div>
              </AwesomeLayout>
            </div>
          </div>
        </div>
      </grid-item>
    </grid-layout>
    <section v-if="editMode" class="awesome-layout-actions">
      <button type="button" class="btn btn-primary btn-add-item " @click="addItemToGrid()">
        <i class="fa fa-plus"></i>
      </button>
      <Draggable
        class="draggable-list"
        group="fields"
        @change="fieldChanged"
        ghost-class="moving-card"
        :list="fieldsList"
      >
        <div v-for="(field, index) in fieldsList" :key="index">
          <div class="draggable-item card">
            <div class="card-body p-2">
              {{ field.model || field.label || field.title || field }}
            </div>
          </div>
        </div>
      </Draggable>
    </section>
  </div>
</template>

<script>
import i18nMixin from '../../../mixins/i18nMixin';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AwesomeLayout',
  components: {},
  mixins: [i18nMixin],
  props: {
    layout: {
      type: Array,
      required: true
    },
    editMode: {
      type: Boolean,
      default: () => false
    },
    fieldsList: {
      type: Array,
      required: false,
      default: () => [],
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    }
  },
  data: () => ({
    verticalCompact: true,
    height: 2,
    newBlock: {
      x: 0,
      y: 0,
      w: 6,
      h: 6,
      maxW: 12,
      minH: 2,
      fields: []
    }
  }),
  methods: {
    onLayoutUpdated(items) {
      this.$emit('layout-updated', items);
    },

    fieldChanged(items) {
      this.$emit('layout-fields-updated', items);
    },

    // Add a new item to the grid
    addItemToGrid() {
      const items = Object.assign([], this.layout);
      items.push({
        x: (this.layout.length * 3) % 12,
        y: this.layout.length + 12,
        w: 3,
        h: 3,
        i: `aw-layout-item-${uuidv4()}`,
        fields: []
      });
      this.$emit('layout-updated', items);
    },

    // remove item from the grid
    removeItemFromGrid(index) {
      const items = Object.assign([], this.layout);

      // check for existing fields
      if (items[index] && items[index].fields && items[index].fields.length) {
        this.$awNotify({ title: this.$t('AwesomeLayout.messages.emptyBlockBeforeDelete'), type: 'warning' });
        return;
      }
      items.splice(index, 1);
      this.$emit('layout-updated', items);
    }
  },
  computed: {
    isDraggable() {
      return this.editMode;
    },
    isResizable() {
      return this.editMode;
    }
  },

  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components.draggable) {
      /* eslint-disable-next-line */
      console.error('`Draggable` is missing. Please download vuedraggable and register the component globally!');
    }
    if (!this.$root.$options.components.GridLayout) {
      /* eslint-disable-next-line */
      console.error('`GridLayout` is missing. Please download vue-grid-layout and register the component globally!');
    }
    if (!this.$root.$options.components.GridItem) {
      /* eslint-disable-next-line */
      console.error('`GridItem` is missing. Please download vue-grid-layout and register the component globally!');
    }
  },

  mounted() {
    //
  },

  watch: {
    //
  }
};
</script>

<style lang="scss" scoped>
.awesome-layout {
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  .vue-grid-layout {
    width: 100%;
  }

  .awesome-layout-list {
    height: 100%;
  }
  .draggable-header {
    height: 30px;
    width: 100%;
    background-color: #0a6ebd;
    color: white;
    padding: 2px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .legend {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      height: inherit;
      overflow: hidden;
      width: 100%;
      margin-right: 10px;
      input {
        color: white !important;
        margin-bottom: 8px;
      }
      p {
        margin-bottom: 0;
        width: 100%;
        height: inherit;
      }
    }
  }

  .moving-card {
    opacity: 0.4;
    height: auto;
    background: #f7fafc;
    border: 1px solid #4299e1;
  }

  .draggable-list {
    min-height: 140px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
  }

  .draggable-item {
    cursor: grab;
    height: 80px;
  }

  .item {
    .card {
      margin: 0;
    }

    .item-draggable {
      height: 100%;
    }
  }

  .awesome-layout-actions {
    background-color: white;
    height: 80vh;
    position: relative;
    width: 200px;
    border-radius: 10px;
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    padding: 15px;
    .draggable-list {
      overflow: auto;
    }
    .card {
      margin: 10px 0;
    }
  }
  .vue-form-generator {
    width: 100%;
  }
}
</style>
