<template>
  <div class="content">
    <div class="container-fluid">
      <h2>Documentation</h2>
      <ul class="list-group">
        <li class="list-group-item active bg-primary">Next Steps</li>
        <li class="list-group-item"> - implement nested schemas for crud</li>
        <li class="list-group-item"> - forward parameters to a crud component in order to force the value of some fields<br/> (Ex: when i create a product form a page when coming with a fixed providerCode i want to the providerCode to be auto set the value in the query.) </li>
        <li class="list-group-item"> - Make crud component work without a schema (eg. just with an url)</li>
        <li class="list-group-item"> - Make sure crud pages that does not have an edit/create/view action, do not have the route for doing so<br/>
          Ex: if on product i set <code>edit:false</code> then the route <code>/product/:id/edit</code> should not exist</li>
        <li class="list-group-item"> - Bring back client side form validation for <code>CrudComponent</code></li>
        <li class="list-group-item"> - remove dependency from bootstrap for <code>CrudComponent</code></li>
        <li class="list-group-item"> - remove dependency from some useless components (Ex: <code>Card</code>)</li>
      </ul>
<hr/>

      <ul class="list-group list-group-danger">
        <li class="list-group-item active bg-danger">Known bugs</li>
        <li class="list-group-item"> - Base64 component sometimes keeps displaying the last image that was feeded to it even on a create form</li>
        <li class="list-group-item"> - JsonTextarea field type does not take all the space available</li>
        <li class="list-group-item"> - CrudComponent mode remote needs testing</li>

      </ul>
<hr/>


      <ul class="list-group">
        <li class="list-group-item active">Components</li>
        <li class="list-group-item"
        v-for="(component, index) in components"
        :key="index"
        > <a :href="'#' + component.name">{{ component.name }}</a></li>
      </ul>
      <hr/>
      <div class="row">
        <div  class="col-md-12">
          <card v-for="(component, index) in components"
          :key="index"
           >
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
import TableAndChartsCard from '@/components/card/TableAndChartsCard.vue';
import AjaxTable from '@/components/table/AjaxTable.vue';

import Card from '@/components/card/Card.vue';
import Stats from '@/components/misc/Stats.vue';
import ChartCard from '@/components/card/ChartCard.vue';
import StatsCard from '@/components/card/StatsCard.vue';

import CrudComponent from '@/components/crud/CrudComponent.vue';
import PropDoc from '@/components/misc/PropDoc.vue';

export default {
  components: {
    PropDoc,
    Card
  },

  data() {
    return {
      components: [CrudComponent, Card, Stats, ChartCard, StatsCard, TableAndChartsCard, AjaxTable, ]
      // components: [CrudComponent, AjaxTable, Card, Stats, ChartCard, StatsCard, TableAndChartsCard,]
    };
  }
};

</script>
<style lang="scss">
.props {
  .proprow:nth-child(even) {
    background-color: transparentize(#2b3b43, 0.90);
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
      border-bottom: 0.2rem solid transparentize(#CE7780, 0.5);
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
  background-color: transparentize(#F3C387, 0.5);
  color: #14435A;
  padding: 0.2rem;
}
pre code {
  line-height: 1.8;
  padding: 1.2rem;
  &.labelled, .token & {
    position: relative;
    margin-bottom: 2rem;
    &:after {
      content: attr(data-lang);
      font-size: 0.8rem;
      color: #CE7780;
      font-weight: 600;
      position: absolute;
      right: 1.2rem;
      bottom: -2rem;
    }
  }
}
.use, .props {
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
