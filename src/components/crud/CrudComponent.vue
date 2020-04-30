<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
         <div
          v-if="innerOptions.stats"
          class="row"
          >
          <EnyoCrudStatsSection
          :url="innerOptions.url + '/stats'"
          :entity="identity"
          :stats-needs-refresh.sync="statsNeedsRefresh"
          />
        </div>

        <div class="text-right">
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
              @click="customAction({action, location: 'topright', id: action.name})"
              >
              <i
              v-if="action.icon"
              :class="action.icon"
              />
              <span v-html="action.label ? $t(action.label) : ''"></span>
            </button>
          </template>
          <button
          v-if="innerOptions.actions && innerOptions.actions.create"
          class="btn btn-primary btn-simple"
          @click="createFunction()"
          >
          <i class="fa fa-plus" />
          {{ $t('EnyoCrudComponent.labels.createNew') }} {{ _name }}
        </button>
      </slot>

      <div style="display: inline-block">
              <!-- <upload-button
              name="pictureUpload"
              :options="{ upload:true, targetUrl: '/picture/banner', method: 'POST', headers:{}, base64: true, label: 'Upload', class: 'btn btn-success' }"
              @base64='callbackFunctionForBAse64'
              @uploaded='callbackFunctionForPostUploadWithServerResponse'
              >
            </upload-button>-->
          </div>
          <!-- START OF create MODAL -->
          <div
          :id="identity + 'formModal'"
          class="modal"
          :class="{slide: innerOptions.modalMode === 'slide', fade: innerOptions.modalMode === 'fade'}"
          tabindex="-1"
          role="dialog"
          >
          <div
          class="modal-dialog"
          :class="{'modal-full-height': innerOptions.modalMode === 'slide', 'modal-lg': innerOptions.modalMode === 'fade'}"
          role="document"
          >
          <div
          v-if="viewMode==='create'"
          class="modal-content"
          >
          <form @submit.prevent="createItem()">
            <div class="modal-header bg-primary text-white">
              <h3 class="modal-title mt-0">
                {{ $t('common.labels.add_a') }} {{ title }}
              </h3>
              <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeModal()"
              >
              <span
              aria-hidden="true"
              class="text-white"
              >&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot
            name="create-form"
            :selectedItem="selectedItem"
            >
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
        <div class="modal-footer">
          <slot name="add-modal-footer">
            <button
            type="button"
            class="btn btn-default btn-simple mr-auto"
            @click="closeModal()"
            >
            {{ $t('common.buttons.cancel') }}
          </button>
          <button
          type="submit"
          class="btn btn-primary ml-auto"
          >
          {{ $t('common.buttons.save') }}
        </button>
      </slot>
    </div>
  </form>
</div>
<!--  EDITS -->
<div
v-if="viewMode==='edit' || viewMode==='view'"
class="modal-content"
>
<form @submit.prevent="editItem()">
  <div class="modal-header bg-primary text-white">
    <h3
    v-if="viewMode==='edit'"
    class="modal-title mt-0"
    >
    {{ $t('common.buttons.edit') }}
  </h3>
  <h3
  v-if="viewMode==='view'"
  class="modal-title mt-0"
  >
  {{ $t('common.buttons.view') }}
</h3>
<button
type="button"
class="close"
aria-label="Close"
@click="closeModal()"
>
<span
aria-hidden="true"
class="text-white"
>&times;</span>
</button>
</div>
<div
class="modal-body"
:class="{'view-mode': viewMode === 'view'}"
>
<ul
v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view'"
class="nav nav-tabs mt-5 mb-4"
>
<li class="nav-item">
  <a
  class="nav-link active"
  data-toggle="tab"
  @click="activeNestedTab = 'general'"
  >{{ $te('app.labels.' + identity) ?  $te('app.labels.' + identity) : _.startCase(identity) }}</a>
