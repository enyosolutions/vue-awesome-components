<template>
  <!--  -->
  <div>
    <div
      v-if="isSafe"
      v-bind="$props"
      class="pointer"
      :class="$props.classes"
      :style="$props.styles"
      v-html="strippedContent"
    ></div>
    <iframe
      v-if="!isSafe"
      v-bind="$props"
      value=""
      class="aw-display-iframe"
      :class="$props.classes"
      :style="$props.styles"
      :srcdoc="strippedContent"
      frameborder="0"
      ref="myIframe"
    ></iframe>
    <button
      v-if="displayExpandButton && !expanded"
      @click="onButonClick()"
      class="btn pull-right btn-expand text-primary"
    >
      <i class="fa fa-expand"></i>
    </button>
  </div>
</template>

<script>
import striptags from 'striptags';
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayHtml',
  mixins: [awesomeDisplayMixin],
  computed: {
    strippedContent() {
      if (this.striptags) {
        return striptags(this.$props.value, this.tagsToKeep);
      }
      return this.$props.value;
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    onButonClick() {
      const size =
        this.$refs.myIframe &&
        this.$refs.myIframe.contentWindow &&
        this.$refs.myIframe.contentWindow.document.documentElement.scrollHeight
          ? this.$refs.myIframe.contentWindow.document.documentElement.scrollHeight + 15 + 'px'
          : '100vh';
      this.$refs.myIframe.style.height = size;
      this.expanded = true;
    }
  }
};
</script>

<style>
.aw-display-iframe {
  width: 100%;
}
</style>
