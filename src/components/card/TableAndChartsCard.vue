<template>
  <div
    class="card-table-and-chart"
    :class="{'card-stats-fullscreen': fullscreen, [className]: className}"
  >
    <AjaxTable
      v-if="currentState === 'table'"
      :title="title"
      :columns="tableColumns"
      :rows="dataSource"
      :tableNeedsRefresh="needsRefresh || internalRefreshRequested"
      :options="tableOptions"
    >
      <template slot="table-top-actions">
        <button type="button" @click="setTab('bar')" class="btn btn-simple btn-primary">Barres</button>
        <button type="button" @click="setTab('line')" class="btn btn-simple btn-primary">Graphe</button>
        <button type="button" @click="setTab('pie')" class="btn btn-simple btn-primary">Camembert</button>
        <button
          type="button"
          @click="toggleFullscreen()"
          class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
        >
          <i v-if="fullscreen" class="fa fa-times"></i>
          <i v-if="!fullscreen" class="fa fa-search-plus"></i>
        </button>
      </template>
      <!-- END OF ARRAY -->
    </AjaxTable>
    <enyo-chart-card
      v-if="currentState === 'bar'"
      chartType="Bar"
      :chartData="{labels: selectProp(dataSource, chartColKey), series: [selectProp(dataSource, chartRowKey)]}"
      :headerClasses="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button type="button" @click="setTab('table')" class="btn btn-simple btn-primary">Liste</button>
            <button type="button" @click="setTab('line')" class="btn btn-simple btn-primary">Graphe</button>
            <button
              type="button"
              @click="setTab('pie')"
              class="btn btn-simple btn-primary"
            >Camembert</button>
            <button
              type="button"
              @click="toggleFullscreen()"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
            >
              <i v-if="fullscreen" class="fa fa-times"></i>
              <i v-if="!fullscreen" class="fa fa-search-plus"></i>
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
    <enyo-chart-card
      v-if="currentState === 'line'"
      chartType="Line"
      :chartData="{labels: selectProp(dataSource, chartColKey),
series: [selectProp(dataSource, chartRowKey)]}"
      :headerClasses="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button type="button" @click="setTab('table')" class="btn btn-simple btn-primary">Liste</button>
            <button type="button" @click="setTab('bar')" class="btn btn-simple btn-primary">Barres</button>
            <button
              type="button"
              @click="setTab('pie')"
              class="btn btn-simple btn-primary"
            >Camembert</button>
            <button
              type="button"
              @click="toggleFullscreen()"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
            >
              <i v-if="fullscreen" class="fa fa-times"></i>
              <i v-if="!fullscreen" class="fa fa-search-plus"></i>
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
    <enyo-chart-card
      v-if="currentState === 'pie'"
      chartType="Pie"
      :chartData="{labels: selectProp(dataSource, chartColKey),
    series: [selectProp(dataSource, chartRowKey)]}"
      :responsiveOptions="pieResponsiveOptions"
      :headerClasses="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button type="button" @click="setTab('table')" class="btn btn-simple btn-primary">Liste</button>
            <button type="button" @click="setTab('bar')" class="btn btn-simple btn-primary">Barres</button>
            <button type="button" @click="setTab('line')" class="btn btn-simple btn-primary">Graphe</button>
            <button
              type="button"
              @click="toggleFullscreen()"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
            >
              <i v-if="fullscreen" class="fa fa-times"></i>
              <i v-if="!fullscreen" class="fa fa-search-plus"></i>
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
  </div>
</template>
<script>
import EnyoChartCard from "./EnyoChartCard.vue";
import _ from "lodash";

export default {
  name: "table-and-charts-card",
  introduction: "A component that display graphs to go along an ajaxTable list",
  token: `
  <table-and-charts-card
  :title="'Visites par ' + $t('common.labels.' + activeTab)"
  :table-columns="[{field: activeTab, type:'date'}, {field:'value', label:'#'}]"
  :data-source="performanceStats.user_visit[activeTab].list"
  :needs-refresh.sync="tableNeedsRefresh"
  :table-options="{headerStyle: 'primary', actions:{noActions: true, filter: false, refresh: false} }"
  :chart-options="{headerStyle: 'primary' }"
  :chart-col-key="activeTab"

  ></table-and-charts-card>`,
  description: "",
  props: {
    tableColumns: { type: Array, required: true },
    title: String,
    initialState: { type: String, default: "table" },
    chartOptions: {
      type: Object,
      default() {
        return { headerStyle: "primary" };
      }
    },
    tableOptions: {
      type: Object,
      default() {
        return {
          headerStyle: "primary",
          actions: { noActions: true, filter: false }
        };
      }
    },
    chartRowKey: {
      type: String,
      default: () => "value"
    },
    chartColKey: {
      type: String,
      default: () => "date"
    },
    dataSource: { type: Array, required: true },
    className: String,
    needsRefresh: Boolean
  },
  components: {
    EnyoChartCard
  },
  data() {
    return {
      currentState: this.initialState, // table | bar | line | pie
      internalRefreshRequested: false,
      fullscreen: false,
      pieResponsiveOptions: [
        [
          "screen and (min-width: 640px)",
          {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: "explode"
          }
        ],
        [
          "screen and (min-width: 1024px)",
          {
            labelOffset: 80,
            chartPadding: 20
          }
        ]
      ]
    };
  },
  methods: {
    selectProp(objArray, prop) {
      return objArray.map(o => _.get(o, prop));
    },
    setTab(tab) {
      this.currentState = tab;
    },
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen;
      this.internalRefreshRequested = true;
      setTimeout(() => {
        this.internalRefreshRequested = false;
      }, 200);
    }
  }
};
</script>
<style lang='scss'>
.card-stats-fullscreen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;

  .card {
    height: 100%;

    .ct-chart {
      height: 80vh;
    }
  }

  .card-stats-fullscreen-button {
    position: fixed;
    right: 0px;
    top: 0px;
  }
}
</style>
