<template>
  <div :class="computedCols + ' ' + styleClasses" :style="styles">
    <slot name="header">
      <ul class="nav" :class="'nav-' + navType + tabsDirection" v-if="!autoHideTab || tabs.length > 1">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <a
            v-if="!tab.hidden"
            class="nav-link show"
            :class="{
              active: activeTabIndex === index,
              disabled: tab.disabled
            }"
            :id="'awesome-tab-' + fieldId + index"
            :data-target="'awesome-panel-' + fieldId + index"
            @click.prevent="changeTab(index)"
            >{{ $t(tab.legend) }}</a
          >
        </li>
      </ul>
    </slot>
    <slot>
      <div class="tab-content" :class="tabs && tabs.length > 1 ? 'pl-3 pr-3 pb-3' : ''">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="home-tab"
          :id="'awesome-panel-' + fieldId + index"
          :class="{
            'show active': activeTabIndex === index,
            disabled: tab.disabled
          }"
        >
          <slot name="content" v-bind:activeTabIndex="activeTabIndex" v-bind:tab="tab"></slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import layoutMixin from "../../../mixins/layoutMixin";
import i18nMixin from "../../../mixins/i18nMixin";
import { uniqueId } from "lodash";

export default {
  mixins: [i18nMixin, layoutMixin],
  props: {
    // activeTabIndex: {type: Number, default: 0}
    tabs: { type: Array, default: () => [] },
    autoHideTab: { type: Boolean, default: true },
    navType: { type: String, default: "tabs" },
    direction: { type: String, default: "horizontal" },
    id: { type: String, default: "" }
  },
  computed: {
    tabsDirection() {
      return this.direction === "vertical" ? " flex-column " : "";
    }
  },
  data() {
    return {
      activeTabIndex: 0,
      fieldId: uniqueId(this.id + "_")
    };
  },
  methods: {
    changeTab(id) {
      this.activeTabIndex = id;
    }
  }
};
</script>

<style lang="scss"></style>
