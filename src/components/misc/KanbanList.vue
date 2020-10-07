<template>
  <div class="list">
    <div class="list-content">
      <div class="list-header">
        <div class="list-title">
          {{title}}
        </div>
        <div class="list-actions">
          <div class="dropdown column">
            <button
              class="btn btn-simple btn-alt-style btn-sm p-2"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="filter">
              <template v-for="(action, index) in customListActions">
                <a href="#" class="dropdown-item"
                   :key="index"
                   :class="action.class"
                   :id="action.name + '-' + index"
                   :data-title="action.title || action.label"
                   :data-tooltip="action.title || action.label"
                   @click="$emit('customListAction', {
                     action,
                     items: list,
                     location: '',
                     id: action.name + '-' + index
                   })"
                >
                  <i v-if="action.icon" :class="action.icon"/>
                  <span v-html="action.label ? $t(action.label) : ''"></span>
                </a>
              </template>
              <div v-if="customListActions.length" class="dropdown-divider"></div>
              <a href="#" @click.prevent="removeList" class="dropdown-item text-danger">{{$t("AwesomeKanban.labels.removeList")}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="list-cards">
        <Draggable
          class="draggable-card"
          :list="list"
          :group="group"
          :animation="animation"
          ghost-class="moving-card"
          :scroll-sensitivity="scrollSensitivity"
          @change="cardChanged"
        >
          <div class="card" v-for="(data, index) in list" :key="index" @click="cardClicked(data)">
            <img
              class="card-img-top"
              v-if="fields && fields.image && data[fields.image]"
              :src="data[fields.image]"
              :alt="data[fields.title]"
            />
            <div class="card-body">
              <h5 class="card-title"
                  v-if="fields && fields.title && data[fields.title]"
              >
                {{ data[fields.title] }}
              </h5>
              <h6
                v-if="fields && fields.subtitle && data[fields.subtitle]"
                class="card-subtitle mb-2 text-muted"
              >
                {{ data[fields.subtitle] }}
              </h6>
              <p class="card-text"
                 v-if="fields && fields.description && data[fields.description]"
              >
                {{ data[fields.description] }}
              </p>
              <template v-if="columns && columns.length">
                <div v-for="(itemData, key) in getAllowedData(data)" :key="key">
                  {{ key }} :
                  <AwesomeDisplay
                    :type="getField(key).type"
                    :value="itemData"
                    :relation="getField(key).relation"
                    :relation-label="getField(key).relationLabel"
                    :relation-url="getField(key).relationUrl"
                    :relation-key="getField(key).relationKey"
                  >
                  </AwesomeDisplay>
                </div>
              </template>
              <p v-if="!hasData" class="card-text">{{ $t('AwesomeKanban.labels.noData')}}</p>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import Draggable from 'vuedraggable';
  import i18nMixin from '../../mixins/i18nMixin';
  import _ from 'lodash';
  import AwesomeDisplay from '../crud/display/AwesomeDisplay';

  export default {
    name: 'KanbanList',
    components: {
      Draggable,
      AwesomeDisplay
    },
    mixins: [i18nMixin],
    props: {
      /**
       * The title of the list
       * */
      title: {
        type: String,
        default: 'Title'
      },

      /**
       * The list with all the data
       * */
      list: {
        type: Array,
        default: () => ([])
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
        default: 200
      },
      /**
       * The fields allowed to show
       * */
      fields: {
        default: () => ({
          image: '',
          title: '',
          subtitle: '',
          description: ''
        })
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
      }
    },
    data: () => ({
      //
    }),
    methods: {
      removeList() {
        this.$emit('remove-list', this.title);
      },

      cardChanged(item) {
        this.$emit('change', item, this.title);
      },

      getAllowedData(data) {
        let allowData = {};
        Object.keys(data).forEach(key => {
          this.columns.forEach(column => {
            if (column.field === key) {
              allowData = Object.assign(allowData, _.pick(data, [key]))
            }
          })
        })
        return allowData;
      },

      getField(key) {
        const field = _.filter(this.columns, ['field', key]);
        return field[0] ? field[0]: field;
      },

      cardClicked(data) {
        this.$emit('cardClicked', data);
      }
    },
    computed: {
      hasData() {
        let count = 0;
        Object.keys(this.fields).forEach(field => {
          if (this.fields[field]) {
            count++;
          }
        })
        return count
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 300px;
    margin: 0 4px;
    height: 100%;
    white-space: nowrap;

    .list-content {
      background-color: rgba(black, .1);
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
        }

        .moving-card {
          opacity: 0.4;
          background: #F7FAFC;
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