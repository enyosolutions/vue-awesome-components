<template>
  <fieldset :is="tag" :class="[groupRowClasses, validationClass]" ref="group">
    <template v-if="fields && groupIsVisible">
      <slot
        name="group-legend"
        :group="group"
        :group-legend="groupLegend"
        :toggleCollapse="toggleCollapse"
        class="pl-2"
      ></slot>
      <button
        v-if="group && group.collapsible"
        class="btn text-info"
        type="button"
        style="position: absolute; right: 0"
        @click="toggleCollapse"
      >
        {{ collapsed ? '[+]' : '[-]' }}
      </button>
      <slot name="group-help" :group="group"></slot>
      <div
        class="row m-0 "
        style="flex:1"
        :class="{ 'vac-collapsible': group && group.collapsible, collapsed: collapsed }"
      >
        <template v-if="!isTabsMixedWithFields">
          <slot name="tabs-header">
            <form-group-tab-header
              :tabsNavType="tabs[0] && tabs[0].tabsNavType"
              :tabsDirection="tabs[0] && tabs[0].tabsDirection"
              :classes="group.classes"
              :tabClasses="group.tabClasses"
              :tabs="tabs"
              position="top"
              v-model="activeTabIndex"
            />
          </slot>
        </template>
        <template v-for="(field, index) in fields">
          <template v-if="fieldVisible(field)">
            <template v-if="field.type === 'group' || field.type === 'tab'">
              <template v-if="isTabsMixedWithFields">
                <slot name="tabs-header">
                  <form-group-tab-header
                    v-if="tabs.length && field.id === tabs[0].id"
                    :tabsNavType="tabs[0].tabsNavType"
                    :tabsDirection="tabs[0].tabsDirection"
                    :classes="group.classes"
                    :tabClasses="group.tabClasses"
                    :tabs="tabs"
                    position="inline"
                    v-model="activeTabIndex"
                    key="tab-header"
                  />
                </slot>
              </template>
              <div
                :class="{
                  [`col-${field.cols}`]: field.cols,
                  'tab-content': field.type === 'tab',
                  [`tab-content-${field.id}`]: field.type === 'tab',
                  'group-content': field.type === 'group',
                  [`group-content-${field.id}`]: field.type === 'group'
                }"
                :key="index"
                v-if="canDisplayGroup(field, index)"
              >
                <div class="wrapper" :class="field.wrapperClasses">
                  <form-group
                    :fields="field.fields"
                    :group="field"
                    :tag="getGroupTag(field)"
                    :model="model"
                    :options="options"
                    :errors="errors"
                    :event-bus="eventBus"
                  >
                    <template slot="group-legend" slot-scope="slotProps">
                      <slot
                        v-if="field.type === 'group'"
                        name="group-legend"
                        :group="slotProps.group"
                        :group-legend="slotProps.groupLegend"
                      ></slot>
                    </template>
                    <template slot="group-help" slot-scope="slotProps">
                      <slot name="group-help" :group="slotProps.group"></slot>
                    </template>

                    <template slot="element" slot-scope="slotProps">
                      <slot
                        name="element"
                        :field="slotProps.field"
                        :model="slotProps.model"
                        :options="slotProps.options"
                        :errors="slotProps.errors"
                        :eventBus="slotProps.eventBus"
                      ></slot>
                    </template>
                  </form-group>
                </div>
              </div>
            </template>
            <template v-else>
              <slot
                name="element"
                :field="field"
                :model="model"
                :options="options"
                :errors="errors"
                :eventBus="eventBus"
              ></slot>
            </template>
          </template>
        </template>
      </div>
    </template>
  </fieldset>
</template>
<script>
import formMixin from './formMixin.js';
import formGroupTabHeader from './formGroupTabHeader.vue';
import { get as objGet, isFunction, isNil } from 'lodash';

export default {
  name: 'form-group',
  mixins: [formMixin],
  components: {
    formGroupTabHeader
  },
  props: {
    // tabs: { type: Array, default: () => [] },
    fields: {
      type: Array,
      default() {
        return [];
      }
    },
    group: {
      type: Object,
      default() {
        return {};
      }
    },
    tag: {
      type: String,
      default: 'fieldset',
      validator(value) {
        return value.length > 0;
      }
    },

    model: {
      type: Object,
      default() {
        return {};
      }
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    errors: {
      type: Array,
      default() {
        return [];
      }
    },
    eventBus: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      validationClass: {},
      collapsed: false,
      activeTabIndex: 0
    };
  },
  mounted() {
    if (this.group && this.group.collapsible) {
      this.collapsed = this.group.collapsed;
    }
    if (this.tabs && this.tabs.length && this.tabs[0].id) {
      this.activeTabIndex = this.tabs[0].id;
    }
  },
  watch: {},
  computed: {
    groupLegend() {
      if (this.group && this.group.legend) {
        return this.group.legend;
      }
      return '';
    },

    groupRowClasses() {
      // TODO find a way to detect errors in child to add some classes (error/valid/etc)
      let baseClasses = {
        'field-group': true
      };
      if (!isNil(this.group)) {
        baseClasses = this.getStyleClasses(this.group, baseClasses);
      }
      return baseClasses;
    },

    groupIsVisible() {
      if (this.group && this.group.visible && isFunction(this.group.visible)) {
        return this.group.visible.call(this, this.model, this.group, this);
      }

      if (isNil(this.group.visible)) {
        return true;
      }

      return this.group.visible;
    },

    tabs() {
      if (this.fields && Array.isArray(this.fields)) {
        return this.fields.filter((field) => field.type === 'tab');
      }
      return [];
    },

    reorderedFields() {
      if (!this.tabs.length) {
        return this.fields;
      }
      return this.fields.filter((field) => field.type !== 'tab').concat(this.tabs);
    },

    isTabsMixedWithFields() {
      return this.tabs && this.fields && this.tabs.length !== this.fields.length;
    }
  },
  methods: {
    // Get visible prop of field
    fieldVisible(field) {
      if (isFunction(field.visible)) {
        return field.visible.call(this, this.model, field, this);
      }

      if (isNil(field.visible)) {
        return true;
      }

      return field.visible;
    },

    // Get visible prop of the group

    getGroupTag(field) {
      if (!isNil(field.tag)) {
        return field.tag;
      } else {
        return this.tag;
      }
    },

    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },

    changeTab(id) {
      this.activeTabIndex = id;
    },

    canDisplayGroup(field, index) {
      if (field.type === 'group') {
        return true;
      }
      if (field.type === 'tab') {
        return field.id === this.activeTabIndex;
      }
      return true;
    }
  },
  created() {
    this.eventBus.$on('field-validated', () => {
      this.$nextTick(() => {
        let containFieldWithError =
          this.$refs.group &&
          this.$refs.group.querySelector('.form-element.' + objGet(this.options, 'validationErrorClass', 'error')) !==
            null;
        this.validationClass = {
          [objGet(this.options, 'validationErrorClass', 'error')]: containFieldWithError,
          [objGet(this.options, 'validationSuccessClass', 'valid')]: !containFieldWithError
        };
      });
    });
  }
};
</script>
<style></style>