</li>
<li
v-for="ns in nestedSchemas"
:key="ns.$id"
class="nav-item"
>
<a
class="nav-link"
data-toggle="tab"
@click="activeNestedTab = ns.identity"
>
<i
v-if="ns.icon"
:class="ns.icon"
/>
{{ $t(ns.title || ns.name || ns.identity) }}
</a>
</li>
</ul>
<slot
name="edit-form"
:selectedItem="selectedItem"
>
<div class="tab-content">
  <template v-if="formSchema && formSchema.fields">
    <div
    class="tab-pane nested-tab fade"
    :class="{'active show': activeNestedTab === 'general' }"
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
  :class="{'active show': activeNestedTab===ns.identity}"
  >
  <crud-component
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
<div class="modal-footer">
  <slot name="edit-modal-footer">
    <button
    type="button"
    class="btn btn-default btn-simple mr-auto"
    @click="closeModal()"
    >
    {{ $t('common.buttons.cancel') }}
  </button>
  <button
  v-if="viewMode==='edit'"
  type="submit"
  class="btn btn-primary ml-auto"
  >
  {{ $t('common.buttons.save') }}
</button>
<button
v-if="viewMode === 'view' && innerOptions.actions && innerOptions.actions.edit && !innerOptions.noActions"
type="button"
class="btn btn-info btn-simple ml-auto"
@click.prevent.stop="goToEditPage(selectedItem)"
>
<i class="fa fa-pencil" />
{{ $t('common.buttons.edit') }}
</button>
<button
v-if="viewMode==='view'"
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
<EnyoAjaxTable
:columns="innerOptions.columns"
:columns-displayed="innerOptions.columnsDisplayed"
:entity="identity"
:mode="innerOptions.mode"
:url="innerOptions.url"
:params="innerOptions.queryParams"
:needs-refresh.sync="tableNeedsRefresh"
:nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
:options="innerOptions"
:auto-refresh="innerOptions.autoRefresh"
:auto-refresh-interval="innerOptions.autoRefreshInterval"
:export-url="innerOptions.exportUrl"
:responseField="innerOptions.responseField"
:title="_title || ($t('common.labels.manageTitle') + ' ' + _titlePlural)"
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
</template>
<script>
import apiErrors from "../../mixins/apiErrorsMixin";
import i18nMixin from "../../mixins/i18nMixin";
import _ from "lodash";
import Swal from "sweetalert2/dist/sweetalert2.js";
import EnyoAjaxTable from "../table/EnyoAjaxTable.vue";
import EnyoCrudStatsSection from "../misc/EnyoCrudStatsSection.vue";
import $ from 'jquery';

import "vue-good-table/dist/vue-good-table.css";

const defaultOptions = {
  mode: "local",
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  modalMode: "slide", // fade | slide | full
  columnsDisplayed: 8,
  customInlineActions: [],
  customTopActions: [],
  customTabletopActions: [],
  responseField: 'body',
  actions: {
    noActions: false,
    search: true,
    filter: true,
    create: true,
    view: true,
    delete: true,
    export: false,
    import: false,
    dateFilter: true,
    refresh: true,
  }
};

