<template>
  <display-image
    v-if="$props.type === 'image'"
    :src="$props.value"
  ></display-image>
  <display-boolean
    v-else-if="$props.type === 'boolean'"
    :value="$props.value"
  ></display-boolean>
  <display-url
    v-else-if="$props.type === 'url'"
    :value="$props.value"
    v-bind="$props"
  ></display-url>
  <display-html
    v-else-if="$props.type === 'html'"
    :value="$props.value"
  ></display-html>
  <display-object
    v-else-if="$props.type === 'object'"
    :value="$props.value"
  ></display-object>
  <display-checkbox
    v-else-if="$props.type === 'checkbox'"
    :value="$props.value"
  ></display-checkbox>
  <display-default v-else :value="$props.value"></display-default>
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
