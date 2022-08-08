<template>
  <div class="list">
    <div class="list-content">
      <div class="list-header">
        <div class="list-title">
          {{ title }}
        </div>
        <div class="list-actions">
          <div class="dropdown column">
            <button
              class="btn btn-simple btn-alt-style btn-sm p-2"
              type="button"
              aria-haspopup="true"
              aria-expanded="false"
              v-click-outside="hideActionDropdown"
              @click="toggleActionDropdown"
            >
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="filter" :class="showActionDropdown ? 'show' : ''">
              <template v-for="(action, index) in customListActions">
                <a
                  href="javascript:void(0)"
                  class="dropdown-item"
                  :key="index"
                  :class="action.class"
                  :id="action.name + '-' + index"
                  :data-title="action.title || action.label"
                  :data-tooltip="action.title || action.label"
                  @click="
                    $emit('customListAction', {
                      action,
                      items,
                      location: '',
                      id: action.name + '-' + index
                    });
                    hideActionDropdown();
                  "
                >
                  <i v-if="action.icon" :class="action.icon" />
                  <span v-html="action.label ? $t(action.label) : ''"></span>
                </a>
              </template>
              <div v-if="customListActions.length" class="dropdown-divider"></div>
              <a href="#" @click.prevent="removeList" class="dropdown-item text-danger">{{
                $t('AwesomeKanban.labels.removeList')
              }}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="list-cards">
        <Draggable
          class="draggable-card"
          :list="items"
          :group="group"
          :animation="animation"
          ghost-class="moving-card"
          :delay="300"
          :delay-on-touch-only="true"
          :scroll-sensitivity="scrollSensitivity"
          @change="cardChanged"
        >
          <div class="card" v-for="(data, index) in items" :key="index" @click="cardClicked(data)">
            <img
              class="card-img-top"
              v-if="imageField && getItemProperty(data, imageField)"
              :src="getItemProperty(data, imageField)"
              :alt="getItemProperty(data, titleField)"
            />
            <div class="card-body">
              <template v-if="usersField && getItemProperty(data, usersField)">
                <div class="pull-right">
                  <img
                    v-for="(user, index) in getItemUsers(data, usersField)"
                    :key="index"
                    class="kanban-user-img"
                    :alt="getItemProperty(user, userTitleField)"
                    :title="getItemProperty(user, userTitleField)"
                    :src="getItemProperty(user, userImageField) || (user && user.src) || user"
                  />
                </div>
              </template>
              <h5 class="card-title text-truncate" v-if="getItemProperty(data, titleField)">
                {{ getItemProperty(data, titleField) }}
              </h5>
              <h6 v-if="getItemProperty(data, subtitleField)" class="card-subtitle mb-2 text-muted text-truncate">
                {{ getItemProperty(data, subtitleField) }}
              </h6>
              <p class="card-text" v-if="getItemProperty(data, descriptionField)">
                {{ getItemProperty(data, descriptionField) }}
              </p>
              <div v-if="getItemProperty(data, labelsField)" class="pull-right">
                <small v-for="label in getItemProperty(data, labelsField)" :key="label" class="badge badge-primary">{{
                  label
                }}</small>
              </div>

              <template v-if="columns && columns.length && (!hasFormattingData || displayColumnsInCards)">
                <div v-for="(itemData, key) in getAllowedData(data)" :key="key">
                  {{ key }} :
                  <AwesomeDisplay
                    :type="getField(key).type"
                    :value="itemData"
                    :relation="getField(key).relation"
                    :relation-label="getField(key).relationLabel"
                    :relation-url="getField(key).relationUrl"
                    :relation-key="getField(key).relationKey"
                    :display-label-cache="displayLabelsCache"
                  >
                  </AwesomeDisplay>
                </div>
              </template>
              <p v-if="!hasFormattingData && !displayColumnsInCards" class="card-text">
                {{ $t('AwesomeKanban.labels.noData') }}
              </p>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Vue from 'vue';
import ClickOutside from 'vue-click-outside';
import i18nMixin from '../../mixins/i18nMixin';
import templatingMixin from '../../mixins/templatingMixin';
import listCardFormatMixin from '../../mixins/listCardFormatMixin';
import AwesomeDisplay from '../crud/display/AwesomeDisplay.vue';

