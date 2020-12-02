<template>
  <div class="awesome-builder-module">
    <div class="awesome-builder-module-header">
      <i :class="'awesome-builder-module-icon fa ' + options.icon"></i>
      <div class="awesome-builder-module-text">
        <p class="awesome-builder-module-title">
          {{options.title}} {{uuid}}
        </p>
        <p class="awesome-builder-module-description">
          {{options.description}}
        </p>
      </div>
      <div v-if="placed" class="awesome-builder-module-actions">
        <button @click="expendElement" class="btn btn-info btn-simple btn-sm p-2">
          <i v-if="_extended" class="fa fa-eye"></i>
          <i v-else class="fa fa-eye-slash"></i>
        </button>
        <button @click="removeElement" class="btn btn-danger btn-simple btn-sm p-2">
          <i class="fa fa-trash"></i>
        </button>
      </div>
    </div>
    <hr v-if="_extended"/>
    <div v-if="_extended" class="awesome-builder-module-content">
      <slot></slot>
      <button @click="doneEditing" class="btn btn-primary validate-button">Done Editing</button>
    </div>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18nMixin';
import { v4 as uuidv4 } from 'uuid';

const defaultOptions = {
  title: 'Default title',
  description: 'Default description for builder\'s module',
  icon: 'fa-th-large'
}

export default {
  name: 'AwesomeBuilderModule',
  mixins: [i18nMixin],
  props: {
    options: {
      type: Object,
      default: () => defaultOptions
    },
    uuid: {
      type: String,
      required: true,
    },
    placed: {
      type: Boolean,
      required: true,
      default: () => false,
    }
  },
  data: () => ({
    extended: false,
  }),
  methods: {
    expendElement() {
      if (this.placed) {
        this.extended = !this.extended;
      }
    },

    removeElement() {
      this.$awEventBus && this.$awEventBus.$emit('aw-builder-module-removed', this.uuid)
    },

    doneEditing() {
      // TODO : Fetch data from component
      this.expendElement();
    }
  },

  computed: {
    _extended() {
      return this.extended && this.placed;
    }
  },
  mounted() {
    this.$awEventBus && this.$awEventBus.$on(`aw-builder-module-placed-${this.uuid}`, () => {
      this.placed = true;
      this.extended = true;
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
  padding: 10px;
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

    .awesome-builder-module-actions {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }

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