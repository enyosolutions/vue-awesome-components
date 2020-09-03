<template>
  <div class="awesome-layout">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
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
        :minH="2"
        dragIgnoreFrom="a, button, .form-element, .draggable-item"
      >
        <div :class="editMode ? 'card card-primary p-0' : 'p-0'">
          <div v-if="item.legend || editMode" class="draggable-header bg-primary">
            <i class="fa fa-arrows" v-if="editMode"></i>
            {{ item.legend }}
            <a class="pull-right" @click="removeItemFromGrid(index)">
              <i class="fa fa-trash" v-if="editMode"></i>
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
              <div v-for="(field, index) in item.fields" :key="index">
                <div :class="editMode ? 'draggable-item card' : ''">
                  <div :class="editMode ? 'card-body p-2' : ''">
                    <slot name="field" :field="field">
                      {{ field }}
                    </slot>
                  </div>
                </div>
              </div>
            </Draggable>
            <div v-if="item.layout">
              <AwesomeLayout
                :edit-mode="editMode"
                :layout.sync="item.layout"
                @layout-updated="onLayoutUpdated"
                @change="fieldChanged"
              >
                <div slot="field" slot-scope="{ field }">
                  <slot name="field" :fields="field" v-if="field">
                    {{ field }}
                  </slot>
                </div>
              </AwesomeLayout>
            </div>
          </div>
        </div>
      </grid-item>
    </grid-layout>
    <button v-if="editMode" type="button" class="btn btn-primary btn-add-item " @click="addItemToGrid()">
      <i class="fa fa-plus"></i>
    </button>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import Draggable from "vuedraggable";
import i18nMixin from "../../../mixins/i18nMixin";
import notificationsMixin from "../../../mixins/notificationsMixin";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "AwesomeLayout",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Draggable
  },
  mixins: [i18nMixin, notificationsMixin],
  props: {
    layout: {
      type: Array,
      required: true
    },
    editMode: {
      type: Boolean,
      required: true
    },
    legend: {
      type: String,
      required: false
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
      this.$emit("layout-updated", items);
    },

    fieldChanged(items) {
      this.$emit("layout-fields-updated", items);
    },

    // Add a new item to the grid
    addItemToGrid() {
      const items = Object.assign([], this.layout);
      items.push({ ...this.newBlock, i: `aw-layout-item-${uuidv4()}` });

      this.$emit("layout-updated", items);
    },

    // remove item from the grid
    removeItemFromGrid(index) {
      const items = Object.assign([], this.layout);

      // check for existing fields
      if (items[index] && items[index].fields && items[index].fields.length) {
        this.$notify({ title: this.$t("AwesomeLayout.messages.emptyBlockBeforeDelete"), type: "warning" });
        return;
      }
      items.splice(index, 1);
      this.$emit("layout-updated", items);
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

  .draggable-header {
    height: 30px;
    width: 100%;
    background-color: #0a6ebd;
    color: white;
    padding: 2px 10px;
  }

  .moving-card {
    opacity: 0.4;
    background: #f7fafc;
    border: 1px solid #4299e1;
  }

  .draggable-list {
    min-height: 140px;
  }

  .draggable-item {
    cursor: grab;
  }

  .item {
    .card {
      margin: 0;
      height: inherit;
    }

    .item-draggable {
      padding: 0 10px;
    }
  }
  .btn-add-item {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
