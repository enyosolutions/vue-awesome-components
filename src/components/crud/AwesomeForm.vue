<template>
  <div class="content aw-form" :class="'aw-form-' + identity">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12" :class="displayMode === 'page' ? 'p-0' : ''">
          <div class="text-left">
            <!-- START OF MODAL -->
            <div
              :id="identity + 'FormModal'"
              class="AwesomeForm"
              :class="{
                modal: _shouldHaveModalClasses,
                slide: _shouldHaveSlideClasses,
                fade: displayMode === 'fade' || displayMode === 'modal' || displayMode === 'fullscreen',
                'page  fade': displayMode === 'page',
                show: this.show,
                ['display-mode-' + displayMode]: true
              }"
              tabindex="-1"
              role="dialog"
            >
              <div
                class
                :class="{
                  'modal-dialog': displayMode !== 'page',
                  'modal-dialog-centered': displayMode !== 'page',
                  'modal-dialog-scrollable': displayMode !== 'page',
                  'modal-nested': _isNested,
                  'modal-full-height': _shouldHaveSlideClasses,
                  'modal-fullscreen': displayMode === 'fullscreen',

                  'modal-lg': displayMode === 'modal' || displayMode === 'fade'
                }"
                role="document"
              >
                <div v-if="mode === 'create'" class="modal-content">
                  <form @submit.prevent="createItem()">
                    <div class="modal-header bg-primary text-white" v-if="shouldDisplayHeaderCpt">
                      <h3 class="text-left mt-0 modal-title" :title="$t('AwesomeCrud.labels.add_a') + ' '.title">
                        {{ $t('AwesomeCrud.labels.add_a') }} {{ _name || _title }}
                      </h3>

                      <div
                        v-if="_useCustomLayout && actions.editLayout"
                        class="btn-group m-0 aw-form-header-actions"
                        style="flex: auto"
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
                        v-if="(!standalone && !_isEmbedded) || _actions.close"
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
                          :fields-list="_getFieldsList"
                          :layout.sync="layout"
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
                <div v-if="mode === 'edit' || mode === 'view' || _isANestedDetailView" class="modal-content">
                  <form @submit.prevent="editItem()">
                    <div class="modal-header bg-primary text-white" v-if="shouldDisplayHeaderCpt">
                      <h3 v-if="mode === 'view' || mode === 'edit'" class="text-left modal-title mt-0">
                        {{ $t(mode === 'view' ? '' : 'AwesomeCrud.labels.edit') }} {{ _name }}
                        <b>{{ _editItemTile }}</b>
                      </h3>
                      <div class="btn-group m-0 aw-form-header-actions" v-if="customTopActions">
                        <AwesomeActionList
                          :actions="customTopActions"
                          :item="selectedItem"
                          :parent="parent"
                          location="top"
                          @customAction="$emit('customAction', $event)"
                        />
                      </div>
                      <div
                        v-if="_useCustomLayout && actions.editLayout"
                        class="btn-group m-0 aw-form-header-actions"
                        style="flex: auto"
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

                      <!-- create a subcomponent -->
                      <template v-if="!editLayoutMode && (mode === 'edit' || mode === 'view' || _isANestedDetailView)">
                        <div class="ml-1 aw-form-pagination" v-if="actions.formPagination && (hasPrevious || hasNext)">
                          <div class="btn-group">
                            <button
                              @click="!!hasPrevious && $emit('aw-select-previous-item')"
                              class="btn btn-light btn-sm float-left"
                              :disabled="!hasPrevious"
                              :class="!hasPrevious ? 'op-50' : ''"
                              type="button"
                            >
                              <i class="fa fa-chevron-circle-left"></i>
                            </button>

                            <button
                              @click="!!hasNext && $emit('aw-select-next-item')"
                              class="btn btn-light btn-sm float-right"
                              :disabled="!hasNext"
                              :class="!hasPrevious ? 'op-50' : ''"
                              type="button"
                            >
                              <i class="fa fa-chevron-circle-right"></i>
                            </button>
                          </div>
                        </div>
                      </template>

                      <button
                        v-if="(!standalone && !_isEmbedded) || _actions.close"
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click="cancel"
                      >
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div
                      class="modal-body"
                      :class="{
                        'modal-body-nested': _isANestedDetailView,
                        'view-mode': mode === 'view'
                      }"
                    >
                      <ul
                        v-if="nestedModels && nestedModels.length && mode !== 'create' && nestedLayoutMode !== 'list'"
                        class="nav nav-tabs mt-0 mb-4"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-toggle="tab"
                            :class="{ active: activeNestedTab === 'general' }"
                            @click="activeNestedTab = 'general'"
                          >
                            {{
                              $te('app.labels.' + identity)
                                ? $te('app.labels.' + identity)
                                : startCase(name || title || identity)
                            }}
                          </a>
                        </li>
                        <template v-for="(ns, index) in nestedModels">
                          <li v-if="ns && ns.identity" :key="index" class="nav-item nested-model-tab-link">
                            <a
                              class="nav-link"
                              :class="{ active: activeNestedTab === ns.identity }"
                              data-toggle="tab"
                              @click="activeNestedTab = (ns && ns.identity) || 'general'"
                            >
                              <i v-if="ns.icon" :class="ns.icon" />
                              {{ $t(ns.namePlural || ns.title || ns.identity) }}
                            </a>
                          </li>
                        </template>
                      </ul>
                      <slot name="edit-form" :selectedItem="selectedItem">
                        <div class="tab-content" :class="{ row: nestedLayoutMode === 'sidebar' }">
                          <div class="row" v-if="_useCustomLayout">
                            <AwesomeLayout
                              v-if="_useCustomLayout"
                              :edit-mode="editLayoutMode"
                              :layout.sync="layout"
                              :fields-list="_getFieldsList"
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

                          <!--
                  -
                  EDIT WITH TABS or LIST
                  -
                  -->
                          <template v-if="formSchema && formSchema.fields && !_useCustomLayout">
                            <!--
                            <template v-if="nestedLayoutMode === 'list'">
                              <h3 class="nested-model-title text-primary font-italic">
                                <b>{{ _editItemTile }}</b>
                              </h3>
                              <hr class="mb-1" />
                            </template>
                            -->
                            <div
                              class="tab-pane nested-tab fade"
                              :class="{
                                'active show':
                                  !activeNestedTab || activeNestedTab === 'general' || nestedLayoutMode === 'list',
                                'card p-5 ': nestedLayoutMode === 'list'
                              }"
                            >
                              <VueFormGenerator
                                :schema.sync="formSchema"
                                :model="selectedItem"
                                :options="formOptions"
                                ref="form"
                                tag="div"
                              />
                            </div>
                          </template>
                          <template
                            v-if="
                              nestedModels &&
                                nestedModels.length &&
                                (mode === 'view' || mode === 'edit') &&
                                selectedItem
                            "
                          >
                            <template v-for="ns in nestedModels">
                              <div
                                v-if="ns && ns.identity"
                                :key="ns.$id"
                                class="tab-pane nested-tab fade"
                                :class="{
                                  'active show in': activeNestedTab === ns.identity || nestedLayoutMode === 'list'
                                }"
                              >
                                <template v-if="nestedLayoutMode === 'list'">
                                  <h3
                                    class="nested-model-title mt-5 text-primary font-italic mb-0"
                                    @click="
                                      getNestedActions(ns).collapse
                                        ? (nestedModelsCollapseState[ns.identity] = !nestedModelsCollapseState[
                                            ns.identity
                                          ])
                                        : ''
                                    "
                                  >
                                    {{ getNestedTabsTitle(ns) }}
                                    <i
                                      class="fa"
                                      :class="
                                        nestedModelsCollapseState[ns.identity] ? 'fa-caret-right' : 'fa-caret-down'
                                      "
                                    ></i>
                                  </h3>
                                  <hr class="mt-0" />
                                </template>
                                <div
                                  :is="AwesomeCrud"
                                  :id="'list-collapse-' + ns.identity"
                                  v-bind="ns"
                                  :parent="selectedItem"
                                  :parentIdentity="(model && model.identity) || identity"
                                  :useRouterMode="false"
                                  :crud-needs-refresh="nestedElementsNeedRefresh"
                                  :needs-refresh="nestedElementsNeedRefresh"
                                  @input:needs-refresh="(state) => (nestedElementsNeedRefresh = state)"
                                  @input:nested-crud-needs-refresh="(state) => (nestedElementsNeedRefresh = state)"
                                  @update:nestedElementsNeedRefresh="(state) => (nestedElementsNeedRefresh = state)"
                                  class="aw-crud-nested-model"
                                  :class="
                                    getNestedActions(ns).collapse && nestedLayoutMode === 'list'
                                      ? !nestedModelsCollapseState[ns.identity]
                                        ? 'collapse show'
                                        : 'collapse'
                                      : ''
                                  "
                                >
                                  <div slot="crud-title" />
                                </div>
                              </div>
                            </template>
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
                        <template v-if="customInlineActions">
                          <AwesomeActionList
                            :actions="customInlineActions"
                            :item="selectedItem"
                            location="inline"
                            @customAction="$emit('customAction', $event)"
                          />
                        </template>

                        <button
                          v-if="actions.delete && !_mergedOptions.noActions"
                          type="button"
                          class="btn btn-danger btn-main-style ml-2"
                          @click.prevent.stop="deleteFunction(selectedItem)"
                        >
                          <i class="fa fa-trash" />
                          {{ $t('AwesomeCrud.buttons.delete') }}
                        </button>
                        <button v-if="mode === 'edit'" type="submit" class="btn btn-primary ml-2">
                          {{ $t('AwesomeCrud.buttons.save') }}
                        </button>
                        <button
                          v-if="mode === 'view' && actions.edit && !_mergedOptions.noActions"
                          type="button"
                          class="btn btn-info btn-main-style ml-2"
                          @click.prevent.stop="editFunction(selectedItem)"
                        >
                          <i class="fa fa-pencil" />
                          {{ $t('AwesomeCrud.buttons.edit') }}
                        </button>
                        <button
                          v-if="mode === 'view' && !standalone"
                          type="button"
                          class="btn btn-primary ml-2"
                          @click="close()"
                        >
                          {{ $t('AwesomeCrud.buttons.close') }}
                        </button>
                      </slot>
                    </div>
                  </form>
                </div>
                <!--
                  -
                  BULK EDIT
                  -
                  -->
                <div v-if="mode === 'bulkEdit'" class="modal-content">
                  <form @submit.prevent="bulkEditItems()">
                    <div class="modal-header bg-primary text-white">
                      <h3 class="text-left mt-0 modal-title" :title="$t('AwesomeCrud.labels.add_a') + ' '.title">
                        {{ $t('AwesomeCrud.labels.add_a') }} {{ _name || _title }}
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
            v-if="_shouldShowBackdrop"
            class="modal-backdrop backdrop-custom show"
            :class="'display-mode-' + displayMode"
            style="background: #111"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { upperFirst, merge, includes, startCase, cloneDeep, debounce, get } from 'lodash';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import parseJsonSchema from '../../mixins/parseJsonSchemaMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awesomeFormMixin from '../../mixins/awesomeFormMixin';
