<template>
  <div class="col-12">
    <div class="row">
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-success card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">{{ stats.total }}</h3>
            <h6 class="text-white">{{ $t('stats.total') }}</h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-warning card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">{{ stats.today }}</h3>
            <h6 class="text-white">{{ $t('stats.today') }}</h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-info card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">{{ stats.week }}</h3>
            <h6 class="text-white">{{ $t('stats.this_week') }}</h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-primary card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">{{ stats.month }}</h3>
            <h6 class="text-white">{{ $t('stats.this_month') }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'stats',
  components: {
  },
  props: {
    url: String,
    entity: String,
    statsNeedsRefresh: {
      type: Boolean,
      default: false
    },
    store: Array,
  },
  data() {
    return {
      stats: {
        week: 0,
        month: 0,
        today: 0,
        total: 0
      }
    };
  },
  created() {
    // EventBus.$on(this.entity + ':created', this.getItems.bind(this))
    // EventBus.$on(this.entity + ':updated', this.getItems.bind(this))
  },
  mounted() {
    this.getStats();
  },
  beforeDestroy() {
    // EventBus.$off(this.entity + ':created', this.getItems.bind(this))
    // EventBus.$off(this.entity + ':updated', this.getItems.bind(this))
  },
  watch: {
    statsNeedsRefresh: 'getStats',
    url: 'getStats',
    entity: 'getStats',
  },
  methods: {
    getStats: _.debounce(function () {
      this.$http
        .get(this.url, {})
        .then(res => {
          if (res && res.data && res.data.body) {
            this.stats = res.data.body;
          }
        })
        .catch(err => console.error(err));
      this.refreshCompleted();
    }, 100, this),

    refreshCompleted() {
      this.$emit('update:statsNeedsRefresh', false);
      // this.$emit('afterRefresh')
    }
  }
};
</script>
<style>
</style>