export default {
  name: 'KanbanList',
  components: {
    AwesomeDisplay
  },
  mixins: [i18nMixin, listCardFormatMixin, templatingMixin],
  directives: {
    ClickOutside
  },
  props: {
    /**
     * The id of the list
     * */
    id: {
      type: String,
      required: true
    },

    title: {
      type: [String, Boolean],
      default: 'Title'
    },

    /**
     * The list with all the data
     * */
    items: {
      type: Array,
      default: () => []
    },

    /**
     * The group is use to handle the card change (if two list is not in the same group, the card cannot be moved)
     * */
    group: {
      type: String,
      default: 'default'
    },

    /**
     * The animation delay
     * */
    animation: {
      type: Number,
      default: 200
    },

    /**
     * The scroll sensitivity
     * */
    scrollSensitivity: {
      type: Number,
      default: 500
    },

    /*
     * The columns to use AwesomeDisplay
     * */
    columns: {
      type: Array,
      default: () => []
    },

    /**
     * The custom action list (3 dot)
     */
    customListActions: {
      type: Array,
      default: () => []
    },

    displayLabelsCache: {
      type: Object,
      default: () => ({})
    },
    displayColumnsInCards: {
      type: Boolean,
      default: false
    },
    allowDeletingList: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // Check if the component is loaded globally
    if (!this.$root.$options.components['Draggable'] && !Vue.options.components['Draggable']) {
      /* eslint-disable-next-line */
      console.error('`Draggable` is missing. Please install `vuedraggable` and register the component globally!');
    }
  },
  data: () => ({
    showActionDropdown: false
  }),
  methods: {
    removeList() {
      this.$emit('remove-list', { id: this.id, title: this.title });
      this.hideActionDropdown();
    },

    cardChanged(item) {
      this.$emit('change', item, { id: this.id, title: this.title }, this.items);
      if (item) {
        if (item.added) {
          this.$emit('cardAdded', item.added, { id: this.id, title: this.title }, this.items);
        }
        if (item.removed) {
          this.$emit('cardRemoved', item.removed, { id: this.id, title: this.title }, this.items);
        }
        if (item.moved) {
          this.$emit('cardMoved', item.moved, { id: this.id, title: this.title }, this.items);
        }
      }
    },

    getAllowedData(data) {
      let allowData = {};
      Object.keys(data).forEach((key) => {
        this.columns.forEach((column) => {
          if (column.field === key) {
            allowData = Object.assign(allowData, _.pick(data, [key]));
          }
        });
      });
      return allowData;
    },

    getField(key) {
      const field = _.filter(this.columns, ['field', key]);
      return field[0] ? field[0] : field;
    },

    cardClicked(data) {
      this.$emit('cardClicked', data);
    },

    getItemUsers(data, usersField) {
      const usersImages = this.getItemProperty(data, usersField);
      if (Array.isArray(usersImages)) {
        return usersImages;
      }
      return [usersImages];
    },

    hideActionDropdown() {
      this.showActionDropdown = false;
    },

    toggleActionDropdown() {
      this.showActionDropdown = !this.showActionDropdown;
    }
  },
  computed: {
    hasFormattingData() {
      return this.titleField || this.imageField || this.subtitleField || this.descriptionField || this.labelsField;
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #393812;
  -webkit-border-radius: 1ex;
  width: 6px;
  -webkit-box-shadow: 0px 1px 2px #555;
}

::-webkit-scrollbar-corner {
  background: #555;
}

.list {
  width: 300px;
  margin: 0 4px;
  height: 100%;
  white-space: nowrap;

  .list-content {
    background-color: rgba(black, 0.1);
    padding: 8px;
    border-radius: 4px;
    margin: 0 10px;
    max-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    .list-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 8px;
      flex: 0 0 auto;
      align-items: center;
    }

    .list-cards {
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0 4px;
      padding: 0 4px;
      min-height: 70px;
      display: flex;
      flex-direction: column;

      .card {
        cursor: pointer;
        .kanban-user-img {
          border-radius: 50%;
          width: 20px;
          height: 20px;
        }
        .card-title {
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
        }

        .card-text {
          overflow: hidden;
          white-space: initial;
          line-height: 1;
        }
      }

      .moving-card {
        opacity: 0.4;
        background: #f7fafc;
        border: 1px solid #4299e1;
      }

      .draggable-card {
        flex: 1 1 auto;
        width: 100%;
      }
    }
  }
}
</style>
