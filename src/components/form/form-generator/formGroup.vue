<template>
  <fieldset v-if="fields && groupIsVisible" :is="tag" :class="[groupRowClasses, validationClass]" ref="group">
    <slot name="group-legend" :group="group" :group-legend="groupLegend" class="pl-2"></slot>
    <slot name="group-help" :group="group"></slot>
    <div class="row m-0" style="flex:1">
      <template v-for="(field, index) in fields">
        <template v-if="fieldVisible(field)">
          <template v-if="field.type === 'group'">
            <div :class="field.cols ? `col-${field.cols}` : ''" :key="index">
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
                    <slot name="group-legend" :group="slotProps.group" :group-legend="slotProps.groupLegend"></slot>
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
  </fieldset>
</template>
<script>
import formMixin from './formMixin.js';
import { get as objGet, isFunction, isNil } from 'lodash';

export default {
  name: 'form-group',
  mixins: [formMixin],
  props: {
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
      validationClass: {}
    };
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
    }
  },
  created() {
    this.eventBus.$on('field-validated', () => {
      this.$nextTick(() => {
        let containFieldWithError =
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
