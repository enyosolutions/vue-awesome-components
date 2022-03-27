<template>
  <div id="app">
    <h1>AwesomeCrud component examples</h1>
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
          >Users (Change detail page display mode)</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="ticket-custom-tab"
          data-toggle="tab"
          href="#ticket-custom"
          role="tab"
          aria-controls="ticket-custom"
          aria-selected="false"
          >Tickets (Uses custom layout system)</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="photos-tab"
          data-toggle="tab"
          href="#photos"
          role="tab"
          aria-controls="photos"
          aria-selected="false"
          >Photos</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="list-tab"
          data-toggle="tab"
          href="#list"
          role="tab"
          aria-controls="list"
          aria-selected="false"
          >AwesomeList</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="kanban-tab"
          data-toggle="tab"
          href="#kanban"
          role="tab"
          aria-controls="kanban"
          aria-selected="false"
          >AwesomeKanban</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="awesomelayout-tab"
          data-toggle="tab"
          href="#awesomelayout"
          role="tab"
          aria-controls="awesomelayout"
          aria-selected="false"
          >AwesomeLayout</a
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
      <li class="nav-item">
        <a
          class="nav-link"
          id="custom-actions-tab"
          data-toggle="tab"
          href="#custom-actions"
          role="tab"
          aria-controls="one-per-row"
          aria-selected="false"
          >Custom Actions</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="conditional-actions-tab"
          data-toggle="tab"
          href="#conditional-actions"
          role="tab"
          aria-controls="one-per-row"
          aria-selected="false"
          >Conditionnal Actions</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="segments-tab"
          data-toggle="tab"
          href="#segments"
          role="tab"
          aria-controls="one-per-row"
          aria-selected="false"
          >Segments</a
        >
      </li>
    </ul>
    <hr />
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <select name v-model="modalDisplayModeSelect" class="form-control">
          <option
            v-for="val in [
              'modal',
              'sidebar',
              'page',
              'fullscreen',
              'sidebar-left',
              'sidebar-right',
              'fade', // deprecated
              'slide' // deprecated
            ]"
            :key="val"
            :value="val"
            >{{ val }}</option
          >
        </select>
        <AwesomeCrud
          identity="user"
          :schema="userSchema"
          :columns="['col1', 'col2', 'col3']"
          url="/api/users"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{ detailPageMode: modalDisplayModeSelect, dataPaginationMode: 'remote' }"
          :customTopRightActions="[
            {
              name: 'validate-ride-comment',
              label: 'valider le commentaire',
              class: 'btn-success',
              title: 'Valider le commentaire',
              icon: 'fa fa-check',
              action: function(item, context) {
                item.isProviderCommentValid = true;
                context.editItem(item);
              }
            }
          ]"
          :customTableTopActions="[
            {
              name: 'filter by roles',
              class: '',
              type: 'filter',
              field: 'roles'
            },
            {
              name: 'filter by roles',
              class: '',
              type: 'input',
              field: 'maroq',
              label: 'Ma destination'
            }
          ]"
        />
      </div>

      <div class="tab-pane fade" id="ticket-custom" role="tabpanel" aria-labelledby="profile-tab">
        <!--  url="https://jsonplaceholder.typicode.com/photos" -->
        <h2>Ticket model with custom layout</h2>
        <AutoProps
          :component="AwesomeCrud"
          :componentProps="{}"
          :skip-props="['translations']"
          :docked="true"
          v-slot="{ userProps }"
        >
          <AwesomeCrud
            identity="ticket"
            :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
            :options="{ detailPageMode: 'fullscreen', useCustomLayout: true }"
            :model="_ticketModel"
            url="/api/tickets"
            :apiResponseConfig="{
              dataPath: false,
              totalCountPath: 'headers.x-total-count'
            }"
            v-bind="userProps"
            @layout-updated="onLayoutUpdated"
          />
        </AutoProps>
      </div>

      <div class="tab-pane fade" id="one-per-row" role="tabpanel" aria-labelledby="photos-tab">
        <button class="btn btn-primary" @click="toggleEdit">
          <i class="fa fa-cog"></i>
        </button>
        <AwesomeForm
          v-if="showAwesomeForm"
          identity="ticket"
          :model="ticketModel"
          :item="{ id: 666087 }"
          mode="edit"
          displayMode="modal"
          url="/api/tickets"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
        />
      </div>
      <div class="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab">
        <AwesomeCrud
          identity="photos"
          :schema="photoSchema"
          url="/api/photos"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{ detailPageMode: modalDisplayModeSelect, dataPaginationMode: 'remote' }"
          :actions="{ view: true, itemButton: true }"
        />
      </div>
      <div class="tab-pane fade" id="list" role="tabpanel" aria-labelledby="list-tab">
        <AwesomeCrud
          identity="photo"
          :schema="photoSchema"
          url="/api/photos"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{
            detailPageMode: modalDisplayModeSelect,
            dataPaginationMode: 'remote',
            initialDisplayMode: 'list'
          }"
          :listOptions="{ fields: { image: 'download_url', title: 'author', description: 'url' } }"
          :segment="{ label: 'Age', field: 'age', enum: ['10|mineur', '18| Majeur', '21|Majeur aux USA'] }"
        />
      </div>
      <div class="tab-pane fade" id="kanban" role="tabpanel" aria-labelledby="kanban-tab">
        <AwesomeCrud
          identity="photo"
          :schema="photoSchema"
          url="/api/photos"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{
            detailPageMode: modalDisplayModeSelect,
            dataPaginationMode: 'remote',
            initialDisplayMode: 'kanban'
          }"
          :kanbanOptions="{
            moveList: false,
            fields: { image: 'download_url', title: 'author', description: 'url' },
            filterField: 'author',
            filterValues: ['Rick Waalders'],
            sortField: 'author',
            sortOrder: 'asc'
          }"
        />
      </div>
      <div class="tab-pane fade" id="awesomelayout" role="tabpanel" aria-labelledby="awesomelayout-tab">
        <h2>Ticket model with awesome layout</h2>
        <p>User can change the layout of awesome form</p>
        Props
        <ul>
          <li>
            <code>edit-mode</code> : <code>{ type: Boolean, required: true }</code>. Use to determine if user can change
            the layout.
          </li>
          <li>
            <code>layout</code> : <code>{ type: Array, required: true }</code>. Use to setup the default/register
            layout.
          </li>
          <li>
            <code>legend</code> : <code>{ type: String, required: false }</code>. Use to name the parent layout (eg:
            <code>Informations</code>)
          </li>
        </ul>
        Events
        <ul>
          <li><code>@layout-updated</code> : Trigger when a layout is changed/moved/deleted/...</li>
          <li><code>@layout-fields-updated</code> : Trigger when a field is move</li>
        </ul>
        <AutoProps
          :component="AwesomeCrud"
          :componentProps="{}"
          :skip-props="['translations']"
          :docked="true"
          v-slot="{ userProps }"
        >
          <AwesomeCrud
            identity="ticket"
            :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
            :options="{ detailPageMode: 'fullscreen' }"
            :model="_ticketModel"
            url="/api/tickets"
            :apiResponseConfig="{
              dataPath: false,
              totalCountPath: 'headers.x-total-count'
            }"
            v-bind="userProps"
            @layout-updated="onLayoutUpdated"
          />
        </AutoProps>
      </div>

      <div class="tab-pane fade" id="customActions" role="tabpanel">
        <AwesomeCrud
          identity="photos"
          :schema="photoSchema"
          url="/api/photos"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{ detailPageMode: modalDisplayModeSelect, dataPaginationMode: 'remote' }"
          :actions="{ view: true, itemButton: true }"
        />
      </div>

      <div class="tab-pane fade" id="conditional-actions" role="tabpanel" aria-labelledby="photos-tab">
        <h2>Conditional Actions</h2>
        <AwesomeCrud
          identity="photos"
          :schema="photoSchema"
          url="/api/photos"
          :apiResponseConfig="{
            dataPath: false,
            totalCountPath: 'headers.x-total-count'
          }"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{ detailPageMode: modalDisplayModeSelect, dataPaginationMode: 'remote' }"
          :actions="{
            create: '{{ 2 > 1 }}',
            view: ({ currentItem }) => currentItem && currentItem.id % 2 == 0,
            itemButton: true
          }"
        />
      </div>

      <div class="tab-pane fade" id="segments" role="tabpanel" aria-labelledby="photos-tab">
        <h2>Segments</h2>
        <AwesomeCrud
          identity="ticket"
          :apiRequestConfig="{ perPageField: '_limit', pageField: '_page' }"
          :options="{
            detailPageMode: 'fullscreen',
            useCustomLayout: true
          }"
          :model="_ticketModel"
          title="Tickets (Segments demo)"
          url="/api/tickets"
          :apiResponseConfig="{ dataPath: false, totalCountPath: 'headers.x-total-count' }"
          v-bind="userProps"
          @layout-updated="onLayoutUpdated"
          :actions="{ create: true }"
          segmentField="status"
        />
      </div>
    </div>

    <div class="container"></div>
  </div>
