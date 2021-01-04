import Vue from 'vue';
import AjaxTable from '../src/components/table/AwesomeTable.vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object } from "@storybook/addon-knobs";


export default {
  title: 'AjaxTable',
  component: AjaxTable,
  decorators: [withKnobs]
};

const localList = [
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
  },
  {
    picture: "https://picsum.photos/200?4",
    name: "my title",
    description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
    url: "https://google.com",
    myboolean: undefined,
    notDisplayedColumn: "ghosted",
    object: { foo: "bar", john: "doe", a: { b: 1 } },
    date: new Date(),
    dateTime: new Date()
  },
  {
    picture: "https://picsum.photos/200?5",
    name: "my title",
    description: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. `,
    url: "https://google.com",
    myboolean: undefined,
    notDisplayedColumn: "ghosted",
    object: { foo: "bar", john: "doe", a: { b: 1 } },
    date: new Date(),
    dateTime: new Date()
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
]

const displayGroupId = 'Display';
const dataGroupId = 'data';
export const PropertiesControl = () => ({
  components: { AjaxTable },
  props: {
    perPage: {
      default: number('Items per page', 5, {}, displayGroupId)
    },
    perRow: {
      default: number('Items per rows', 3, {}, displayGroupId)
    },
    title: {
      default: text('Title', 'Custom title', displayGroupId)
    },
    actions: {
      default: object("Actions", {
        itemButton: true,
        itemsPerRow: true
      }, displayGroupId)
    },
    columns: {
      default: object("columns", Object.keys(localList[0]), displayGroupId)
    },
  },
  data() {
    return {
      localList,
      options: {
        queryParams: {},
        mode: "local",
        stats: false,
        filterInitiallyOn: true,
        actions: { create: true, edit: true, delete: true },
      },
    };
  },
  methods: {
    clickHandler(item) {
      console.log('clickHandler', JSON.stringify(item));

      action(JSON.stringify(item))();
    },
    itemClicked: action('itemClicked'),

  },
  template: `
  <div class="">
        <div class="m-4">
        <AjaxTable
                v-bind="$props"
                class="row"
                :perRow="perRow"
                :fields="{
                image: 'picture',
                title: 'url',
                subtitle: '',
                description: 'description',
              }"
                :rows="localList"

                :styles="{
                listWrapperClasses: 'row',
                itemWrapperClasses: 'col-3',
              }"
                :perPage="perPage"
                :options="{}"
                @itemClicked="itemClicked($event)"
                @itemButtonClicked="clickHandler($event)"
              />
        </div>
  </div>
  `});
