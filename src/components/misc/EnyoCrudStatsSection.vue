<template>
  <div class="col-12">
    <div class="row">
      <template v-for="(stat, index) in stats" >
        <div class="filter-box col-md-3 cl-xs-6" :key="stat.label">
          <div class="card card-statistics"
          :class="getColor(index)"
          >
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
    </template>
  </div>
</div>
</template>
<script>
import _ from "lodash";
export default {
  name: "EnyoCrudStatsSection",
  components: {},
  props: {
    url: {type: String, default: ''},
    entity: {type: String, default: ''},
    statsNeedsRefresh: {
      type: Boolean,
      default: false
    },
    store: {type: Array, default: ()=> []}
  },
  data() {
    return {
      colors: ['card-black', 'card-purple', 'card-teal', 'card-blue', 'card-success', 'card-warning', 'card-info', 'card-primary',  'card-danger'
      ],
      stats: []
    };
  },
  watch: {
    statsNeedsRefresh: "getStats",
    url: "getStats",
    entity: "getStats"
  },
  created() {
  },
  mounted() {
    this.getStats();
  },
  beforeDestroy() {
  },
  methods: {
    getStats: _.debounce(
      function() {
        this.$http
        .get(this.url, {})
        .then(res => {
          if (res && res.data && res.data.body) {
            if (!Array.isArray(res.data.body)) {
              this.stats = Object.keys(res.data.body).forEach(label => {
                return {
                  label, value: res.data.body[label]
                };
              })
            }
            else {
               this.stats = res.data.body;
            }
          }
        })
        .catch(err => {
            // eslint-disable-next-line
            console.error(err);
          });
        this.refreshCompleted();
      },
      100,
      this
      ),

    refreshCompleted() {
      this.$emit("update:statsNeedsRefresh", false);
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
<style>
</style>
