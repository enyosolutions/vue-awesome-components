<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vue Enyo components</h1>
    <hr>
    <div class="row">
      <ul class="list-group col-6">
        <li class="list-group-item active bg-primary">Next Steps</li>
        <li class="list-group-item">- implement nested schemas for crud</li>
        <li class="list-group-item">
          - forward parameters to a crud component in order to force the value of some fields
          <br>(Ex: when i create a product form a page when coming with a fixed providerCode i want to the providerCode to be auto set the value in the query.)
        </li>
        <li
          class="list-group-item"
        >- Make crud component work without a schema (eg. just with an url)</li>
        <li class="list-group-item">
          - Make sure crud pages that does not have an edit/create/view action, do not have the route for doing so
          <br>Ex: if on product i set
          <code>edit:false</code> then the route
          <code>/product/:id/edit</code> should not exist
        </li>
        <li class="list-group-item">
          - Bring back client side form validation for
          <code>CrudComponent</code>
        </li>
        <li class="list-group-item">
          - remove dependency from bootstrap for
          <code>CrudComponent</code>
        </li>
        <li class="list-group-item">
          - remove dependency from some useless components (Ex:
          <code>Card</code>)
        </li>
      </ul>
      <hr>

      <ul class="list-group list-group-danger col-6">
        <li class="list-group-item active bg-danger">Known bugs</li>
        <li
          class="list-group-item"
        >- Base64 component sometimes keeps displaying the last image that was feeded to it even on a create form</li>
        <li class="list-group-item">- JsonTextarea field type does not take all the space available</li>
        <li class="list-group-item">- CrudComponent mode remote needs testing</li>
      </ul>
    </div>
    <hr>
    <Documentation title="Enyo vue components list"/>

    <hr>

    <h2 id="demos" >DEMOS</h2>
    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
             Basic crud
            </button>
          </h5>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            <crud-component name="contact" :schema="ticketSchema" />
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Crud with custom Actions
            </button>
          </h5>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
          <div class="card-body">
           <crud-component name="contact" :schema="ticketSchema" :options="options"/>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
             Crud with nested schemas
            </button>
          </h5>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
          <div class="card-body">
           <crud-component name="users" :schema="userSchema" :options="options" :nestedSchemas="nestedSchemas"/>
          </div>
        </div>
      </div>
    </div>


    <AjaxTable
      :columns="['col1', 'col2']"
      :rows="[{col1: 'qq', col2:'some data'},{col1: 'qq2', col2:'some moore data'},{col1: 'qq3', col2:'a third data'}, ]"
    ></AjaxTable>
  </div>
</template>

<script>
import Documentation from "@/components/misc/Documentation.vue";
import ticketSchema from "@/fixtures/ticket";
import userSchema from "@/fixtures/user";
import AjaxTable from "@/components/table/AjaxTable.vue";
import CrudComponent from "@/components/crud/CrudComponent.vue";

export default {
  name: "app",
  components: {
    Documentation,
    CrudComponent,
    AjaxTable
  },
  data() {
    return {
      ticketSchema,
      userSchema,
      options: {
        queryParams: {},
        mode: 'local',
        stats: false,
        actions: { create: true, edit: true, delete: true },
        customActions: [
          {
            name: 'validate-ride-comment',
            label: '',
            class: 'btn-success',
            title: 'Valider le commentaire',
            icon: 'fa fa-check',
            action: function(item, context) {
              item.isProviderCommentValid = true;
              context.editItem(item);
            },
          },
        ],
      },
      nestedSchemas: [
        {
          name: 'user-view#tickets',
          label: '',
          class: '',
          title: 'Voir les tickets',
          icon: 'fa fa-car',
          modelName: 'ticket',
          schema: ticketSchema,
          options: {
            url: function(item) {
              return item && item._id ? `/user/${item._id}/ride` : '';
            },
            mode: 'local',
            noActions: true,
            noHeaders: false,
            actions: {},
          },
        },
        ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
