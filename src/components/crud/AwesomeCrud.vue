<template>
  <div class="content aw-crud" :class="'aw-crud-mode-' + displayMode">
    <div class="container-fluid">
      <div class="row ">
        <div class="col-12 awesomecrud-detail-section">
          <AwesomeForm
            v-bind="$props"
            v-if="showViewFormComputed"
            :actions="_actions"
            :custom-inline-actions="_customInlineActions"
            :custom-top-actions="_customFormTopActions"
            :display-header="awFormDisplayHeader"
            :displayMode="mergedOptions.detailPageMode"
            :edit-layout-mode="editLayoutMode"
            :has-next="hasNext"
            :has-previous="hasPrevious"
            :identity="identity"
            :item="selectedItem"
            :layout="viewPageLayoutComputed"
            :mode="displayMode"
            :model="_model"
            :needs-refresh.sync="awesomeEditNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :parent="parent"
            :schema="schemaComputed"
            :standalone="false"
            :url="_url"
            @create="goToCreatePage"
            @view="goToViewPage"
            @nestedView="nestedViewFunction"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @cancel="onViewDisplayCancelled"
            @closeRequested="onViewDisplayCancelled"
            @customAction="onCustomAction"
            @beforeCreate="forwardEvent.bind(this, 'beforeCreate')"
            @itemCreated="onItemCreated"
            @itemEdited="onItemEdited"
            @itemsBulkEdited="onItemsBulkEdited"
            @itemDeleted="onItemDeleted"
            @itemViewed="onItemViewed"
            @itemValidated="onItemValidated"
            @itemValidationFailed="onItemValidationFailed"
            @layout-updated="onLayoutUpdated"
            @layout-resetted="onLayoutUpdated"
            @layout-fields-updated="onLayoutFieldsUpdated"
            @open-edit-layout-mode="onOpenEditLayoutMode"
            @close-edit-layout-mode="onCloseEditLayoutMode"
            @aw-select-previous-item="selectPreviousItem"
            @aw-select-next-item="selectNextItem"
          />
          <AwesomeForm
            v-bind="$props"
            v-if="showEditFormComputed"
            :mode="displayMode"
            :model="_model"
            :schema="schemaComputed"
            :identity="identity"
            :displayMode="mergedOptions.detailPageMode"
            :layout="displayMode === 'create' ? createPageLayoutComputed : editPageLayoutComputed"
            createPageLayoutComputed
            :item="selectedItem"
            :bulk-items="selectedItems"
            :needs-refresh.sync="awesomeEditNeedsRefresh"
            :edit-layout-mode="editLayoutMode"
            :standalone="false"
            :display-header="awFormDisplayHeader"
            :has-previous="hasPrevious"
            :has-next="hasNext"
            :actions="_actions"
            :custom-inline-actions="_customInlineActions"
            :custom-top-actions="_customFormTopActions"
            @create="goToCreatePage"
            @view="goToViewPage"
            @nestedView="nestedViewFunction"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @cancel="onEditDisplayCancelled"
            @closeRequested="onEditDisplayCancelled"
            @customAction="onCustomAction"
            @customBulkAction="onCustomBulkAction"
            @itemCreated="onItemCreated"
            @itemEdited="onItemEdited"
            @itemsBulkEdited="onItemsBulkEdited"
            @itemDeleted="onItemDeleted"
            @itemViewed="onItemViewed"
            @itemValidated="onItemValidated"
            @itemValidationFailed="onItemValidationFailed"
            @layout-updated="onLayoutUpdated"
            @layout-resetted="onLayoutUpdated"
            @layout-fields-updated="onLayoutFieldsUpdated"
            @open-edit-layout-mode="onOpenEditLayoutMode"
            @close-edit-layout-mode="onCloseEditLayoutMode"
            @aw-select-previous-item="selectPreviousItem"
            @aw-select-next-item="selectNextItem"
          />
        </div>

        <div
          class="col-12"
          v-show="!(supportedDataDisplayModes.indexOf(displayMode) === -1 || mergedOptions.detailPageMode === 'page')"
        >
          <!--
            SEGMENTS
          <ul class="nav nav-tabs nav-justified nav-fill">
            <li class="nav-item bg-primary">
              <a class="nav-link active " href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Longer nav link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          -->
          <div v-if="mergedOptions.stats" class="row">
            <EnyoCrudStatsSection
              :url="_url + '/stats'"
              :entity="identity"
              :stats-needs-refresh.sync="statsNeedsRefresh"
            />
          </div>
        </div>
        <div class="col-12" v-show="showItemsListSectionComputed">
          <div class="text-right">
            <slot name="top-right-buttons">
              <template v-if="_customTopRightActions">
                <button
                  v-for="(action, index) in _customTopRightActions"
                  :key="index"
                  class="btn btn-simple btn-main-style"
                  :class="action.class"
                  :id="action.name"
                  :data-title="action.title || action.label"
                  :tooltip="action.title || action.label"
                  :data-tooltip="action.title || action.label"
                  type="button"
                  @click="
                    onCustomAction({
                      action,
                      location: 'topright',
                      id: action.name
                    })
                  "
                >
                  <i v-if="action.icon" :class="action.icon" />
                  <span v-html="action.label ? $t(action.label) : ''"></span>
                </button>
              </template>
              <button
                v-if="
                  canShowCreateButton &&
                    !_isANestedDetailView &&
                    (displayMode === 'table' ||
                      (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'table'))
                "
                :disabled="!canShowCreateButton"
                class="btn btn-primary btn-simple aw-button-add"
                @click="goToCreatePage()"
                type="button"
              >
                <i class="fa fa-plus" />
                {{ $t('AwesomeCrud.labels.createNew') }} {{ _name }}
              </button>
            </slot>
          </div>
          <AwesomeList
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'list' ||
                  (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'list'))
            "
            :url="_url"
            :perPage="10"
            :identity="identity"
            v-bind="listOptions"
            :title="_title || $t('AwesomeCrud.labels.manageTitle') + ' ' + _titlePlural"
            :columns="listFieldsComputed"
            :displayFields="listOptions.displayFields"
            :imageField="listOptions.imageField"
            :imageClasses="listOptions.imageClasses"
            :imageStyles="listOptions.imageStyles"
            :titleField="listOptions.titleField"
            :subtitleField="listOptions.subtitleField"
            :descriptionField="listOptions.descriptionField"
            :api-query-params="mergedOptions.queryParams"
            :api-query-headers="mergedOptions.headerParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :actions="_actions"
            :mode="dataPaginationModeComputed"
            :useRouterMode="useRouterMode"
            :auto-refresh="mergedOptions.autoRefresh"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :export-url="mergedOptions.exportUrl"
            :styles="{
              listWrapperClasses: 'row',
              itemWrapperClasses: 'col-3'
            }"
            @itemClicked="onListItemClicked"
          >
          </AwesomeList>
          <AwesomeKanban
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'kanban' ||
                  (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'kanban'))
            "
            v-bind="_kanbanOptions"
            :title="_title || $t('AwesomeCrud.labels.manageTitle') + ' ' + _titlePlural"
            :columns="kanbanFieldsComputed"
            :fields="_kanbanOptions.fields"
            :entity="identity"
            :url="_url"
            :api-query-params="mergedOptions.queryParams"
            :api-query-headers="mergedOptions.headerParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :useRouterMode="useRouterMode"
            :options="_kanbanOptions.options"
            @customListAction="onCustomListAction"
            @removeList="onRemoveList"
            @listChanged="onListChanged"
            @cardChanged="onCardChanged"
            @cardClicked="onCardClicked"
          >
          </AwesomeKanban>
          <AwesomeTable
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'table' ||
                  (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'table'))
            "
            v-bind="$props"
            :actions="_actions"
            :custom-inline-actions="_customInlineActions"
            :custom-table-top-actions="_customTableTopActions"
            :custom-bulk-actions="_customBulkActions"
            :api-query-headers="mergedOptions.headerParams"
            :api-query-params="mergedOptions.queryParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :auto-refresh="mergedOptions.autoRefresh"
            :collapsible="false"
            :columns-displayed="mergedOptions.columnsDisplayed"
            :columns="tableColumnsComputed"
            :entity="identity"
            :export-url="mergedOptions.exportUrl"
            :limit="tableDataLimit"
            :mode="dataPaginationModeComputed"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :saveColumnsState="saveColumnsState"
            :savePaginationState="savePaginationState"
            :title="_title || $t('AwesomeCrud.labels.manageTitle') + ' ' + _titlePlural"
            :url="_url"
            :useRouterMode="useRouterMode"
            :uuid="'awtable-' + identity"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @bulkDelete="goToBulkDeletePage"
            @bulkEdit="goToBulkEditPage"
            @customAction="onCustomAction"
            @customBulkAction="onCustomBulkAction"
            @table-updated="onListUpdated"
            @refresh="onTableRefresh"
            @onRowClicked="onTableRowClicked"
            @onRowDoubleClicked="onTableRowDoubleClicked"
            @updateAutoRefresh="updateAutoRefresh"
            @data-changed="onDataChanged"
          >
            <template slot="table-top-more-actions">
              <upload-button
                v-if="_actions.import"
                name="import"
                :options="{
                  upload: true,
                  targetUrl: mergedOptions.uploadUrl || mergedOptions.importUrl,
                  method: 'POST',
                  headers: {},
                  base64: false,
                  label: $t('AwesomeCrud.buttons.import'),
                  class: 'btn btn-main-style btn btn-simple text-success  btn-block'
                }"
                @uploaded="importResponse"
              />
              <button
                v-if="_actions.import"
                class="btn text-info btn-link btn-alt-style btn-block"
                type="button"
                @click="exportTemplateCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeCrud.buttons.excel-template') }}
              </button>
              <button
                v-if="mergedOptions.useCustomLayout && _actions.editLayout"
                type="button"
                class="btn btn-simple btn-default btn-block"
                @click="goToCreatePage({ editLayoutMode: true })"
              >
                <i class="fa fa-th-large"></i>
                {{ $t('AwesomeCrud.buttons.openEditLayoutMode') }}
              </button>
            </template>

            <!-- END OF ARRAY -->
          </AwesomeTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import qs from 'qs';