export default {
  name: "CrudComponent",
  introduction:
  "A component to quickly create a table UI with edit capabilities",
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
     component: CrudComponent,
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
     component: CrudComponent,
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
  EnyoAjaxTable,
  EnyoCrudStatsSection,
    // VueGoodTable
  },
  mixins: [i18nMixin, apiErrors],
  props: {
    title: { type: String, required: false, default: undefined},
    pageTitle: { type: String, required: false, default: undefined},
    identity: { type: String, required: true },
    modelName: { type: String, required: false },
    primaryKey: {
      type: String,
      default: 'id',
      note: "The field to use as a primary key (id / _id)"
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note: "The object that will be used for managing the component"
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note:
      "The json schema that represent the object to display. this is used to personalise form inputs and column displays"
    },
    crudNeedsRefresh: { type: Boolean, default: false,
      note: "Define whether the content of the table list should be refreshed",
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note:
      "An array describing the data that is linked to the nested model. Serves for displaying a detailed object"
    },
    parent: {
      type: Object,
      required: false,
      note:
      "The object containing the parent in case of a nested schema." +
      "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: "list",
      note: `In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form`
    },
    translations: {
      type: Object,
      required: false,
      default: () => ({
        "common.labels.manageTitle": "common.labels.manageTitle",
        "common.buttons.view": "common.buttons.view",
        "common.buttons.cancel": "common.buttons.cancel",
        "common.buttons.close": "common.buttons.close"
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
      parentPath: "",
      selectedItem: {},
      viewMode: 'view',
      isRefreshing: false,
      tableNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      innerOptions: {},
      innerSchema: {},
      '_model': {},
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
    // @deprecated
    if (this._model && this._model.pageTitle) {
      return this.$te(this._model.pageTitle) ?
      this.$t(this._model.pageTitle) : this._model.pageTitle;
    }

    if (this.title) {
      return this.$te(this.title) ? this.$t(this.title) : this.title;
    }

    if (this._model && this._model.singularName) {
      return this.$te(this._model.singularName) ?
      this.$t(this._model.singularName) : _.startCase(this._model.singularName);
    }

    if (this.identity) {
      return this.$te(`app.labels.${this.identity}`) ? this.$t(`app.labels.${this.identity}`) : _.startCase(this.identity);
    }
    return '';
  },

  _titlePlural() {
    if (this._model && this._model.namePlural) {
      return this.$te(this._model.namePlural) ?
      this.$t(this._model.namePlural) : _.startCase(this._model.namePlural);
    }

    if (this.title) {
      return this.$te(this.title + 's') ? this.$t(this.title + 's') : (this.title + 's');
    }

    if (this.identity) {
      return this.$te(`app.labels.${this.identity}s`) ?
      this.$t(`app.labels.${this.identity}s`) : _.startCase(this.identity + 's');
    }
    return '';
  },

  _name() {
    if (this._model && this._model.name) {
      return this.$te(this._model.name) ?
      this.$t(this._model.name) : _.startCase(this._model.name);
    }

    if (this.identity) {
      return this.$te(`app.labels.${this.identity}`) ? this.$t(`app.labels.${this.identity}`) : _.startCase(this.identity);
    }
    return '';
  },
  _namePlural() {
    if (this._model && this._model.namePlural) {
      return this.$te(this._model.namePlural) ?
      this.$t(this._model.namePlural) : _.startCase(this._model.namePlural);
    }

    if (this.identity) {
      return this.$te(`app.labels.${this.identity}`) ? this.$t(`app.labels.${this.identity}`) : _.startCase(this.identity);
    }
    return '';
  },

  formSchema() {
    if (!this.innerSchema) {
      return [];
    }
    const parsedFormSchema = this.parseSchema(this.innerSchema);
    return parsedFormSchema;
  },

},
watch: {
    // call again the method if the route changes
    name: "loadModel",
    identity: "loadModel",
    model: "loadModel",
    options: "mergeOptions",
    crudNeedsRefresh: "refreshComponent",
  },
  created() {
    if (!this.$http) {
      try {
        const axios = require("axios");
        this.$http = axios;
      } catch (err) {
        // console.warn(err.message);
      }
    }
    this.loadModel();
  },
  mounted() {
    // allow old property names to still work
    if(this.modelName) {
      this.identity = this.modelName;
    }
    this.$modal = $(`#${this.identity}formModal`);
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
        this.createFunction({reset: false});
        return;
      }
      this.parentPath = matched.path.replace("/edit", "").replace("/:id", "");
    } else {
      this.parentPath = matched.path;
    }
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next(vm => {
      vm.closeModal();
      //    vm.loadModel();
    });
  },
  beforeRouteLeave(to, from, next) {
    next(vm => {
      vm.closeModal();
    });
  },

  methods: {
    $alert: Swal,
    refreshComponent() {
      // console.log("refresh component watcher");
      if (this.identity) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;


      setTimeout(() => {
        this.$emit("update:crudNeedsRefresh", false);
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
          !this.options.deletePermitted.some(
            v => this.$store.state.user.roles.indexOf(v.toUpperCase()) >= 0
            )
          ) {
          this.options.actions.delete = false;
      }
    }
    this.innerOptions = _.merge({}, defaultOptions, this.innerOptions, this.options);
    if (this.$route && this.$route.query && this.$route.query.filters) {
      this.innerOptions.queryParams = _.merge(
        this.innerOptions.queryParams || this.$route.query.filters
        );
    }

  },
  callbackFunctionForBAse64(e) {
      // eslint-disable-next-line
      console.log("Base 64 done", e);
    },

    importResponse(e) {
      // swal({title: this.$t('common.messages.successfullyImported',{title: this.name}), type: 'success'})
      this.$notifications.clear();
      if (
        (!e.improperData || e.improperData.length === 0) &&
        (!e.properData || e.properData.length === 0)
        ) {
        Swal.fire({
          title: this.$t("common.messages.no_data_imported", {
            title: this._title
          }),
          type: "warning"
        });
      return;
    }

    if (e.properData.length > 0) {
      this.$notify({
        title: this.$t("common.messages.successfullyImported", {
          title: this._title
        }),
        type: "success"
      });
    }

    if (e.improperData.length > 0) {
      let message = "";
      e.improperData.forEach(element => {
        message += ` - ${Object.values(element).join(" | ")}, `;
      });
      message = message.substring(0, message.length - 2);
      setTimeout(() => {
        this.$notify({
          title: `${e.improperData.length} ${this.$t(
            "common.messages.not_imported",
            { title: this._title }
            )}`,
            message,
            type: "warning",
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
      this.$notify({title: '[WARN] missing export url', type: 'warning'});
      return;
    }
    this.$http
    .get(this.innerOptions.importUrl + '-template', {})
    .then(res => {
      if (res.data.url) {
        const link = document.createElement("a");
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
    if (this.$store && this.$store.state && !this.model) {
      // @delete ?
      this._model = this.$store.state.data.models.find((model) => model.identity === this.identity);
    } else {
      this._model = this.model;
    }

    if (!this._model && !this.schema) {
        // console.warn("CRUD COMPONENT ERROR", `model ${this.name} not found`);
        return;
      }

      this.innerSchema = this.schema || this._model.schema;
      this.innerOptions.columns = this.parseColumns(this.innerSchema.properties);
      this.innerOptions.url = (this.options && this.options.url) || (this._model && this._model.url) || `/${this.identity}`;
      if (typeof this.innerOptions.url === 'function') {
        this.innerOptions.url = this.innerOptions.url(this.parent, this);
      }

      if (!this.innerOptions.exportUrl) {
        this.innerOptions.exportUrl = `${this.innerOptions.url}/export`;
      }

      if (!this.innerOptions.importUrl) {
        this.innerOptions.importUrl = `${this.innerOptions.url}/import`;
      }

      // if the crud is nested and should display as a form then remote load the data
      if (this.parent && this.nestedDisplayMode === 'object') {
        this.nestedViewFunction();
      }

      if (!this.innerOptions.url) {
        return;
      }
      if (this.$route && this.$route.params && this.$route.params.id) {
        this.$http
        .get(`${this.innerOptions.url}/${this.$route.params.id}`)
        .then(res => {
          const matched = this.$route.matched[this.$route.matched.length - 1];
          const data = this.innerOptions.responseField && this.innerOptions.responseField != false ? _.get(res.data, this.innerOptions.responseField) : res.data;
          if (matched.path.indexOf("/edit") !== -1) {
            this.editFunction(data);
          } else {
            this.viewFunction(data);
          }
          this.$forceUpdate();
        })
        .catch(this.apiErrorCallback)
        .finally(()=> {
          this.isRefreshing = false;
        });
      }
    },

    parseSchema(schema, prefix = "") {
      if (!schema.properties) {
        return [];
      }
      if (prefix && schema.$schema) {
        // console.warn("possible recursive parseSchema call", schema);
        return;
      }
      const fields = [];
      const size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach(key => {
        if ([this.primaryKey].indexOf(key) === -1) {
          const prop = schema.properties[key];
          if (prop.field && prop.field.hidden) {
            return;
          }
          if (prop.type === "object" && !(prop.field && prop.field.type)) {
            const subSchema = this.parseSchema(prop, `${prefix}${key}.`);
            subSchema.legend = prop.title || _.startCase(key);
            subSchema.type = "group";
            subSchema.styleClasses = `subgroup  ${(prop.field &&
              prop.field.styleClasses) ||
              "card"}`;
              fields.push(subSchema);
            } else {
              if (prop.field && prop.relation && prop.field.fieldOptions) {
                prop.field.fieldOptions.url = prop.relation;
                prop.field.fieldOptions.trackBy = prop.foreignKey;
                prop.field.fieldOptions.searchable = true;
              }
              const field = {
                type: (prop.field && prop.field.type) || this.getFormtype(prop),
                label: prop.title || prop.description || _.startCase(key),
                placeholder: prop.description || prop.title || _.startCase(key),
                fieldOptions: (prop.field && prop.field.fieldOptions) || {
                  placeholder: prop.description || prop.title || _.startCase(key),
                  url: prop.relation,
                  trackBy: prop.foreignKey ||  "id",
                  label: "label", // key label for enyo select
                  name: "label", // key label for native select
                  step: prop.field && prop.field.step,
                  readonly:
                  this.viewMode === "view" || (prop.field && prop.field.readonly),
                  disabled:
                  this.viewMode === "view" || (prop.field && prop.field.readonly),
                },
                values:


                (prop.field &&
                  prop.field.fieldOptions &&
                  (prop.field.fieldOptions.values || this.getSelectEnumFromStore(prop.field.fieldOptions.enum)))
                || prop.enum ||
                (prop.items && prop.items.enum) || [],
                required: prop.field && prop.field.required,
                hint: prop.description,
                model: prefix + key,
                validator: prop.field && prop.field.validator,
                min: prop.min,
                max: prop.max,
                multi: prop.type === "array",
                readonly:
                this.viewMode === "view" || (prop.field && prop.field.readonly),
                disabled:
                this.viewMode === "view" || (prop.field && prop.field.readonly),
                styleClasses:
                (prop.field && prop.field.styleClasses) ||
                (size < 8 ? "col-md-12" : "col-md-6"),
                relation: prop.relation,
                foreignKey: prop.foreignKey,
                group: (prop.field ? prop.field.group : undefined)
              };
              if (!field.fieldOptions.inputType) {
                field.fieldOptions.inputType =
                (prop.field && prop.field.inputType) ||
                this.getFormInputType(prop) ||
                "text";
              }
              if (prop.type === "boolean" && (field.type === "select" || field.type === "enyoSelect") && (!field.values || !field.values.length)) {
                field.values = [
                {id: true, label: 'Yes'},
                {id: false, label: 'No'},
                {id: '', label: '-'},
                ];
              }
              if (field.type === "dateTime") {
                field.fieldOptions.icons = {
                  time: "fa fa-clock-o",
                  date: "fa fa-calendar",
                  up: "fa fa-arrow-up",
                  down: "fa fa-arrow-down"
                };
              }if (field.type === "enyoSelect" && !field.fieldOptions.options) {
                field.options = field.values;
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
      if (!schema.formGroups) {
        return {};
      }
      schema.formGroups.forEach((group) => {
        if (!groups[group.id]) {
          groups.push({
            fields: [],
            ...group,
            legend: this.$t(group.title),
            type: 'group',

          });
        }
      });
      if (groups.length < 1) {
        groups = [{legend: '', fields: schema.fields}];
      }
      return groups;
    },

    distributeFieldsInGroups(groups, fields) {
      fields.forEach(f => {
        if(f.group) {
          const keys = f.group.split('.');
          let targetGroup = {groups};
          keys.forEach(key => {
            targetGroup = _.find(targetGroup.groups,{id: key});

          })
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
        const possibleTypes = ["string", "number", "boolean"];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return 'select';
      }
      switch (type) {
        case "string":
        return "input";
        case "number":
        return "input";
        case "boolean":
        return "select"; // put enyoSelect after debugging all the issues...enyoSelect
        default:
        return 'input';
      }
    },
    getSelectEnumFromStore(val) {
      const options = _.isString(val) && val.indexOf("$store") === 0
      ? _.get(this.$store.state, val.replace("$store.", ""))
      : val;
      return options;
    },

    getFormInputType(property) {
      let { type } = property;
      if (Array.isArray(type)) {
        const possibleTypes = ["string", "number", "boolean"];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      switch (type) {
        case "string":
        switch (property.format) {
          case "email":
          return "email";
          case "date-time":
          return "datetime";
          default:
          return "text";
        }
        case "number":
        return "number";
        case "boolean":
        case "array":
        case "object":
        return "string";
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
          const possibleTypes = ["string", "number", "boolean"];
          for (let i = 0; i < possibleTypes.length; i++) {
            if (property.type.indexOf(possibleTypes[i]) > -1) {
              type = possibleTypes[i];
            }
          }
        }

        switch (type) {
          case "string":
          switch (property.format) {
            case "date-time":
            return "text";
            default:
            return "text";
          }
          case "number":
          return "number";
          case "boolean":
          return "boolean";
          case "array":
          case "object":
          return "object";
          default:
          return "text";
        }
      },

      openModal() {
        if (!this.$modal) {
          this.$modal = $(`#${this.identity}formModal`);
        }
        if (this.$modal.modal) {
          this.$modal.modal("show");
        }
        else if (this.innerOptions.modalMode == 'slide'){
          this.$modal.addClass('show');
        }
        else {
          this.$modal.addClass('show');
        }
      },

      closeModal() {
       if (!this.$modal) {
        this.$modal = $(`#${this.identity}formModal`);
      }
      window.history.replaceState({}, null, `${this.parentPath}`);
      if (this.$modal.modal) {
        this.$modal.modal("hide");
      }
      else if (this.innerOptions.modalMode == 'slide') {
        this.$modal.removeClass('show');
      }
      else {
        this.$modal.removeClass('show');
      }
    },

    goToEditPage(item) {
      if (!this.innerOptions.editPath) {
        window.history.replaceState(
          {},
          null,
          `${this.parentPath}/${item[this.primaryKey]}/edit`
          );
        this.editFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.editPath.replace(":id", item[this.primaryKey]));
    },

    goToViewPage(item) {
      if (!this.innerOptions.viewPath) {
        window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
        this.viewFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.viewPath.replace(":id", item[this.primaryKey]));
    },

    createItem() {
      if (!this.innerOptions.url) {
        // eslint-disable-next-line
        console.warn("CRUDCOMPONENT ERROR:: No url for submitting");
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error("CRUDCOMPONENT ERROR:: validation errors", error);
          return;
        }
      } else {
        // eslint-disable-next-line
        console.warn(
          "Unable to find the reference to the schema form on ",
          this.$route.path
          );
      }
      return this.$http
      .post(this.innerOptions.url, this.selectedItem)
      .then((res) => {
        this.$emit(this.identity + "-item-created", res.data);
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            title: this.$t("common.messages.successfullyCreated", {
              title: this.type
            }),
            type: "success"
          });
        this.tableNeedsRefresh = true;
        this.statsNeedsRefresh = true;
        this.nestedCrudNeedsRefresh = true;
        this.$forceUpdate();
        this.closeModal();
      })
      .catch(this.apiErrorCallback)
      .finally(()=> {
        this.isRefreshing = false;
      });

      // return false;
    },

    editItem() {
      if (!this.innerOptions.url) {
        // eslint-disable-next-line
        console.warn("CRUDCOMPONENT ERROR:: No url for submitting");
        return false;
      }
      if (!this.selectedItem[this.primaryKey]) {
        // eslint-disable-next-line
        console.warn("CRUDCOMPONENT ERROR:: No primary key on this them", this.selectedItem, this.primaryKey);
        return false;
      }
      if (this.$refs.form) {
        const errors = this.$refs.form.validate();
        if (errors.length > 0) {
          // eslint-disable-next-line
          console.error("CRUDCOMPONENT ERROR:: validation errors", errors);
          return;
        }
      }

      this.$http
      .put(
        `${this.innerOptions.url}/${this.selectedItem[this.primaryKey]}`,
        this.selectedItem
        )
      .then((res) => {
        this.$emit(this.identity + "-item-updated", res.data);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          title: this.$t("common.messages.successfullyModified", {
            title: this.type
          }),
          type: "success"
        });
        this.tableNeedsRefresh = true;
        this.nestedCrudNeedsRefresh = true;
        this.$forceUpdate();

        this.closeModal();

      })
      .catch(this.apiErrorCallback)
      .finally(()=> {
        this.isRefreshing = false;
      });
      return false;
    },

    editFunction(item) {
      this.viewMode = "edit";
      this.selectedItem = item;
      this.$http
      .get(`${this.innerOptions.url}/${item[this.primaryKey]}`)
      .then(res => {
        this.selectedItem = this.innerOptions.responseField && this.innerOptions.responseField != false ? _.get(res.data, this.innerOptions.responseField) : res.data;
        this.openModal();
      })
      .catch(this.apiErrorCallback)
      .finally(()=> {
        this.isRefreshing = false;
      });
    },

    viewFunction(item) {
      this.viewMode = "view";
      this.selectedItem = item;
      this.$http
      .get(`${this.innerOptions.url}/${item[this.primaryKey]}`)
      .then(res => {
        this.selectedItem = this.innerOptions.responseField && this.innerOptions.responseField != false ? _.get(res.data, this.innerOptions.responseField) : res.data;
        this.openModal();
      })
      .catch(this.apiErrorCallback)
      .finally(()=> {
        this.isRefreshing = false;
      });
    },

    nestedViewFunction() {
      this.viewMode = 'view';
      this.$http
      .get(`${this.innerOptions.url}`)
      .then((res) => {
        this.selectedItem = this.innerOptions.responseField && this.innerOptions.responseField != false ? _.get(res.data, this.innerOptions.responseField) : res.data;
        this.nestedCrudNeedsRefresh = true;
      })
      .catch(this.apiErrorCallback)
      .finally(()=> {
        this.isRefreshing = false;
      });
    },

    deleteFunction(item) {
      Swal.fire({
        title: this.$t("common.messages.are_you_sure"),
        text: this.$t("common.messages.wont_be_able_recover"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$t("common.buttons.yes_delete_it"),
        cancelButtonText: this.$t("common.buttons.cancel"),
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          this.$http
          .delete(`${this.innerOptions.url}/${item[this.primaryKey]}`)
          .then(() => {
            this.tableNeedsRefresh = true;
            this.statsNeedsRefresh = true;
            this.nestedCrudNeedsRefresh = true;
            this.$forceUpdate();
          })
          .catch(err => {
              // eslint-disable-next-line
              console.error(err);
            })
          .finally(()=> {
            this.isRefreshing = false;
          });
        }
      });
    },

    createFunction(options = {reset: true}) {
      if (!this.innerOptions.createPath) {
        this.viewMode = "create";
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
      this.$emit(this.identity + "-custom-action", action);
      return action && action.action && action.action(body, this);
    },

    listUpdated(datas){
      this.$emit('list-updated', datas);
      this.$emit(this.identity + "-list-updated", datas);
    },
    // transform the schema into a format accepted by the ajaxtable
    parseColumns(properties) {
      const newcolumns = [];
      Object.keys(properties).forEach(key => {
        let newCol = {};
        const prop = properties[key];
        if (!prop.hidden && !(prop.column && prop.column.hidden)) {
          newCol.field = key;
          newCol.type = this.getColumnType(prop);
          newCol.label = _.startCase(
            (prop.column && prop.column.title) || prop.title || key
            );
          newCol.filterOptions = { enabled: false };
          newCol.enum = (prop.column && prop.column.enum) || prop.enum;
          newCol.sortable = prop.column && prop.column.sortable !== undefined ? prop.column.sortable : true;
          newCol = {...newCol, ...prop.column};
          if (prop.relation) {
            newCol.relation = prop.relation;
          }
          newcolumns.push(newCol);
        }
      });

      if (!newcolumns.find(col => col.field === "ACTIONS")) {
        newcolumns.push({
          field: "ACTIONS",
          label: "Actions",
          filterable: false,
          enabled: false
        });
      }
      return newcolumns;
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
  content: "\f073";
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
  z-index: inherit!important;
}

.multiselect__content-wrapper{
  z-index: 16!important
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
