<template>
  <div
    class="card-table-and-chart"
    :class="{'card-stats-fullscreen': fullscreen, [className]: className}"
  >
    <EnyoAjaxTable
      v-if="currentState === 'table'"
      :title="title"
      :columns="tableColumns"
      :rows="dataSource"
      :table-needs-refresh="needsRefresh || internalRefreshRequested"
      :options="tableOptions"
    >
      <template slot="table-top-actions">
        <button
          type="button"
          class="btn btn-simple btn-primary"
          @click="setTab('bar')"
        >
          Barres
        </button>
        <button
          type="button"
          class="btn btn-simple btn-primary"
          @click="setTab('line')"
        >
          Graphe
        </button>
        <button
          type="button"
          class="btn btn-simple btn-primary"
          @click="setTab('pie')"
        >
          Camembert
        </button>
        <button
          type="button"
          class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
          @click="toggleFullscreen()"
        >
          <i
            v-if="fullscreen"
            class="fa fa-times"
          />
          <i
            v-if="!fullscreen"
            class="fa fa-search-plus"
          />
        </button>
      </template>
      <!-- END OF ARRAY -->
    </EnyoAjaxTable>
    <enyo-chart-card
      v-if="currentState === 'bar'"
      chart-type="Bar"
      :chart-data="{labels: selectProp(dataSource, chartColKey), series: [selectProp(dataSource, chartRowKey)]}"
      :header-classes="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('table')"
            >
              Liste
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('line')"
            >
              Graphe
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('pie')"
            >
              Camembert
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
              @click="toggleFullscreen()"
            >
              <i
                v-if="fullscreen"
                class="fa fa-times"
              />
              <i
                v-if="!fullscreen"
                class="fa fa-search-plus"
              />
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
    <enyo-chart-card
      v-if="currentState === 'line'"
      chart-type="Line"
      :chart-data="{labels: selectProp(dataSource, chartColKey),
                    series: [selectProp(dataSource, chartRowKey)]}"
      :header-classes="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('table')"
            >
              Liste
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('bar')"
            >
              Barres
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('pie')"
            >
              Camembert
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
              @click="toggleFullscreen()"
            >
              <i
                v-if="fullscreen"
                class="fa fa-times"
              />
              <i
                v-if="!fullscreen"
                class="fa fa-search-plus"
              />
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
    <enyo-chart-card
      v-if="currentState === 'pie'"
      chart-type="Pie"
      :chart-data="{labels: selectProp(dataSource, chartColKey),
                    series: [selectProp(dataSource, chartRowKey)]}"
      :responsive-options="pieResponsiveOptions"
      :header-classes="'ajax-table-header '+ (chartOptions.headerStyle ? 'colored-header bg-' + chartOptions.headerStyle : '')"
    >
      <template slot="header">
        <h4 class="mt-0 mb-0">
          {{ title }}
          <div class="btn-group btn-group-sm float-right">
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('table')"
            >
              Liste
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('bar')"
            >
              Barres
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary"
              @click="setTab('line')"
            >
              Graphe
            </button>
            <button
              type="button"
              class="btn btn-simple btn-primary card-stats-fullscreen-button pr-0"
              @click="toggleFullscreen()"
            >
              <i
                v-if="fullscreen"
                class="fa fa-times"
              />
              <i
                v-if="!fullscreen"
                class="fa fa-search-plus"
              />
            </button>
          </div>
        </h4>
      </template>
    </enyo-chart-card>
  </div>
</template>
<script>
import EnyoChartCard from "./EnyoChartCard.vue";
import EnyoAjaxTable from "../table/EnyoAjaxTable.vue";
import _ from "lodash";

export default {
  name: "TableAndChartsCard",
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
  components: {
    EnyoChartCard,
    EnyoAjaxTable,
  },
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