import parseJsonSchema from '../../mixins/parseJsonSchemaMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awesomeFormMixin from '../../mixins/awesomeFormMixin';
import relationMixin from '../../mixins/relationMixin';
import awEmitMixin from '../../mixins/awEmitMixin';
import uuidMixin from '../../mixins/uuidMixin';
// import notificationsMixin from '../../mixins/notificationsMixin';
import i18nMixin from '../../mixins/i18nMixin';
import { defaultActions, defaultKanbanOptions } from '../../mixins/defaultProps';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import AwesomeTable from '../table/AwesomeTable.vue';
import EnyoCrudStatsSection from '../misc/EnyoCrudStatsSection.vue';
import AwesomeForm from './AwesomeForm.vue';
import AwesomeList from '../table/AwesomeList';
import AwesomeKanban from '../table/AwesomeKanban';
import { createDefaultObject } from '../form/form-generator/utils/schema';

import 'vue-good-table/dist/vue-good-table.css';

const defaultOptions = {
  mode: 'local', // Deprecated use dataPaginationMode
  dataPaginationMode: 'local',
  defaultOptions: true,
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  autoRefreshInterval: 20, // in seconds
  initialDisplayMode: 'table', // table | list | kanban
  detailPageMode: 'sidebar', // fade | slide | full
  detailPageLayout: null, // fade | slide | full
  columnsDisplayed: 10
};

