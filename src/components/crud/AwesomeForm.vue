<template>
  <div class="content aw-form">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" :class="displayMode === 'page' ? 'p-0' : ''">
          <div class="text-left">
            <!-- START OF create MODAL -->
            <div
              :id="identity + 'FormModal'"
              class="AwesomeForm aw-form"
              :class="{
                'modal slide':
                  displayMode === 'slide' ||
                  displayMode === 'sidebar' ||
                  displayMode === 'sidebar-left' ||
                  displayMode === 'sidebar-right',
                'modal fade': displayMode === 'fade' || displayMode === 'modal' || displayMode === 'fullscreen',
                'page  fade': displayMode === 'page',
                show: this.show
              }"
              tabindex="-1"
              role="dialog"
            >
              <div
                class
                :class="{
                  'modal-dialog': displayMode !== 'page',
                  'modal-full-height':
                    displayMode === 'slide' ||
                    displayMode === 'sidebar' ||
                    displayMode === 'sidebar-right' ||
                    displayMode === 'sidebar-left',
                  'modal-full': displayMode === 'fullscreen',

                  'modal-lg': displayMode === 'modal' || displayMode === 'fade'
                }"
                role="document"
              >
                <div v-if="mode === 'create'" class="modal-content">
                  <form @submit.prevent="createItem()">
                    <div class="modal-header bg-primary text-white">
                      <h3 class="text-left mt-0 modal-title" :title="$t('AwesomeCrud.labels.add_a') + ' '.title">
                        {{ $t('AwesomeCrud.labels.add_a') }} {{ _title || _name }}
                      </h3>

                      <div
                        v-if="_useCustomLayout && _actions.editLayout"
                        class="btn-group m-0 aw-form-header-actions"
                        style="flex:auto"
                      >
                        <button
                          v-if="!editLayoutMode && layout"
                          class="btn btn-info btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="openEditLayoutMode"
                        >
                          <i class="fa fa-th-large"></i>
                          {{ $t('AwesomeCrud.buttons.openEditLayoutMode') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-warning btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="exportLayout"
                        >
                          <i class="fa fa-download"></i>
                          {{ $t('AwesomeCrud.buttons.exportLayout') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-danger btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="resetLayout"
                        >
                          <i class="fa fa-eraser"></i>
                          {{ $t('AwesomeCrud.buttons.resetLayout') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-info btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="closeEditLayoutMode"
                        >
                          <i class="fa fa-save"></i>
                          {{ $t('AwesomeCrud.buttons.closeEditLayoutMode') }}
                        </button>
                      </div>

                      <button
                        v-if="!standalone && !_isEmbedded"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="close()"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <slot name="create-form" :selectedItem="selectedItem">
                        <AwesomeLayout
                          v-if="_useCustomLayout"
                          :edit-mode="editLayoutMode"
                          :layout="layout"
                          @layout-updated="onLayoutUpdated"
                          @layout-fields-updated="onLayoutFieldsUpdated"
                        >
                          <template v-slot:field="slotProps">
                            <VueFormGenerator
                              :schema="getShemaForFields(slotProps.field)"
                              :model="selectedItem"
                              :options="formOptions"
                              tag="div"
                            />
                          </template>
                          <template v-slot:fields="fieldsSlotProps">
                            <VueFormGenerator
                              :schema="getShemaForFields(fieldsSlotProps.fields)"
                              :model="selectedItem"
                              :options="formOptions"
                              tag="div"
                            />
                          </template>
                        </AwesomeLayout>
                        <template v-if="formSchema && formSchema.fields && !_useCustomLayout">
                          <VueFormGenerator
                            ref="form"
                            :schema.sync="createFormSchema"
                            :model="selectedItem"
                            :options="formOptions"
                            tag="div"
                          />
                        </template>
                      </slot>
                    </div>
                    <div class="modal-footer" v-if="!_isEmbedded">
                      <slot name="add-modal-footer">
                        <button type="button" class="btn btn-default btn-simple mr-auto" @click="cancel()">
                          {{ $t('AwesomeCrud.buttons.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-primary ml-auto">
                          {{ $t('AwesomeCrud.buttons.save') }}
                        </button>
                      </slot>
                    </div>
                  </form>
                </div>
                <!--  EDITS -->
                <div v-if="mode === 'edit' || mode === 'view'" class="modal-content">
                  <form @submit.prevent="editItem()">
                    <div class="modal-header bg-primary text-white">
                      <h3 v-if="mode === 'edit'" class="text-left modal-title mt-0">
                        {{ $t('AwesomeCrud.labels.edit') }} {{ _name }}
                        <b>{{ _editItemTile }}</b>
                      </h3>
                      <h3 v-if="mode === 'view'" class="text-left modal-title mt-0">
                        {{ $t('AwesomeCrud.labels.view') }} {{ _name }} <b>{{ _editItemTile }}</b>
                      </h3>

                      <div
                        v-if="_useCustomLayout && _actions.editLayout"
                        class="btn-group m-0 aw-form-header-actions"
                        style="flex:auto"
                      >
                        <button
                          v-if="!editLayoutMode && layout"
                          class="btn btn-info btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="openEditLayoutMode"
                        >
                          <i class="fa fa-th-large"></i>
                          {{ $t('AwesomeCrud.buttons.openEditLayoutMode') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-warning btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="exportLayout"
                        >
                          <i class="fa fa-download"></i>
                          {{ $t('AwesomeCrud.buttons.exportLayout') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-danger btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="resetLayout"
                        >
                          <i class="fa fa-eraser"></i>
                          {{ $t('AwesomeCrud.buttons.resetLayout') }}
                        </button>
                        <button
                          v-if="editLayoutMode && layout"
                          class="btn btn-info btn-main-style mr-1 btn-sm"
                          type="button"
                          @click="closeEditLayoutMode"
                        >
                          <i class="fa fa-save"></i>
                          {{ $t('AwesomeCrud.buttons.closeEditLayoutMode') }}
                        </button>
                      </div>

                      <button
                        v-if="!standalone && !_isEmbedded"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="cancel"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" :class="{ 'view-mode': mode === 'view' }">
                      <ul
                        v-if="nestedSchemas && nestedSchemas.length && mode !== 'create'"
                        class="nav nav-tabs mt-0 mb-4"
                      >
                        <li class="nav-item">
                          <a class="nav-link active" data-toggle="tab" @click="activeNestedTab = 'general'">
                            {{ $te('app.labels.' + identity) ? $te('app.labels.' + identity) : startCase(identity) }}
                          </a>
                        </li>
                        <li v-for="ns in nestedSchemas" :key="ns.$id" class="nav-item">
                          <a class="nav-link" data-toggle="tab" @click="activeNestedTab = ns.identity">
                            <i v-if="ns.icon" :class="ns.icon" />
                            {{ $t(ns.title || ns.name || ns.identity) }}
                          </a>
                        </li>
                      </ul>
                      <slot name="edit-form" :selectedItem="selectedItem">
                        <div class="tab-content">
                          <div class="row" v-if="_useCustomLayout">
                            <AwesomeLayout
                              v-if="_useCustomLayout"
                              :edit-mode="editLayoutMode"
                              :layout="layout"
                              @layout-updated="onLayoutUpdated"
                              @layout-fields-updated="onLayoutFieldsUpdated"
                            >
                              <template v-slot:field="slotProps">
                                <VueFormGenerator
                                  :schema="getShemaForFields(slotProps.field)"
                                  :model="selectedItem"
                                  :options="formOptions"
                                  tag="div"
                                />
                              </template>
                              <template v-slot:fields="fieldsSlotProps">
                                <VueFormGenerator
                                  :schema="getShemaForFields(fieldsSlotProps.fields)"
                                  :model="selectedItem"
                                  :options="formOptions"
                                  tag="div"
                                />
                              </template>
                            </AwesomeLayout>
                            <!--<template v-for="(column, index) in layout.columns">
                              <div :key="index" is="Column" v-bind="column">
                                <template>
                                  <Tabs
                                    :tabs="
                                      column.tabs || [
                                        {
                                          legend: '',
                                          ...column,
                                          cols: null,
                                          styleClasses: 'p-0 m-0'
                                        }
                                      ]
                                    "
                                    :class="column.childStyleClasses"
                                  >
                                    <template v-slot:content="{ tab, activeTabIndex }">
                                      <template v-if="tab.fields">
                                        <VueFormGenerator
                                          :schema="getShemaForFields(column.fields)"
                                          :model="selectedItem"
                                          :options="formOptions"
                                          tag="div"
                                          :class="'tab-' + activeTabIndex"
                                        />
                                      </template>
                                      <template v-if="tab.rows">
                                        <template v-for="(row, index3) in tab.rows">
                                          <Row v-bind="row" :key="index3" :class="'row-' + index3">
                                            <template v-if="row.fields">
                                              <div>
                                                <VueFormGenerator
                                                  :schema="getShemaForFields(row.fields)"
                                                  :model="selectedItem"
                                                  :options="formOptions"
                                                  tag="div"
                                                />
                                              </div>
                                            </template>
                                            <template v-if="row.groups">
                                              <GroupedForm
                                                :groups="row.groups"
                                                :model.sync="selectedItem"
                                                :options="formOptions"
                                                :schema="formSchema"
                                              />
                                            </template>
                                          </Row>
                                        </template>
                                      </template>
                                      <template v-if="tab.groups">
                                        <GroupedForm
                                          :groups="tab.groups"
                                          :model.sync="selectedItem"
                                          :options="formOptions"
                                          :schema="formSchema"
                                        />
                                      </template>
                                    </template>
                                  </Tabs>
                                </template>
                              </div>
                            </template>-->
                          </div>

                          <template v-if="formSchema && formSchema.fields && !_useCustomLayout">
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
                                tag="div"
                              />
                            </div>
                          </template>
                          <template
                            v-if="
                              nestedSchemas &&
                                nestedSchemas.length &&
                                (mode === 'view' || mode === 'edit') &&
                                selectedItem
                            "
                          >
                            <div
                              v-for="ns in nestedSchemas"
                              :key="ns.$id"
                              class="tab-pane nested-tab fade"
                              :class="{
                                'active show': activeNestedTab === ns.identity
                              }"
                            >
                              <div
                                :is="AwesomeCrud"
                                v-if="activeNestedTab === ns.identity"
                                v-bind="ns"
                                :parent="selectedItem"
                                :useRouterMode="false"
                                :crud-needs-refresh.sync="nestedCrudNeedsRefresh"
                              >
                                <div slot="crud-title" />
                              </div>
                            </div>
                          </template>
                        </div>
                      </slot>
                    </div>
                    <div class="modal-footer" v-if="!_isEmbedded">
                      <slot name="edit-modal-footer">
                        <button
                          v-if="!standalone"
                          type="button"
                          class="btn btn-default btn-simple mr-auto"
                          @click="cancel"
                        >
                          {{ $t('AwesomeCrud.buttons.cancel') }}
                        </button>
                        <template v-if="mergedOptions.customInlineActions">
                          <template v-for="(action, index) in mergedOptions.customInlineActions">
                            <button
                              type="button"
                              :key="index"
                              class="btn btn-primary btn-alt-style"
                              :class="action.class"
                              :id="action.name + '-' + index"
                              :data-title="action.title || action.label"
                              :data-tooltip="action.title || action.label"
                              @click="
                                $emit('customAction', {
                                  action,
                                  item: selectedItem,
                                  location: 'inline',
                                  id: action.name + '-' + index
                                });
                                closeModal();
                              "
                            >
                              <i v-if="action.icon" :class="action.icon"></i>
                              <span>{{ action.label ? $t(action.label) : action.title ? $t(action.title) : '' }}</span>
                            </button>
                          </template>
                        </template>

                        <button v-if="mode === 'edit'" type="submit" class="btn btn-primary ml-2">
                          {{ $t('AwesomeCrud.buttons.save') }}
                        </button>
                        <button
                          v-if="mode === 'view' && _actions.edit && !mergedOptions.noActions"
                          type="button"
                          class="btn btn-info btn-main-style ml-2"
                          @click.prevent.stop="$emit('edit', selectedItem)"
                        >
                          <i class="fa fa-pencil" />
                          {{ $t('AwesomeCrud.buttons.edit') }}
                        </button>
                        <button
                          v-if="mode === 'view' && !standalone"
                          type="button"
                          class="btn btn-primary ml-2"
                          @click="closeModal()"
                        >
                          {{ $t('AwesomeCrud.buttons.close') }}
                        </button>
                      </slot>
                    </div>
                  </form>
                </div>
                <div v-if="mode === 'bulkEdit'" class="modal-content">
                  <form @submit.prevent="bulkEditItems()">
                    <div class="modal-header bg-primary text-white">
                      <h3 class="text-left mt-0 modal-title" :title="$t('AwesomeCrud.labels.add_a') + ' '.title">
                        {{ $t('AwesomeCrud.labels.add_a') }} {{ title }}
                      </h3>
                      <button
                        v-if="!standalone && !_isEmbedded"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="cancel()"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <slot name="create-form" :selectedItem="selectedItem">
                        <template v-if="formSchema && formSchema.fields">
                          <VueFormGenerator
                            ref="form"
                            :schema.sync="formSchema"
                            :model="selectedItem"
                            :options="formOptions"
                            tag="div"
                          />
                        </template>
                      </slot>
                    </div>
                    <div class="modal-footer" v-if="!_isEmbedded">
                      <slot name="add-modal-footer">
                        <button type="button" class="btn btn-default btn-main-style mr-auto" @click="cancel()">
                          {{ $t('AwesomeCrud.buttons.cancel') }}
                        </button>
                        <button type="submit" class="btn btn-primary ml-auto">
                          {{ $t('AwesomeCrud.buttons.save') }}
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
          <div
            :id="identity + 'Backdrop'"
            v-if="displayMode !== 'page' && displayMode !== 'fullscreen' && show"
            class="modal-backdrop backdrop-custom show"
            :class="displayMode"
            style="background: #111;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import parseJsonSchema from '../../mixins/parseJsonSchemaMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awesomeFormMixin from '../../mixins/awesomeFormMixin';
import relationMixin from '../../mixins/relationMixin';
import notificationsMixin from '../../mixins/notificationsMixin';

import i18nMixin from '../../mixins/i18nMixin';
import { defaultActions } from '../../mixins/defaultProps';
/*
import Column from "./layout/Column.vue";
import Tabs from "./layout/Tabs.vue";
import Row from "./layout/Row.vue";
import GroupedForm from "./layout/GroupedForm.vue";
*/

import 'vue-good-table/dist/vue-good-table.css';
import AwesomeCrud from './AwesomeCrud';
import AwesomeLayout from './layout/AwesomeLayout';

const defaultOptions = {
  mode: 'local',
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  bulkEditPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  modalMode: 'slide', // fade | slide | full / renamed to prop displayMode  Deprecated BC BREAK
  columnsDisplayed: 8,
  customInlineActions: [],
  customBulkActions: [],
  customTopActions: [],
  customTabletopActions: [],
  responseField: 'body',
  useCustomLayout: false
};

export default {
  name: 'AwesomeForm',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  components: {
    'awesome-crud': AwesomeCrud,
    /* Column,
    Tabs,
    Row,
    GroupedForm,
    */
    AwesomeLayout
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
    item: { type: Object, required: true },
    bulkItems: { type: Array, required: false },
    title: { type: String, required: false, default: undefined },
    pageTitle: { type: String, required: false, default: undefined },
    identity: { type: String, required: true },
    modelName: { type: String, required: false },
    standalone: { type: Boolean, required: false, default: true },
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
        'You don\'t actually to pass this, it\'s done automatically by the parent component itself'
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'list',
      note:
        'In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form'
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
            cancel: 'Cancel',
            close: 'Close'
          }
        }
      }),
      note: 'Translation labels to use when vue-i18n is not present'
    },
    mode: {
      type: String,
      required: true,
      validator: (value) => {
        // Only accepts values that contain the string 'cookie-dough'.
        return ['create', 'edit', 'view', 'bulkEdit'].indexOf(value) !== -1;
      }
    },
    displayMode: {
      type: String,
      required: false,
      default: 'sidebar',
      validator: (value) => {
        // Only accepts values that contain the string 'cookie-dough'.
        return (
          [
            'modal',
            'sidebar',
            'page',
            'fullscreen',
            'sidebar-left',
            'sidebar-right',
            'fade', // deprecated
            'slide' // deprecated
          ].indexOf(value) !== -1
        );
      }
    },
    updateRouter: {
      type: Boolean,
      required: false,
      default: true,
      node: 'Controls if the actions (create / edit / view)  should update the current route url'
    },
    useSimpleCreateForm: {
      type: Boolean,
      required: false,
      default: false,
      node: 'If true then the create form will display only required attributes'
    },
    options: {
      type: Object,
      default: () => defaultOptions
    },
    actions: {
      type: Object,
      default: () => defaultActions,
      note: 'actions active in this instance'
    },
    layout: {
      type: [Array, Object],
      note: 'Layout of the form',
      default: () => null
    },
    editLayoutMode: {
      type: Boolean
    }
  },
  data() {
    return {
      AwesomeCrud,
      $modal: null,
      parentPath: '',
      selectedItem: {},
      isRefreshing: false,
      nestedCrudNeedsRefresh: false,
      show: false,
      showBackDrop: false,
      mergedOptions: {},
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

    _model() {
      return this.model || this.getModelFromStore(this.identity);
    },

    formSchema() {
      if (!this._schema) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this._schema);
      parsedFormSchema.styleClasses = 'row';
      parsedFormSchema.mode = this.mode;
      if (parsedFormSchema.fields) {
        parsedFormSchema.fields = parsedFormSchema.fields.map((field) => {
          if (!field.styleClasses || field.styleClasses.indexOf('col-') === -1) {
            field.styleClasses = `${field.styleClasses || ''} col-12`;
          }
          if (parsedFormSchema.mode === 'bulkEdit') {
            field.required = false;
          }
          return field;
        });
      }
      return parsedFormSchema;
    },

    simpleFormSchema() {
      let fields = this.formSchema.fields.filter((f) => f.required);
      if (!fields.length) {
        fields = this.formSchema.fields;
      }
      return { ...this.formSchema, fields };
    },

    createFormSchema() {
      return this.useSimpleCreateForm ? this.simpleFormSchema : this.formSchema;
    },

    _actions() {
      return _.merge(
        {},
        defaultActions,
        (this.mergedOptions && this.mergedOptions.actions) || this.actions // old location kept for BC
      );
    },

    _url() {
      const url =
        this.url || (this.options && this.options.url) || (this._model && this._model.url) || `/${this.identity}`;

      if (typeof url === 'function') {
        return url({
          parent: this.parent,
          context: this,
          currentItem: this.selectedItem
        });
      }
      return url;
    },

    _formSchemaGrouped() {
      return { groups: [{ ...this.formSchema, legend: 'home' }] };
    },

    _isEmbedded() {
      return this._isNested && (this.nestedDisplayMode === 'view' || this.nestedDisplayMode === 'edit');
    },

    _useCustomLayout() {
      return !!(this.options.useCustomLayout && this.layout);
    },

    _editItemTile() {
      if (!this.selectedItem) {
        return '';
      }

      if (this._model && this._model.displayField && this.selectedItem[this._model.displayField]) {
        return this.selectedItem[this._model.displayField];
      }

      if (this.selectedItem[this.primaryKey]) {
        return this.selectedItem[this.primaryKey];
      }
      return '';
    },

    _schema() {
      return this.schema || (this._model && this._model.schema);
    }
  },
  watch: {
    // call again the method if the route changes
    name: 'loadModel',
    identity: 'loadModel',
    model: 'loadModel',
    options: 'mergeOptions',
    crudNeedsRefresh: 'refreshComponent',
    item: 'loadModel'
  },
  created() {
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
    if (this.modelName) {
      this.identity = this.modelName;
    }
    this.loadModel();
    if (this.$route) {
      const matched = this.$route.matched[this.$route.matched.length - 1];
      if (this.$route.params.id) {
        if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
          delete this.$route.params.id;
          if (this.$route.query.item) {
            this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
          }
          this.$emit('create', this.selectedItem, { reset: false });

          return;
        }
        if (this.$route.params.id === 'bulkEdit') {
          delete this.$route.params.id;
          if (this.$route.query.item) {
            this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
          }
          this.$emit('bulkEdit', this.selectedItem, { reset: false });

          return;
        }
        this.parentPath = matched.path.replace('/edit', '').replace('/:id', '');
      } else {
        this.parentPath = matched.path;
      }
    }

    const action = `${this.mode}Function`;
    if (this[action]) {
      this[action](this.item);
    } else {
      throw new Error('no_action_available_for_mode_' + this.mode);
    }
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next((vm) => {
      vm.closeModal();
      //    vm.loadModel();
    });
  },
  beforeRouteLeave(to, from, next) {
    next((vm) => {
      vm.closeModal();
    });
  },

  methods: {
    $alert: Swal,
    startCase: _.startCase,
    refreshComponent() {
      // eslint-disable-next-line
      console.log('refresh component watcher');
      if (this.identity) {
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
      /** @fix deletePermitted is not used. Cross check with the intranet, and delete*/
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
        this.mergedOptions.queryParams = _.merge(this.mergedOptions.queryParams || this.$route.query.filters);
      }
    },
    callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
      console.log('Base 64 done', e);
    },

    importResponse(e) {
      // swal({title: this.$t('AwesomeDefault.messages.successfullyImported',{title: this.name}), type: 'success'})
      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
        Swal.fire({
          title: this.$t('AwesomeDefault.messages.no_data_imported', {
            title: this._title
          }),
          type: 'warning'
        });
        return;
      }

      if (e.properData.length > 0) {
        this.$notify({
          title: this.$t('AwesomeDefault.messages.successfullyImported', {
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
            title: `${e.improperData.length} ${this.$t('AwesomeDefault.messages.not_imported', {
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
            link.download = `${this.entity}_export`;
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
      setTimeout(() => {
        this.openModal();
      }, 100);
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

      // if the crud is nested and should display as a form then remote load the data
      if (this.parent && this.nestedDisplayMode === 'object') {
        this.nestedViewFunction();
      }

      if (this.mode !== 'bulkEdit') {
        this.selectedItem = this.item;
      } else {
        this.selectedItem = {};
      }
      if (!this._url) {
        return;
      }

      // todo call only if
      if (this.item && this.item[this.primaryKey]) {
        this.$http
          .get(`${this._selectedItemUrl}`)
          .then((res) => {
            const data =
              this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
                ? _.get(res, this.apiResponseConfig.dataPath)
                : res.data;
            this.selectedItem = data;
          })
          .catch(this.apiErrorCallback)
          .finally(() => {
            this.isRefreshing = false;
            this.needsRefresh = false;
          });
      }
    },

    getShemaForFields(fields) {
      if (!fields) {
        return;
      }
      const fieldsDefinition = this.formSchema.fields.filter((f) => {
        return fields.indexOf(f.model) > -1;
      });
      return { ...this.formSchema, fields: fieldsDefinition };
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
      if (property.relation || property.relationUrl) {
        return 'VSelect';
      }
      if (property.enum) {
        return 'select';
      }
      switch (type) {
        case 'string':
          return 'input';
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

    openModal() {
      switch (this.displayMode) {
        case 'modal':
        case 'fade':
          document.body.classList.add('modal-open');
          break;
        case 'slide':
        case 'sidebar':
        case 'sidebar-right':
        case 'sidebar-left':
        case 'fullscreen':
          document.body.classList.add('modal-open');
          break;
      }
      this.show = true;
      this.showBackdrop = true;

      /*
      if (this.displayMode !== 'page' && this.$modal.modal) {
        this.$modal.modal('show');
      } else if (this.displayMode == 'slide') {
        this.$modal.addClass('show');
      } else {
        this.$modal.addClass('show');
      }
      */
    },

    closeModal() {
      if (this.standalone) {
        return;
      }
      if (this.parentPath && this.updateRouter) {
        window.history.replaceState({}, null, `${this.parentPath}`);
      }
      this.selectedItem = {};
      setTimeout(() => {
        this.show = false;
        this.showBackdrop = false;
      }, 100);
      document.body.classList.remove('modal-open');
    },

    cancel() {
      //eslint-disable-next-line
      this.$emit('cancel', this.item, { context: this.mode });
    },

    close() {
      //eslint-disable-next-line
      this.closeModal();
      this.$emit('closeRequested', null, { context: this.mode });
    },

    goToEditPage(item) {
      if (!this.mergedOptions.editPath) {
        if (this.updateRouter) {
          window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
        }
        this.editFunction(item);
        return;
      }
      this.$router.push(this.mergedOptions.editPath.replace(':id', item[this.primaryKey]));
    },

    goToViewPage(item) {
      if (!this.mergedOptions.viewPath) {
        if (this.updateRouter) {
          window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
        }
        this.viewFunction(item);
        return;
      }
      this.$router.push(this.mergedOptions.viewPath.replace(':id', item[this.primaryKey]));
    },

    createItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('AWESOMECRUD ERROR:: validation errors', error);
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }
      return this.$http
        .post(this._url, this.selectedItem)
        .then((res) => {
          this.$emit(this.identity + '-item-created', res.data);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: this.$t('AwesomeDefault.messages.successfullyCreated', {
              title: this.type
            }),
            type: 'success'
          });
          this.tableNeedsRefresh = true;
          this.statsNeedsRefresh = true;
          this.nestedCrudNeedsRefresh = true;
          this.$forceUpdate();
          this.closeModal();
          this.$emit('itemCreated', this.selectedItem, {
            context: this.mode
          });
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });

      // return false;
    },

    bulkEditItems() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('AWESOMECRUD ERROR:: validation errors', error);
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }
      this.bulkItems.forEach((element) => {
        if (element[this.primaryKey]) {
          element = _.merge(element, this.selectedItem);
          this.$emit('itemsBulkEdited', element);
        }
      });
      this.closeModal();
    },

    editItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (!this.selectedItem[this.primaryKey]) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No primary key on this them', this.selectedItem, this.primaryKey);
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error('AWESOMECRUD ERROR:: validation errors', errors);
          return;
        }
      }

      this.$http
        .put(`${this._selectedItemUrl}`, this.selectedItem)
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
          this.$emit('itemEdited', this.selectedItem, {
            context: this.mode
          });
          this.closeModal();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
      return false;
    },

    createFunction(item) {
      this.$emit('create', item);
    },

    editFunction(item) {
      this.$emit('edit', item);
    },

    viewFunction(item) {
      this.$emit('view', item);
    },

    deleteFunction(item) {
      this.$emit('delete', item);
    },

    bulkEditFunction(items) {
      this.$emit('bulkEdit', items);
    },

    getNestedItem() {
      this.mode = 'view';
      this.$http
        .get(`${this._selectedItemUrl}`)
        .then((res) => {
          this.selectedItem =
            this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
              ? _.get(res, this.apiResponseConfig.dataPath)
              : res.data.body;
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
        });
    },

    customAction(body) {
      const { action } = body;
      this.$emit(this.identity + '-custom-action', action);
      return action && action.action && action.action(body, this);
    },

    listUpdated(datas) {
      this.$emit('list-updated', datas);
      this.$emit(this.identity + '-list-updated', datas);
    },

    renderSidebar() {},
    renderTabs() {},
    renderColumns(columns) {
      return columns;
    },
    renderGroup() {},
    renderForm(definition = { component: 'VueFormGenerator', props: {} }) {},

    openEditLayoutMode() {
      this.$emit('open-edit-layout-mode');
    },

    closeEditLayoutMode() {
      this.$emit('close-edit-layout-mode');
      //this.editLayoutMode = false;
    },

    resetLayout() {
      const newLayout = {
        i: `awesomeForm-${this.identity}-${Date.now()}`,
        x: 0,
        y: 0,
        w: 12,
        h: 6,
        maxW: 12,
        minH: 2,
        legend: this.identity,
        fields: this.formSchema.fields.map((f) => f.model)
      };
      this.$emit('layout-resetted', [newLayout]);
    },

    exportLayout() {
      this.$export(this.layout);
    },

    onLayoutUpdated(items) {
      this.$emit('layout-updated', items);
    },

    onLayoutFieldsUpdated(items) {
      this.$emit('layout-fields-updated', items);
    }
  }
};
</script>
<style lang="scss" scoped>
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
    margin-bottom: -10px;
    margin-top: 10px;
  }
}

.vue-form-generator .input-group {
  z-index: 100;
}
.vue-form-generator .multiselect {
  width: 100%;
  margin-top: 10px;
}
.vue-form-generator {
  .form-element {
    label {
      display: block;
    }
    .hint {
      font-size: 60%;
      color: #999;
      font-style: italic;
      position: absolute;
      width: calc(100% - 40px);
      left: 20px;
      background: white;
      box-shadow: 0 0 2px #999;
      transition: all 200ms linear;
      z-index: 110;
      padding: 10px;
      margin-top: 10px;
      opacity: 0;
      visibility: hidden;
    }
    &:hover {
      .hint {
        opacity: 1;
        visibility: visible;
        transition-delay: 1s;
      }
    }
  }
}

.backdrop-custom {
  position: fixed !important;
  top: 0 !important;
  left: 0;
  z-index: 1040;
  width: 100vw !important;
  height: 100vh !important;
  background-color: #000;

  &:after,
  &:before {
    background: #000;
  }
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

.aw-form-header-actions {
  flex: auto;
  justify-content: flex-end;
}

.aw-form .aw-display {
  border-left: 3px solid #eee;
  padding-left: 3px;
  min-height: 30px;
  margin-left: -3px;
}
</style>