import relationMixin from '../../mixins/relationMixin';
import awEmitMixin from '../../mixins/awEmitMixin';

// import notificationsMixin from '../../mixins/notificationsMixin';

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
import AwesomeActionList from '../misc/AwesomeAction/AwesomeActionList';
import { createDefaultObject } from '../form/form-generator/utils/schema';

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
  responseField: 'body',
  useCustomLayout: false
};

export default {
  name: 'AwesomeForm',
  introduction: 'A component to forms from a json schema',
  components: {
    AwesomeCrud: AwesomeCrud,
    /* Column,
    Tabs,
    Row,
    GroupedForm,
    */
    AwesomeLayout,
    AwesomeActionList
  },
  mixins: [
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
    item: { type: Object, required: true },
    bulkItems: { type: Array, required: false },
    title: { type: [String, Boolean], required: false, default: undefined },
    pageTitle: { type: [String, Boolean], required: false, default: undefined },
    name: { type: [String, Boolean], required: false, default: undefined },
    namePlural: { type: [String, Boolean], required: false, default: undefined },
    identity: { type: String, required: true },
    modelName: { type: String, required: false },
    standalone: {
      type: Boolean,
      required: false,
      default: true,
      description: `Defines whether the component is used as part of another parent component
        (usually AwesomeCrud) or alone. Some actions won't have the same behavior`
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
    needsRefresh: {
      type: [Boolean, String],
      default: false,
      note: 'Define whether the content of the table list should be refreshed'
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note: 'An array describing the data that is linked to the nested model. Serves for displaying a detailed object'
    },
    nestedModels: {
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
        // eslint-disable-next-line
        "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    parentIdentity: {
      type: String,
      required: false,
      note: 'The model identity of the parent.'
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: 'list',
      values: ['view', 'edit', 'object', 'table'],
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
      values: ['create', 'edit', 'view', 'bulkEdit'],
      validator: (value) => {
        // Only accepts values that contain the string 'cookie-dough'.
        return ['create', 'edit', 'view', 'bulkEdit'].indexOf(value) !== -1;
      },
      description: 'Define what mode should the form be used in (create | edit | view | bulkEdit)'
    },
    displayMode: {
      type: String,
      required: false,
      default: 'sidebar',
      node: `Manages the way the form is displayed. This field is relevant mostly when using Awesome form as part of AwesomeCrud.

        'modal': Display as a modal
        'fade': (legacy)  Display as a modal
        'slide': (legacy)  Display as right size side menu
        'sidebar':   Display as right size side menu
        'sidebar-right':   Display as right size side menu
        'sidebar-left':  Display as Left size side menu
        'fullscreen':   Display as a full screen component
        'page':   Display as an in page component
      `,
      values: [
        'modal',
        'sidebar',
        'page',
        'fullscreen',
        'sidebar-left',
        'sidebar-right',
        'sideform',
        'fade', // deprecated
        'slide' // deprecated
      ],
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
            'sideform',
            'fade', // deprecated
            'slide' // deprecated
          ].indexOf(value) !== -1
        );
      }
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
    customInlineActions: {
      type: Array,
      default: () => [],
      note: 'custom action in footer and in awTable row'
    },
    customTopActions: {
      type: Array,
      default: () => [],
      note: 'custom top actions'
    },
    layout: {
      type: [Array, Object],
      note: 'Layout of the form',
      default: () => []
    },
    editLayoutMode: {
      type: Boolean
    },
    useRouterMode: {
      type: Boolean,
      required: false,
      default: true,
      node: 'Controls if the actions (create / edit / view)  should update the current route url'
    },
    updateRouter: {
      type: Boolean,
      required: false,
      default: true,
      node:
        'Controls if the actions (create / edit / view)  should update the current route url. @Deprecated, use `useRouterMode` instead.'
    },
    nestedLayoutMode: {
      type: String,
      required: false,
      default: 'horizontal-tabs',
      values: ['horizontal-tabs', 'vertical-tabs', 'list'],
      note:
        'In case of a nested schema, this parameter determines how the nested the models should be rendered. Exemple a list of posts with a comments as a nested should display a table, whereas the author info should display as an object...'
    },
    displayHeader: {
      type: Boolean,
      default: true,
      node: 'Controls if the the header of the modal or the page should be displayed'
    },
    hasNext: {
      type: Boolean,
      default: false,
      note: 'Controls if the next button should be displayed'
    },
    hasPrevious: {
      type: Boolean,
      default: false,
      note: 'Controls if the previous button should be displayed'
    },
    useCustomLayout: {
      type: Boolean,
      default: false,
      note: 'If the form layout can be changed'
    }
  },
  data() {
    return {
      AwesomeCrud,
      $modal: null,
      parentPath: '',
      selectedItem: {},
      isRefreshing: false,
      nestedElementsNeedRefresh: false,
      show: false,
      showBackDrop: false,
      mergedOptions: {},
      innerNestedModels: [],
      activeNestedTab: 'general',
      formOptions: {
        validayeAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true
      },
      nestedModelsCollapseState: {}
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
          : startCase(this._model.singularName);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : startCase(this.identity);
      }
      return '';
    },

    _titlePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : startCase(this._model.namePlural);
      }

      if (this.title) {
        return this.$te(this.title + 's') ? this.$t(this.title + 's') : this.title + 's';
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}s`)
          ? this.$t(`app.labels.${this.identity}s`)
          : startCase(this.identity + 's');
      }
      return '';
    },

    _name() {
      if (this._model && this._model.name) {
        if (this.$te(this._model.name)) {
          const t = this.$t(this._model.name);
          if (typeof t === 'string') {
            return t;
          }
        }
        {
          return startCase(this._model.name);
        }
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : startCase(this.identity);
      }
      return '';
    },
    _namePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : startCase(this._model.namePlural);
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}`)
          ? this.$t(`app.labels.${this.identity}`)
          : startCase(this.identity);
      }
      return '';
    },

    _selectedItemUrl() {
      let url;
      if (!this.selectedItem || !this.selectedItem[this.primaryKey]) {
        return undefined;
      }
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

    _mergedOptions() {
      let mergedOptions = merge({}, defaultOptions, this.options, this._model.options);
      if (this.options !== defaultOptions) {
        console.warn('options are diffrent from the basics', this.options);
        mergedOptions = merge(mergedOptions, this.options);
      }
      if (this.$route && this.$route.query && this.$route.query.filters) {
        mergedOptions.queryParams = merge(this.mergedOptions.queryParams || this.$route.query.filters);
      }

      if (!mergedOptions.exportUrl) {
        mergedOptions.exportUrl = `${this._url}/export`;
      }

      if (!mergedOptions.importUrl) {
        mergedOptions.importUrl = `${this._url}/import`;
      }
      return mergedOptions || {};
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
      return merge(
        {},
        defaultActions,
        this.actions || (this._mergedOptions && this._mergedOptions.actions) // old location kept for BC
      );
    },

    _formSchemaGrouped() {
      return { groups: [{ ...this.formSchema, legend: 'home' }] };
    },

    _useCustomLayout() {
      return !!(this.useCustomLayout && this.layout);
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
    },

    _shouldShowBackdrop() {
      return ['page', 'fullscreen', 'sideform'].indexOf(this.displayMode) === -1 && this.show;
    },

    _shouldHaveModalClasses() {
      return (
        ['fade', 'modal', 'fullscreen', 'sidebar', 'slide', 'sidebar-left', 'sidebar-right'].indexOf(this.displayMode) >
        -1
      );
    },
    _shouldHaveSlideClasses() {
      return ['sidebar', 'slide', 'sidebar-left', 'sidebar-right'].indexOf(this.displayMode) > -1;
    },
    _getFieldsList() {
      const fieldsList = [];
      this.formSchema.fields.forEach((field) => {
        let exist = false;
        this.layout &&
          Array.isArray(this.layout) &&
          this.layout.forEach((layout) => {
            if (includes(layout.fields, field.model)) {
              exist = true;
            }
          });
        if (!exist) {
          fieldsList.push(field.model);
        }
      });
      return fieldsList;
    },

    shouldDisplayHeaderCpt() {
      return !['page', 'sidebar', 'sideform'].includes(this.displayMode) || this.displayHeader;
    }
  },
  watch: {
    // call again the method if the route changes
    name: 'loadModel',
    identity: 'loadModel',
    model: 'loadModel',
    mode: 'onModeChanged',
    options: 'mergeOptions',
    item: 'refreshComponent',
    needsRefresh: 'refreshComponent'
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
  },
  mounted() {
    this.openModalDebounced = debounce(this.openModal, 300, { leading: true });
    // @deprecated
    if (this.nestedSchemas && this.nestedSchemas.length) {
      console.warn('@deprecated nestedSchemas is now nestedModels. Please use nested nestedModels');
    }

    // allow old property names to still work
    // @deprecated
    if (this.modelName) {
      this.identity = this.modelName;
    }

    this.nestedModels.forEach((nm) => {
      this.$set(this.nestedModelsCollapseState, nm.identity, !!nm.initiallyCollapsed);
    });

    if (this.item) {
      this.selectedItem = this.item;
    }
    this.loadModel();
    if (this.mode === 'create') {
      this.selectedItem = createDefaultObject(this.formSchema);
      this.selectedItem = merge(this.selectedItem, this.item);
    }

    this.nestedElementsNeedRefresh = true;
    setTimeout(() => {
      this.nestedElementsNeedRefresh = false;
    }, 100);

    if (this.$route && this.useRouterMode) {
      const matched = this.$route.matched[this.$route.matched.length - 1];

      if (this.$route.params.id === 'create' || this.$route.params.id === 'new' || this.$route.path.endsWith('/new')) {
        if (this.$route.params.id === 'create' || this.$route.params.id === 'new') {
          delete this.$route.params.id;
        }
        if (this.$route.query.item) {
          this.selectedItem = merge(this.selectedItem, this.$route.query.item);
        }
        this.$emit('create', this.selectedItem, { reset: false });

        return;
      }

      if (this.$route.params.id) {
        if (this.$route.params.id === 'bulkEdit') {
          delete this.$route.params.id;
          if (this.$route.query.item) {
            this.selectedItem = merge(this.selectedItem, this.$route.query.item);
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
      this[action](this.selectedItem);
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

  beforeDestroy() {
    document.body.classList.remove('modal-open');
  },

  methods: {
    $alert: Swal,
    startCase,
    upperFirst: (str) => upperFirst(str),
    refreshComponent(newVal, preVal) {
      if (!newVal || newVal === false) {
        return;
      }
      if (this.identity) {
        this.loadModel();
      }

      this.nestedElementsNeedRefresh = true;

      setTimeout(() => {
        this.nestedElementsNeedRefresh = false;
        this.$emit('update:crudNeedsRefresh', false);
        this.$emit('update:needsRefresh', false);
        this.$emit('input:crudNeedsRefresh', false);
        this.$emit('input:needsRefresh', false);
      }, 100);
    },

    onTableRefresh() {
      this.statsNeedsRefresh = true;
    },

    onModeChanged(newmode, oldMode) {
      if (newmode === 'create') {
        this.selectedItem = createDefaultObject(this.formSchema);
      }
      this.loadModel();
    },
    mergeOptions() {
      /** @fix deletePermitted is not used. Cross check with the intranet, and delete*/
      if (this.options && this.options.deletePermitted && this.actions.delete) {
        if (
          this.$store &&
          this.$store.state &&
          !this.options.deletePermitted.some((v) => this.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0)
        ) {
          this.actions.delete = false;
        }
      }
      this.mergedOptions = merge({}, defaultOptions, this.mergedOptions, this.options);
      if (this.$route && this.$route.query && this.$route.query.filters) {
        this.mergedOptions.queryParams = merge(this.mergedOptions.queryParams || this.$route.query.filters);
      }
    },

    loadModel() {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line
        console.count('Loaded Model: ' + this.identity);
      }
      this.mergeOptions();
      setTimeout(() => {
        this.openModalDebounced();
      }, 100);

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

      if (this.mode === 'bulkEdit' || this.mode === 'create') {
        this.selectedItem = {} || createDefaultObject(this.formSchema);
      } else {
        this.selectedItem = this.item;
      }
      if (!this._selectedItemUrl) {
        return;
      }

      // todo call only if
      if (this.item && this.item[this.primaryKey]) {
        this.$http
          .get(`${this._selectedItemUrl}`)
          .then((res) => {
            const data =
              this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
                ? get(res, this.apiResponseConfig.dataPath)
                : res.data;
            this.selectedItem = data;
            this.$emit('itemFetched', this.selectedItem); // @deprecated
            this.$awEmit('item-fetched', {
              component: 'aw-form',
              context: this,
              item: cloneDeep(data),
              identity: this.identity,
              parentIdentity: this.parentIdentity,
              parent: this.parent
            });
          })
          .catch(this.apiErrorCallback)
          .finally(() => {
            this.isRefreshing = false;
            this.$emit('input:needs-refresh', false);
          });
      }
    },

    getShemaForFields(fields) {
      if (!fields || !fields.length) {
        return;
      }
      const fieldsDefinition = this.formSchema.fields.filter((f) => {
        return fields.indexOf(f.model) > -1;
      });
      return { ...this.formSchema, fields: fieldsDefinition };
    },

    openModalDebounced: () => {},
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
    },

    closeModal() {
      if (this.standalone) {
        return;
      }
      if (this.parentPath && this.useRouterMode) {
        // window.history.pushState({}, null, `${this.parentPath}`);
        this.$router.replace(`${this.parentPath}`);
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
      this.$awEmit('cancel', this.item, { context: this.mode });
    },

    close() {
      //eslint-disable-next-line
      this.closeModal();
      this.$awEmit('closeRequested', this.item, { context: this.mode });
    },

    goToEditPage(item) {
      if (!this._mergedOptions.editPath) {
        if (this.useRouterMode) {
          // window.history.pushState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
          this.$router.push(`${this.parentPath}/${item[this.primaryKey]}/edit`);
        }
        this.editFunction(item);
        return;
      }
      this.$router.push(
        this._mergedOptions.editPath.replace(':id', item[this.primaryKey]).replace('{{id}}', item[this.primaryKey])
      );
    },

    goToViewPage(item) {
      if (!this._mergedOptions.viewPath) {
        if (this.useRouterMode) {
          // window.history.pushState({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
          this.$router.push({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
        }
        this.activeNestedTab = 'general';
        this.viewFunction(item);
        return;
      }
      this.$router.push(
        this._mergedOptions.viewPath.replace(':id', item[this.primaryKey]).replace('{{id}}', item[this.primaryKey])
      );
    },

    async createItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        let errors = this.$refs.form.validate();
        if (errors.then) {
          try {
            errors = await errors;
          } catch (err) {
            errors = err;
          }
        }
        if (errors && errors.length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line
            console.error('AWESOMECRUD ERROR:: validation errors', errors);
          }
          this.$awEmit('validation-errors', { errors });
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }
      this.mergeSelectedItemWithRequestProps();

      this.$awEmit('before-create', {
        component: 'aw-form',
        context: this,
        item: this.selectedItem,
        identity: this.identity,
        parentIdentity: this.parentIdentity,
        parent: this.parent
      });
      return this.$http
        .post(this._url, this.selectedItem)
        .then((res) => {
          this.$awEmit('item-created', {
            component: 'aw-form',
            context: this,
            item: res.data,
            identity: this.identity,
            parentIdentity: this.parentIdentity,
            parent: this.parent
          });
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
          this.nestedElementsNeedRefresh = true;
          this.$forceUpdate();
          this.close();
          this.$awEmit('itemCreated', this.selectedItem, {
            context: this.mode
          });
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
          this.nestedElementsNeedRefresh = false;
        });

      // return false;
    },

    async bulkEditItems() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (this.$refs.form) {
        let errors = this.$refs.form.validate();
        if (errors.then) {
          try {
            errors = await errors;
          } catch (err) {
            errors = err;
          }
        }
        if (errors && errors.length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line
            console.error('AWESOMECRUD ERROR:: validation errors', errors);
          }
          this.$awEmit('validation-errors', { errors });
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn('Unable to find the reference to the schema form on ', this.$route.path);
      }
      this.bulkItems.forEach((element) => {
        if (element[this.primaryKey]) {
          element = merge(element, this.selectedItem);
          this.$awEmit('itemsBulkEdited', element);
        }
      });
      this.close();
    },

    async editItem() {
      if (!this._url) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No url for submitting');
        return false;
      }
      if (!this.selectedItem[this.primaryKey]) {
        // eslint-disable-next-line
        console.warn('AWESOMECRUD ERROR:: No primary key on this item', this.selectedItem, this.primaryKey);
        return false;
      }
      if (this.$refs.form) {
        let errors = this.$refs.form.validate();
        if (errors.then) {
          try {
            errors = await errors;
          } catch (err) {
            errors = err;
          }
        }
        if (errors && errors.length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line
            console.error('AWESOMECRUD ERROR:: validation errors', errors);
          }
          this.$awEmit('validation-errors', { errors });
          return;
        }
      }

      this.mergeSelectedItemWithRequestProps();
      this.$awEventBus &&
        this.$awEventBus.$emit('before-update', {
          context: this,
          item: this.selectedItem,
          identity: this.identity,
          parentIdentity: this.parentIdentity,
          parent: this.parent
        });
      if (!this._selectedItemUrl) {
        return;
      }
      this.$http
        .put(`${this._selectedItemUrl}`, this.selectedItem)
        .then((res) => {
          this.$awEmit('item-edited', { data: res.data });
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
          this.nestedElementsNeedRefresh = true;
          this.$forceUpdate();
          this.$awEmit('itemEdited', this.selectedItem, {
            context: this.mode
          });
          this.close();
        })
        .catch(this.apiErrorCallback)
        .finally(() => {
          this.isRefreshing = false;
          this.nestedElementsNeedRefresh = false;
        });
      return false;
    },

    createFunction(item) {
      this.$awEmit('create', item);
    },

    editFunction(item) {
      this.activeNestedTab = 'general';
      this.$awEmit('edit', item);
    },

    viewFunction(item) {
      this.$awEmit('view', item);
    },

    nestedViewFunction(item) {
      this.$emit('nestedView', item);
      this.openModalDebounced();
    },

    deleteFunction(item) {
      this.$emit('delete', item);
    },

    bulkEditFunction(items) {
      this.$emit('bulkEdit', items);
    },

    getNestedItem() {
      this.mode = 'view';
      if (!this._selectedItemUrl) {
        return;
      }
      this.$http
        .get(`${this._selectedItemUrl}`)
        .then((res) => {
          this.selectedItem =
            this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
              ? get(res, this.apiResponseConfig.dataPath)
              : res.data.body;
          this.$emit('itemFfetched', this.selectedItem); // @deprecated
          this.$awEemit('item-fetched', {
            component: 'aw-form',
            context: this,
            item: this.selectedItem,
            identity: this.identity,
            parentIdentity: this.parentIdentity,
            parent: this.parent
          });
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
    },

    getNestedTabsTitle(ns) {
      if (ns.name) {
        return ns.name;
      }
      if (ns.title) {
        return ns.title;
      }
      return this.$te('awForm.labels.tabs.' + ns.identity)
        ? this.$t('awForm.labels.tabs.' + ns.identity)
        : this.startCase(ns.identity);
    },

    getNestedActions(nestedModel) {
      return merge({}, defaultActions, nestedModel.actions);
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-backdrop.show {
  display: block;
}
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

    .aw-form {
      .modal-nested {
        .modal-header {
          position: static;
          text-align: left;
        }
      }

      .modal-body-nested {
      }
    }
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

.aw-form {
  .modal {
    &.slide {
      .modal-dialog {
        margin: 0;
      }
    }

    .modal-dialog {
      &.modal-full,
      &.modal-fullscreen {
        width: 100%;
        height: 100%;
        margin: 0;
        max-width: 100vw;
        max-height: 100vh;
        transform: none;

        .modal-content {
          height: 100%;

          form {
            margin: 0;
          }

          .modal-header {
            position: relative;
            height: 50px;
            padding: 10px;
            border: 0;
          }

          .modal-title {
            font-weight: 300;
            font-size: 1.2em;
            color: #fff;
            line-height: 30px;
          }

          .modal-body {
            position: relative;
            width: 100%;
            font-weight: 300;
            overflow: auto;
            background: #fff;
          }

          .modal-footer {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            height: 60px;
            padding: 10px;
            background: #f1f3f5;
          }
        }
      }
    }
  }
}

.btn:disabled {
  opacity: 0.5 !important;
}
</style>