const listOptions = {
  displayFields: [], // list of fields to use for the display
  imageField: '',
  titleField: '',
  subtitleField: '',
  descriptionField: ''
};

export default {
  name: 'AwesomeCrud',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  description: `This component magically create lists and edit data based on a json schema.

  ### Usage.

  There are 3 ways of using the Awesome Crud.
  The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based awesome crud.

  If you want to further personalize your page, it's possible to create your own component, use the awesome crud in the body, and then use slots to create the desired features.

  The 3rd way of reusing the Awesome Crud if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.
  Whatever the reason for you to modify the component, we suggest that you copy the html code as source for your edits.

  ### Actions

  The crud compoenent allows to define which actions are enabled on a component. There are many default actions that can be configured
  - create
  - edit
  - noActions (globally disable all actions)
  - search
  - filter
  - create
  - view
  - delete
  - export
  - import
  - dateFilter
  - refresh
  )

  ### custom actions

  In addition to the default actions on a awesome crud it's also possible to create custom actions.
  `,
  token: `
  // example of route for awesome crud
  {
   name: 'contact',
   path: 'contact',
   component: AwesomeCrud,
   beforeEnter: authGuard,
   props: {
     identity: 'contact',
     options: {
       url: '/contact',
       stats: true,
       actions: {
         view: true,
         delete: true,
       }
     }
   },
   children: [{
     name: 'contact-view',
     path: ':id',
     component: AwesomeCrud,
     props: {
       identity: 'contact',
       options: {
         actions: {
           view: true,
           delete: true,
         }
       }
     }
   }, {
     name: 'contact-edit',
     path: ':id/edit',
     component: AwesomeCrud,
     props: {
       identity: 'contact',
       options: {
         actions: {
           edit: true,
           view: true,
           delete: true,
         }
       }
     }
   }]
 }
 ,
 `,
  components: {
    AwesomeTable,
    EnyoCrudStatsSection,
    AwesomeForm,
    AwesomeList,
    AwesomeKanban
  },
  mixins: [
    uuidMixin,
    i18nMixin,
    apiErrorsMixin,
    apiConfigMixin,
    awesomeFormMixin,
    relationMixin,
    parseJsonSchema,
    awEmitMixin
    // notificationsMixin
  ],
  props: {
    title: { type: [String, Boolean], required: false, default: undefined },
    pageTitle: { type: [String, Boolean], required: false, default: undefined },
    name: { type: [String, Boolean], required: false, default: undefined },
    namePlural: { type: [String, Boolean], required: false, default: undefined },
    modelName: {
      type: String,
      required: false,
      note: 'Deprecated use identity'
    },
    identity: {
      type: String,
      required: true,
      note: 'Deprecated use identity'
    },

    primaryKey: {
      type: String,
      default: 'id',
      note: 'The field to use as a primary key (id / _id)'
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note:
        'The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop.'
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note:
        'The json schema that represent the object to display. this is used to create. Must be provided if no model definition is available'
    },
    layout: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The layout of the create/edit/view pages'
    },
    crudNeedsRefresh: {
      type: Boolean,
      default: false,
      note: 'Define whether the content of the table list should be refreshed'
    },
    needsRefresh: {
      type: Boolean,
      default: false,
      note: 'Define whether the content of the component should be refreshed'
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note: '@deprecated, use `nestedModels`'
    },
    nestedModels: {
      type: Array,
      required: false,
      default: () => [],
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'table',
      values: ['view', 'edit', 'object', 'table'],
      note:
        'In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form. Exemple a list of posts with a comments as a nested should display a table, whereas the author info should display as an object...'
    },
    nestedLayoutMode: {
      type: String,
      required: false,
      default: 'horizontal-tabs',
      values: ['horizontal-tabs', 'vertical-tabs', 'list'],
      note:
        'In case of a nested schema, this parameter determines how the nested the models should be rendered. Exemple a list of posts with a comments as a nested should display a table, whereas the author info should display as an object...'
    },
    parent: {
      type: Object,
      required: false,
      note: `The object containing the parent in case of a nested schema.
        'You don't actually to pass this, it's done automatically by the parent component itself`
    },
    parentIdentity: {
      type: String,
      required: false,
      description: 'The identity of the parent'
    },
    useRouterMode: {
      type: Boolean,
      required: false,
      default: true,
      node: 'Controls if the actions (create / edit / view)  should update the current route url'
    },
    translations: {
      type: Object,
      required: false,
      default: () => ({
        AwesomeCrud: {
          labels: {
            manageTitle: 'Manage'
          },
          buttons: {
            view: 'View',
            cancel: 'Cancel'
          }
        }
      }),
      note: 'Translation labels to use when vue-i18n is not present'
    },
    options: {
      type: Object,
      default: () => defaultOptions
    },
    listOptions: {
      type: Object,
      default: () => listOptions
    },
    kanbanOptions: {
      type: Object,
      default: () => defaultKanbanOptions
    },
    actions: {
      type: Object,
      default: () => defaultActions,
      note: 'actions active in this instance'
    },
    customTopRightActions: {
      type: Array,
      default: () => [],
      note: 'custom action in top right of awCrud'
    },
    customInlineActions: {
      type: Array,
      default: () => [],
      note: 'custom action in footer and in awTable row'
    },
    customBulkActions: {
      type: Array,
      default: () => [],
      note: 'custom action for bulk'
    },
    customTableTopActions: {
      type: Array,
      default: () => [],
      note: 'custom table top actions'
    },
    customFormTopActions: {
      type: Array,
      default: () => [],
      note: 'custom top action to display inside view and edit forms'
    },
    savePaginationState: {
      type: Boolean,
      default: true,
      description: 'Whether we should save the state of the navigation (page, filters, sort etc'
    },
    saveColumnsState: {
      type: Boolean,
      default: true,
      description: 'Whether we should save the state of the navigation (page, filters, sort etc'
    },
    tableRowClickAction: {
      type: String,
      default: 'view',
      values: ['view', 'edit', 'none', 'delete'],
      description: 'The action to execute when the user clicks on a row'
    },
    tableRowDoubleClickAction: {
      type: String,
      default: 'none',
      values: ['view', 'edit', 'none', 'delete'],
      description: 'The action to execute when the user double clicks on a row'
    },
    awFormDisplayHeader: {
      type: Boolean,
      default: true,
      description: 'Whether we should display the header (title) of awesomeform or not'
    },
    tableDataLimit: {
      type: Number,
      default: 1000,
      description:
        'Define the number of items to get from the api for the table. This prevents overloading the table with too much data'
    }
  },
  data() {
    return {
      parentPath: '',
      selectedItem: {},
      selectedItems: [],
      previousDisplayMode: '',
      displayMode: 'table',
      isRefreshing: false,
      tableNeedsRefresh: false,
      awesomeEditNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      mergedOptions: {},
      innerNestedSchemas: [],
      activeNestedTab: 'general',
      formOptions: {
        validateAsync: false,
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: 'AwesomeCrud'
      },
      supportedDataDisplayModes: ['table', 'list', 'kanban'],
      editLayoutMode: false,
      itemsList: []
    };
  },
  computed: {
    _title() {
      // @deprecated
      if (this._model && this._model.pageTitle) {
        return this.$te(this._model.pageTitle) ? this.$t(this._model.pageTitle) : this._model.pageTitle;
      }

      if (this.title) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this._model && this._model.singularName) {
        return this.$te(this._model.singularName)
          ? this.$t(this._model.singularName)
          : _.startCase(this._model.singularName);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : _.startCase(this.identity);
      }
      return '';
    },

    _titlePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : _.startCase(this._model.namePlural);
      }

      if (this.title) {
        return this.$te(this.title + 's') ? this.$t(this.title + 's') : this.title + 's';
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}s`)
          ? this.$t(`app.labels.${this.identity}s`)
          : _.startCase(this.identity + 's');
      }
      return '';
    },

    _name() {
      if (this._model && this._model.name) {
        return this.$te(this._model.name) ? this.$t(this._model.name) : this._model.name;
      }
      if (this.name) {
        return this.$te(this.name) ? this.$t(this.name) : this.name;
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : _.startCase(this.identity);
      }
      return '';
    },

    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },

    _namePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : _.startCase(this._model.namePlural);
      }

      if (this.namePlural) {
        return this.$te(this.namePlural) ? this.$t(this.namePlural) : _.startCase(this.namePlural);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : _.startCase(this.identity);
      }
      return '';
    },

    // _url() see apiConfigMixin
    // _selectedItemUrl() see apiConfigMixin

    schemaComputed() {
      return this.schema || (this._model && this._model.schema);
    },

    formSchema() {
      if (!this.schemaComputed) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this.schemaComputed);
      return parsedFormSchema;
    },

    listFieldsComputed() {
      const allColumns = this.parseColumns(this.schemaComputed.properties);
      let columns = [];
      if (this.listOptions && Array.isArray(this.listOptions.fields)) {
        this.listOptions.fields.forEach((field) => {
          columns.push(_.filter(allColumns, ['field', field]));
        });
        columns = _.flatten(columns);
        return columns;
      }

      return allColumns;
    },

    kanbanFieldsComputed() {
      const allColumns = this.parseColumns(this.schemaComputed.properties);
      let columns = [];
      if (this._kanbanOptions && !Array.isArray(this._kanbanOptions.fields)) {
        return [];
      }
      this._kanbanOptions.fields.forEach((field) => {
        columns.push(_.filter(allColumns, ['field', field]));
      });
      columns = _.flatten(columns);
      return columns;
    },

    tableColumnsComputed() {
      return this.parseColumns(this.schemaComputed.properties);
    },

    _layout() {
      return this.layout || (this.model && this.model.formOptions && this.model.formOptions.layout);
    },
    _createFormLayout() {
      return (this.model && this.model.formOptions && this.model.formOptions.createLayout) || this._layout;
    },

    _editFormLayout() {
      return (this.model && this.model.formOptions && this.model.editLayout) || this._layout;
    },

    createPageLayoutComputed() {
      return (
        this.createPageLayout ||
        (this.model && this.model.formOptions && this.model.formOptions.createLayout) ||
        this._layout
      );
    },
    viewPageLayoutComputed() {
      return (
        this.viewPageLayout ||
        (this.model && this.model.formOptions && this.model.formOptions.viewPageLayout) ||
        this._layout
      );
    },
    editPageLayoutComputed() {
      return (
        this.editPageLayout ||
        (this.model && this.model.formOptions && this.model.formOptions.editPageLayout) ||
        this._layout
      );
    },

    _actions() {
      return _.merge(
        {},
        defaultActions,
        this.actions || (this.mergedOptions && this.mergedOptions.actions) // old location kept for BC
      );
    },

    _customFormTopActions() {
      return _.merge(
        [],
        this.customFormTopActions || (this.mergedOptions && this.mergedOptions.customFormTopActions) // old location kept
      );
    },

    _customInlineActions() {
      return _.merge(
        [],
        this.customInlineActions || (this.mergedOptions && this.mergedOptions.customInlineActions) // old location kept
      );
    },

    _customTopRightActions() {
      return _.merge(
        [],
        this.customTopRightActions || (this.mergedOptions && this.mergedOptions.customTopRightActions) // old location kept
      );
    },

    _customTableTopActions() {
      return _.merge(
        [],
        this.customTableTopActions || (this.mergedOptions && this.mergedOptions.customTableTopActions) // old location kept
      );
    },

    _customBulkActions() {
      return _.merge(
        [],
        this.customBulkActions || (this.mergedOptions && this.mergedOptions.customBulkActions) // old location kept
      );
    },

    _displayModeHasPartialDisplay() {
      return (
        [
          'modal',
          'sidebar',
          'sidebar-left',
          'sidebar-right',
          'fade', // deprecated
          'slide' // deprecated
        ].indexOf(this.mergedOptions.detailPageMode) > -1
      );
    },

    _kanbanOptions() {
      return _.merge({}, defaultKanbanOptions, this.kanbanOptions);
    },

    canShowCreateButton() {
      return (
        this._actions.create &&
        !(['view', 'edit', 'create'].indexOf(this.displayMode) > -1 && this.mergedOptions.detailPageMode === 'page')
      );
    },

    showEditFormComputed() {
      return (
        this.identity &&
        (this.displayMode === 'edit' || this.displayMode === 'create' || this.displayMode === 'bulkEdit')
      );
    },

    showViewFormComputed() {
      return this.identity && this.displayMode === 'view';
    },

    showItemsListSectionComputed() {
      return (
        this.supportedDataDisplayModes.indexOf(this.displayMode) > -1 || this.mergedOptions.detailPageMode !== 'page'
      );
    },

    currentItemIndex() {
      return (
        this.itemsList &&
        this.selectedItem &&
        _.findIndex(this.itemsList, (data) => data[this.primaryKey] == this.selectedItem[this.primaryKey])
      );
    },

    hasPrevious() {
      return this.currentItemIndex > -1 && !!this.itemsList[this.currentItemIndex - 1];
    },

    hasNext() {
      return this.currentItemIndex > -1 && !!this.itemsList[this.currentItemIndex + 1];
    },

    dataPaginationModeComputed() {
      return this.mergedOptions.dataPaginationMode || this.mergedOptions.mode;
    }
  },
  watch: {
    // call again the method if the route changes
    identity: 'loadModel',
    model: 'loadModel',
    'parent.id': 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent',
    needsRefresh: 'refreshComponent',
    '$route.params.id': 'onRouteIdChanged'
  },
  created() {
    window._vue = this;
    if (!this.$http) {
      try {
        const axios = require('axios');
        this.$http = axios;
      } catch (err) {
        // console.warn(err.message);
      }
    }
  },
  mounted() {
    // allow old property names to still work
    if (!this.identity) {
      throw new Error('missing_required_props_identity');
    }
    if (this.nestedSchemas && this.nestedSchemas.length) {
      console.warn('@deprecated nestedSchemas is now nestedModels. Please use nested nestedModels');
    }

    this.loadModel();
    this.displayMode = this.mergedOptions.initialDisplayMode;

    if (this._isNested) {
      this.displayMode = this.nestedDisplayMode;
    }
    /*
    if (this._isANestedDetailView && this.viewMode === "detail") {
      this.viewMode = this.nestedDisplayMode;
    }
*/
    if (!this.$route || !this.useRouterMode) {
      // stop if we don't have a router to bind ourselves to
      return;
    }

    this.parentPath = this.$route.path;
    this.parentPath = this.parentPath
      .replace('/view', '')
      .replace('/edit', '')
      .replace('/:id', '');

    this.$forceUpdate();
    // const matched = this.$route.matched[this.$route.matched.length - 1];
    this.initializeSelectedItem();
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next((vm) => {});
  },
  beforeRouteLeave(to, from, next) {
    next((vm) => {
      if (vm && vm.closeModal) {
        vm.closeModal();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    next((vm) => {
      // if we are on the same component and coming from a detail list
      if (vm && vm.closeModal && from.params.id && !to.params.id) {
        vm.closeModal();
      }
    });
  },

  methods: {
    $alert: Swal,
    refreshComponent(newVal, preVal) {
      if (!newVal || newVal === false) {
        return;
      }
      if (this.identity) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.awesomeEditNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;

      setTimeout(() => {
        this.tableNeedsRefresh = false;
        this.statsNeedsRefresh = false;
        //  this.awesomeEditNeedsRefresh = false;
        this.nestedCrudNeedsRefresh = false;
        this.$emit('update:crudNeedsRefresh', false);
        this.$emit('input:crudNeedsRefresh', false);
        this.$emit('input:needs-refresh', false);
      }, 100);
    },

    onTableRefresh() {
      this.statsNeedsRefresh = true;
    },

    mergeOptions() {
      if (this.options && this.options.deletePermitted && this._actions.delete) {
        if (
          this.$store &&
          this.$store.state &&
          !this.options.deletePermitted.some((v) => this.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0)
        ) {
          this._actions.delete = false;
        }
      }
      this.mergedOptions = _.merge({}, defaultOptions, this.mergedOptions, this.options);
      if (this.$route && this.$route.query && this.$route.query.filters) {
        this.mergedOptions.queryParams = _.merge(
          this.mergedOptions.queryParams,
          { filters: this.$route.query.filters },
          { fields: this.$route.query.fields }
        );
      }
    },
    callbackFunctionForBAse64(e) {},

    importResponse(e) {
      // swal({title: this.$t('common.messages.successfullyImported',{title: this.name}), type: 'success'})
      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
        Swal.fire({
          title: this.$t('common.messages.no_data_imported', {
            title: this._title
          }),
          type: 'warning'
        });
        return;
      }

      if (e.properData.length > 0) {
        this.$awNotify({
          title: this.$t('common.messages.successfullyImported', {
            title: this._title
          }),
          type: 'success'
        });
      }

      if (e.improperData.length > 0) {
        let message = '';
        e.improperData.forEach((element) => {
          message += ` - ${Object.values(element).join(' | ')}, `;
        });
        message = message.substring(0, message.length - 2);
        setTimeout(() => {
          this.$awNotify({
            title: `${e.improperData.length} ${this.$t('common.messages.not_imported', {
              title: this._title
            })}`,
            message,
            type: 'warning',
            timeout: 30000
          });
        }, 0);
      }
      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;
      this.$forceUpdate();
    },

    exportTemplateCallBack() {
      if (!this.mergedOptions.importUrl) {
        this.$awNotify({ title: '[WARN] missing export url', type: 'warning' });
        return;
      }
      this.$http
        .get(this.mergedOptions.importUrl + '-template', {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement('a');
            link.download = `${this.identity}_export`;
            link.href = res.data.url;
            link.click();
            link.remove();
          }
        })
        .catch(this.apiErrorCallback);
    },

    loadModel() {
      this.mergeOptions();

      if (!this._model && !this.schema) {
        console.warn('AWESOME CRUD ERROR', `model ${this.identity} not found`);
        return;
      }

      this.mergedOptions.columns = this.parseColumns(this.schemaComputed.properties);
      // now a computed property...
      // this.mergedOptions.url =
      //   this.url ||
      //   (this.options && this.options.url) ||
      //   (this._model && this._model.url) ||
      //   `/${this.identity}`;
      // if (typeof this.mergedOptions.url === 'function') {
      //   this.mergedOptions.url = this.mergedOptions.url(this.parent, this);
      // }

      if (!this.mergedOptions.exportUrl) {
        this.mergedOptions.exportUrl = `${this._url}/export`;
      }

      if (!this.mergedOptions.importUrl) {
        this.mergedOptions.importUrl = `${this._url}/import`;
      }

      // if the crud is nested and should display as a form then load the data from remote
      if (this.parent && this.nestedDisplayMode === 'object') {
        this.nestedViewFunction();
      }

      // if the crud is nested and should display as a form then remote load the data
      if (this.parent) {
        this.nestedCrudNeedsRefresh = true;
      }
      // if the crud is nested and should display as a form then remote load the data
      if (
        this.parent &&
        (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'edit' || this.nestedDisplayMode === 'object')
      ) {
        this.getNestedItem().then(() => {
          if (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'object') {
            //  this.openModal();
          }
          if (this.nestedDisplayMode === 'edit') {
            // this.editFunction(this.selectedItem);
            this.$alert.fire({
              title: this.$t('Nested editing of object is not allowed yet...', {
                title: this.modelName
              }),
              type: 'success'
            });
          }
        });
      }

      if (!this._url) {
        return;
      }

      if (this.useRouterMode) {
        if (this.$route && this.$route.params) {
          // if it's a create url

          if (this.$route.params.id === 'new' || this.$route.path.endsWith('/new')) {
            this.setDisplayMode('create');
            this.$forceUpdate();
            return;
          }
          // if it's a edit or view url
          if (this.$route.params.id) {
            this.$http
              .get(`${this._url}/${this.$route.params.id}`, { query: this.apiRequestPermanentQueryParams })
              .then((res) => {
                const matched = this.$route.matched[this.$route.matched.length - 1];
                const data =
                  this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
                    ? _.get(res, this.apiResponseConfig.dataPath)
                    : res.data;
                if (matched.path.indexOf('/edit') !== -1) {
                  this.setDisplayMode('edit', data);
                } else {
                  this.setDisplayMode('view', data);
                }
                this.$forceUpdate();
              })
              .catch(this.apiErrorCallback)
              .finally(() => {
                this.isRefreshing = false;
              });
          }
        }
      }
    },

    getSelectEnumFromStore(val) {
      const options =
        _.isString(val) && val.indexOf('$store') === 0 ? _.get(this.$store.state, val.replace('$store.', '')) : val;
      return options;
    },

    /** @param mode: string */
    setDisplayMode(mode, item, options = { refresh: true }) {
      // console.warn('setDisplayMode', mode, item);
      if (['edit', 'view'].indexOf(mode) > -1) {
        this.$awEmit('aw-form-open');
        const { ...data } = item;
        this.itemIndex = _.findIndex(this.itemList, data);
        this.hasPrevious = this.itemIndex !== -1 && this.itemIndex !== 0;
        this.hasNext = this.itemIndex < this.itemList.length - 1;
      }
      this.previousDisplayMode = this.displayMode || this.mergedOptions.initialDisplayMode;
      if (mode === 'bulkEdit') {
        this.selectedItem = {};
        this.selectedItems = item;
      } else {
        this.selectedItem = item;
        this.selectedItems = [];
      }
      //  console.warn('setDisplayMode', mode);
      this.displayMode = mode;
      if (['table', 'list', 'kanban'].indexOf(mode) > -1) {
        this.tableNeedsRefresh = options.refresh;
        this.selectedItem = {};
      } else {
        this.awesomeEditNeedsRefresh = options.refresh;
      }
    },

    goToCreatePage(options = { reset: true, editLayoutMode: false }) {
      if (this.mergedOptions.createPath) {
        return this.$router.push(this.mergedOptions.createPath);
      }
      if (options.reset) {
        this.selectedItem = createDefaultObject(this.formSchema);
      }
      if (options.editLayoutMode) {
        this.editLayoutMode = options.editLayoutMode;
      }

      if (this.$route.query.item) {
        this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
      }
      this.setDisplayMode('create', this.selectedItem);
      if (this.useRouterMode && !options.reset) {
        this.$router.push(`${this.parentPath}/new?${qs.stringify(this.$route.query)}`);
      }

      return;
    },

    goToBulkEditPage(items, options = { reset: true }) {
      if (this.mergedOptions.bulkEditPath) {
        return this.$router.push(this.mergedOptions.bulkEditPath);
      }
      this.setDisplayMode('bulkEdit', items);
    },

    goToDeletePage(item) {
      if (this.mergedOptions.createPath) {
        return this.$router.push(
          this.mergedOptions.deletePath.replace(':id', item[this.primaryKey]).replace('{{id}}', item[this.primaryKey])
        );
      }

      this.deleteFunction(item);
      return;
    },

    goToBulkDeletePage(items) {
      this.bulkDeleteFunction(items);
    },

    goToEditPage(item) {
      if (this.mergedOptions.editPath) {
        return this.$router.push(
          this.mergedOptions.editPath.replace(':id', item[this.primaryKey]).replace('{{id}}', item[this.primaryKey])
        );
      }
      if (this.useRouterMode) {
        window.history.pushState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
      }
      this.setDisplayMode('edit', item);
    },

    goToViewPage(item) {
      if (!item) {
        return;
      }
      if (this.mergedOptions.viewPath) {
        if (item && item[this.primaryKey]) {
          return this.$router.push(
            this.mergedOptions.viewPath.replace(':id', item[this.primaryKey]).replace('{{id}}', item[this.primaryKey])
          );
        }
        return this.$router.push(this.mergedOptions.viewPath);
      }
      if (this.useRouterMode) {
        window.history.pushState({}, null, `${this.parentPath.replace(':id', '')}/${item[this.primaryKey]}`);
      }
      this.setDisplayMode('view', item);
    },

    nestedViewFunction() {
      this.displayMode = 'view';
      this.$http
        .get(`${this._url}`)
        .then((res) => {
          this.selectedItem =
            this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
              ? _.get(res, this.apiResponseConfig.dataPath)
              : res.data;
          this.nestedCrudNeedsRefresh = true;
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    bulkEditFunction(item) {
      this.$http
        .put(`${this._url}/${item[this.primaryKey]}`, item)
        .then((res) => {
          this.$emit(this.identity + '-item-updated', res.data);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: this.$t('AwesomeDefault.messages.successfullyModified', {
              title: this.type
            }),
            type: 'success'
          });
          this.tableNeedsRefresh = true;
          this.nestedCrudNeedsRefresh = true;
          this.$forceUpdate();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    bulkDeleteFunction(items) {
      Swal.fire({
        title: this.$t('AwesomeDefault.messages.are_you_sure'),
        text: this.$t('AwesomeDefault.messages.wont_be_able_recover'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: '#eee',
        confirmButtonText: this.$t('AwesomeCrud.buttons.yes_delete_it'),
        cancelButtonText: this.$t('AwesomeCrud.buttons.cancel'),
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            items.forEach((item) => {
              this.selectedItem = item;
              this.$http
                .delete(`${this._selectedItemUrl}`)
                .then(() => {
                  this.tableNeedsRefresh = true;
                  this.statsNeedsRefresh = true;
                  this.nestedCrudNeedsRefresh = true;
                  this.$forceUpdate();
                })
                .catch((err) => {
                  // eslint-disable-next-line
                  console.error(err);
                })
                .finally(() => {
                  this.isRefreshing = false;
                });
            });
          }
        })
        .finally(() => (this.selectedItem = null));
    },

    deleteFunction(item) {
      this.selectedItem = item;
      Swal.fire({
        title: this.$t('AwesomeDefault.messages.are_you_sure'),
        text: this.$t('AwesomeDefault.messages.wont_be_able_recover'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: '#eee',
        confirmButtonText: this.$t('AwesomeCrud.buttons.yes_delete_it'),
        cancelButtonText: this.$t('AwesomeCrud.buttons.cancel'),
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            this.$http
              .delete(`${this._selectedItemUrl}`)
              .then(() => {
                this.tableNeedsRefresh = true;
                this.statsNeedsRefresh = true;
                this.nestedCrudNeedsRefresh = true;
                this.$forceUpdate();
              })
              .catch((err) => {
                // eslint-disable-next-line
                console.error(err);
              })
              .finally(() => {
                this.isRefreshing = false;
              });
          }
        })
        .finally(() => (this.selectedItem = null));
    },

    onCustomBulkAction(body) {
      const { action } = body;
      this.$emit(this.identity + '-custom-bulk-action', action);
      return action && action.action && action.action(body, this);
    },

    onCustomListAction(body) {
      const { action } = body;
      this.$emit(this.identity + '-custom-list-action', action);
      return action && action.action && action.action(body, this);
    },

    onRemoveList(body) {},

    onListChanged(item) {},

    onCardChanged(item, listTitle) {},

    onCardClicked(item) {
      this.$emit('on-kanban-item-clicked', item);
      this.listItemClickedHandler(item);
    },

    /**
     * @param item object
     * @param options = {context = create | edit }
     */
    onEditDisplayCancelled(item, { context }) {
      const previousDisplayMode =
        this.previousDisplayMode &&
        this.previousDisplayMode !== context &&
        this.previousDisplayMode !== this.displayMode
          ? this.previousDisplayMode
          : this.mergedOptions.initialDisplayMode;
      if (this.useRouterMode) {
        let url = this.parentPath.replace('/edit', '');
        if (previousDisplayMode !== 'view') {
          url = url.replace(`/${item ? item[this.primaryKey] : ''}`, '');
        } else {
          url = `${this.parentPath}/${item ? item[this.primaryKey] : ''}`;
        }
        window.history.pushState({}, null, url);
      }

      this.setDisplayMode(previousDisplayMode, item, { refresh: false });
    },

    onViewDisplayCancelled(item) {
      if (this.useRouterMode) {
        const url = this.parentPath
          .replace('/edit', '')
          .replace('/:id', '')
          .replace(`${item ? item[this.primaryKey] : ''}`, '');
        window.history.pushState({}, null, url);
      }
      const previousDisplayMode =
        this.previousDisplayMode && this.previousDisplayMode !== 'edit' && this.previousDisplayMode !== this.displayMode
          ? this.previousDisplayMode
          : this.mergedOptions.initialDisplayMode;

      this.setDisplayMode(previousDisplayMode, item, { refresh: false });
    },

    onItemCreated(item) {
      this.setDisplayMode(this.mergedOptions.initialDisplayMode, item);
    },

    onItemsBulkEdited(item) {
      this.bulkEditFunction(item);
    },

    onItemEdited(...args) {
      // eslint-disable-next-line
      this.$awEmit('aw-table-needs-refresh');
    },
    onItemDeleted(...args) {
      // eslint-disable-next-line
    },
    onItemViewed(...args) {
      // eslint-disable-next-line
    },
    onItemValidated(...args) {
      // eslint-disable-next-line
    },
    onItemValidationFailed(...args) {
      // eslint-disable-next-line
    },

    onListUpdated(datas) {
      this.$emit('list-updated', datas);
      this.$emit(this.identity + '-list-updated', datas);
    },

    onTableRowClicked(props) {
      const { column, row } = props; // rowIndex and event are also available
      if (column && (['url', 'relation', 'ACTIONS'].indexOf(column.type) > -1 || column.field === '__ACTIONS')) {
        return;
      }
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-table-row-clicked', row);
      this.listItemClickedHandler(row);
    },

    onTableRowDoubleClicked(props) {
      const { column, row } = props; // rowIndex and event are also available
      if (column && (['url', 'relation', 'ACTIONS'].indexOf(column.type) > -1 || column.field === '__ACTIONS')) {
        return;
      }
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-table-row-double-clicked', row);
      this.listItemDoubleClickedHandler(row);
    },

    onDataChanged(items) {
      this.itemsList = items.data;
    },

    updateAutoRefresh(value) {
      this.mergedOptions.autoRefresh = value;
    },

    onListItemClicked(item) {
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-list-item-clicked', item);
      this.listItemClickedHandler(item);
    },

    // @deprecated use directly $awConfirm
    confirm(message) {
      console.warn('@deprecated use directly');
      return this.$awConfirm(message);
    },

    onLayoutUpdated(items) {
      this.$emit('layout-updated', items);
    },

    onLayoutFieldsUpdated(items) {
      this.$emit('layout-fields-updated', items);
    },

    onOpenEditLayoutMode() {
      this.editLayoutMode = true;
    },

    onCloseEditLayoutMode() {
      this.editLayoutMode = false;
    },

    selectPreviousItem() {
      if (this.hasPrevious && this.itemsList[this.currentItemIndex - 1]) {
        this.selectedItem = this.itemsList[this.currentItemIndex - 1];
        if (this.useRouterMode) {
          this.$router.push(`${this.parentPath}/${this.selectedItem[this.primaryKey]}`);
        }
      }
    },

    selectNextItem() {
      if (this.hasNext && this.itemsList[this.currentItemIndex + 1]) {
        this.selectedItem = this.itemsList[this.currentItemIndex + 1];
        if (this.useRouterMode) {
          this.$router.push(`${this.parentPath}/${this.selectedItem[this.primaryKey]}`);
        }
      }
    },

    onCustomAction(body) {
      const { action } = body;
      this.$emit(this.identity + '-custom-action', action);
      return action && action.action && action.action(body, this);
    },

    getNestedItem() {
      return this.$http
        .get(`${this._url}`)
        .then((res) => {
          this.selectedItem =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data;
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    forwardEvent(...args) {
      this.$emit(...args);
    },

    listItemClickedHandler(row) {
      switch (this.tableRowClickAction) {
        case 'edit':
          if (this._actions && !this._actions.edit) {
            return;
          }
          this.goToEditPage(row);
          break;
        case 'view':
          if (this._actions && !this._actions.view) {
            return;
          }
          this.goToViewPage(row);
          break;
        case 'none':
        default:
          break;
      }
    },

    listItemDoubleClickedHandler(row) {
      switch (this.tableRowDoubleClickAction) {
        case 'edit':
          if (this._actions && !this._actions.edit) {
            return;
          }
          this.goToEditPage(row);
          break;
        case 'view':
          if (this._actions && !this._actions.view) {
            return;
          }
          this.goToViewPage(row);
          break;
        case 'none':
        default:
          break;
      }
    },

    onRouteIdChanged(newVal, previousVal) {
      if (this.useRouterMode && newVal && previousVal && previousVal !== newVal) {
        this.setDisplayMode(this.displayMode, { [this.primaryKey]: this.$route.params.id });
      }
    },

    initializeSelectedItem() {
      if (this.$route.params.id) {
        this.parentPath = this.parentPath.replace(`/${this.$route.params.id}`, '').replace('/:id', '');
        if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
          delete this.$route.params.id;
          if (this.$route.query.item) {
            this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
          }
          this.goToCreatePage({ reset: false });

          // this.parentPath = matched.path;
          this.parentPath = this.parentPath
            .replace('/edit', '')
            .replace(`/${this.$route.params.id}`, '')
            .replace('/:id', '');
        } else {
          this.selectedItem = { [this.primaryKey]: this.$route.params.id };
          if (this.$route.query.item) {
            this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
          }
        }
      }
    }
  },
  beforeDestroy() {
    this.$awEventBus && this.$awEventBus.$off('aw-table-needs-refresh');
  }
};
</script>
<style lang="scss">
.vdatetime.form-group {
  margin-bottom: 0;
  width: 100%;
}

.field-EnyoSelect div {
  width: 100%;
}

.glyphicon.glyphicon-calendar {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.glyphicon-calendar:before {
  content: '\f073';
}

.view-mode {
  input,
  textarea,
  .multiselect__tags,
  .field-wrap {
    // border: none !important;
    background: transparent !important;
    font-size: 110% !important;
    color: #78849e !important;
  }

  .subgroup {
    legend {
      padding-right: 15px;
      font-size: 80%;
    }
  }
}

.input-group {
  z-index: inherit !important;
}

.multiselect__content-wrapper {
  z-index: 16 !important;
}

.multiselect__select:before {
  z-index: 15;
  position: absolute;
  top: 15px !important;
  right: 12px;
}

.nested-tab {
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
