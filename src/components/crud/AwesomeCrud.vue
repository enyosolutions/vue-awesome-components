<template>
  <div class="content aw-crud" :class="`aw-crud-mode-${displayMode} aw-crud-${identity}`">
    <div class="">
      <div class="row mr-0 ml-0">
        <div class="col-12 awesomecrud-stats-section p-0">
          <div v-if="showStatsSectionComputed" class="row">
            <EnyoCrudStatsSection
              :url="_url + '/stats'"
              :entity="identity"
              :identity="identity"
              :stats-needs-refresh.sync="statsNeedsRefresh"
            />
          </div>
        </div>

        <div
          class="awesomecrud-listing-section p-0"
          v-show="showItemsListSectionComputed"
          :class="`aw-crud-listing-mode-${listingDisplayMode} ${displaySideFormContent ? 'col-6' : 'col-12'}`"
        >
          <!-- duplicate for when there is segment -->
          <AwesomeTable
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'table' || (_displayModeHasPartialDisplay && listingDisplayMode === 'table')) &&
                dataPaginationModeComputed
            "
            v-bind="$props"
            :actions="_actionsBeforeCalculation"
            :api-query-headers="mergedOptions.headerParams"
            :api-query-params="apiQueryParams || mergedOptions.queryParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :apiTimeout="apiTimeout"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :auto-refresh="mergedOptions.autoRefresh"
            :collapsible="false"
            :columns-displayed="mergedOptions.columnsDisplayed"
            :columns="tableColumnsComputed"
            :custom-bulk-actions="_customBulkActions"
            :custom-inline-actions="_customInlineActions"
            :custom-table-top-actions="_customTableTopActions"
            :entity="identity"
            :export-url="mergedOptions.exportUrl"
            :limit="tableDataLimit"
            :mode="dataPaginationModeComputed"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :saveColumnsState="saveColumnsState"
            :savePaginationState="savePaginationState"
            :segment="segment"
            :segmentField="segmentField"
            :title="_listingComponentTitle"
            :url="_url"
            :useRouterMode="useRouterMode"
            :uuid="'awtable-' + identity"
            :get-view-url="getViewPageUrl"
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
            <template slot="table-header-left"><slot name="top-left-buttons"></slot></template>
            <template slot="table-header-right">
              <div class="text-right">
                <ListingModeSelector
                  v-if="_actions.changeDisplayMode && enabledListingModes.length > 1"
                  v-model="listingDisplayMode"
                  :enabled-modes="enabledListingModes"
                />
                <slot name="top-right-buttons"></slot>
                <template v-if="_customTopRightActions">
                  <AwesomeActionList
                    class="d-inline-flex"
                    :actions="_customTopRightActions"
                    :parentDisplayMode="displayMode"
                    location="topright"
                    :columns="allColumnsComputed"
                    :use-dropdown="_customTopRightActions && _customTopRightActions.length > 2"
                    @customAction="onCustomAction"
                  />
                </template>
                <button
                  v-if="shouldShowCreateButtonCpt || !_customTopRightActions || !_customTopRightActions.length"
                  :class="shouldShowCreateButtonCpt ? 'visible' : 'invisible'"
                  :disabled="!canShowCreateButton"
                  class="btn btn-sm btn-outline-primary aw-button-add"
                  @click.prevent="goToCreatePage()"
                  type="button"
                >
                  <i class="fa fa-plus text-primary" />
                  {{ $t('AwesomeCrud.labels.createNew') }}
                </button>
              </div>
            </template>
            <template slot="table-top-actions">
              <template v-if="_customTitleBarActions">
                <AwesomeActionList
                  :actions="_customTitleBarActions"
                  :parentDisplayMode="displayMode"
                  location="topright"
                  :columns="allColumnsComputed"
                  :use-dropdown="_customTitleBarActions && _customTitleBarActions.length > 2"
                  @customAction="onCustomAction"
                />
              </template>
            </template>
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
                  class: 'btn btn-sm btn-main-style btn btn-simple text-success  btn-block'
                }"
                @uploaded="importResponse"
                @upload-failed="importFailedResponse"
              />
              <button
                v-if="_actions.import"
                class="btn btn-sm text-info btn-link btn-alt-style btn-block"
                type="button"
                @click="exportTemplateCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeCrud.buttons.excel-template') }}
              </button>
              <button
                v-if="mergedOptions.useCustomLayout && _actions.editLayout"
                type="button"
                class="btn btn-sm btn-simple btn-default btn-block"
                @click="goToCreatePage({ editLayoutMode: true })"
              >
                <i class="fa fa-th-large"></i>
                {{ $t('AwesomeCrud.buttons.openEditLayoutMode') }}
              </button>
            </template>

            <!-- END OF ARRAY -->
          </AwesomeTable>
          <AwesomeList
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'list' || (_displayModeHasPartialDisplay && listingDisplayMode === 'list'))
            "
            :actions="_actionsBeforeCalculation"
            :api-query-headers="mergedOptions.headerParams"
            :api-query-params="apiQueryParams || mergedOptions.queryParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :apiTimeout="apiTimeout"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :auto-refresh="mergedOptions.autoRefresh"
            :columns="listFieldsComputed"
            :descriptionField="listOptions ? listOptions.descriptionField : ''"
            :displayFields="listOptions ? listOptions.displayFields : []"
            :export-url="mergedOptions.exportUrl"
            :identity="identity"
            :imageClasses="listOptions && listOptions.imageClasses"
            :imageField="listOptions && listOptions.imageField"
            :imageStyles="listOptions && listOptions.imageStyles"
            :perRow="listOptions && listOptions.perRow"
            :mode="dataPaginationModeComputed"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :perPage="listOptions && listOptions.perPage ? listOptions.perPage : 10"
            :segment="segment"
            :segmentField="segmentField"
            :styles="{
              listWrapperClasses: 'row',
              itemWrapperClasses: 'col-3'
            }"
            :subtitleField="listOptions && listOptions.subtitleField"
            :title="_listingComponentTitle"
            :titleField="listOptions && listOptions.titleField"
            :url="_url"
            :useRouterMode="useRouterMode"
            v-bind="listOptions"
            @itemClicked="onListItemClicked"
            @reorder="onListReordered"
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
            <template slot="top-actions">
              <template v-if="_customTitleBarActions">
                <AwesomeActionList
                  :actions="_customTitleBarActions"
                  location="topright"
                  :columns="allColumnsComputed"
                  :use-dropdown="_customTitleBarActions && _customTitleBarActions.length > 2"
                  @customAction="onCustomAction"
                />
              </template>
            </template>
            <template slot="list-header-left"> </template>
            <template slot="list-header-right">
              <ListingModeSelector
                v-if="_actions.changeDisplayMode && enabledListingModes.length > 1"
                v-model="listingDisplayMode"
                :enabled-modes="enabledListingModes"
              />
              <slot name="top-right-buttons"></slot>
              <template v-if="_customTopRightActions">
                <AwesomeActionList
                  :actions="_customTopRightActions"
                  location="topright"
                  :columns="allColumnsComputed"
                  :use-dropdown="_customTopRightActions && _customTopRightActions.length > 2"
                  @customAction="onCustomAction"
                />
              </template>
              <button
                v-if="shouldShowCreateButtonCpt || !_customTopRightActions || !_customTopRightActions.length"
                :class="shouldShowCreateButtonCpt ? 'visible' : 'invisible'"
                :disabled="!canShowCreateButton"
                class="btn btn-sm btn-outline-primary aw-button-add"
                @click.prevent="goToCreatePage()"
                type="button"
              >
                <i class="fa fa-plus text-primary" />
                {{ $t('AwesomeCrud.labels.createNew') }}
              </button>
            </template>
            <template slot="top-more-actions">
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
                  class: 'btn btn-sm btn-main-style btn btn-simple text-success  btn-block'
                }"
                @uploaded="importResponse"
                @upload-failed="importFailedResponse"
              />
              <button
                v-if="_actions.import"
                class="btn btn-sm text-info btn-link btn-alt-style btn-block"
                type="button"
                @click="exportTemplateCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeCrud.buttons.excel-template') }}
              </button>
            </template>
            <template v-slot:list-items="{ items, itemsPerRow, columns }">
              <slot name="list-items" :items="items" :itemsPerRow="itemsPerRow" :columns="columns"></slot>
            </template>
            <template v-slot:list-item="{ item, itemsPerRow, columns, index }">
              <slot name="list-item" :item="item" :itemsPerRow="itemsPerRow" :columns="columns" :index="index"></slot>
            </template>
          </AwesomeList>
          <AwesomeKanban
            v-if="
              !_isANestedDetailView &&
                (displayMode === 'kanban' || (_displayModeHasPartialDisplay && listingDisplayMode === 'kanban'))
            "
            v-bind="_kanbanOptions"
            :actions="_actions"
            :title="_listingComponentTitle"
            :columns="kanbanFieldsComputed"
            :fields="_kanbanOptions.fields"
            :identity="identity"
            :url="_url"
            :api-query-params="apiQueryParams || mergedOptions.queryParams"
            :api-query-headers="mergedOptions.headerParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :apiTimeout="apiTimeout"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :useRouterMode="useRouterMode"
            :options="_kanbanOptions.options"
            :splittingField="_kanbanOptions.splittingField"
            :splittingValues="_splittingValuesComputed"
            :mode="dataPaginationModeComputed"
            :card-click-resolver="getViewPageUrl"
            @customListAction="onCustomListAction"
            @create="goToCreatePage"
            @removeList="onRemoveList"
            @listChanged="onListChanged"
            @cardChanged="onCardChanged"
            @cardAdded="onCardAdded"
            @cardClicked="onCardClicked"
            @data-changed="onDataChanged"
            @kanban-changed="forwardEvent('kanban-changed')"
            @beforeRefresh="beforeRefresh"
            @before-refresh="before_refresh"
            @afterRefresh="afterRefresh"
            @after-refresh="after_refresh"
          >
            <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"
              ><slot :name="slot" v-bind="scope"
            /></template>
            <template slot="kanban-header-left">
              <slot name="top-left-buttons"></slot>
            </template>
            <template slot="kanban-header-right">
              <ListingModeSelector
                v-if="_actions.changeDisplayMode && enabledListingModes.length > 1"
                v-model="listingDisplayMode"
                :enabled-modes="enabledListingModes"
              />
              <slot name="top-right-buttons"></slot>
              <AwesomeActionList
                :actions="_customTopRightActions"
                location="topright"
                :columns="allColumnsComputed"
                :use-dropdown="_customTopRightActions && _customTopRightActions.length > 2"
                @customAction="onCustomAction"
              />
              <button
                v-if="shouldShowCreateButtonCpt || !_customTopRightActions || !_customTopRightActions.length"
                :class="shouldShowCreateButtonCpt ? 'visible' : 'invisible'"
                :disabled="!canShowCreateButton"
                class="btn btn-sm btn-outline-primary aw-button-add"
                @click.prevent="goToCreatePage()"
                type="button"
              >
                <i class="fa fa-plus text-primary" />
                {{ $t('AwesomeCrud.labels.createNew') }}
              </button>
            </template>
            <template slot="top-more-actions">
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
                  class: 'btn btn-sm btn-main-style btn btn-simple text-success  btn-block'
                }"
                @uploaded="importResponse"
                @upload-failed="importFailedResponse"
              />
              <button
                v-if="_actions.import"
                class="btn btn-sm text-info btn-link btn-alt-style btn-block"
                type="button"
                @click="exportTemplateCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t('AwesomeCrud.buttons.excel-template') }}
              </button>
            </template>
            <slot name="top-actions2">
              <template slot="top-actions">
                <template v-if="_customTitleBarActions">
                  <AwesomeActionList
                    :actions="_customTitleBarActions"
                    location="topright"
                    :use-dropdown="_customTitleBarActions && _customTitleBarActions.length > 2"
                    @customAction="onCustomAction"
                  />
                </template>
              </template>
            </slot>
            <slot name="kanban-item">
              <template slot="kanban-item">
                <template v-if="_customTitleBarActions">
                  <AwesomeActionList
                    :actions="_customTitleBarActions"
                    location="topright"
                    :use-dropdown="_customTitleBarActions && _customTitleBarActions.length > 2"
                    @customAction="onCustomAction"
                  />
                </template>
              </template>
            </slot>
          </AwesomeKanban>
        </div>
        <div
          class="awesomecrud-detail-section  p-0"
          :class="{
            'col-6': displaySideFormContent,
            'col-12': !displaySideFormContent,
            'sticky-form': displaySideFormContent && isSideformSticky
          }"
        >
          <button
            v-if="displaySideFormContent && isSideformSticky"
            :disabled="true"
            class="btn btn-sm btn-outline-primary aw-button-add invisible"
            type="button"
          >
            <i class="fa fa-plus text-primary" />
          </button>
          <!-- view form -->
          <awesome-form
            v-bind="$props"
            v-if="showViewFormComputed"
            :actions="_actionsBeforeCalculation"
            :apiTimeout="apiTimeout"
            :custom-inline-actions="_customInlineActions"
            :custom-top-actions="_customFormTopActions"
            :display-header="awFormDisplayHeader"
            :displayMode="detailPageModeCpt"
            :edit-layout-mode="editLayoutMode"
            :use-custom-layout="mergedOptions && mergedOptions.useCustomLayout"
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
            @beforeCreate="beforeCreate"
            @itemCreated="onItemCreated"
            @itemEdited="onItemEdited"
            @modelUpdated="onModelUpdated"
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
          >
            <slot name="after-edit-form" slot="after-edit-form" :selectedItem="selectedItem" />
          </awesome-form>

          <!-- edit form -->
          <awesome-form
            v-bind="$props"
            v-if="showEditFormComputed"
            :actions="_actionsBeforeCalculation"
            :apiTimeout="apiTimeout"
            :bulk-items="selectedItems"
            :custom-inline-actions="_customInlineActions"
            :custom-top-actions="_customFormTopActions"
            :display-header="awFormDisplayHeader"
            :displayMode="detailPageModeCpt"
            :edit-layout-mode="editLayoutMode"
            :has-next="hasNext"
            :has-previous="hasPrevious"
            :identity="identity"
            :item="selectedItem"
            :layout="displayMode === 'create' ? createPageLayoutComputed : editPageLayoutComputed"
            :mode="displayBottomFormContent ? 'create' : displayMode"
            @modelUpdated="onModelUpdated"
            :model="_model"
            :needs-refresh.sync="awesomeEditNeedsRefresh"
            :schema="schemaComputed"
            :standalone="false"
            :use-custom-layout="mergedOptions && mergedOptions.useCustomLayout"
            createPageLayoutComputed
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
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Qs from 'qs';
import parseJsonSchema from '../../mixins/parseJsonSchemaMixin';
import apiErrorsMixin from '../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../mixins/apiConfigMixin';
import awesomeFormMixin from '../../mixins/awesomeFormMixin';
import relationMixin from '../../mixins/relationMixin';
import awEmitMixin from '../../mixins/awEmitMixin';
import uuidMixin from '../../mixins/uuidMixin';
import componentStateMixin from '../../mixins/componentStateMixin';
import modelInterfaceMixin from '../../mixins/modelInterfaceMixin';
// import notificationsMixin from '../../mixins/notificationsMixin';
import i18nMixin from '../../mixins/i18nMixin';
import { defaultActions, defaultKanbanOptions } from '../../mixins/defaultProps';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import AwesomeTable from '../table/AwesomeTable/AwesomeTable.vue';
import EnyoCrudStatsSection from '../misc/EnyoCrudStatsSection.vue';
import AwesomeForm from './AwesomeForm.vue';
import AwesomeList from '../table/AwesomeList.vue';
import AwesomeKanban from '../table/AwesomeKanban.vue';
import AwesomeActionList from '../misc/AwesomeAction/AwesomeActionList.vue';
import ListingModeSelector from './parts/ListingModeSelector.vue';
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
  detailPageLayout: null,
  columnsDisplayed: 10
};

