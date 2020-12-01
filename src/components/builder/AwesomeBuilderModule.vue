<template>
  <div class="awesome-builder-module">
    <div @click="closeElement" class="awesome-builder-module-header">
      <i :class="'awesome-builder-module-icon fa ' + icon"></i>
      <div class="awesome-builder-module-text">
        <p class="awesome-builder-module-title">
          {{title}}
        </p>
        <p class="awesome-builder-module-description">
          {{description}}
        </p>
      </div>
    </div>
    <hr v-if="_extended"/>
    <div v-if="_extended" class="awesome-builder-module-content">
      <slot name="content"></slot>
      <button @click="doneEditing" class="btn btn-primary validate-button">Done Editing</button>
    </div>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18nMixin';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'AwesomeBuilderModule',
  mixins: [i18nMixin],
  props: {
    icon: {
      type: String,
      required: false,
      default: () => 'fa-th-large'
    },
    title: {
      type: String,
      required: false,
      default: () => 'Title'
    },
    description: {
      type: String,
      required: false,
      default: () => 'Default description for builder\'s module'
    },
  },
  data: () => ({
    extended: true,
    placed: false,
    uid: null,
  }),
  methods: {
    closeElement() {
      if (this.placed) {
        this.extended = !this.extended;
      }
    },
    doneEditing() {
      // TODO : Fetch data from component
      this.closeElement();
    }
  },

  computed: {
    _extended() {
      return this.extended && this.placed;
    }
  },
  created() {
    this.uid = `aw-builder-module-${uuidv4()}`
  },
  mounted() {
    this.$awEventBus && this.$awEventBus.$on(`aw-builder-module-placed-${this.uid}`, () => {
      this.placed = true;
    })
  }
}
</script>

<style scoped lang="scss">
.awesome-builder-module {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  border-radius: 5px;
  margin: 10px 0;
  width: 100%;
  padding: 20px;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  hr {
    width: 100%;
  }
  .awesome-builder-module-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    cursor: pointer;

    .awesome-builder-module-icon {
      font-size: 50px;
      color: var(--primary);
    }
    .awesome-builder-module-text {
      margin-left: 20px;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: center;
      flex: 1;
      .awesome-builder-module-title, .awesome-builder-module-description {
        margin: 0;
        text-align: left;
      }
      .awesome-builder-module-title {
        font-weight: bold;
      }
    }
  }
  .awesome-builder-module-content {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-flow: column nowrap;
  }
  .validate-button {
    width: 100%;
  }
}
</style>