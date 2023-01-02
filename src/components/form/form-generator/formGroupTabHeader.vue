<template>
  <div class="aw-form-group-tab-header col-12" :class="`tabs-position-${position}`">
    <ul
      class="nav nav-fill"
      :class="'nav-' + tabsNavType + ' nav-' + tabsDirection"
      v-if="!autoHideTab || tabs.length > 1"
    >
      <li class="aw-form-group-tab nav-item" v-for="(tab, index) in tabs" :key="index">
        <a
          v-if="!tab.hidden"
          class="nav-link show"
          :class="{
            active: activeTab === tab.id,
            disabled: tab.disabled
          }"
          :id="'awesome-tab-' + tab.id + index"
          :data-target="'awesome-panel-' + tab.id + index"
          @click.prevent="changeTab(tab.id || index)"
          >{{ $te(tab.title) ? $t(tab.title) : tab.title || tab.id }}</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'form-group-tab-header',
  mixins: [],
  model: {
    prop: 'activeTab',
    event: 'input'
  },
  props: {
    // tabs: { type: Array, default: () => [] },
    autoHideTab: { type: Boolean, default: true },
    tabsNavType: { type: String, default: 'tabs' },
    position: {
      type: String,
      values: ['top', 'inline'],
      validator(value) {
        return ['top', 'inline'].indexOf(value) !== -1;
      }
    },
    tabsDirection: { type: String, default: 'horizontal' },

    activeTab: {},
    tabs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    if (this.tabs && this.tabs.length && this.tabs[0].id && !this.activeTab) {
      this.changeTab(this.tabs[0].id);
    }
  },
  watch: {},
  computed: {},
  methods: {
    changeTab(id) {
      this.$emit('input', id);
    }
  },
  created() {}
};
</script>
<style></style>
