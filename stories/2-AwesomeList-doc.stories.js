import Vue from 'vue';
import AwesomeList from '../src/components/table/AwesomeList.vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, object } from "@storybook/addon-knobs";
import componentNotes from "../docs/guide/enyochartcard.md";

export default {
  title: 'Awesome List/Doc',
  component: AwesomeList,
  decorators: [withKnobs],
  parameters: {
    notes: componentNotes,
    storyDescription: "Description of my story"
  }
};


export const Doc = () => ({
  components: { AwesomeList },
  template: `
  <code>< AwesomeList
          title="My awesome list (onePerRow)"
          class="row"
          perRow="1"
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
          perPage="2"
          :options="{}"
          @itemClicked="itemClicked($event)"
          @itemButtonClicked="clickHandler($event)"
        /></code>
  `,
  data() {
    return {
      code: JSON.stringify(AwesomeList, null, true)
    }
  },
  methods: { action: action('clicked') },
});
