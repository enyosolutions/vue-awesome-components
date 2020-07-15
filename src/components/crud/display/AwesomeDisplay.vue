<template>
  <display-image
    v-if="$props.type === 'image'"
    v-bind="$props"
    :src="$props.value"
  ></display-image>
  <display-boolean
    v-else-if="$props.type === 'boolean'"
    v-bind="$props"
    :value="$props.value"
  ></display-boolean>
  <display-url
    v-else-if="$props.type === 'url'"
    v-bind="$props"
    :value="$props.value"
  ></display-url>
  <display-html
    v-else-if="$props.type === 'html'"
    v-bind="$props"
    :value="$props.value"
  ></display-html>
  <display-object
    v-else-if="$props.type === 'object'"
    v-bind="$props"
    :value="$props.value"
  ></display-object>
  <display-checkbox
    v-else-if="$props.type === 'checkbox'"
    v-bind="$props"
    :value="$props.value"
  ></display-checkbox>
  <display-default
    v-bind="$props"
    v-else
    :value="$props.value"
  ></display-default>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

import DisplayImage from './DisplayImage';
import DisplayBoolean from './DisplayBoolean';
import DisplayUrl from './DisplayUrl';
import DisplayHtml from './DisplayHtml';
import DisplayObject from './DisplayObject';
import DisplayCheckbox from './DisplayCheckbox';
import DisplayDefault from './DisplayDefault';

export default {
  name: 'AwesomeDisplay',
  mixins: [awesomeDisplayMixin],
  components: {
    DisplayCheckbox,
    DisplayBoolean,
    DisplayImage,
    DisplayUrl,
    DisplayHtml,
    DisplayObject,
    DisplayDefault,
  },
};
</script>

<style></style>
