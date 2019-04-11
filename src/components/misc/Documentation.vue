<template>
  <div class="content">
    <div class="container-fluid">
      <h1>Documentation</h1>

      <div>
        <h2>{{ msg }}</h2>
      </div>

      <ul class="list-group">
        <li class="list-group-item active">Components</li>
        <li class="list-group-item" v-for="(component, index) in components" :key="index">
          <a :href="'#' + component.name">{{ component.name }}</a>
        </li>
      </ul>
      <hr/>
      <div class="row">
        <div class="col-md-12">
          <card v-for="(component, index) in components" :key="index">
            <div :id="component.name">
              <prop-doc :component="component"></prop-doc>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableAndChartsCard from "@/components/card/TableAndChartsCard.vue";
import AjaxTable from "@/components/table/AjaxTable.vue";

import Card from "@/components/card/Card.vue";
import Stats from "@/components/misc/Stats.vue";
import ChartCard from "@/components/card/ChartCard.vue";
import StatsCard from "@/components/card/StatsCard.vue";

import CrudComponent from "@/components/crud/CrudComponent.vue";
import PropDoc from "@/components/misc/PropDoc.vue";

export default {
  components: {
    PropDoc,
    Card,
  },

  data() {
    return {
      components: [
        CrudComponent,
        AjaxTable,
        TableAndChartsCard,
        Stats,
        ChartCard,
        StatsCard
      ]
      // components: [CrudComponent, AjaxTable, Card, Stats, ChartCard, StatsCard, TableAndChartsCard,]
    };
  }
};
</script>
<style lang="scss">
.props {
  .proprow:nth-child(even) {
    background-color: transparentize(#2b3b43, 0.9);
  }
  .proprow {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1.6rem 0.8rem;
  }
  .labels {
    padding: 0.8rem;
    background: #555;
    > .propcol {
      font-size: 1rem;
      font-weight: 400;
      text-transform: uppercase;
      color: #fff;
    }
    .name span {
      margin-left: 0.4rem;
    }
  }
  .propcol {
    font-size: 1.2rem;
    flex: 1;
    &.notes {
      flex: 2;
    }
  }
  .name {
    font-weight: 600;
    &.required span {
      border-bottom: 0.2rem solid transparentize(#ce7780, 0.5);
    }
  }
}
.propcol * {
  display: inline;
}
.propdoc {
  margin-bottom: 12rem;
}
code {
  background-color: transparentize(#f3c387, 0.5);
  color: #14435a;
  padding: 0.2rem;
}
pre code {
  line-height: 1.8;
  padding: 1.2rem;
  background-color: transparent;
  &.labelled,
  .token & {
    position: relative;
    margin-bottom: 2rem;
    &:after {
      content: attr(data-lang);
      font-size: 0.8rem;
      color: #ce7780;
      font-weight: 600;
      position: absolute;
      right: 1.2rem;
      bottom: -2rem;
    }
  }
}
.use,
.props {
  margin: 2.8rem 0;
}
.token pre {
  margin: 0;
  padding: 5px;
  background: #333;
  color: white;
  * {
    color: white;
  }
}
.use {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2.8rem;
}
</style>
