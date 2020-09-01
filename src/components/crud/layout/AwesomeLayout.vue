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
      <grid-item class="item" v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i"
                 :maxW="12"
                 :minH="2"
                 dragIgnoreFrom="a, button, .form-element, .draggable-item"
      >
        <div :class="editMode ? 'card card-primary p-0': 'p-0'">
          <div v-if="item.legend || editMode" class="draggable-header bg-primary">
            <i class="fa fa-arrows" v-if="editMode"></i>
            {{item.legend}}
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
                  <div :class="editMode ? 'card-body': ''">
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
                    {{field}}
                  </slot>
                </div>
              </AwesomeLayout>
            </div>
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';
  import Draggable from 'vuedraggable';

  export default {
    name: "AwesomeLayout",
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      Draggable
    },
    mixins: [],
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
    }),
    methods: {
      onLayoutUpdated(items) {
        this.$emit('layout-updated', items);
      },

      fieldChanged(items) {
        this.$emit('layout-fields-updated', items);
      }
    },
    computed: {
      isDraggable() {
        return this.editMode;
      },
      isResizable() {
        return this.editMode
      },
    },

    mounted() {
      //
    },

    watch: {
      //
    }
  }
</script>

<style lang="scss" scoped>
  .awesome-layout {
    width: 100%;

    .draggable-header {
      height: 30px;
      width: 100%;
      background-color: #0a6ebd;
      color: white;
      padding: 2px 10px;
    }

    .moving-card {
      opacity: 0.4;
      background: #F7FAFC;
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
  }
</style>