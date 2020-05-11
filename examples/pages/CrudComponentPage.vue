<template>
  <div id="app">
    <h1>CrudComponent component examples</h1>
    <ul class="nav nav-pills" id="myTab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
          >Users</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
          >Tickets</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="contact-tab"
          data-toggle="tab"
          href="#contact"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
          >List with custom rendering slots</a
        >
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          id="one-per-row-tab"
          data-toggle="tab"
          href="#one-per-row"
          role="tab"
          aria-controls="one-per-row"
          aria-selected="false"
          >Standalone mode</a
        >
      </li>
    </ul>
    <hr />
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <select name="" v-model="modalDisplayModeSelect" class="form-control">
          <option
            v-for="val in [
              'modal',
              'sidebar',
              'page',
              'fullscreen',
              'sidebar-left',
              'sidebar-right',
              'fade', // deprecated
              'slide', // deprecated
            ]"
            :key="val"
            :value="val"
            >{{ val }}</option
          >
        </select>
        <CrudComponent
          identity="user"
          :schema="userSchema"
          :columns="['col1', 'col2', 'col3']"
          url="http://localhost:3000/users"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count',
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{ detailPageMode: modalDisplayModeSelect }"
        />
      </div>

      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <!--  url="https://jsonplaceholder.typicode.com/photos" -->
        <AutoProps
          compoenent="CrudComponent"
          :initialProps="{}"
          v-slot="{ userProps }"
        >
          <CrudComponent
            v-bind="userProps"
            identity="ticket"
            :model="ticketModel"
            url="http://localhost:3000/tickets"
            :apiResponseConfig="{
              dataPath: false,
              totalCountPath: 'headers.x-total-count',
            }"
            :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
            :options="{ detailPageMode: 'slide' }"
          />
        </AutoProps>
      </div>

      <div
        class="tab-pane fade"
        id="one-per-row"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        <button class="btn btn-primary" @click="toggleEdit()">
          <i class="fa fa-cog"></i>
        </button>
        <AwesomeForm
          v-if="showAwesomeForm"
          identity="ticket"
          :model="ticketModel"
          :item="{ id: 666087 }"
          mode="edit"
          displayMode="modal"
          url="http://localhost:3000/tickets"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count',
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
        />
      </div>
      <div
        class="tab-pane fade"
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        contact tab
      </div>
    </div>

    <div class="container"></div>
  </div>
</template>
<script>
import AutoProps from 'vue-enyo-components/components/misc/AutoProps.vue';
import ticketSchema from '../fixtures/ticket';
import ticketModel from '../fixtures/ticketModel';
import userSchema from '../fixtures/user';
import CrudComponent from 'vue-enyo-components/components/crud/CrudComponent.vue';
import AwesomeForm from 'vue-enyo-components/components/crud/AwesomeForm.vue';

export default {
  name: 'CrudComponentPage',
  components: {
    CrudComponent,
    AwesomeForm,
    AutoProps,
  },
  data() {
    return {
      ticketSchema,
      ticketModel,
      userSchema,
      showAwesomeForm: false,
      modalDisplayModeSelect: 'table',
      asList: [
        {
          picture: 'https://picsum.photos/200?1',
          name: 'my title',
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: 'https://mozilla.org',
          myboolean: false,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: true,
          html: '',
        },
        {
          picture: 'https://picsum.photos/200?2',
          name: 'my title',
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: 'https://bing.com',
          myboolean: true,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: false,
        },
        {
          picture: 'https://picsum.photos/200?3',
          name: 'my title',
          description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
          url: 'https://google.com',
          myboolean: undefined,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
        },
      ],
      options: {
        queryParams: {},
        mode: 'local',
        stats: false,
        filterInitiallyOn: true,
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
      ],
      editField1: 'john doe',
      editField2: `Eric Ries.
      Mark Hunt.
      `,
      editField3: null,
      editField4: null,
    };
  },
  methods: {
    handleItemClick(item) {
      alert(JSON.stringify(item));
    },
    toggleEdit() {
      this.showAwesomeForm = !this.showAwesomeForm;
    },
  },
};
</script>
<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
