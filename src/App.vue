<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue Enyo components</h1>
    <hr />
    <div class="container">
      <AwesomeList
        title="My  awesome list"
        class="row"
        :fields="{
          image: 'picture',
          title: 'url',
          subtitle: '',
          description: 'description',
        }"
        :rows="asList"
        :styles="{
      listWrapperClasses: 'row',
      itemWrapperClasses: 'col-3',
    }"
        :options="{

    }"
      />

      <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="My awesome remote list"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'thumbnailUrl',
          title: 'title',
          subtitle: 'url',
          description: '',
        }"
        :styles="{
      listWrapperClasses: 'row',
      itemWrapperClasses: 'col-3',
    }"
      :perPage="10"
      :limit="500"
      :apiResponseConfig="{dataPath: false, totalCountPath:'headers.x-total-count'}"
      :apiRequestConfig="{perPageField: '_limit', pageField: '_page'}"
        :options="{

    }"
      />

         <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="My awesome remote list with custom rendering slots"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'thumbnailUrl',
          title: 'title',
          subtitle: 'url',
          description: '',
        }"
        :styles="{
      listWrapperClasses: 'row',
      itemWrapperClasses: 'col-3',
    }"
      :perPage="10"
      :limit="500"
      :apiResponseConfig="{dataPath: false, totalCountPath:'headers.x-total-count'}"
      :apiRequestConfig="{perPageField: '_limit', pageField: '_page'}"
        :options="{

    }"
      >
        <template v-slot:list-item="slotProps">

          <pre>{{ JSON.stringify(slotProps.item, null, 2)}}</pre>
        </template>
      </AwesomeList>



         <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="My awesome remote list with one item per row"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'thumbnailUrl',
          title: 'title',
          subtitle: 'url',
          description: '',
        }"
        :styles="{
      listWrapperClasses: 'row',
      itemWrapperClasses: 'col-3',
    }"
      :perPage="10"
      :perRow="1"
      :limit="500"
      :apiResponseConfig="{dataPath: false, totalCountPath:'headers.x-total-count'}"
      :apiRequestConfig="{perPageField: '_limit', pageField: '_page'}"
        :options="{

    }"
      >
      </AwesomeList>


    </div>

    <Documentation title="Enyo vue components list" />
    <hr />
    <h2 id="demos">DEMOS</h2>
    <div id="accordion">
      <div class="card">
        <div id="headingOne" class="card-header">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#liveEdit"
              aria-expanded="true"
              aria-controls="collapseOne"
            >Live Edit</button>
          </h5>
        </div>
        <div id="liveEdit" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            Edit field 1 {{ editField1 }}
            <live-edit v-model="editField1" placeholder="placeholder on edit" type="text" />
            <hr />
            Edit field 2 {{ editField2 }}
            <live-edit v-model="editField2" placeholder="placeholder on edit" type="textarea" />
            <hr />
            Edit field checkbox {{ editField3 }}
            <live-edit v-model="editField3" placeholder="placeholder on edit" type="checkbox" />
            <hr />
            Edit field select {{ editField4 }}
            <live-edit
              v-model="editField3"
              placeholder="placeholder on edit"
              type="select"
              :select-values="[1, 2, 3, 4]"
            />
            <hr />
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
        <div id="headingOne" class="card-header">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >Basic crud</button>
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
            <crud-component model-name="contact" :schema="ticketSchema" />
          </div>
        </div>
      </div>
      <div class="card">
        <div id="headingTwo" class="card-header">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >Crud with custom Actions</button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div class="card-body">
            <crud-component model-name="contact" :schema="ticketSchema" :options="options" />
          </div>
        </div>
      </div>
      <div class="card">
        <div id="headingThree" class="card-header">
          <h5 class="mb-0">
            <button
              class="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >Crud with nested schemas</button>
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
import AwesomeList from "@/components/table/AwesomeList.vue";
import LiveEdit from "@/components/form/LiveEdit.vue";
// import CrudComponent from "@/components/crud/CrudComponent.vue";

export default {
  name: "App",
  components: {
    Documentation,
    //   CrudComponent,
    EnyoAjaxTable,
    LiveEdit,
    AwesomeList
  },
  data() {
    return {
      ticketSchema,
      userSchema,
      asList: [
        {
          picture: "https://picsum.photos/200?1",
          name: "my title",
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: "https://mozilla.org",
          myboolean: false,
          notDisplayedColumn: "ghosted",
          object: { foo: "bar", john: "doe", a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: true,
          html: ""
        },
        {
          picture: "https://picsum.photos/200?2",
          name: "my title",
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: "https://bing.com",
          myboolean: true,
          notDisplayedColumn: "ghosted",
          object: { foo: "bar", john: "doe", a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: false
        },
        {
          picture: "https://picsum.photos/200?3",
          name: "my title",
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: "https://google.com",
          myboolean: undefined,
          notDisplayedColumn: "ghosted",
          object: { foo: "bar", john: "doe", a: { b: 1 } },
          date: new Date(),
          dateTime: new Date()
        }
      ],
      options: {
        queryParams: {},
        mode: "local",
        stats: false,
        filterInitiallyOn: true,
        actions: { create: true, edit: true, delete: true },
        customActions: [
          {
            name: "validate-ride-comment",
            label: "",
            class: "btn-success",
            title: "Valider le commentaire",
            icon: "fa fa-check",
            action: function(item, context) {
              item.isProviderCommentValid = true;
              context.editItem(item);
            }
          }
        ]
      },
      nestedSchemas: [
        {
          name: "user-view#tickets",
          label: "",
          class: "",
          title: "Voir les tickets",
          icon: "fa fa-car",
          modelName: "ticket",
          schema: ticketSchema,
          options: {
            url: function(item) {
              return item && item._id ? `/user/${item._id}/ride` : "";
            },
            mode: "local",
            noActions: true,
            noHeaders: false,
            actions: {}
          }
        }
      ],
      editField1: "john doe",
      editField2: `Eric Ries.
      Mark Hunt.
      `,
      editField3: null,
      editField4: null
    };
  }
};
</script>
<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
