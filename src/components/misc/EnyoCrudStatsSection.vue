<template>
  <div class="col-12">
    <div class="row">
      <div v-for="(stat, index) in stats" class="filter-box col-md-3 cl-xs-6" :key="stat.label">
        <div class="card card-statistics" :class="stat.color || getColor(index)">
          <div class="box text-center">
            <h3 class="font-light text-white mt-1">
              {{ stat.value }}
            </h3>
            <h6 class="text-white">
              {{ $t(stat.label) }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awEmitMixin from '../../mixins/awEmitMixin';

export default {
  name: 'EnyoCrudStatsSection',
  mixins: [apiConfigMixin, awEmitMixin],
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
      colors: [
        'card-black',
        'card-purple',
        'card-teal',
        'card-blue',
        'card-success',
        'card-warning',
        'card-info',
        'card-primary',
        'card-danger'
      ],
      stats: []
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
    getStats: _.debounce(
      function() {
        this.$awApi
          .get(this.url, {})
          .then((res) => {
            if (res && res.data) {
              const data =
                this.apiResponseConfig && this.apiResponseConfig.dataPath
                  ? _.get(res, this.apiResponseConfig.dataPath)
                  : res.data;
              this.stats = data;
              if (!Array.isArray(data)) {
                this.stats = Object.entries(data).map(([label, content]) => {
                  return {
                    label,
                    value: content.value || content,
                    color: content.color,
                    index: content.index
                  };
                });
              }
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
    },

    getColor(index) {
      const colorLength = this.colors.length;
      if (this.stats[index] && this.stats[index].class) {
        return this.stats[index].class;
      }
      return this.colors[index >= colorLength ? index % colorLength : index];
    }
  }
};
</script>
<style scoped>
.card-statistics {
  margin-bottom: 1px;
}
</style>
