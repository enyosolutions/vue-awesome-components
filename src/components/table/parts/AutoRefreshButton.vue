<template>
  <div :class="'automatic-refresh-button ' + (autoRefresh ? ' active' : '')">
    <button type="button" class="btn btn-simple btn-icon btn-sm p-2" @click.prevent="onRefresh">
      <i :class="'fa fa-refresh' + (value ? ' fa-spin' : '')" />
    </button>
    <span class="refresh-text">{{ $t('AwesomeTable.automatique-refresh') }}</span>
    <label class="switch">
      <input type="checkbox" v-model="autoRefreshEnabled" />
      <span class="slider round"></span>
    </label>
  </div>
</template>
<script>
export default {
  name: 'AutoRefreshButton',
  components: {},
  mixins: [],
  emits: ['input', 'refresh'],
  props: {
    value: { default: '' },
    autoRefresh: { type: [Boolean] },
    autoRefreshInterval: { type: [Number], default: 30 }
  },
  computed: {},
  watch: {
    autoRefresh(newValue) {
      if (newValue !== undefined) {
        this.autoRefreshEnabled = newValue;
      }
    },
    autoRefreshEnabled(newValue, oldValue) {
      if (newValue) {
        this.startAutoRefresh();
      } else {
        this.stopRefresh();
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.autoRefreshEnabled = this.autoRefresh;
  },
  beforeDestroy() {
    this.stopAutoRefresh();
  },
  data() {
    return {
      autoRefreshEnabled: false,
      autoRefreshHandle: null,
      numberOfRefreshCalls: 0
    };
  },
  methods: {
    onRefresh() {
      this.$emit('refresh');
      this.$emit('input', true);
    },

    startAutoRefresh() {
      this.numberOfRefreshCalls = 0;
      if (this.autoRefreshHandle) {
        clearInterval(this.autoRefreshHandle);
      }
      this.autoRefreshHandle = setInterval(() => {
        if (this.numberOfRefreshCalls > 300) {
          this.$awNotify({
            title: 'too much calls. Refresh to start over',
            type: 'warning'
          });
          clearInterval(this.autoRefreshHandle);
          this.autoRefreshHandle = null;
          return;
        }
        if (!document.hasFocus()) {
          return;
        }

        this.numberOfRefreshCalls += 1;
        this.onRefresh();
      }, this.autoRefreshInterval * 1000);
    },
    stopAutoRefresh() {
      this.numberOfRefreshCalls = 0;
      clearInterval(this.autoRefreshHandle);
    }
  }
};
</script>
<style lang="scss"></style>