</template>
<script>
import AutoProps from 'vue-aw-components/components/misc/AutoProps.vue';
import ticketSchema from '../fixtures/ticket';
import ticketModel from '../fixtures/ticketModel';
import userSchema from '../fixtures/user';
import photoSchema from '../fixtures/photo';
import AwesomeCrud from 'vue-aw-components/components/crud/AwesomeCrud.vue';
import AwesomeForm from 'vue-aw-components/components/crud/AwesomeForm.vue';
import LiveEdit from 'vue-aw-components/components/form/LiveEdit.vue';

export default {
  name: 'AwesomeCrudAdvancedPage',
  components: {
    AwesomeCrud,
    AwesomeForm,
    AutoProps
  },
  data() {
    return {
      AwesomeCrud,
      LiveEdit,
      ticketSchema,
      ticketModel,
      userSchema,
      photoSchema,
      showAwesomeForm: false,
      modalDisplayModeSelect: 'page',
      asList: [
        {
          picture: 'https://picsum.photos/200?1',
          name: 'my title',
          description:
            "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
          url: 'https://mozilla.org',
          myboolean: false,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: true,
          html: ''
        },
        {
          picture: 'https://picsum.photos/200?2',
          name: 'my title',
          description:
            "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
          url: 'https://bing.com',
          myboolean: true,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date(),
          checkbox: false
        },
        {
          picture: 'https://picsum.photos/200?3',
          name: 'my title',
          description:
            "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
          url: 'https://google.com',
          myboolean: undefined,
          notDisplayedColumn: 'ghosted',
          object: { foo: 'bar', john: 'doe', a: { b: 1 } },
          date: new Date(),
          dateTime: new Date()
        }
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
            label: 'valider le commentaire',
            class: 'btn-success',
            title: 'Valider le commentaire',
            icon: 'fa fa-check',
            action: function(item, context) {
              item.isProviderCommentValid = true;
              context.editItem(item);
            }
          }
        ]
      },
      nestedModels: [
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
            actions: {}
          }
        }
      ],
      editField1: 'john doe',
      editField2: `Eric Ries.
      Mark Hunt.
      `,
      editField3: null,
      editField4: null,
      editedLayout: null
    };
  },
  computed: {
    _layout() {
      return this.editedLayout
        ? this.editedLayout
        : this.ticketModel.formOptions && this.ticketModel.formOptions.layout;
    },
    _ticketModel() {
      return { ...this.ticketModel, formOptions: { layout: this._layout } };
    }
  },
  mounted() {
    if (localStorage.getItem('onLayoutUpdated')) {
      this.editedLayout = JSON.parse(localStorage.getItem('onLayoutUpdated'));
    }
    window.appInstance = this;
  },

  methods: {
    handleItemClick(item) {
      alert(JSON.stringify(item));
    },
    toggleEdit() {
      this.showAwesomeForm = !this.showAwesomeForm;
    },
    onLayoutUpdated(items, event) {
      localStorage.setItem('onLayoutUpdated', JSON.stringify(items));
      this.editedLayout = items;
    },

    test(arg) {
      console.log('here', arg);
    }
  }
};
</script>
<style lang="scss">
@import '../../src/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
