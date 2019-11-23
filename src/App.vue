<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <h1>Vue Enyo components</h1>
    <hr>
    <div class="row">
      <ul class="list-group col-6">
        <li class="list-group-item active bg-primary">
          Next Steps
        </li>
        <li class="list-group-item">
          - implement nested schemas for crud
        </li>
        <li class="list-group-item">
          - forward parameters to a crud component in order to force the value of some fields
          <br>(Ex: when i create a product form a page when coming with a fixed providerCode i want to the providerCode to be auto set the value in the query.)
        </li>
        <li class="list-group-item">
          - Make crud component work without a schema (eg. just with an url)
        </li>
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
        <li class="list-group-item active bg-danger">
          Known bugs
        </li>
        <li class="list-group-item">
          - Base64 component sometimes keeps displaying the last image that was feeded to it even on a create form
        </li>
        <li class="list-group-item">
          - JsonTextarea field type does not take all the space available
        </li>
        <li class="list-group-item">
          - CrudComponent mode remote needs testing
        </li>
      </ul>
    </div>
    <hr>
    <Documentation title="Enyo vue components list" />
    <hr>
    <h2 id="demos">
      DEMOS
    </h2>
    <div id="accordion">
      <div class="card">
        <div
          id="headingOne"
          class="card-header"
        >
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#liveEdit"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Live Edit
            </button>
          </h5>
        </div>
        <div
          id="liveEdit"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body">
            Edit field 1 {{ editField1 }}
            <live-edit
              v-model="editField1"
              placeholder="placeholder on edit"
              type="text"
            />
            <hr>
            Edit field 2 {{ editField2 }}
            <live-edit
              v-model="editField2"
              placeholder="placeholder on edit"
              type="textarea"
            />
            <hr>
            Edit field checkbox {{ editField3 }}
            <live-edit
              v-model="editField3"
              placeholder="placeholder on edit"
              type="checkbox"
            />
            <hr>
            Edit field select {{ editField4 }}
            <live-edit
              v-model="editField3"
              placeholder="placeholder on edit"
              type="select"
              :select-values="[1, 2, 3, 4]"
            />
            <hr>
            Edit field select {{ editField4 }}
            <live-edit
              v-model="editField3"
              placeholder="placeholder on edit"
              type="select"
              :select-values="[{a:1, b: 'first'},{a:2, b: 'second'}, {a:3, b: 'third'}, {a:4, b: 'fourth'}]"
              :select-options="{value: 'a', label: 'b'}"
            />
          </div>
        </div>
      </div>
      <div class="card">
        <div
          id="headingOne"
          class="card-header"
        >
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Basic crud
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div class="card-body">
            basic
            <crud-component
              model-name="contact"
              :schema="ticketSchema"
            />
          </div>
        </div>
      </div>
      <div class="card">
        <div
          id="headingTwo"
          class="card-header"
        >
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Crud with custom Actions
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div class="card-body">
            <crud-component
              model-name="contact"
              :schema="ticketSchema"
              :options="options"
            />
          </div>
        </div>
      </div>
      <div class="card">
        <div
          id="headingThree"
          class="card-header"
        >
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Crud with nested schemas
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div class="card-body">
            <crud-component
              model-name="users"
              :schema="userSchema"
              :options="options"
              :nested-schemas="nestedSchemas"
            />
          </div>
        </div>
      </div>
    </div>
    <EnyoAjaxTable
      :columns="['col1', 'col2']"
      :rows="[{col1: 'qq', col2:'some data'},{col1: 'qq2', col2:'some moore data'},{col1: 'qq3', col2:'a third data'}, ]"
    />
  </div>
</template>
<script>
import Documentation from "@/components/misc/Documentation.vue";
import ticketSchema from "@/fixtures/ticket";
import userSchema from "@/fixtures/user";
import EnyoAjaxTable from "@/components/table/EnyoAjaxTable.vue";
import LiveEdit from "@/components/form/LiveEdit.vue";
// import CrudComponent from "@/components/crud/CrudComponent.vue";

export default {
    name: "App",
    components: {
        Documentation,
     //   CrudComponent,
        EnyoAjaxTable,
        LiveEdit,
    },
    data() {
        return {
            ticketSchema,
            userSchema,
            options: {
                queryParams: {},
                mode: 'local',
                stats: false,
                filterInitiallyOn: true,
                actions: { create: true, edit: true, delete: true },
                customActions: [{
                    name: 'validate-ride-comment',
                    label: '',
                    class: 'btn-success',
                    title: 'Valider le commentaire',
                    icon: 'fa fa-check',
                    action: function (item, context) {
                        item.isProviderCommentValid = true;
                        context.editItem(item);
                    },
                }, ],
            },
            nestedSchemas: [{
                name: 'user-view#tickets',
                label: '',
                class: '',
                title: 'Voir les tickets',
                icon: 'fa fa-car',
                modelName: 'ticket',
                schema: ticketSchema,
                options: {
                    url: function (item) {
                        return item && item._id ? `/user/${item._id}/ride` : '';
                    },
                    mode: 'local',
                    noActions: true,
                    noHeaders: false,
                    actions: {},
                },
            }, ],
            editField1: 'john doe',
            editField2: `Eric Ries.
      Mark Hunt.
      `,
      editField3: null,
      editField4: null,
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
