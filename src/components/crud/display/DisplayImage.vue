<template>
  <div v-bind="$props" class="aw-display-image" :class="$props.classes" :style="$props.styles">
    <div class="pointer" v-if="$props.src">
      <img
        :src="$props.src"
        alt="image"
        class="aw-display-image-img"
        :class="$props.imageClasses"
        :style="$props.imageStyles"
      />
      <div class="image-actions" v-if="value">
        <button @click.prevent.stop="openImageInTab($props.src)" type="button" class="btn btn-sm">
          <i class="fa fa-external-link"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import awesomeDisplayMixin from '../../../mixins/displayMixin';

export default {
  name: 'DisplayImage',
  mixins: [awesomeDisplayMixin],
  methods: {
    openImageInTab(src) {
      window.open(src, '_blank');
    }
  }
};
</script>

<style lang="scss">
.aw-display-image {
  .aw-display-image-img {
    width: 100%;
  }
  .pointer {
    position: relative;
    width: 100%;
  }
  .image-actions {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: none;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 5px;
    button {
      color: #fff;
      background: var(--primary, #fff);
      border-color: var(--primary, #fff) !important;
      padding: 2px;
    }
  }

  &:hover {
    .image-actions {
      display: flex;
    }
  }
}
</style>