const defaultListOptions = {
  displayFields: [], // list of fields to use for the display
  imageField: '',
  titleField: '',
  subtitleField: '',
  descriptionField: ''
};

export default {
  name: 'AwesomeCrud',
  introduction: 'A component to quickly create a table UI with edit capabilities',
  description: 'This component create tables and forms edit data based on a json schema.',
  components: {
    AwesomeTable,
    EnyoCrudStatsSection,
    AwesomeForm,
    AwesomeList,
    AwesomeKanban,
    AwesomeActionList,
    ListingModeSelector
  },
  mixins: [
    uuidMixin,
    i18nMixin,
    modelInterfaceMixin,
    componentStateMixin,
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
      note: 'Unique collection identifier'
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
      type: [Object, Array],
      required: false,
      default: () => [],
      note: 'The layout of the create/edit/view pages'
    },
    detailPageMode: {
      type: String,
      description: 'the way the detail page shows when you open an item from the list',
      values: [
        'modal',
        'fade',
        'slide',
        'sidebar',
        'sidebar',
        'sidebar',
        'fullscreen',
        'page',
        'sideform',
        'bottomform'
      ],
      validator: (value) =>
        !value ||
        [
          'modal',
          'fade',
          'slide',
          'sidebar',
          'sidebar',
          'sidebar',
          'fullscreen',
          'page',
          'sideform',
          'bottomform'
        ].includes(value)
    },
    detailPageLayout: {
      type: Array,
      default: undefined,
      note: 'Defines the layout of the detail page'
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
      default: () => ({})
    },
    listOptions: {
      type: Object,
      default: () => defaultListOptions
    },
    kanbanOptions: {
      type: Object,
      default: () => ({})
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
    customTitleBarActions: {
      type: Array,
      default: () => [],
      note: 'custom top action to display inside the title header bar on the right'
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
    },
    segmentField: {
      type: String,
      title: 'The field to use for segmenting the lists',
      description: 'This field is used for segmenting the top section'
    },
    segment: {
      type: [Object, String],
      title: 'The field to use for segmenting the lists',
      description: 'This field is used for segmenting the top section'
    },
    scrollEventTarget: {
      type: String,
      title: 'The selector to use for registering scroll events',
      description: 'This prop is used for registering the scroll event (needed for sticky forms)'
    },
    enabledListingModes: {
      type: Array,
      default: () => ['table', 'kanban', 'list'],
      description: 'The listing modes that are enabled for this component'
    },
    postCreateDisplayMode: {
      type: String,
      values: ['listing', 'edit', 'view'],
      validator: (value) => ['list', 'edit', 'view'].includes(value),
      description: 'The location to redirect after a successful create',
      default: 'list'
    },
    postEditDisplayMode: {
      type: String,
      values: ['listing', 'edit', 'view'],
      validator: (value) => ['list', 'edit', 'view'].includes(value),
      description: 'The location to redirect after a successful edit',
      default: 'view'
    }
  },
  data() {
    return {
      parentPath: '',
      selectedItem: {},
      selectedItems: [],
      previousDisplayMode: '',
      listingDisplayMode: 'table',
      displayMode: '',
      isRefreshing: false,
      tableNeedsRefresh: false,
      awesomeEditNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      internalOptions: {},
      innerNestedSchemas: [],
      activeNestedTab: 'general',
      formOptions: {
        validateAsync: false,
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: 'AwesomeCrud'
      },
      supportedListingDisplayModes: ['table', 'list', 'kanban'],
      editLayoutMode: false,
      itemsList: [],
      isSideformSticky: false,
      scrollTarget: null,
      awFormWidth: null,
      previousModelIdentity: null
    };
  },
  computed: {
    _title() {
      // @deprecated
      if (this._model && this._model.pageTitle) {
        return this.$te(this._model.pageTitle) ? this.$t(this._model.pageTitle) : this._model.pageTitle;
      }

      if (this.title === false) {
        return false;
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

    _listingComponentTitle() {
      if (this.title === false) {
        return false;
      }
      const title = this.title || (this._model && this._model.title);
      if (title) {
        return this.$te(title) ? this.$t(title) : title;
      }
      return this.$t('AwesomeCrud.labels.manageTitle') + ' ' + this._namePlural;
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

    _model() {
      return this.model || this.getModelFromStore(this.identity);
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
      const allColumns = this.allColumnsComputed;
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
      const allColumns = this.allColumnsComputed;
      let columns = [];
      // If we provided an array of fields to display
      if (this._kanbanOptions && Array.isArray(this._kanbanOptions.fields)) {
        this._kanbanOptions.fields.forEach((field) => {
          columns.push(_.filter(allColumns, ['field', field]));
        });
        columns = _.flatten(columns);
        return columns;
      }
      return allColumns;
    },

    allColumnsComputed() {
      if (!this.schemaComputed) {
        return [];
      }
      const columns = this.parseColumns(this.schemaComputed.properties, { includeHidden: true });
      if (!columns) {
        return [];
      }
      return _.sortBy(columns, ['field', 'order']);
    },

    tableColumnsComputed() {
      if (!this.schemaComputed) {
        return [];
      }
      return this.parseColumns(this.schemaComputed.properties);
    },

    _layout() {
      return this.detailPageLayout || (this.model && this.model.formOptions && this.model.formOptions.layout);
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
      const actions = _.cloneDeep(this._actionsBeforeCalculation);

      Object.entries(actions).forEach(([field, fieldData]) => {
        if (typeof fieldData !== 'boolean') {
          actions[field] = this.templateParseConditionalField(fieldData);
        }
      });
      return actions;
    },

    _actionsBeforeCalculation() {
      return _.merge(
        {},
        defaultActions,
        this.actions || (this.mergedOptions && this.mergedOptions.actions) // old location kept for BC
      );
    },

    _customFormTopActions() {
      return _.merge(
        [],
        (this.customFormTopActions.length && this.customFormTopActions) ||
          (this.mergedOptions && this.mergedOptions.customFormTopActions) // old location kept
      );
    },

    _customInlineActions() {
      return _.merge(
        [],
        (this.customInlineActions.length && this.customInlineActions) ||
          (this.mergedOptions && this.mergedOptions.customInlineActions) // old location kept
      );
    },

    _customTopRightActions() {
      return _.merge(
        [],
        (this.customTopRightActions.length && this.customTopRightActions) ||
          (this.mergedOptions && this.mergedOptions.customTopRightActions) // old location kept
      );
    },

    _customTableTopActions() {
      return _.merge(
        [],
        (this.customTableTopActions.length && this.customTableTopActions) ||
          (this.mergedOptions && this.mergedOptions.customTableTopActions) // old location kept
      );
    },

    _customTitleBarActions() {
      return _.merge([], this.customTitleBarActions.length && this.customTitleBarActions);
    },

    _customBulkActions() {
      return _.merge(
        [],
        (this.customBulkActions.length && this.customBulkActions) ||
          (this.mergedOptions && this.mergedOptions.customBulkActions) // old location kept
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
          'slide', // deprecated
          'sideform',
          'bottomform'
        ].indexOf(this._detailPageMode) > -1
      );
    },

    _kanbanOptions() {
      const merged = _.merge({}, defaultKanbanOptions, this._model && this._model.kanbanOptions, this.kanbanOptions);
      if (merged.splittingField && (!merged.splittingValues || !merged.splittingValues.length)) {
        if (this.tableColumnsComputed) {
          const field = this.tableColumnsComputed.find((f) => f.field === this.segmentField);
          if (field && field.enum) {
            merged.splittingValues = field.enum;
          }
        }
      }
      if (!merged.titleField && (!merged.fields || !merged.fields.length)) {
        if (this.displayField) {
          merged.titleField = this.displayField;
        } else if (this._model && this._model.displayField) {
          merged.titleField = this._model.displayField;
        }
      }
      if (!merged.splittingField) {
        merged.splittingField = this.segmentField;
      }
      return merged;
    },

    canShowCreateButton() {
      return (
        this._actions.create &&
        !(['view', 'edit', 'create'].indexOf(this.displayMode) > -1 && this._detailPageMode === 'page')
      );
    },

    showEditFormComputed() {
      return (
        this.identity &&
        (this.displayMode === 'edit' ||
          this.displayMode === 'create' ||
          this.displayMode === 'bulkEdit' ||
          this._detailPageMode === 'bottomform')
      );
    },

    showViewFormComputed() {
      return this.identity && this.displayMode === 'view';
    },

    showItemsListSectionComputed() {
      return this.supportedListingDisplayModes.indexOf(this.displayMode) > -1 || this._detailPageMode !== 'page';
    },

    currentItemIndex() {
      return (
        this.itemsList &&
        this.selectedItem &&
        _.findIndex(
          this.itemsList,
          (data) => data[this.primaryKeyFieldCpt] == this.selectedItem[this.primaryKeyFieldCpt]
        )
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
    },

    segmentFieldDefinitionComputed() {
      if (!this.segmentField) {
        return '';
      }
      let field;
      if (this.formSchema && this.formSchema.fields) {
        field = this.formSchema.fields.find((f) => f.model === this.segmentField);
        if (field) {
          return field;
        }
      }
      if (this.tableColumnsComputed) {
        field = this.tableColumnsComputed.find((f) => f.field === this.segmentField);
        if (field) {
          return field;
        }
      }
      return '';
    },

    segmentFieldPossibleValues() {
      const field = this.segmentFieldDefinitionComputed;
      if (!field) {
        return [];
      }
      const values =
        (field.fieldOptions &&
          (field.fieldOptions.filterDropdownItems || field.fieldOptions.values || field.fieldOptions.options)) ||
        field.enum;
      return Array.isArray(values) ? values : [];
    },

    showStatsSectionComputed() {
      return this.showItemsListSectionComputed && this.mergedOptions.stats;
    },

    isDetailPageModeCpt() {
      return this.displayMode === 'create' || this.displayMode === 'view' || this.displayMode === 'edit';
    },

    displaySideFormContent() {
      return this._detailPageMode === 'sideform' && this.isDetailPageModeCpt;
    },

    displayBottomFormContent() {
      return this._detailPageMode === 'bottomform';
    },

    _detailPageMode() {
      return this.detailPageMode || this.mergedOptions.detailPageMode;
    },

    detailPageModeCpt() {
      return this._detailPageMode === 'sideform' || this._detailPageMode === 'bottomform'
        ? 'page'
        : this._detailPageMode;
    },

    shouldShowCreateButtonCpt() {
      return (
        this.canShowCreateButton &&
        !this._isANestedDetailView &&
        (this.supportedListingDisplayModes.includes(this.displayMode) ||
          (this._displayModeHasPartialDisplay && this.mergedOptions.initialDisplayMode === 'table'))
      );
    },

    mergedOptions: {
      get() {
        let options = _.merge(
          {},
          defaultOptions,
          this._model && this._model.options,
          this.options,
          this.internalOptions
        );
        if (this.$route && this.$route.query && this.$route.query.filters) {
          options.queryParams = _.merge(
            this.internalOptions.queryParams,
            { filters: this.$route.query.filters },
            { fields: this.$route.query.fields }
          );
        }
        return options;
      },
      set(data) {
        this.internalOptions = data;
      }
    },

    _splittingValuesComputed() {
      return this._kanbanOptions.splittingValues && this._kanbanOptions.splittingValues.length
        ? this._kanbanOptions.splittingValues
        : this.segmentFieldPossibleValues;
    }
  },
  watch: {
    // call again the method if the route changes
    identity: 'loadModel',
    model: 'loadModel',
    'parent.id': 'loadModel',
    crudNeedsRefresh: 'refreshComponent',
    needsRefresh: 'refreshComponent',
    '$route.params.id': 'onRouteIdChanged',
    displayMode: 'onDisplayModeChanged',
    listingDisplayMode: 'onlistingDisplayModeChanged'
  },
  created() {
    this.setDisplayMode = _.debounce(this.setDisplayModeFresh, 500, { leading: true });
  },
  mounted() {
    // allow old property names to still work
    if (!this.identity) {
      throw new Error('missing_required_props_identity');
    }

    if (this.nestedSchemas && this.nestedSchemas.length) {
      console.warn('@deprecated nestedSchemas is now nestedModels. Please use nested nestedModels');
    }
    if (
      this.enabledListingModes &&
      this.enabledListingModes.length &&
      !this.enabledListingModes.includes(this.mergedOptions.initialDisplayMode)
    ) {
      console.warn('Intitial display mode is not in the list of enabled modes', this.mergedOptions.initialDisplayMode);
      this.mergedOptions.initialDisplayMode = this.enabledListingModes[0];
    }
    this.internalOptions = _.cloneDeep(this.mergedOptions);
    this.loadModel();
    if (!this.displayMode) {
      this.displayMode = this.mergedOptions.initialDisplayMode;
    }
    this.listingDisplayMode = this.mergedOptions.initialDisplayMode;
    this.restoreComponentState();
    if (this._isNested && this.nestedDisplayMode) {
      this.displayMode = this.nestedDisplayMode;
    }
    /*
    if (this._isANestedDetailView && this.viewMode === "detail") {
      this.viewMode = this.nestedDisplayMode;
    }
*/

    const scrollTarget = this.scrollEventTarget ? document.querySelector(this.scrollEventTarget) : window;
    if (scrollTarget) {
      this.scrollTarget = scrollTarget;
      this.scrollTarget.addEventListener('scroll', this.handleScroll);
    }

    if (!this.$route || !this.useRouterMode) {
      // stop if we don't have a router to bind ourselves to
      return;
    }

    this.parentPath = this.$route.path;
    this.parentPath = this.parentPath
      .replace('/view', '')
      .replace('/edit', '')
      .replace('/new', '')
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
    next((vm) => {});
  },
  beforeRouteUpdate(to, from, next) {
    // if we are on the same component and coming from a detail list
    if (this.useRouterMode && from.params.id && !to.params.id) {
      //this.onViewDisplayCancelled();
    }
    if (this.useRouterMode && to.params.id) {
      this.loadModel();
    }
    next();
  },

  beforeDestroy() {
    this.$awEventBus && this.$awEventBus.$off('aw-table-needs-refresh');
    this.scrollTarget.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    $alert: Swal,
    refreshComponent(newVal, preVal) {
      if (!newVal || newVal === false || newVal === preVal) {
        return;
      }
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line
        console.log('refreshComponent', newVal, preVal);
      }

      // needed to avoid unwanted refresh
      if (this.identity && this.identity !== this.previousModelIdentity) {
        this.previousModelIdentity = this.identity;
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

    callbackFunctionForBAse64(e) {},

    importFailedResponse(err) {
      Swal.fire({
        title: this.$t('common.messages.not_imported', {
          title: this._name
        }),
        type: 'error',
        text: err.message || err
      });
    },

    importResponse(e) {
      // swal({title: this.$t('common.messages.successfullyImported',{title: this.name}), type: 'success'})
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
        this.$awNotify({
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
          this.$awNotify({
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
      if (!this.mergedOptions.importUrl) {
        this.$awNotify({ title: '[WARN] missing export url', type: 'warning' });
        return;
      }
      this.$awApi
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
      if (!this._model && !this.schema) {
        console.warn('AWESOME CRUD ERROR', `model ${this.identity} not found`);
        return;
      }

      if (this.schemaComputed.properties) {
        this.mergedOptions.columns = this.parseColumns(this.schemaComputed.properties);
      }

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
      this.restoreComponentState();
      if (!this._url) {
        return;
      }

      if (this.useRouterMode) {
        if (this.$route && this.$route.params) {
          // if it's a create url

          if (this.$route.path.endsWith('/create') || this.$route.path.endsWith('/new')) {
            delete this.$route.params.id;
            this.setDisplayMode('create');
            this.$forceUpdate();
            return;
          }
          // if it's a edit or view url
          if (this.$route.params.id) {
            const matched = this.$route.matched[this.$route.matched.length - 1];
            if (matched.path.indexOf('/edit') !== -1) {
              this.setDisplayMode('edit', {});
            } else {
              this.setDisplayMode('view', {});
            }
            this.$awApi
              .get(`${this._url}/${this.$route.params.id}`, { query: this.apiRequestPermanentQueryParams })
              .then((res) => {
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

    setDisplayMode() {},
    /** @param mode: string */
    setDisplayModeFresh(mode, item, options = { refresh: true }) {
      if (
        mode === this.displayMode &&
        (!item ||
          item === this.selectedItem ||
          item[this.primaryKeyFieldCpt] === this.selectedItem[this.primaryKeyFieldCpt])
        // !(options && options.refresh)
      ) {
        console.warn('warning duplicate setDisplayMode called');
        return;
      }
      if (['edit', 'view'].indexOf(mode) > -1) {
        // console.trace('display mode set' + mode);
        this.$awEmit('aw-form-open');
        const { ...data } = item;
        this.itemIndex = _.findIndex(this.itemList, data);
      }
      this.previousDisplayMode = this.displayMode || this.mergedOptions.initialDisplayMode;

      // if were are trying to set the detailed view after a create and without an id...
      if (mode === 'view' && this.previousDisplayMode == 'create' && !(item && item[this.primaryKeyFieldCpt])) {
        console.warn('setDisplayMode = view: missing id', item, 'redirecting to ', this.listingDisplayMode);
        return this.setDisplayMode(this.listingDisplayMode, item, options);
      }
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
        // saved for the future needs
        this.listingDisplayMode = mode;
        this.tableNeedsRefresh = options.refresh;
        this.selectedItem = {};
      } else {
        this.awesomeEditNeedsRefresh = options.refresh;
      }
    },

    goToCreatePage(options = { reset: true, editLayoutMode: false }) {
      if (this.mergedOptions.createPath) {
        if (this.mergedOptions.createPath.includes('{{') && this.mergedOptions.createPath.includes('}}')) {
          return this.$router.push(this.parseUrl(this.mergedOptions.createPath));
        }
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
      // if (this.displayMode !== 'create') {
      this.setDisplayMode('create', this.selectedItem);
      // }
      if (this.useRouterMode && !options.reset) {
        this.$router.push(`${this.parentPath}/new?${Qs.stringify(this.$route.query)}`);
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
          this.mergedOptions.deletePath
            .replace(':id', item[this.primaryKeyFieldCpt])
            .replace('{{id}}', item[this.primaryKeyFieldCpt])
        );
      }

      this.deleteFunction(item);
      return;
    },

    goToBulkDeletePage(items) {
      this.bulkDeleteFunction(items);
    },

    goToEditPage(item, event) {
      if (this.mergedOptions.editPath) {
        if (this.mergedOptions.editPath.includes(':id') && item && item[this.primaryKeyFieldCpt]) {
          return this.$router.push(this.mergedOptions.editPath.replace(':id', item[this.primaryKeyFieldCpt]));
        }
        if (this.mergedOptions.editPath.includes('{{') && this.mergedOptions.editPath.includes('}}')) {
          return this.$router.push(this.parseUrl(this.mergedOptions.editPath, item));
        }
        return this.$router.push(this.mergedOptions.editPath);
      }
      const nextPath = `${this.parentPath}/${item[this.primaryKeyFieldCpt]}/edit`;
      if (this.useRouterMode && this.$route.path !== nextPath) {
        if (event && (event.metaKey || event.ctrlKey)) {
          window.open(nextPath, '_blank');
        } else {
          this.$router.push(nextPath);
        }
      }
      this.setDisplayMode('edit', item, event);
    },

    goToViewPage(item, event) {
      if (!item) {
        return;
      }
      if (!this.useRouterMode) {
        this.setDisplayMode('view', item);
        return;
      }
      let nextPath = this.getViewPageUrl(item, event);
      if (nextPath && event && (event.metaKey || event.ctrlKey)) {
        window.open(nextPath, '_blank');
        return;
      }
      this.setDisplayMode('view', item);
      if (this.$route.path !== nextPath) {
        this.$router.push(nextPath);
      } else {
        console.warn('Duplicate goToViewPage called');
      }
    },

    getViewPageUrl(item, event) {
      if (!item) {
        return '';
      }
      if (this._actions && !this._actions.view) {
        return '';
      }
      let nextPath = '';
      if (this.mergedOptions.viewPath) {
        nextPath = this.mergedOptions.viewPath;
        if (this.mergedOptions.viewPath.includes(':id') && item && item[this.primaryKeyFieldCpt]) {
          nextPath = nextPath.replace(':id', item[this.primaryKeyFieldCpt]);
        }
        if (nextPath.includes('{{') && nextPath.includes('}}')) {
          nextPath = this.parseUrl(nextPath, item);
        }
        return nextPath;
      }
      nextPath = `${this.parentPath.replace(':id', '')}/${item[this.primaryKeyFieldCpt]}`;
      if (this.useRouterMode && this.$route.path !== nextPath) {
        return nextPath;
      }
      return;
    },

    nestedViewFunction() {
      this.displayMode = 'view';
      this.$awApi
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
      this.$awApi
        .put(`${this._url}/${item[this.primaryKeyFieldCpt]}`, item)
        .then((res) => {
          this.$emit(this.identity + '-item-updated', res.data);
          this.$awNotify({
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
              this.$awApi
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
            this.$awApi
              .delete(`${this._selectedItemUrl}`)
              .then(() => {
                this.selectedItem = null;
                this.tableNeedsRefresh = true;
                this.statsNeedsRefresh = true;
                this.nestedCrudNeedsRefresh = true;
                if (this.useRouterMode) {
                  this.$router.replace(`${this.parentPath}?ts`);
                }
                const previousDisplayMode = this.getPreviousDisplayMode();
                this.setDisplayMode(previousDisplayMode);

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

    onCardChanged(item, list) {},
    onCardAdded({ element, newIndex }, list) {},

    onCardClicked(item, $event) {
      this.$emit('on-kanban-item-clicked', item, $event);
      if (this.getViewPageUrl && this.getViewPageUrl(item)) {
        return;
      }
      this.listItemClickedHandler(item, $event);
    },

    /**
     * @param item object
     * @param options = {context = create | edit }
     */
    onEditDisplayCancelled(item, { context }) {
      const previousDisplayMode = this.getPreviousDisplayMode(context);
      if (this.useRouterMode) {
        if (previousDisplayMode === 'view' && item && item[this.primaryKeyFieldCpt]) {
          this.goToViewPage(item);
        } else if (previousDisplayMode === 'edit' && item && item[this.primaryKeyFieldCpt]) {
          this.goToEditPage(item);
        } else {
          let url = this.parentPath
            .replace('/edit', '')
            .replace('/view', '')
            .replace('/:id', '')
            .replace(`${item ? item[this.primaryKeyFieldCpt] : ''}`, '');

          this.$router.push(url);
        }
      }

      this.setDisplayMode(previousDisplayMode, item, { refresh: false });
    },

    onViewDisplayCancelled(item) {
      if (this.useRouterMode) {
        let url = this.parentPath
          .replace('/edit', '')
          .replace('/view', '')
          .replace('/:id', '')
          .replace(`${item ? item[this.primaryKeyFieldCpt] : ''}`, '');
        this.$router.push(url);
      }
      const previousDisplayMode =
        this.previousDisplayMode && this.previousDisplayMode !== 'edit' && this.previousDisplayMode !== this.displayMode
          ? this.previousDisplayMode
          : this.mergedOptions.initialDisplayMode;
      this.setDisplayMode(previousDisplayMode, item, { refresh: false });
    },

    onItemsBulkEdited(item) {
      this.bulkEditFunction(item);
    },

    onItemCreated(item) {
      this.$awEmit('aw-table-needs-refresh');
      //   this.setDisplayMode(this.mergedOptions.initialDisplayMode, item);
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

    onTableRowClicked(props, $event) {
      const { column, row, event } = props; // rowIndex and event are also available
      if (column && (['url', 'relation', 'ACTIONS'].indexOf(column.type) > -1 || column.field === '__ACTIONS')) {
        return;
      }
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-table-row-clicked', row, event || $event);
      this.listItemClickedHandler(row, event || $event);
    },

    onTableRowDoubleClicked(props, $event) {
      const { column, row, event } = props; // rowIndex and event are also available
      if (column && (['url', 'relation', 'ACTIONS'].indexOf(column.type) > -1 || column.field === '__ACTIONS')) {
        return;
      }
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-table-row-double-clicked', row), event || $event;
      this.listItemDoubleClickedHandler(row, event || $event);
    },

    onDataChanged(items) {
      if (process.env.NODE_ENV === 'development') {
        //  console.log('onDataChanged', items);
      }
      this.itemsList = items.data;
    },

    updateAutoRefresh(value) {
      this.mergedOptions.autoRefresh = value;
    },

    onListItemClicked(item, event) {
      // this._actions && this._actions.view && this.$emit("view", row);
      this.$emit('on-list-item-clicked', item);
      this.listItemClickedHandler(item, event);
    },

    // @deprecated use directly $awConfirm
    confirm(message) {
      console.warn('confirm method is @deprecated => use $awConfirm');
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
          this.$router.push(`${this.parentPath}/${this.selectedItem[this.primaryKeyFieldCpt]}`);
        }
      }
    },

    selectNextItem() {
      if (this.hasNext && this.itemsList[this.currentItemIndex + 1]) {
        this.selectedItem = this.itemsList[this.currentItemIndex + 1];
        if (this.useRouterMode) {
          this.$router.push(`${this.parentPath}/${this.selectedItem[this.primaryKeyFieldCpt]}`);
        }
      }
    },

    onCustomAction(body) {
      const { action } = body;
      this.$emit(this.identity + '-custom-action', action);
      return action && action.action && action.action(body, this);
    },

    getNestedItem() {
      return this.$awApi
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

    listItemClickedHandler(row, $event) {
      switch (this.tableRowClickAction) {
        case 'edit':
          if (this._actions && !this._actions.edit) {
            return;
          }
          this.goToEditPage(row, $event);
          break;
        case 'view':
          if (this._actions && !this._actions.view) {
            return;
          }
          this.goToViewPage(row, $event);
          break;
        case 'none':
        default:
          break;
      }
    },

    listItemDoubleClickedHandler(row, event) {
      switch (this.tableRowDoubleClickAction) {
        case 'edit':
          if (this._actions && !this._actions.edit) {
            return;
          }
          this.goToEditPage(row, event);
          break;
        case 'view':
          if (this._actions && !this._actions.view) {
            return;
          }
          this.goToViewPage(row, event);
          break;
        case 'none':
          break;
        default:
          this.listItemClickedHandler(row, event);
          break;
      }
    },

    onRouteIdChanged(newVal, previousVal) {
      if (this.useRouterMode) {
        // in case we navigate for one detail page to another.
        if (newVal && previousVal && previousVal !== newVal) {
          this.setDisplayMode(this.displayMode, { [this.primaryKeyFieldCpt]: this.$route.params.id });
        }
        //  else {
        //   this.setDisplayMode(this.listingDisplayMode, { [this.primaryKeyFieldCpt]: this.$route.params.id });
        // }
      }
    },

    initializeSelectedItem() {
      if (this.$route.params.id) {
        this.parentPath = this.parentPath.replace(`/${this.$route.params.id}`, '').replace('/:id', '');
        if (this.$route.params.id && (this.$route.path.endsWith('/create') || this.$route.path.endsWith('/new'))) {
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
          this.selectedItem = { [this.primaryKeyFieldCpt]: this.$route.params.id };
          if (this.$route.query.item) {
            this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
          }
        }
      }
    },

    onSegmentChange() {},
    handleScroll(event) {
      if (this._detailPageMode !== 'sideform' || !this.scrollTarget) {
        return;
      }
      const subForm = this.scrollTarget.querySelector('.aw-form');
      if (this.scrollTarget && this.scrollTarget.scrollTop > 80) {
        this.awFormWidth = subForm.offsetWidth;
        this.isSideformSticky = true;
        if (subForm) {
          subForm.style = `width: ${this.awFormWidth}px; text-align:right; float: right`;
        }
      } else {
        this.isSideformSticky = false;
        if (subForm) {
          subForm.style = '';
        }
      }
    },

    onDisplayModeChanged(mode, oldMode) {
      if (mode !== oldMode) {
        if (this.supportedListingDisplayModes.includes(mode)) {
          if (this.enabledListingModes && !this.enabledListingModes.includes(mode)) {
            if (this.enabledListingModes[0]) {
              this.listingDisplayMode = this.enabledListingModes[0];
            }
            return;
          }

          this.listingDisplayMode = mode;
        }
      }
    },
    onlistingDisplayModeChanged(mode, oldMode) {
      if (mode !== oldMode) {
        this.displayMode = mode;
        this.saveComponentState();
      }
    },

    getPreviousDisplayMode(context) {
      const displayMode =
        this.previousDisplayMode &&
        this.previousDisplayMode !== context &&
        this.previousDisplayMode !== this.displayMode
          ? this.previousDisplayMode
          : this.mergedOptions.initialDisplayMode;
      // must be the correct display mode and (a listing more or a mode that is not disabled in the actions)
      if (
        context === 'create' &&
        this.postCreateDisplayMode &&
        (this.postCreateDisplayMode == 'listing' ||
          this._actions[this.postCreateDisplayMode] === undefined ||
          this._actions[this.postCreateDisplayMode])
      ) {
        // temporary fix for create page

        return this.postCreateDisplayMode === 'list' || this.postCreateDisplayMode === 'listing'
          ? displayMode
          : this.postCreateDisplayMode;
      }

      // must be the correct display mode and (a listing more or a mode that is not disabled in the actions)
      if (
        context === 'edit' &&
        this.postEditDisplayMode &&
        (this.postCreateDisplayMode == 'listing' ||
          this._actions[this.postEditDisplayMode] === undefined ||
          this._actions[this.postEditDisplayMode])
      ) {
        return this.postCreateDisplayMode === 'list' || this.postCreateDisplayMode === 'listing'
          ? displayMode
          : this.postEditDisplayMode;
      }
      return displayMode;
    },

    afterRefresh(...args) {
      this.$emit('afterRefresh', ...args);
    },

    after_refresh(...args) {
      this.$emit('after-refresh', ...args);
    },

    beforeRefresh(...args) {
      this.$emit('beforeRefresh', ...args);
    },

    before_refresh(...args) {
      this.$emit('before-refresh', ...args);
    },

    beforeCreate(...args) {
      this.$emit('beforeCreate', ...args);
    },

    async onListReordered(items) {
      if (this.listOptions && this.listOptions.sortField && items) {
        const promises = items.map((item, index) => {
          const urlparts = this._url.split('?');
          urlparts[0] = `${urlparts[0]}/${item[this.primaryKey]}`;
          return this.$awApi.put(urlparts.join('?'), { ...item, [this.listOptions.sortField]: index + 1 });
        });
        await Promise.all(promises);
      }
      this.$emit('reorder', items);
    },

    onModelUpdated(value, field) {
      this.$emit('modelUpdated', value, field);
    }
  }
};
</script>
<style lang="scss">
.aw-crud {
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

    .subgroup-auto {
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

  .nested-tab,
  .nested-list {
    .container-fluid {
      padding-left: 0;
      padding-right: 0;
      margin-left: 0;
      margin-right: 0;
    }
  }

  .sticky-form {
    position: fixed;
    top: 10px;
    right: 14px;
    padding-left: 30px;
    padding-right: 6px;

    .modal-body {
      height: 80vh;
      overflow: auto;
    }
  }
}
</style>
