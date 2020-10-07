<template>
  <div
    class="card"
    :class="chartClasses"
  >
    <div
      v-if="$slots.header"
      class="card-header"
      :class="headerClasses"
    >
      <slot name="header" />
    </div>
    <div class="card-body">
      <div
        :id="chartId"
        class="ct-chart"
      />
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
<script>

export default {
  name: 'EnyoChartCard',
  components: {
  },
  props: {
    classes: String,
    headerClasses: String,
    chartType: {
      type: String,
      default: 'Line' // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    chartData: {
      type: Object,
      default: () => ({
        labels: [],
        series: []
      })
    },
    responsiveOptions: [Object, Array],
    graphNeedsRefresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chartId: 'no-id',
      $Chartist: null,
      chart: null,
      animationsClasses: ''
    };
  },
  computed: {
    chartClasses() {
      return `${this.class || ''} ${this.animationsClasses} `;
    }
  },
  watch: {
    graphNeedsRefresh: 'initChart',
    chartData: 'initChart',
    chartOptions: 'initChart'
  },
  async mounted() {
    this.updateChartId();
    // we need dynamic import because of SSR
    this.$Chartist = await import('chartist');
    setTimeout(() => {
      this.initChart();
    }, 100);
  },
  methods: {
    /** *
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart() {
      const chartIdQuery = `#${this.chartId}`;
      let chartData = {};
      let barChartOptions = {};
      let lineChartOptions = {};
      if (!this.$Chartist) {
        return;
      }
      switch (this.chartType) {
        case 'Pie':
          chartData = {
            series: this.chartData.series[0],
            labels: this.chartData.labels
          };

          barChartOptions = {
            ...this.chartOptions,
            labelInterpolationFnc(value, index) {
              return `${value} (${Math.round(
                (chartData.series[index] /
                  chartData.series.reduce((a, b) => a + b)) *
                  100
              )}%)`;
            }
          };
          this.chart = this.$Chartist[this.chartType](
            chartIdQuery,
            chartData,
            barChartOptions,
            this.responsiveOptions
          );

          break;
        case 'Line':
          lineChartOptions = {
            ...this.chartOptions,
            plugins: [
              this.$Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
              })
            ]
          };
          this.chart = this.$Chartist[this.chartType](
            chartIdQuery,
            this.chartData,
            lineChartOptions,
            this.responsiveOptions
          );
          break;
        case 'Bar':
          this.chart = this.$Chartist[this.chartType](
            chartIdQuery,
            this.chartData,
            this.chartOptions,
            this.responsiveOptions
          );
          break;
      }

      this.$emit('initialized', this.chart);
      this.$emit('update:graphNeedsRefresh', false);
      if (window.matchMedia) {
        const mediaQueryList = window.matchMedia('print');
        // console.log("media type", mediaQueryList);
        if (mediaQueryList.matches) {
          return;
        }
      }
      if (this.chartType === 'Line') {
        this.animateLineChart();
      }
      if (this.chartType === 'Bar') {
        this.animateBarChart();
      }
      if (this.chartType === 'Pie') {
        this.animatePieChart();
      }
    },
    /** *
     * Assigns a random id to the chart
     */
    updateChartId() {
      const currentTime = new Date().getTime().toString();
      const randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    animateLineChart() {
      let seq = 0;
      const durations = 500;
      const delays = 80;
      this.chart.on('draw', data => {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: this.$Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      });
      seq = 0;
    },
    animateBarChart() {
      let seq = 0;
      const durations = 500;
      const delays = 80;
      this.chart.on('draw', data => {
        if (data.type === 'bar') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      });
    },

    animatePieChart() {
      // console.log("ANIMATING pie chart");
      let seq = 0;
      const durations = 150;
      const delays = 80;
      // this.animationsClasses = 'fade';
      this.chart.on('draw', data => {
        if (data.type === 'slice') {
          seq++;
          data.element.animate({
            opacity: {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
        }
      });
    }
  }
};
</script>
<style>
</style>
