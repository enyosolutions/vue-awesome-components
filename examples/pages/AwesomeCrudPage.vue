<template>
  <div id="app">
    <h1>AwesomeCrud component examples</h1>
    <AutoProps
      :component="AwesomeCrud"
      :componentProps="{
        identity: 'ticket',
        apiRequestConfig: { perPageField: '_limit', pageField: '_page' },
        options: this.options,
        model: ticketModel
      }"
      :skip-props="['translations']"
      :docked="true"
      v-slot="{ userProps }"
    >
      <AwesomeCrud
        url="http://localhost:3000/tickets"
        :apiResponseConfig="{
          dataPath: false,
          totalCountPath: 'headers.x-total-count'
        }"
        v-bind="userProps"
      />
    </AutoProps>
  </div>
</template>
<script>
import AutoProps from "vue-enyo-components/components/misc/AutoProps.vue";
import ticketSchema from "../fixtures/ticket";
import ticketModel from "../fixtures/ticketModel";
import userSchema from "../fixtures/user";
import AwesomeCrud from "vue-enyo-components/components/crud/AwesomeCrud.vue";
import LiveEdit from "vue-enyo-components/components/form/LiveEdit.vue";

export default {
  name: "AwesomeCrudPage",
  components: {
    AwesomeCrud,
    AutoProps
  },
  data() {
    return {
      AwesomeCrud,
      LiveEdit,
      ticketSchema,
      ticketModel,
      userSchema,
      showAwesomeForm: false,
      modalDisplayModeSelect: "page",
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
        customInlineActions: [
          {
            name: "validate-ride-comment",
            label: "",
            class: "btn-success btn-icon",
            title: "Valider le commentaire",
            icon: "fa fa-check",
            action: function({ item }, context) {
              item.isProviderCommentValid = true;
              context.editItem(item);
            }
          }
        ],
        customBulkActions: [
          {
            name: "validate-multiple-rides-comment",
            label: "Validate",
            class: "btn-success",
            title: "Valider le commentaire",
            icon: "fa fa-play mr-1",
            action: function({ items }, context) {
              console.log(context);
              context.$notify({
                title: `${items.length} to treat as a custom action`,
                type: items.length > 10 ? "success" : "error"
              });
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
    },
    toggleEdit() {
      this.showAwesomeForm = !this.showAwesomeForm;
    }
  }
};
</script>
<style lang="scss">
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
@import "../../src/main.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
