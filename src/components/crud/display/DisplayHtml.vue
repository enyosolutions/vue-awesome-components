<template>
    <div class="pointer" v-html="$props.value"></div>
</template>

<script>

import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
    name: 'DisplayHtml',
    mixins: [awesomeDisplayMixin],
};
</script>


<style></style>
