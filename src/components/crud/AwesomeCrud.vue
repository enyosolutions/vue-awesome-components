<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row ">
        <div class="col-12 awesomecrud-detail-section">
          <AwesomeForm
            v-bind="$props"
            v-if="displayMode === 'view'"
            :mode="displayMode"
            :model="_model"
            :schema="schemaComputed"
            :identity="identity"
            :displayMode="mergedOptions.detailPageMode"
            :layout="viewPageLayoutComputed"
            :item="selectedItem"
            :needs-refresh="awesomeEditNeedsRefresh"
            :edit-layout-mode="editLayoutMode"
            :standalone="false"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @cancel="onViewDisplayCancelled"
            @closeRequested="onViewDisplayCancelled"
            @customAction="onCustomAction"
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
          />

          <AwesomeForm
            v-bind="$props"
            v-if="displayMode === 'edit' || displayMode === 'create' || displayMode === 'bulkEdit'"
            :mode="displayMode"
            :model="_model"
            :schema="schemaComputed"
            :identity="identity"
            :displayMode="mergedOptions.detailPageMode"
            :layout="displayMode === 'create' ? createPageLayoutComputed : editPageLayoutComputed"
            createPageLayoutComputed
            :item="selectedItem"
            :bulk-items="selectedItems"
            :needs-refresh="awesomeEditNeedsRefresh"
            :edit-layout-mode="editLayoutMode"
            :standalone="false"
            @create="goToCreatePage"
            @view="goToViewPage"
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
          />
        </div>

        <div
          class="col-12"
          v-show="!(supportedDataDisplayModes.indexOf(displayMode) === -1 && mergedOptions.detailPageMode === 'page')"
        >
          <!--
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
        <div class="col-12">
          <div class="text-right">
            <slot name="top-right-buttons">
              <template v-if="options && options.customTopRightActions">
                <button
                  v-for="(action, index) in options.customTopRightActions"
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
                :disabled="!canShowCreateButton"
                class="btn btn-primary btn-simple aw-button-add"
                @click="goToCreatePage()"
                type="button"
              >
                <template v-if="canShowCreateButton">
                  <i class="fa fa-plus" />
                  {{ $t('AwesomeCrud.labels.createNew') }} {{ _name }}
                </template>
              </button>
            </slot>
          </div>
          <AwesomeList
            v-if="
              !_isNestedDetail &&
                (displayMode === 'list' ||
                  (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'list'))
            "
            :url="_url"
            :perPage="10"
            :identity="identity"
            :title="_title || $t('AwesomeCrud.labels.manageTitle') + ' ' + _titlePlural"
            :columns="listFieldsComputed"
            :displayFields="listOptions.displayFields"
            :imageField="listOptions.imageField"
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
            :mode="mergedOptions.dataPaginationMode || mergedOptions.mode || mode"
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
              !_isNestedDetail &&
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
              !_isNestedDetail &&
                (displayMode === 'table' ||
                  (_displayModeHasPartialDisplay && mergedOptions.initialDisplayMode === 'table'))
            "
            :columns="tableColumnsComputed"
            :columns-displayed="mergedOptions.columnsDisplayed"
            :entity="identity"
            :mode="mergedOptions.dataPaginationMode || mergedOptions.mode"
            :useRouterMode="useRouterMode"
            :url="_url"
            :api-query-params="mergedOptions.queryParams"
            :api-query-headers="mergedOptions.headerParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :actions="_actions"
            :auto-refresh="mergedOptions.autoRefresh"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :export-url="mergedOptions.exportUrl"
            :title="_title || $t('AwesomeCrud.labels.manageTitle') + ' ' + _titlePlural"
            name="ajax-table"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @bulkDelete="goToBulkDeletePage"
            @bulkEdit="goToBulkEditPage"
            @customAction="onCustomAction"
            @customBulkAction="onCustomBulkAction"
            @crud-list-updated="onListUpdated"
            @refresh="onTableRefresh"
            @onRowClicked="onTableRowClicked"
            @updateAutoRefresh="updateAutoRefresh"
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
import parseJsonSchema from '../../mixins/parseJsonSchemaMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awesomeFormMixin from '../../mixins/awesomeFormMixin';
import relationMixin from '../../mixins/relationMixin';
import notificationsMixin from '../../mixins/notificationsMixin';
import i18nMixin from '../../mixins/i18nMixin';
import { defaultActions, defaultKanbanOptions } from '../../mixins/defaultProps';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import AwesomeTable from '../table/AwesomeTable.vue';
import EnyoCrudStatsSection from '../misc/EnyoCrudStatsSection.vue';
import AwesomeForm from './AwesomeForm.vue';
import AwesomeList from '../table/AwesomeList';
import AwesomeKanban from '../table/AwesomeKanban';

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
  initialDisplayMode: 'table', // table | list | kanban
  detailPageMode: 'sidebar', // fade | slide | full
  detailPageLayout: null, // fade | slide | full
  columnsDisplayed: 8,
  customInlineActions: [],
  customBulkActions: [],
  customTopActions: [],
  customTabletopActions: [],
  tableRowClickAction: 'view'
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
    i18nMixin,
    apiErrorsMixin,
    apiConfigMixin,
    awesomeFormMixin,
    relationMixin,
    parseJsonSchema,
    notificationsMixin
  ],
  props: {
    title: { type: [String, Boolean], required: false, default: undefined },
    pageTitle: { type: [String, Boolean], required: false, default: undefined },
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
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'table',
      note:
        'In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form'
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
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    },
    parent: {
      type: Object,
      required: false,
      note: `The object containing the parent in case of a nested schema.
        'You don't actually to pass this, it's done automatically by the parent component itself`
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
        validateAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: 'AwesomeCrud'
      },
      supportedDataDisplayModes: ['table', 'list', 'kanban'],
      editLayoutMode: false
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
        return this.$te(this._model.name) ? this.$t(this._model.name) : _.startCase(this._model.name);
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

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : _.startCase(this.identity);
      }
      return '';
    },

    // _url() szee apiConfigMixin
    // _selectedItemUrl() szee apiConfigMixin

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
      if (this.listOptions && !Array.isArray(this.listOptions.fields)) {
        return [];
      }
      this.listOptions.fields.forEach((field) => {
        columns.push(_.filter(allColumns, ['field', field]));
      });
      columns = _.flatten(columns);
      return columns;
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
    }
  },
  watch: {
    // call again the method if the route changes
    identity: 'loadModel',
    model: 'loadModel',
    'parent.id': 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent'
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
    this.loadModel();
  },
  mounted() {
    // allow old property names to still work
    if (!this.identity) {
      throw new Error('missing_required_props_identity');
    }
    this.loadModel();

    if (this._isNested) {
      this.displayMode = this.nestedDisplayMode;
    }
    /*
    if (this._isNestedDetail && this.viewMode === "detail") {
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
    this.displayMode = this.mergedOptions.initialDisplayMode;
    // const matched = this.$route.matched[this.$route.matched.length - 1];
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
      }
    }
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

  methods: {
    $alert: Swal,
    refreshComponent() {
      // console.log("refresh component watcher");
      if (this.identity) {
        this.loadModel();
      }

      this.tableNeedsRefresh = false;
      this.statsNeedsRefresh = true;
      this.awesomeEditNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;

      setTimeout(() => {
        this.$emit('update:crudNeedsRefresh', false);
      }, 100);
    },

    onTableRefresh() {
      this.statsNeedsRefresh = true;
    },

    mergeOptions() {
      if (this.options.deletePermitted && this._actions.delete) {
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
    callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
      console.log('Base 64 done', e);
    },

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
        this.$notify({
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
          this.$notify({
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
        this.$notify({ title: '[WARN] missing export url', type: 'warning' });
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
      if (!this.options) {
        this.options = {};
      }
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
            this.openModal();
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
      if (this.$route && this.$route.params && this.$route.params.id) {
        this.$http
          .get(`${this._url}/${this.$route.params.id}`)
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
    },

    getFormtype(property) {
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return 'select';
      }
      if (property.relation || property.relationUrl) {
        return 'VSelect';
      }
      switch (type) {
        case 'string':
          return 'input';
        case 'integer':
        case 'number':
          return 'input';
        case 'boolean':
          return 'select'; // put enyoSelect after debugging all the issues...enyoSelect
        default:
          return 'input';
      }
    },
    getSelectEnumFromStore(val) {
      const options =
        _.isString(val) && val.indexOf('$store') === 0 ? _.get(this.$store.state, val.replace('$store.', '')) : val;
      return options;
    },

    getFormInputType(property) {
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case 'string':
          switch (property.format) {
            case 'email':
              return 'email';
            case 'date-time':
              return 'datetime';
            default:
              return 'text';
          }
        case 'number':
          return 'number';
        case 'boolean':
        case 'array':
        case 'object':
          return 'string';
        default:
          // console.error("type not known ", type, property);
          return type;
      }
    },

    getColumnType(property) {
      if (property.column && property.column.type) {
        return property.column.type;
      }
      if (property.columnType) {
        return property.columnType;
      }
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ['string', 'number', 'boolean'];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }
      if (property.relation) {
        return 'relation';
      }
      switch (type) {
        case 'string':
          switch (property.format) {
            case 'date-time':
              return 'text';
            default:
              return 'text';
          }
        case 'number':
          return 'number';
        case 'boolean':
          return 'boolean';
        case 'array':
        case 'object':
          return 'object';
        default:
          return 'text';
      }
    },

    /** @param mode: string */
    setDisplayMode(mode, item, options = { refresh: true }) {
      this.previousDisplayMode = this.displayMode || this.mergedOptions.initialDisplayMode;
      if (item && mode !== 'bulkEdit') {
        this.selectedItem = item;
        this.selectedItems = [];
      } else {
        this.selectedItem = {};
        this.selectedItems = item;
      }
      this.displayMode = mode;
      if (mode === 'table') {
        this.tableNeedsRefresh = options.refresh;
      } else {
        this.awesomeEditNeedsRefresh = options.refresh;
      }
    },

    goToCreatePage(options = { reset: true, editLayoutMode: false }) {
      if (this.mergedOptions.createPath) {
        return this.$router.push(this.mergedOptions.createPath);
      }
      if (options.reset) {
        this.selectedItem = {};
      }
      if (options.editLayoutMode) {
        this.editLayoutMode = options.editLayoutMode;
      }
      this.setDisplayMode('create', null);
      if (this.useRouterMode) {
        window.history.replaceState({}, null, `${this.parentPath}/new`);
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
        return this.$router.push(this.mergedOptions.deletePath.replace(':id', item[this.primaryKey]));
      }

      this.deleteFunction(item);
      return;
    },

    goToBulkDeletePage(items) {
      this.bulkDeleteFunction(items);
    },

    goToEditPage(item) {
      if (this.mergedOptions.editPath) {
        return this.$router.push(this.mergedOptions.editPath.replace(':id', item[this.primaryKey]));
      }
      if (this.useRouterMode) {
        window.history.pushState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
      }
      this.setDisplayMode('edit', item);
    },

    goToViewPage(item) {
      if (this.mergedOptions.viewPath) {
        return this.$router.push(this.mergedOptions.viewPath.replace(':id', item[this.primaryKey]));
      }
      if (this.useRouterMode) {
        window.history.replaceState({}, null, `${this.parentPath.replace(':id', '')}/${item[this.primaryKey]}`);
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

    onRemoveList(body) {
      // console.log("TODO: REMOVE LIST", body);
    },

    onListChanged(item) {
      // console.log(item);
    },

    onCardChanged(item, listTitle) {
      // console.log(item, listTitle);
    },

    onCardClicked(item) {
      this.$emit('on-kanban-item-clicked', item);
      switch (this.mergedOptions.tableRowClickAction) {
        case 'edit':
          this.goToEditPage(item);
          break;
        case 'view':
          this.goToViewPage(item);
          break;
        case 'default':
          this.goToViewPage(item);
          break;
      }
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
      // eslint-disable-next-line
      console.log('EVENT', 'onItemCreated', item);
    },

    onItemsBulkEdited(item) {
      this.bulkEditFunction(item);
    },

    onItemEdited(...args) {
      // eslint-disable-next-line
      console.log('EVENT', 'onItemEdited', args);
    },
    onItemDeleted(...args) {
      // eslint-disable-next-line
      console.log('EVENT', 'onItemDeleted', args);
    },
    onItemViewed(...args) {
      // eslint-disable-next-line
      console.warn('EVENT', 'onItemViewed', args);
    },
    onItemValidated(...args) {
      // eslint-disable-next-line
      console.warn('EVENT', 'onItemValidated', args);
    },
    onItemValidationFailed(...args) {
      // eslint-disable-next-line
      console.warn('EVENT', 'onItemValidationFailed', args);
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
      switch (this.mergedOptions.tableRowClickAction) {
        case 'edit':
          this.goToEditPage(row);
          break;
        case 'view':
          this.goToViewPage(row);
          break;
        case 'default':
          this.goToViewPage(row);
          break;
      }
    },

    updateAutoRefresh(value) {
      this.mergedOptions.autoRefresh = value;
    },

    onListItemClicked(item) {
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-list-item-clicked', item);
      switch (this.mergedOptions.tableRowClickAction) {
        case 'edit':
          this.goToEditPage(item);
          break;
        case 'view':
          this.goToViewPage(item);
          break;
        case 'default':
          this.goToViewPage(item);
          break;
      }
    },

    confirm(message) {
      return new Promise((resolve, reject) => {
        Swal.fire({
          title: this.$t('common.messages.are_you_sure'),
          text: message,
          type: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$t('common.buttons.yes'),
          cancelButtonText: this.$t('common.buttons.cancel'),
          reverseButtons: true
        })
          .then((result) => {
            resolve(result.value);
          })
          .catch(reject);
      });
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
    }
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
