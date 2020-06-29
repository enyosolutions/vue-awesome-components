<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h2 class="text-primary mt-0" v-if="title !== false">
            <template v-if="_title !== undefined && _title !== null">
              {{ _title }}
              <i v-if="isRefreshing" class="fa fa-circle-o-notch fa-spin fa-fw" style="color:orange;margin-left:10px" />
            </template>
            <template v-if="_title === undefined || _title === null">
              {{ $t('common.labels.manageTitle') }} {{ _namePlural }}
              <i v-if="isRefreshing" class="fa fa-circle-o-notch fa-spin fa-fw" style="color:orange;margin-left:10px" />
            </template>
          </h2>
          <div v-if="innerOptions.stats" class="row">
            <EnyoCrudStatsSection
              :url="_url + '/stats'"
              :entity="modelName"
              :stats-needs-refresh.sync="statsNeedsRefresh"
            />
          </div>

          <div class="text-right top-right-slot">
            <slot name="top-right-buttons">
              <template v-if="options && options.customTopRightActions">
                <button
                  v-for="(action, index) in options.customTopRightActions"
                  :key="index"
                  class="btn btn-simple"
                  :class="action.class"
                  :id="action.name"
                  :data-title="action.title || action.label"
                  :tooltip="action.title || action.label"
                  :data-tooltip="action.title || action.label"
                  type="button"
                  @click="
                    customAction({
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
                v-if="innerOptions.actions && innerOptions.actions.create && !_isNestedDetail && !_isNestedCreate"
                class="btn btn-secondary btn-simple"
                @click="createFunction()"
                type="button"
              >
                <i class="fa fa-plus" />
                {{ $t('common.labels.createNew') }} {{ _name }}
              </button>
            </slot>
          </div>

          <div class="crudcomponent-detail-section">
            <!-- <upload-button
              name="pictureUpload"
              :options="{ upload:true, targetUrl: '/picture/banner', method: 'POST', headers:{}, base64: true, label: 'Upload', class: 'btn btn-success' }"
              @base64='callbackFunctionForBAse64'
              @uploaded='callbackFunctionForPostUploadWithServerResponse'
              >
            </upload-button>-->

            <!-- START OF  MODAL -->
            <div
              :id="modelName + 'formModal'"
              :class="{
                modal: !_isNested,
                slide: innerOptions.modalMode === 'slide' || innerOptions.modalMode === 'fullpage',
                fade: innerOptions.modalMode === 'fade'
              }"
              tabindex="-1"
              role="dialog"
            >
              <div
                :class="{
                  'modal-dialog': !_isNested,
                  'modal-nested': _isNested,
                  'modal-full-height': _isNested || innerOptions.modalMode === 'slide',
                  'modal-lg': innerOptions.modalMode === 'fade' && !_isNested,
                  'modal-full': innerOptions.modalMode === 'fullpage'
                }"
                role="document"
              >
                <!--  CREATE -->
                <div v-if="viewMode === 'create'" class="modal-content">
                  <form @submit.prevent="createItem()">
                    <div
                      class="modal-header"
                      :class="{
                        'bg-primary text-white': !_isNestedDetail,
                        'bg-secondary': _isNestedDetail
                      }"
                    >
                      <h4 class="modal-title mt-0">{{ $t('common.labels.add_a') }} {{ title }}</h4>
                      <button
                        v-if="!_noFormActions"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="closeModal()"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div
                      class="create-mode"
                      :class="{
                        'modal-body': !_isNestedCreate,
                        'modal-body-nested': _isNestedCreate
                      }"
                    >
                      <slot name="create-form" :selectedItem="selectedItem">
                        <template v-if="formSchema && formSchema.fields">
                          <VueFormGenerator
                            ref="form"
                            :schema.sync="formSchema"
                            :model="selectedItem"
                            :options="formOptions"
                          />
                        </template>
                      </slot>
                    </div>
                    <div class="modal-footer" v-if="!_noFormActions">
                      <slot name="add-modal-footer">
                        <button type="button" class="btn btn-default btn-simple mr-auto" @click="closeModal()">
                          {{ $t('common.buttons.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-primary ml-auto">
                          {{ $t('common.buttons.save') }}
                        </button>
                      </slot>
                    </div>
                  </form>
                </div>
                <!--  EDITS -->
                <div v-if="viewMode === 'edit' || viewMode === 'view'" class="modal-content">
                  <form @submit.prevent="editItem()">
                    <div
                      class="modal-header"
                      :class="{
                        'bg-primary text-white': !_isNestedDetail,
                        'bg-secondary': _isNestedDetail
                      }"
                    >
                      <h4 v-if="viewMode === 'edit'" class="modal-title mt-0">
                        {{ $t('common.buttons.edit') }}: {{ _name }}
                        {{ selectedItem[primaryKey] }}
                      </h4>
                      <h4 v-if="viewMode === 'view'" class="modal-title mt-0">
                        {{ $t('common.buttons.view') }}: {{ _name }}
                        {{ selectedItem[primaryKey] }}
                      </h4>
                      <button
                        v-if="!_noFormActions"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="closeModal()"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div
                      :class="{
                        'modal-body': !_isNestedDetail,
                        'modal-body-nested': _isNestedDetail,
                        'view-mode': viewMode === 'view'
                      }"
                    >
                      <ul v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view'" class="nav nav-tabs mb-4">
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            :class="{
                              active: activeNestedTab === 'general'
                            }"
                            @click="activeNestedTab = 'general'"
                            >{{ _name }}</a
                          >
                        </li>
                        <li v-for="ns in nestedSchemas" :key="ns.$id" class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            :class="{
                              'active show': activeNestedTab === ns.modelName
                            }"
                            @click="activeNestedTab = ns.modelName"
                          >
                            <i v-if="ns.icon" :class="ns.icon" />
                            {{ $t(ns.title || ns.name || ns.modelName) }}
                          </a>
                        </li>
                      </ul>
                      <slot name="edit-form" :selectedItem="selectedItem">
                        <div class="tab-content">
                          <template v-if="formSchema && formSchema.fields">
                            <div
                              class="tab-pane nested-tab fade"
                              :class="{
                                'active show': activeNestedTab === 'general'
                              }"
                            >
                              <VueFormGenerator
                                :schema.sync="formSchema"
                                :model="selectedItem"
                                :options="formOptions"
                              />
                            </div>
                          </template>
                          <template v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view' && selectedItem">
                            <div
                              v-for="ns in nestedSchemas"
                              :key="ns.$id"
                              class="tab-pane nested-tab fade"
                              :class="{
                                'active show': activeNestedTab === ns.modelName
                              }"
                            >
                              <crud-component
                                v-if="activeNestedTab === ns.modelName"
                                v-bind="ns"
                                :parent="selectedItem"
                                :crud-needs-refresh.sync="nestedCrudNeedsRefresh"
                              >
                                <div slot="crud-title" />
                              </crud-component>
                            </div>
                          </template>
                        </div>
                      </slot>
                    </div>
                    <div class="modal-footer" v-if="!_noFormActions">
                      <slot name="edit-modal-footer">
                        <button type="button" class="btn btn-default btn-simple mr-auto" @click="closeModal()">
                          {{ $t('common.buttons.cancel') }}
                        </button>
                        <button v-if="viewMode === 'edit'" type="submit" class="btn btn-primary ml-auto">
                          {{ $t('common.buttons.save') }}
                        </button>
                        <button
                          v-if="
                            viewMode === 'view' &&
                              innerOptions.actions &&
                              innerOptions.actions.edit &&
                              !innerOptions.noActions
                          "
                          type="button"
                          class="btn btn-info btn-simple ml-auto"
                          @click.prevent.stop="goToEditPage(selectedItem)"
                        >
                          <i class="fa fa-pencil" />
                          {{ $t('common.buttons.edit') }}
                        </button>
                        <button
                          v-if="viewMode === 'view'"
                          type="button"
                          class="btn btn-primary ml-2"
                          @click="closeModal()"
                        >
                          {{ $t('common.buttons.close') }}
                        </button>
                      </slot>
                    </div>
                  </form>
                </div>
              </div>
              <!-- // .modal-content -->
              <!-- // .modal-content -->
            </div>
          </div>

          <!-- END OF create MODAL -->
          <div class="awesome-table">
            <EnyoAjaxTable
              v-if="!_isNestedDetail && !_isNestedCreate"
              :columns="innerOptions.columns"
              :columns-displayed="innerOptions.columnsDisplayed"
              :entity="modelName"
              :mode="innerOptions.mode"
              :url="_url"
              :params="innerOptions.queryParams"
              :table-needs-refresh.sync="tableNeedsRefresh"
              :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
              :options="innerOptions"
              :auto-refresh="innerOptions.autoRefresh"
              :auto-refresh-interval="innerOptions.autoRefreshInterval"
              :export-url="innerOptions.exportUrl"
              :responseField="innerOptions.responseField"
              name="ajax-table"
              @edit="goToEditPage"
              @view="goToViewPage"
              @create="createFunction"
              @delete="deleteFunction"
              @customAction="customAction"
              @crud-list-updated="listUpdated"
              @refresh="onTableRefresh"
            >
              <template slot="table-top-more-actions">
                <upload-button
                  v-if="innerOptions.actions && innerOptions.actions.import"
                  name="import"
                  :options="{
                    upload: true,
                    targetUrl: innerOptions.uploadUrl || innerOptions.importUrl,
                    method: 'POST',
                    headers: {},
                    base64: false,
                    label: $t('common.buttons.import'),
                    class: 'btn btn-success btn-simple btn-block'
                  }"
                  @uploaded="importResponse"
                />
                <button
                  v-if="innerOptions.actions && innerOptions.actions.import"
                  class="btn btn-info btn-simple btn-block"
                  type="button"
                  @click="exportTemplateCallBack"
                >
                  <i class="fa fa-file-excel" />
                  {{ $t('common.buttons.excel-template') }}
                </button>
              </template>

              <!-- END OF ARRAY -->
            </EnyoAjaxTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiErrors from '../../mixins/apiErrorsMixin';
