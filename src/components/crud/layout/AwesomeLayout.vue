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
        <div class="legend">
          <i class="fa fa-pencil" v-if="editMode"></i>
          <input v-if="editMode" class="form-control ml-2 aw-layout-legend-input" type="text" v-model="item.legend">
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
          <div v-for="(field, index) in item.fields" :key="index" class="col-12 pl-0 pr-0 mb-1 mt-1">
            <div :class="editMode ? 'draggable-item card' : ''">
              <div :class="editMode ? 'card-body p-2' : ''">
                <slot name="field" :field="field"></slot>
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
              {{ fields}}
            </slot>
          </template>
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
import _ from "lodash";
import {v4 as uuidv4} from "uuid";

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
      default: () => false
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
      const newBlock = _.cloneDeep(this.newBlock);
      items.push({...newBlock, i: `aw-layout-item-${uuidv4()}`});
      this.$emit("layout-updated", items);
    },

    // remove item from the grid
    removeItemFromGrid(index) {
      const items = Object.assign([], this.layout);

      // check for existing fields
      if (items[index] && items[index].fields && items[index].fields.length) {
        this.$notify({title: this.$t("AwesomeLayout.messages.emptyBlockBeforeDelete"), type: "warning"});
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
    background: #f7fafc;
    border: 1px solid #4299e1;
  }

  .draggable-list {
    min-height: 140px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
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

  .vue-form-generator {
    width: 100%;
  }

}
</style>
