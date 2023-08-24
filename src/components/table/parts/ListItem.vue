<template>
  <div>
    <i v-if="isDraggable" class="draggable-icon fa fa-list"></i>
    <img
      class="card-img-top"
      v-if="imageField && getItemProperty(item, imageField)"
      :src="getItemProperty(item, imageField)"
      :alt="getItemProperty(item, titleField)"
      :class="imageClasses"
      :style="imageStyles"
    />
    <div class="card-body">
      <h4
        class="card-title aw-list-item-title"
        style=""
        v-if="getItemProperty(item, titleField)"
        v-html="getItemProperty(item, titleField)"
      ></h4>
      <h6 class="card-title aw-list-item-subtitle" v-if="getItemProperty(item, subtitleField)">
        <AwesomeDisplay
          location="list"
          v-bind="getField(subtitleField)"
          :value="getItemProperty(item, subtitleField)"
          :model="item"
          :schema="getField(subtitleField)"
        />
      </h6>

      <h3
        class="card-title aw-list-item-title"
        style=""
        v-if="!_useClassicLayout && _modelDisplayField && item[_modelDisplayField]"
      >
        {{ item[_modelDisplayField] }}
      </h3>

      <p class="card-text aw-list-item-description" v-if="getItemProperty(item, descriptionField)">
        <AwesomeDisplay
          location="list"
          v-bind="getField(descriptionField)"
          :value="getItemProperty(item, descriptionField)"
          :model="item"
          :schema="getField(subtitleField)"
        />
      </p>
      <div v-if="tagsComputed" class="tags-field">
        <small v-for="(label, idx) in tagsComputed" :key="idx" class="badge badge-primary list-item-label">{{
          label
        }}</small>
      </div>
      <template v-if="columns && columns.length && !_useClassicLayout">
        <div v-for="(itemData, key) in getAllowedFields(item)" :key="key">
          <small class="aw-list-item-field-label text-info">{{ getField(key).label || key }}</small
          ><br />
          <AwesomeDisplay
            location="list"
            v-bind="getField(key)"
            :value="itemData"
            :relation="getField(key).relation"
            :relation-label="getField(key).relationLabel"
            :relation-url="getField(key).relationUrl"
            :relation-key="getField(key).relationKey"
            :model="item"
            :schema="getField(subtitleField)"
          />
        </div>
      </template>
      <div class="aw-list-item-action pl-3 pr-3" v-if="actions.itemButton">
        <button
          @click="handleItemButtonClick($event, item)"
          class="btn btn-primary btn-sm"
          :class="itemsPerRow > 1 ? 'btn-block' : ''"
        >
          {{ $t('AwesomeList.buttons.itemAction') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { pick, find } from 'lodash';
import apiErrors from '../../../mixins/apiErrorsMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import apiListMixin from '../../../mixins/apiListMixin';
import relationMixin from '../../../mixins/relationMixin';
import awEmitMixin from '../../../mixins/awEmitMixin';
import templatingMixin from '../../../mixins/templatingMixin';

import AwesomeDisplay from '../../crud/display/AwesomeDisplay.vue';

export default {
  name: 'ListItem',
  components: {
    AwesomeDisplay
  },
  mixins: [i18nMixin, apiErrors, apiListMixin, relationMixin, awEmitMixin, templatingMixin],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    item: {},
    listModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    imageField: {
      type: String,
      description: 'The field to use for the image'
    },
    titleField: {
      type: String,
      description: 'The field to use for the title'
    },
    subtitleField: {
      type: String,
      description: 'The field to use for the subtitle'
    },
    descriptionField: {
      type: String,
      description: 'The field to use for the description'
    },
    labelsField: {
      type: String,
      description: 'The field to use for the labels (tags)'
    },
    usersField: {
      type: String,
      description: 'The field to use for the users'
    },
    displayedFields: {
      type: Array,
      description: 'The fields to display on the card'
    },
    itemComponent: {
      type: String,
      description: 'The component to use for the item'
    },
    translations: {
      type: Object,
      default: () => ({
        'AwesomeList.buttons.increase': 'More items per row',
        'AwesomeList.buttons.decrease': 'Less items per row',
        'AwesomeList.buttons.refresh': 'Refresh',
        'AwesomeList.buttons.itemAction': 'Open'
      })
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    imageClasses: {
      type: [Object, String],
      default: '',
      description: 'classes to put around the image'
    },
    itemClasses: {
      type: [Object, String],
      default: 'shadow',
      description: 'classes to put around the item'
    },
    imageStyles: {
      type: [Object, String],
      default: '',
      description: 'styles to put around the image'
    },
    actions: {
      type: Object,
      default: () => ({
        itemButton: true,
        refresh: true,
        changeItemsPerRow: true,
        pagination: true,
        reorder: false,
        sort: true
      })
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: '',
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        customBulkActions: []
      })
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    },
    isDraggable: {
      type: Boolean
    }
  },
  data() {
    return {
      itemsPerRow: 3,
      page: 0,
      data: [],
      advancedFilters: [],
      search: '',
      displayAwFilter: false,
      columnSortState: '',
      columnSortDirection: 'asc'
    };
  },
  computed: {
    _useClassicLayout() {
      return this.imageField || this.titleField || this.subtitleField || this.descriptionField;
    },

    _modelDisplayField() {
      if (this._model && this._model.displayField) {
        return this._model.displayField;
      }

      if (this.primaryKeyFieldCpt) {
        return this.primaryKeyFieldCpt;
      }
      return '';
    },

    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },
    _filterableColumns() {
      return this.columns.map((col) => {
        if (col.filterOptions) {
          col.filterOptions.enabled =
            (this.filterable === undefined || this.filterable) &&
            (col.filterOptions.filterable === undefined || col.filterOptions.filterable);
        }
        return col;
      });
    },

    tagsComputed() {
      let tags = this.getLabelsProperty(this.item, this.labelsField);
      return Array.isArray(tags) ? tags : [tags];
    }
  },
  watch: {
    search(newVal) {
      this.onSearch({ searchTerm: newVal });
    }
  },
  created() {},
  beforeMount() {},
  mounted() {},
  beforeDestroy() {},
  methods: {
    getAllowedFields(item) {
      let fields = {};
      Object.keys(item)
        .filter((key) => {
          return this.displayedFields && this.displayedFields.length ? this.displayedFields.includes(key) : true;
        })
        .forEach((key) => {
          this.columns.forEach((column) => {
            if (column.field === key) {
              fields = Object.assign(fields, pick(item, [key]));
            }
          });
        });
      return fields;
    },

    getField(key) {
      return find(this.columns, ['field', key]) || {};
    },
    resetItemsPerRow() {
      this.itemsPerRow = this.perRow;
    },

    handleItemClick($event, item) {
      this.$emit('itemClicked', item);
    },

    handleItemButtonClick($event, item) {
      this.$emit('itemButtonClicked', item);
    }
  }
};
</script>
<style lang="scss">
.aw-list {
  clear: both;
  .aw-list-component {
    .aw-list-item {
      .aw-list {
        &-item {
          &-title {
            color: var(--primary);
            font-weight: bold;
          }
        }
      }
    }

    .list-responsive {
      width: 100%;
      margin: 0;
    }

    .pagination {
      justify-content: center;
    }

    .aw-list-item {
      position: relative;
      overflow: hidden;
      cursor: pointer;

      .draggable-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #ddd;
      }
      .card-body {
        min-height: 50px;
      }
    }

    .col-12 {
      .aw-list-item {
        .card-img-top {
          height: 100%;
          width: 30%;
        }

        .aw-list-item-action {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding-bottom: 10px;
          padding-right: 10px;
          text-align: right;

          button {
            color: #fff;
          }
        }
      }
    }

    .col-2,
    .col-3,
    .col-4,
    .col-6 {
      .aw-list-item {
        .card-img-top {
          height: 60%;
        }

        .aw-list-item-action {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding-top: 5px;
          padding-bottom: 5px;
          background-color: white;

          button {
            color: #fff;
          }
        }
      }
    }
  }
  .awesome-list {
    clear: both;
  }

  .aw-list-header {
    width: 100%;
    text-align: left;
  }

  .ajax-table-img {
    max-height: 50px;
  }

  .ajax-table-checkbox {
    height: 18px;
    width: 18px;
  }

  .text-avoid-overflow {
    max-width: 30vw;
  }

  .vgt-date-range {
    height: 32px;
    width: 100%;

    .form-control {
      padding: 6px 12px;
      height: 32px;
      font-size: 12px;
    }
  }

  .daterangepicker.dropdown-menu {
    visibility: visible;
    opacity: 1;
  }

  .ajax-table-header.card-header.colored-header {
    color: white;

    * {
      color: white;
    }
  }

  // font-awesome icons
  .font-awesome-pencil {
    color: #17a2b8;
  }

  .font-awesome {
    color: #6c757d;
  }
}
</style>
