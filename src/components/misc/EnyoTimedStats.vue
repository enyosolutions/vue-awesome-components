<template>
  <div class="col-12">
    <div class="row">
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-success card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">
              {{ stats.total }}
            </h3>
            <h6 class="text-white">
              {{ $t('stats.total') }}
            </h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-warning card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">
              {{ stats.today }}
            </h3>
            <h6 class="text-white">
              {{ $t('stats.today') }}
            </h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-info card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">
              {{ stats.week }}
            </h3>
            <h6 class="text-white">
              {{ $t('stats.this_week') }}
            </h6>
          </div>
        </div>
      </div>
      <div class="filter-box col-md-3 cl-xs-6">
        <div class="card card-primary card-statistics">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">
              {{ stats.month }}
            </h3>
            <h6 class="text-white">
              {{ $t('stats.this_month') }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from 'lodash';

export default {
  name: 'EnyoTimedStats',
  components: {},
  props: {
    url: { type: String, default: '' },
    entity: { type: String, default: '' },
    statsNeedsRefresh: {
      type: Boolean,
      default: false
    },
    store: { type: Array, default: () => [] }
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
  watch: {
    statsNeedsRefresh: 'getStats',
    url: 'getStats',
    entity: 'getStats'
  },
  created() {},
  mounted() {
    this.getStats();
  },
  beforeDestroy() {},
  methods: {
    getStats: debounce(
      function () {
        this.$awApi
          .get(this.url, {})
          .then((res) => {
            if (res && res.data && res.data.body) {
              this.stats = res.data.body;
            }
          })
          .catch((err) => {
            // eslint-disable-next-line
            console.error(err);
          });
        this.refreshCompleted();
      },
      100,
      this
    ),

    refreshCompleted() {
      this.$emit('update:statsNeedsRefresh', false);
      // this.$emit('afterRefresh')
    }
  }
};
</script>
<style scoped>
.card-statistics {
  margin-bottom: 1px;
}
</style>
