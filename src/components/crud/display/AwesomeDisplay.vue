<template>
  <display-image class="aw-display" v-if="$props.type === 'image'" v-bind="$props" :src="$props.value"></display-image>
  <display-boolean
    class="aw-display"
    v-else-if="$props.type === 'boolean'"
    v-bind="$props"
    :value="$props.value"
  ></display-boolean>
  <display-url class="aw-display" v-else-if="$props.type === 'url'" v-bind="$props" :value="$props.value"></display-url>
  <display-html
    class="aw-display"
    v-else-if="$props.type === 'html'"
    v-bind="$props"
    :value="$props.value"
  ></display-html>
  <display-object
    class="aw-display"
    v-else-if="$props.type === 'object'"
    v-bind="$props"
    :value="$props.value"
  ></display-object>
  <display-checkbox
    class="aw-display"
    v-else-if="$props.type === 'checkbox'"
    v-bind="$props"
    :value="$props.value"
  ></display-checkbox>
  <display-date
    class="aw-display"
    v-else-if="$props.type === 'date'"
    v-bind="$props"
    :value="$props.value"
  ></display-date>
  <display-date
    class="aw-display"
    v-else-if="$props.type === 'datetime'"
    v-bind="$props"
    :value="$props.value"
  ></display-date>
  <display-relation
    class="aw-display"
    v-else-if="$props.type === 'relation'"
    v-bind="$props"
    :relation="relation"
    :relationKey="relationKey"
    :relationUrl="relationUrl"
    :relationLabel="relationLabel"
    :value="$props.value"
  ></display-relation>
  <display-default class="aw-display" v-else v-bind="$props" :value="$props.value"></display-default>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';

import DisplayImage from './DisplayImage';
import DisplayBoolean from './DisplayBoolean';
import DisplayDate from './DisplayDate';
import DisplayUrl from './DisplayUrl';
import DisplayHtml from './DisplayHtml';
import DisplayObject from './DisplayObject';
import DisplayRelation from './DisplayRelation';
import DisplayCheckbox from './DisplayCheckbox';
import DisplayDefault from './DisplayDefault';

export default {
  name: 'AwesomeDisplay',
  mixins: [awesomeDisplayMixin, apiConfigMixin],
  components: {
    DisplayCheckbox,
    DisplayBoolean,
    DisplayImage,
    DisplayUrl,
    DisplayHtml,
    DisplayObject,
    DisplayRelation,
    DisplayDefault,
    DisplayDate
  },
  methods: {
    onClick(row) {
      this.clickOnItem(row);
    }
  }
};
</script>

<style></style>