import _ from 'lodash';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import EnyoAjaxTable from '../table/EnyoAjaxTable.vue';
import EnyoCrudStatsSection from '../misc/EnyoCrudStatsSection.vue';
import $ from 'jquery';

import 'vue-good-table/dist/vue-good-table.css';
/*
Deprecated props

- foreignKey
- modal mode
*/
const defaultOptions = {
  mode: 'local',
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  bodyParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  modalMode: 'slide', // fade | slide | fullpage
  columnsDisplayed: 8,
  customInlineActions: [],
  customTopActions: [],
  customTabletopActions: [],
  responseField: {
    type: String,
    default: 'body',
    note: `This field dictates where in the response should the component search for the results from the api.
    \nThis field is directly sent to ajaxTable.`
  },
  actions: {
    noActions: false,
    search: true,
    filter: true,
    create: true,
    view: true,
    delete: true,
    export: false,
    import: false,
    dateFilter: false,
    refresh: true
  }
};

export default {
  name: 'CrudComponent',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  description: `This component magically create lists and edit data based on a json schema.

  ### Usage.

  There are 3 ways of using the Crud Component.
  The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based crud component.

  If you want to further personalize your page, it's possible to create your own component, use the crud component in the body, and then use slots to create the desired features.

  The 3rd way of reusing the Crud component if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.
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

  In addition to the default actions on a crud component it's also possible to create custom actions.
  `,
  token: `
  // example of route for crud component
  {
   name: 'contact',
   path: 'contact',
   component: CrudComponent,
   beforeEnter: authGuard,
   props: {
     modelName: 'contact',
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
     component: CrudComponent,
     props: {
       modelName: 'contact',
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
     component: CrudComponent,
     props: {
       modelName: 'contact',
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
  defaultOptions,
  components: {
    EnyoAjaxTable,
    EnyoCrudStatsSection
    // VueGoodTable
  },
  mixins: [apiErrors],
  props: {
    title: { type: [String, Boolean], required: false, default: undefined },
    modelName: { type: String, required: true },
    primaryKey: {
      type: String,
      default: 'id',
      note: 'The field to use as a primary key (id / _id)'
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note: 'The object that will be used for managing the component'
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note:
        'The json schema that represent the object to display. this is used to personalise form inputs and column displays'
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
      note:
        'The object containing the parent in case of a nested schema.' +
        "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'table',
      note: `In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form`
    },
    translations: {
      type: Object,
      required: false,
      default: () => ({
        'common.labels.manageTitle': 'common.labels.manageTitle',
        'common.buttons.view': 'common.buttons.view',
        'common.buttons.cancel': 'common.buttons.cancel',
        'common.buttons.close': 'common.buttons.close'
      }),
      note: 'Translation labels to use when vue-i18n is not present'
    },
    options: {
      type: Object,
      default: () => defaultOptions
    }
  },
  data() {
    return {
      $modal: null,
      parentPath: '',
      selectedItem: {},
      viewMode: 'list',
      isRefreshing: false,
      tableNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      innerOptions: {},
      innerSchema: {},
      innerModel: {},
      innerNestedSchemas: [],
      activeNestedTab: 'general',
      formOptions: {
        validayeAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true
      }
    };
  },
  computed: {
    _title() {
      if (this.title !== undefined) {
        return this.$te(this.title) ? this.$t(this.title) : this.title;
      }
      return this.title;
    },

    _name() {
      if (this.innerModel && this.innerModel.singularName) {
        return this.$te(this.innerModel.singularName)
          ? this.$t(this.innerModel.singularName)
          : this.innerModel.singularName;
      }

      if (this.innerModel && this.innerModel.name) {
        return this.$te(this.innerModel.name) ? this.$t(this.innerModel.name) : this.innerModel.name;
      }

      if (this.modelName) {
        return this.$te(`app.labels.${this.modelName}`) ? this.$t(`app.labels.${this.modelName}`) : this.modelName;
      }
      return this._title;
    },

    _namePlural() {
      if (this.innerModel && this.innerModel.pluralName) {
        return this.$te(this.innerModel.pluralName) ? this.$t(this.innerModel.pluralName) : this.innerModel.pluralName;
      }

      if (this.modelName) {
        return this.$te(`app.labels.${this.modelName}s`)
          ? this.$t(`app.labels.${this.modelName}s`)
          : this.modelName + 's';
      }
      return '';
    },

    _url() {
      const url =
        this.url ||
        (this.options && this.options.url) ||
        (this.innerModel && this.innerModel.url) ||
        (this.innerOptions && this.innerOptions.url) ||
        `/${this.modelName}`;
      if (typeof url === 'function') {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem,
          items: this.items
        });
      }
      return url;
    },

    _bodyParams() {
      const body =
        this.bodyParams ||
        (this.options && this.options.bodyParams) ||
        (this.innerOptions && this.innerOptions.bodyParams);
      if (typeof body === 'function') {
        return body({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem,
          items: this.items
        });
      }
      return body;
    },
    _selectedItemUrl() {
      let url;
      if (this._url.indexOf('?') > -1) {
        url = new URL(this._url.indexOf('http') === 0 ? this._url : `http://localhost${this._url}`);
        url = `${url.pathname}/${this.selectedItem[this.primaryKey]}${url.search}`;
      } else {
        url = `${this._url}/${this.selectedItem[this.primaryKey]}`;
      }
      return url;
    },

    _isNested() {
      return this.parent;
    },

    _isNestedDetail() {
      return (
        this._isNested &&
        ((this.selectedItem && this.selectedItem[this.primaryKey]) ||
          this.nestedDisplayMode === 'view' ||
          this.nestedDisplayMode === 'edit')
      );
    },

    _isNestedCreate() {
      return this._isNested && (this.selectedItem && this.viewMode === 'create');
    },

    _noFormActions() {
      return this._isNested && (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'edit');
    },

    formSchema() {
      if (!this.innerSchema) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this.innerSchema);
      return parsedFormSchema;
    }
  },
  watch: {
    // call again the method if the route changes
    name: 'loadModel',
    modelName: 'loadModel',
    'parent.id': 'loadModel',
    model: 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent'
  },
  created() {
    if (!this.$t) {
      this.$t = (str) => {
        if (!window.trans) {
          window.trans = {};
        }
        window.trans[str] = str;

        return this.translations[str] || str;
      };
      this.$te = (str) => !!this.translations[str];
    }
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
    this.$modal = $(`#${this.modelName}formModal`);
    if (this.$modal && this.$modal.modal) {
      this.$modal.modal();
    }
    this.loadModel();
    if (!this.$route) {
      return;
    }
    const matched = this.$route.matched[this.$route.matched.length - 1];
    if (this.$route.params.id) {
      if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
        delete this.$route.params.id;
        if (this.$route.query.item) {
          this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
        }
        this.createFunction({ reset: false });
        return;
      }
      this.parentPath = matched.path.replace('/edit', '').replace('/:id', '');
    } else {
      this.parentPath = matched.path;
    }
  },

  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next((vm) => {
      if (vm && vm.closeModal) {
        vm.closeModal();
      } else {
        // eslint-disable-next-line
        console.warn(vm);
      }

      //    vm.loadModel();
    });
  },
  beforeRouteLeave(to, from, next) {
    next((vm) => {
      if (vm && vm.closeModal) {
        vm.closeModal();
      } else {
        // eslint-disable-next-line
        console.warn(vm);
      }
    });
  },

  methods: {
    $alert: Swal,
    refreshComponent() {
      // console.log("refresh component watcher");
      if (this.modelName) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;

      setTimeout(() => {
        this.$emit('update:crudNeedsRefresh', false);
      }, 100);
    },

    onTableRefresh() {
      this.statsNeedsRefresh = true;
    },

    mergeOptions() {
      if (this.options.deletePermitted && this.options.actions.delete) {
        if (
          this.$store &&
          this.$store.state &&
          !this.options.deletePermitted.some((v) => this.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0)
        ) {
          this.options.actions.delete = false;
        }
      }
      this.innerOptions = _.merge(this.innerOptions, this.options);
      if (this.$route && this.$route.query && this.$route.query.filters) {
        this.innerOptions.queryParams = _.merge(this.$route.query.filters, this.innerOptions.queryParams);
      }
    },
    callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
    },

    importResponse(e) {
      // swal({title: this.$t('common.messages.successfullyImported',{title: this.name}), type: 'success'})
      this.$notifications.clear();
      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
        Swal.fire({
          title: this.$t('common.messages.no_data_imported', {
            title: this._name
          }),
          type: 'warning'
        });
        return;
      }

      if (e.properData.length > 0) {
        this.$notify({
          title: this.$t('common.messages.successfullyImported', {
            title: this._name
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
              title: this._name
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
      if (!this.innerOptions.importUrl) {
        this.$notify({ title: '[WARN] missing export url', type: 'warning' });
        return;
      }
      this.$http
        .get(this.innerOptions.importUrl + '-template', {})
        .then((res) => {
          if (res.data.url) {
            const link = document.createElement('a');
            link.download = `${this.entity}_export`;
            link.href = res.data.url;
            link.click();
            link.remove();
          }
        })
        .catch(this.apiErrorCallback);
    },

    getModelFromStore(modelId) {
      if (this.$store && this.$store.state && !this.model) {
        return this.$store.state.data.models.find((model) => model.identity === modelId || model.modelName === modelId);
      }
      return;
    },
    getRelationUrl(prop) {
      if (!prop.relationUrl && !prop.relation) {
        return;
      }
      if (prop.relationUrl) {
        return prop.relationUrl;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.url || model.apiUrl : '';
      }
    },

    getRelationKey(prop) {
      if (!prop.relationKey && !prop.relation) {
        return;
      }
      if (prop.relationKey) {
        return prop.relationKey;
      }
      if (prop.foreignKey) {
        return prop.foreignKey;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.primaryKeyField || this.primaryKey : this.primaryKey;
      }
    },

    getRelationLabel(prop) {
      if (!prop.relationLabel && !prop.relation) {
        return;
      }
      if (prop.relationLabel) {
        return prop.relationLabel;
      } else {
        const model = this.getModelFromStore(prop.relation);
        return model ? model.titleField || 'label' : 'label';
      }
    },

    loadModel() {
      if (!this.options) {
        this.options = {};
      }
      this.mergeOptions();
      if (this.$store && this.$store.state && !this.model) {
        this.innerModel = this.getModelFromStore(this.modelName);
      } else {
        this.innerModel = this.model;
      }

      if (!this.innerModel && !this.schema) {
        // console.warn("CRUD COMPONENT ERROR", `model ${this.name} not found`);
        return;
      }

      this.innerSchema = this.schema || this.innerModel.schema;
      this.innerOptions.columns = this.parseColumns(this.innerSchema.properties);

      if (!this.innerOptions.exportUrl) {
        this.innerOptions.exportUrl = `${this._url}/export`;
      }

      if (!this.innerOptions.importUrl) {
        this.innerOptions.importUrl = `${this._url}/import`;
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
      if (this.$route && this.$route.params && this.$route.params.id && !this._isNested) {
        this.$http
          .get(`${this._url}/${this.$route.params.id}`)
          .then((res) => {
            const matched = this.$route.matched[this.$route.matched.length - 1];
            const data =
              this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
            if (matched.path.indexOf('/edit') !== -1) {
              this.editFunction(data);
            } else {
              this.viewFunction(data);
            }

            this.$forceUpdate();
          })
          .catch(this.apiErrorCallback)
          .finally(() => {
            this.isRefreshing = false;
          });
      }
    },

    parseSchema(schema, prefix = '') {
      if (!schema.properties) {
        return [];
      }
      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }
      const fields = [];
      const size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach((key) => {
        if ([this.primaryKey].indexOf(key) === -1) {
          const prop = schema.properties[key];
          if (prop.field && prop.field.hidden) {
            return;
          }
          if (prop.type === 'object' && !(prop.field && prop.field.type)) {
            const subSchema = this.parseSchema(prop, `${key}.`);
            subSchema.legend = prop.title || _.startCase(key);
            subSchema.type = 'group';
            subSchema.styleClasses = `subgroup  ${(prop.field && prop.field.styleClasses) || 'card'}`;
            fields.push(subSchema);
          } else {
            const relationUrl = this.getRelationUrl(prop);
            const relationKey = this.getRelationKey(prop);
            const relationLabel = this.getRelationLabel(prop);
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = prop.field.fieldOptions.url || relationUrl;
              prop.field.fieldOptions.trackBy = prop.field.fieldOptions.trackBy || relationKey;
              prop.field.fieldOptions.searchable = prop.field.fieldOptions.searchable || true;
            }
            const field = {
              type: (prop.field && prop.field.type) || this.getFormtype(prop),
              label: prop.title || prop.description || _.startCase(key),
              placeholder: prop.description || prop.title || _.startCase(key),
              fieldOptions: (prop.field && prop.field.fieldOptions) || {
                placeholder: prop.description || prop.title || _.startCase(key),
                url: relationUrl,
                trackBy: relationKey || 'id',
                label: relationLabel,
                step: prop.field && prop.field.step,
                relation: prop.relation,
                foreignKey: relationKey,
                relationKey,
                relationLabel,
                relationUrl
              },
              values:
                prop.enum ||
                (prop.items && prop.items.enum) ||
                (prop.field &&
                  prop.field.fieldOptions &&
                  (prop.field.fieldOptions.values || this.getSelectEnum(prop.field.fieldOptions.enum))) ||
                prop.enum ||
                (prop.items && prop.items.enum),
              required: prop.field && prop.field.required,
              hint: prop.description,
              model: prefix + key,
              validator: prop.field && prop.field.validator,
              min: prop.min,
              max: prop.max,
              multi: prop.type === 'array',
              readonly: this.viewMode === 'view' || (prop.field && prop.field.readonly),
              disabled: this.viewMode === 'view' || (prop.field && prop.field.readonly),
              styleClasses: (prop.field && prop.field.styleClasses) || (size < 8 ? 'col-md-12' : 'col-md-6'),
              relation: prop.relation,
              foreignKey: relationKey,
              relationKey,
              relationLabel,
              group: prop.field && prop.field.group
            };
            if (!field.fieldOptions.inputType) {
              field.fieldOptions.inputType =
                (prop.field && prop.field.inputType) || this.getFormInputType(prop) || 'text';
            }
            if (field.type === 'dateTime') {
              field.fieldOptions.icons = {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar',
                up: 'fa fa-arrow-up',
                down: 'fa fa-arrow-down'
              };
            }
            fields.push(field);
          }
        }
      });
      // let groups = this.parseSchemaGroups(schema);
      // groups = this.distributeFieldsInGroups(groups, fields);

      return { fields };
    },

    parseSchemaGroups(schema) {
      let groups = [];
      schema.formGroups.forEach((group) => {
        if (!groups[group.id]) {
          groups.push({
            fields: [],
            ...group,
            legend: this.$t(group.title),
            type: 'group'
          });
        }
      });
      if (groups.length < 1) {
        groups = [{ legend: '', fields: schema.fields }];
      }
      return groups;
    },

    distributeFieldsInGroups(groups, fields) {
      fields.forEach((f) => {
        if (f.group) {
          const keys = f.group.split('.');
          let targetGroup = { groups };
          keys.forEach((key) => {
            targetGroup = _.find(targetGroup.groups, { id: key });
          });
          if (targetGroup) {
            if (!targetGroup.fields) {
              targetGroup.fields = [];
            }
            targetGroup.fields.push(f);
          }
        }
      });
      return groups;
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
        return 'VueSelect';
      }
      switch (type) {
        case 'string':
          return 'input';
        case 'number':
          return 'input';
        case 'boolean':
          return 'checkbox';
        default:
          return 'input';
      }
    },

    getSelectEnum(val) {
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

    openModal() {
      if (!this.$modal) {
        this.$modal = $(`#${this.modelName}formModal`);
        if (this.$modal && this.$modal.modal) {
          this.$modal.modal();
        }
      }
      if (this.$modal.modal) {
        this.$modal.modal('show');
      } else {
        this.$modal.addClass('show');
      }
    },

    closeModal() {
      if (!this.$modal) {
        this.$modal = $(`#${this.modelName}formModal`);
      }
      window.history.replaceState({}, null, `${this.parentPath}`);
      if (this.$modal.modal) {
        this.$modal.modal('hide');
      } else if (this.innerOptions.modalMode == 'slide') {
        this.$modal.removeClass('show');
      } else {
        this.$modal.removeClass('show');
      }
      this.selectedItem = {};
      this.viewMode = 'list';
    },

    goToEditPage(item) {
      if (!this.innerOptions.editPath) {
        window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
        this.editFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.editPath.replace(':id', item[this.primaryKey]));
    },

    goToViewPage(item) {
      if (!this.innerOptions.viewPath) {
        window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
        this.viewFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.viewPath.replace(':id', item[this.primaryKey]));
    },

    createItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('CRUDCOMPONENT ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('CRUDCOMPONENT ERROR:: validation errors', error);
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }
      return this.$http
        .post(this._url, _.merge(this.selectedItem, this._bodyParams))
        .then(() => {
          this.$notify({
            title: this.$t('common.messages.successfullyCreated', {
              title: this.type
            }),
            type: 'success'
          });
          this.tableNeedsRefresh = true;
          this.statsNeedsRefresh = true;
          this.nestedCrudNeedsRefresh = true;
          this.$forceUpdate();
          this.closeModal();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });

      // return false;
    },

    editItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('CRUDCOMPONENT ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('CRUDCOMPONENT ERROR:: validation errors', errors);
          return;
        }
      }

      this.$http
        .put(`${this._selectedItemUrl}`, _.merge(this.selectedItem, this._bodyParams))
        .then(() => {
          this.$notify({
            title: this.$t('common.messages.successfullyModified', {
              title: this.type
            }),
            type: 'success'
          });
          this.tableNeedsRefresh = true;
          this.nestedCrudNeedsRefresh = true;
          this.$forceUpdate();

          this.closeModal();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
      return false;
    },

    editFunction(item) {
      this.viewMode = 'edit';
      this.selectedItem = item;
      this.activeNestedTab = 'general';
      this.$http
        .get(`${this._selectedItemUrl}`)
        .then((res) => {
          this.selectedItem =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
          this.openModal();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    viewFunction(item) {
      this.viewMode = 'view';
      this.activeNestedTab = 'general';
      this.selectedItem = item;

      return this.$http
        .get(`${this._selectedItemUrl}`)
        .then((res) => {
          this.selectedItem =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
          this.openModal();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    getNestedItem() {
      return this.$http
        .get(`${this._url}`)
        .then((res) => {
          this.selectedItem =
            this.responseField && this.responseField != false ? _.get(res.data, this.responseField) : res.data.body;
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    deleteFunction(item) {
      this.selectedItem = item;
      Swal.fire({
        title: this.$t('common.messages.are_you_sure'),
        text: this.$t('common.messages.wont_be_able_recover'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.$t('common.buttons.yes_delete_it'),
        cancelButtonText: this.$t('common.buttons.cancel'),
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

    createFunction(options = { reset: true }) {
      if (!this.innerOptions.createPath) {
        this.viewMode = 'create';
        if (options.reset) {
          this.selectedItem = {};
        }

        this.openModal();
        return;
      }
      this.$router.push(this.innerOptions.createPath);
    },

    customAction(body) {
      const { action } = body;
      return action && action.action && action.action(body, this);
    },

    listUpdated(datas) {
      this.$emit('list-updated', datas);
    },
    // transform the schema into a format accepted by the ajaxtable
    parseColumns(properties) {
      const newcolumns = [];
      Object.keys(properties).forEach((key) => {
        let newCol = {};
        const prop = properties[key];
        if (!prop.hidden && !(prop.column && prop.column.hidden)) {
          newCol.field = key;
          newCol.type = this.getColumnType(prop);
          newCol.label = _.startCase((prop.column && prop.column.title) || prop.title || key);
          newCol.filterOptions = { enabled: false };
          newCol.enum = (prop.column && prop.column.enum) || prop.enum;
          newCol.sortable = prop.column && prop.column.sortable !== undefined ? prop.column.sortable : true;
          newCol = { ...newCol, ...prop.column };
          newCol.relation = prop.relation;
          newCol.relationKey = this.getRelationKey(prop);
          newCol.relationUrl = this.getRelationUrl(prop);
          newCol.relationLabel = this.getRelationLabel(prop);

          newcolumns.push(newCol);
        }
      });

      if (!newcolumns.find((col) => col.field === 'ACTIONS')) {
        newcolumns.push({
          field: 'ACTIONS',
          label: 'Actions',
          filterable: false,
          enabled: false
        });
      }
      return newcolumns;
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
    }
  }
};
</script>
<style lang="scss">
.vue-form-generator textarea.form-control {
  min-height: 150px;
}

.input-group .form-control {
  z-index: 0 !important;
}

.form-element.field-input {
  label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.vue-form-generator .input-group {
  z-index: 100;
}
.vue-form-generator .multiselect {
  width: 100%;
  margin-top: 10px;
}

.vdatetime.form-group {
  margin-bottom: 0;
  width: 100%;
}

.field-EnyoSelect div {
  width: 100%;
}

body.modal-open .bootstrap-datetimepicker-widget {
  z-index: 1200 !important;
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
