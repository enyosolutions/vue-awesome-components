<template>
  <div id="app">
    <h1>Awesome list component examples</h1>
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
        perPage="2"
        :options="{}"
        @itemClicked="handleItemClick"
        @itemButtonClicked="handleItemClick"
      />

      <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="Awesome remote list"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'download_url',
          title: 'author',
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
        :options="{}"
        @itemClicked="handleItemClick"
      />

      <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="Awesome remote list with custom rendering slots"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'download_url',
          title: 'author',
          subtitle: 'url',
          description: '',
        }"
        :styles="{
      listWrapperClasses: 'row',
      itemWrapperClasses: 'col-3',
    }"
        :perPage="10"
        :perRow="2"
        :limit="500"
        :apiResponseConfig="{dataPath: false, totalCountPath:'headers.x-total-count'}"
        :apiRequestConfig="{perPageField: '_limit', pageField: '_page'}"
        :options="{}"
        @itemClicked="handleItemClick"
      >
        <template v-slot:list-item="slotProps">
           <div
              class="card mb-3 awesome-list-item"
              :style="{'flex-direction': slotProps.itemsPerRow < 2 ? 'row' : 'column',
          }"
            >
              <img
                class="card-img-top"
                :src="slotProps.item.download_url"
                :alt="slotProps.item.author"
              />
              <div class="card-img-overlay">
                <h5 class="card-title" v-if="slotProps.item.author">{{ slotProps.item.author }}</h5>
                <p class="card-text"></p>
                <p class="card-text">Last updated 3 mins ago</p>
              </div>

            </div>


        </template>
      </AwesomeList>

      <hr />
      <!--  url="https://jsonplaceholder.typicode.com/photos" -->
      <AwesomeList
        title="Awesome remote list with one item per row"
        class="row"
        mode="local"
        url="http://localhost:3000/photos"
        :fields="{
          image: 'download_url',
          title: 'author',
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
        @click="alert"
        :apiResponseConfig="{dataPath: false, totalCountPath:'headers.x-total-count'}"
        :apiRequestConfig="{perPageField: '_limit', pageField: '_page'}"
        :options="{

    }"
      ></AwesomeList>
    </div>
  </div>
</template>
<script>
import ticketSchema from "@/fixtures/ticket";
import userSchema from "@/fixtures/user";
import AwesomeList from "@/components/table/AwesomeList.vue";
// import CrudComponent from "@/components/crud/CrudComponent.vue";

export default {
  name: "AwesomelistPage",
  components: {
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
  },
  methods: {
    handleItemClick(item) {
      alert(JSON.stringify(item));
    }
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
