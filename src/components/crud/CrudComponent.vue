<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row awesomecrud-detail-secton">
        <div class="col-12">
          <AwesomeForm
            v-bind="$props"
            v-if="displayMode === 'view'"
            :mode="displayMode"
            :displayMode="mergedOptions.detailPageMode"
            :layout="viewPageLayoutComputed"
            :item="selectedItem"
            :needs-refresh="awesomeEditNeedsRefresh"
            :standalone="false"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @cancel="onViewDisplayCancelled"
            @customAction="onCustomAction"
            @itemCreated="onItemCreated"
            @itemEdited="onItemEdited"
            @itemDeleted="onItemDeleted"
            @itemViewed="onItemViewed"
            @itemValidated="onItemValidated"
            @itemValidationFailed="onItemValidationFailed"
          />

          <AwesomeForm
            v-bind="$props"
            v-if="displayMode === 'edit' || displayMode === 'create'"
            :mode="displayMode"
            :displayMode="mergedOptions.detailPageMode"
            :layout="displayMode === 'create' ? createPageLayoutComputed : editPageLayoutComputed"
            createPageLayoutComputed
            :item="selectedItem"
            :needs-refresh="awesomeEditNeedsRefresh"
            :standalone="false"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @cancel="onEditDisplayCancelled"
            @customAction="onCustomAction"
            @itemCreated="onItemCreated"
            @itemEdited="onItemEdited"
            @itemDeleted="onItemDeleted"
            @itemViewed="onItemViewed"
            @itemValidated="onItemValidated"
            @itemValidationFailed="onItemValidationFailed"
          />
        </div>
        <div class="col-12" v-show="!(displayMode !== 'table' && mergedOptions.detailPageMode === 'page')">
          <div v-if="mergedOptions.stats" class="row">
            <EnyoCrudStatsSection
              :url="_url + '/stats'"
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
                  class="btn btn-link btn-main-style"
                  :class="action.class"
                  :id="action.name"
                  :data-title="action.title || action.label"
                  :tooltip="action.title || action.label"
                  :data-tooltip="action.title || action.label"
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
              <button v-if="_actions.create" class="btn btn-primary btn-main-style mb-1" @click="goToCreatePage()">
                <i class="fa fa-plus" />
                {{ $t("EnyoCrudComponent.labels.createNew") }} {{ _name }}
              </button>
            </slot>
          </div>
          <AwesomeTable
            v-if="!_isNestedDetail"
            :columns="tableColumnsComputed"
            :columns-displayed="mergedOptions.columnsDisplayed"
            :entity="identity"
            :mode="mergedOptions.dataPaginationMode || mergedOptions.mode"
            :url="_url"
            :api-query-params="mergedOptions.queryParams"
            :api-query-headers="mergedOptions.queryParams"
            :apiRequestConfig="apiRequestConfig"
            :apiResponseConfig="apiResponseConfig"
            :needs-refresh.sync="tableNeedsRefresh"
            :nested-crud-needs-refresh.sync="nestedCrudNeedsRefresh"
            :options="mergedOptions"
            :actions="_actions"
            :auto-refresh="mergedOptions.autoRefresh"
            :auto-refresh-interval="mergedOptions.autoRefreshInterval"
            :export-url="mergedOptions.exportUrl"
            :title="_title || $t('EnyoCrudComponent.labels.manageTitle') + ' ' + _titlePlural"
            name="ajax-table"
            @create="goToCreatePage"
            @view="goToViewPage"
            @edit="goToEditPage"
            @delete="goToDeletePage"
            @customAction="onCustomAction"
            @crud-list-updated="onListUpdated"
            @refresh="onTableRefresh"
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
                  label: $t('EnyoCrudComponent.buttons.import'),
                  class: 'btn btn-main-style btn btn-link text-success  btn-block'
                }"
                @uploaded="importResponse"
              />
              <button
                v-if="_actions.import"
                class="btn text-info btn-link btn-alt-style btn-block"
                @click="exportTemplateCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t("EnyoCrudComponent.buttons.excel-template") }}
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
import _ from "lodash";
import apiErrorsMixin from "../../mixins/apiErrorsMixin";
import apiConfigMixin from "../../mixins/apiConfigMixin";
import awesomeFormMixin from "../../mixins/awesomeFormMixin";
import i18nMixin from "../../mixins/i18nMixin";
import { defaultActions } from "../../mixins/defaultProps";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AwesomeTable from "../table/AwesomeTable.vue";
import EnyoCrudStatsSection from "../misc/EnyoCrudStatsSection.vue";
import AwesomeForm from "./AwesomeForm.vue";

import "vue-good-table/dist/vue-good-table.css";

const defaultOptions = {
  mode: "local", // Deprecated use dataPaginationMode
  dataPaginationMode: "local",
  url: null,
  columns: null,
  createPath: null,
  viewPath: null,
  editPath: null,
  queryParams: {},
  stats: false,
  autoRefresh: false, // or integer in seconds
  initialDisplayMode: "table",
  detailPageMode: "sidebar", // fade | slide | full
  detailPageLayout: null, // fade | slide | full
  columnsDisplayed: 8,
  customInlineActions: [],
  customTopActions: [],
  customTabletopActions: []
};

export default {
  name: "CrudComponent",
  introduction: "A component to quickly create a table UI with edit capabilities",
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
    AwesomeTable,
    EnyoCrudStatsSection,
    AwesomeForm
  },
  mixins: [i18nMixin, apiErrorsMixin, apiConfigMixin, awesomeFormMixin],
  props: {
    title: { type: [String, Boolean], required: false, default: undefined },
    pageTitle: { type: [String, Boolean], required: false, default: undefined },
    identity: { type: String, required: false },
    modelName: {
      type: String,
      required: false,
      note: "Deprecated use identity"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: "list",
      note: `In case of a nested schema, this parameter determines whether the component should be rendered as a list or a form`
    },
    primaryKey: {
      type: String,
      default: "id",
      note: "The field to use as a primary key (id / _id)"
    },
    model: {
      type: Object,
      required: false,
      default: undefined,
      note:
        "The object that will be used for managing the component. it contains the schema along with some other options. If no provided i can be reconstructed if we have the schema prop."
    },
    schema: {
      type: Object,
      required: false,
      default: undefined,
      note:
        "The json schema that represent the object to display. this is used to create. Must be provided if no model definition is available"
    },
    layout: {
      type: Object,
      required: false,
      default: undefined,
      note: "The layout of the create/edit/view pages"
    },
    crudNeedsRefresh: {
      type: Boolean,
      default: false,
      note: "Define whether the content of the table list should be refreshed"
    },
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note: "An array describing the data that is linked to the nested model. Serves for displaying a detailed object"
    },
    parent: {
      type: Object,
      required: false,
      note:
        "The object containing the parent in case of a nested schema." +
        "You don't actually to pass this, it's done automatically by the parent component itself"
    },
    updateRouter: {
      type: Boolean,
      required: false,
      default: true,
      node: "Controls if the actions (create / edit / view)  should update the current route url"
    },
    translations: {
      type: Object,
      required: false,
      default: () => ({
        "EnyoCrudComponent.labels.manageTitle": "EnyoCrudComponent.labels.manageTitle",
        "EnyoCrudComponent.buttons.view": "EnyoCrudComponent.buttons.view",
        "EnyoCrudComponent.buttons.cancel": "EnyoCrudComponent.buttons.cancel",
        "EnyoCrudComponent.buttons.close": "EnyoCrudComponent.buttons.close"
      }),
      note: "Translation labels to use when vue-i18n is not present"
    },
    options: {
      type: Object,
      default: () => defaultOptions
    },
    actions: {
      type: Object,
      default: () => defaultActions,
      note: "actions active in this instance"
    }
  },
  data() {
    return {
      parentPath: "",
      selectedItem: {},
      previousDisplayMode: "",
      displayMode: "table",
      isRefreshing: false,
      tableNeedsRefresh: false,
      awesomeEditNeedsRefresh: false,
      statsNeedsRefresh: false,
      nestedCrudNeedsRefresh: false,
      mergedOptions: {},
      _model: {},
      innerNestedSchemas: [],
      activeNestedTab: "general",
      formOptions: {
        validateAsync: true,
        validateAfterLoad: false,
        validateAfterChanged: true,
        fieldIdPrefix: "AwesomeCrud"
      }
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
      return "";
    },

    _titlePlural() {
      if (this._model && this._model.namePlural) {
        return this.$te(this._model.namePlural) ? this.$t(this._model.namePlural) : _.startCase(this._model.namePlural);
      }

      if (this.title) {
        return this.$te(this.title + "s") ? this.$t(this.title + "s") : this.title + "s";
      }

      if (this.identity) {
        return this.$te(`app.labels.${this.identity}s`)
          ? this.$t(`app.labels.${this.identity}s`)
          : _.startCase(this.identity + "s");
      }
      return "";
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
      return "";
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
      return "";
    },

    // _url() szee apiConfigMixin
    // _selectedItemUrl() szee apiConfigMixin

    schemaComputed() {
      return this.schema || this._model.schema;
    },

    formSchema() {
      if (!this.schemaComputed) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this.schemaComputed);
      return parsedFormSchema;
    },

    tableColumnsComputed() {
      return this.parseColumns(this.schemaComputed.properties);
    },

    _layout() {
      return this.layout || (this.model && this.model.layout);
    },
    createPageLayoutComputed() {
      return this.createPageLayout || (this.model && this.model.createPageLayout) || this._layout;
    },
    viewPageLayoutComputed() {
      return this.viewPageLayout || (this.model && this.model.viewPageLayout) || this._layout;
    },
    editPageLayoutComputed() {
      return this.editPageLayout || (this.model && this.model.editPageLayout) || this._layout;
    },

    _actions() {
      return _.merge(
        {},
        defaultActions,
        this.actions || (this.mergedOptions && this.mergedOptions.actions) // old location kept for BC
      );
    }
  },
  watch: {
    // call again the method if the route changes
    name: "loadModel",
    identity: "loadModel",
    model: "loadModel",
    "parent.id": "loadModel",
    options: "mergeOptions",
    crudNeedsRefresh: "refreshComponent"
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
    if (this.modelName) {
      this.identity = this.modelName;
    }
    this.loadModel();

    if (!this.$route) {
      // stop if we don't have a router to bind ourselves to
      return;
    }

    // this.displayMode = this.mergedOptions.initialDisplayMode;
    const matched = this.$route.matched[this.$route.matched.length - 1];
    if (this.$route.params.id) {
      if (this.$route.params.id === "create" || this.$route.params.id === "new") {
        delete this.$route.params.id;
        if (this.$route.query.item) {
          this.selectedItem = _.merge(this.selectedItem, this.$route.query.item);
        }
        this.goToCreatePage({ reset: false });
        return;
      }

      this.parentPath = matched.path;
      this.parentPath = this.parentPath.replace("/edit", "").replace("/:id", "");
    } else {
      this.parentPath = matched.path;
    }

    if (this._isNestedDetail && this.viewMode === "detail") {
      this.viewMode = this.nestedDisplayMode;
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
        this.$emit("update:crudNeedsRefresh", false);
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
      if (this.$route && this.$route.query && this.$route.query._filters) {
        this.mergedOptions.queryParams = _.merge(
          this.mergedOptions.queryParams,
          { _filters: this.$route.query._filters },
          { _fields: this.$route.query._fields }
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
      if ((!e.improperData || e.improperData.length === 0) && (!e.properData || e.properData.length === 0)) {
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
        e.improperData.forEach((element) => {
          message += ` - ${Object.values(element).join(" | ")}, `;
        });
        message = message.substring(0, message.length - 2);
        setTimeout(() => {
          this.$notify({
            title: `${e.improperData.length} ${this.$t("common.messages.not_imported", {
              title: this._title
            })}`,
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
      if (!this.mergedOptions.importUrl) {
        this.$notify({ title: "[WARN] missing export url", type: "warning" });
        return;
      }
      this.$http
        .get(this.mergedOptions.importUrl + "-template", {})
        .then((res) => {
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
        // @deprecated. We should avoid wiring data from the stores
        this._model = this.$store.state.data.models.find((model) => model.identity === this.identity);
      } else {
        this._model = this.model;
      }

      if (!this._model && !this.schema) {
        console.warn("CRUD COMPONENT ERROR", `model ${this.identity} not found`);
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
      if (this.parent && this.nestedDisplayMode === "object") {
        this.nestedViewFunction();
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
            if (matched.path.indexOf("/edit") !== -1) {
              this.setDisplayMode("edit", data);
            } else {
              this.setDisplayMode("view", data);
            }
            this.$forceUpdate();
          })
          .catch(this.apiErrorCallback)
          .finally(() => {
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
      Object.keys(schema.properties).forEach((key) => {
        if ([this.primaryKey].indexOf(key) === -1) {
          const prop = schema.properties[key];
          if (prop.field && prop.field.hidden) {
            return;
          }
          if (prop.type === "object" && !(prop.field && prop.field.type)) {
            const subSchema = this.parseSchema(prop, `${prefix}${key}.`);
            subSchema.legend = prop.title || _.startCase(key);
            subSchema.type = "group";
            subSchema.styleClasses = `subgroup  ${(prop.field && prop.field.styleClasses) || "card"}`;
            fields.push(subSchema);
          } else {
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = prop.relationUrl || prop.relation;
              prop.field.fieldOptions.trackBy = prop.foreignKey;
              prop.field.fieldOptions.searchable = true;
            }
            const field = {
              type: (prop.field && prop.field.type) || this.getFormtype(prop),
              label: prop.title || prop.description || _.startCase(key),
              placeholder: prop.description || prop.title || _.startCase(key),
              fieldOptions: (prop.field && prop.field.fieldOptions) || {
                placeholder: prop.description || prop.title || _.startCase(key),
                url: prop.relationUrl || prop.relation,
                trackBy: prop.foreignKey || "id",
                label: "label", // key label for enyo select
                name: "label", // key label for native select
                step: prop.field && prop.field.step,
                readonly: this.displayMode === "view" || (prop.field && prop.field.readonly),
                disabled: this.displayMode === "view" || (prop.field && prop.field.readonly)
              },
              values:
                (prop.field &&
                  prop.field.fieldOptions &&
                  (prop.field.fieldOptions.values || this.getSelectEnumFromStore(prop.field.fieldOptions.enum))) ||
                prop.enum ||
                (prop.items && prop.items.enum) ||
                [],
              required: prop.field && prop.field.required,
              hint: prop.description,
              model: prefix + key,
              validator: prop.field && prop.field.validator,
              min: prop.min,
              max: prop.max,
              multi: prop.type === "array",
              readonly: this.displayMode === "view" || (prop.field && prop.field.readonly),
              disabled: this.displayMode === "view" || (prop.field && prop.field.readonly),
              styleClasses: (prop.field && prop.field.styleClasses) || (size < 8 ? "col-12" : "col-6"),
              relation: prop.relation,
              foreignKey: prop.foreignKey,
              group: prop.field ? prop.field.group : undefined
            };
            if (!field.fieldOptions.inputType) {
              field.fieldOptions.inputType =
                (prop.field && prop.field.inputType) || this.getFormInputType(prop) || "text";
            }
            if (
              prop.type === "boolean" &&
              (field.type === "select" || field.type === "enyoSelect") &&
              (!field.values || !field.values.length)
            ) {
              field.values = [
                { id: true, label: "Yes" },
                { id: false, label: "No" },
                { id: "", label: "-" }
              ];
            }
            if (field.type === "dateTime") {
              field.fieldOptions.icons = {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
              };
            }
            if (field.type === "enyoSelect" && !field.fieldOptions.options) {
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
            type: "group"
          });
        }
      });
      if (groups.length < 1) {
        groups = [{ legend: "", fields: schema.fields }];
      }
      return groups;
    },

    distributeFieldsInGroups(groups, fields) {
      fields.forEach((f) => {
        if (f.group) {
          const keys = f.group.split(".");
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
        const possibleTypes = ["string", "number", "boolean"];
        for (let i = 0; i < possibleTypes.length; i++) {
          if (property.type.indexOf(possibleTypes[i]) > -1) {
            type = possibleTypes[i];
          }
        }
      }

      if (property.enum) {
        return "select";
      }
      switch (type) {
        case "string":
          return "input";
        case "integer":
        case "number":
          return "input";
        case "boolean":
          return "select"; // put enyoSelect after debugging all the issues...enyoSelect
        default:
          return "input";
      }
    },
    getSelectEnumFromStore(val) {
      const options =
        _.isString(val) && val.indexOf("$store") === 0 ? _.get(this.$store.state, val.replace("$store.", "")) : val;
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

    /** @param mode: string */
    setDisplayMode(mode, item, options = { refresh: true }) {
      this.previousDisplayMode = this.displayMode || "table";
      if (item) {
        this.selectedItem = item;
      }
      this.displayMode = mode;
      if (mode === "table") {
        this.tableNeedsRefresh = options.refresh;
      } else {
        this.awesomeEditNeedsRefresh = options.refresh;
      }
    },

    goToCreatePage(options = { reset: true }) {
      if (this.mergedOptions.createPath) {
        return this.$router.push(this.mergedOptions.createPath);
      }
      if (options.reset) {
        this.selectedItem = {};
      }
      this.setDisplayMode("create", null);
      if (this.updateRouter) {
        window.history.replaceState({}, null, `${this.parentPath}/new`);
      }

      return;
    },

    goToDeletePage(item) {
      if (this.mergedOptions.createPath) {
        return this.$router.push(this.mergedOptions.deletePath.replace(":id", item[this.primaryKey]));
      }

      this.deleteFunction(item);
      return;
    },

    goToEditPage(item) {
      if (this.mergedOptions.editPath) {
        return this.$router.push(this.mergedOptions.editPath.replace(":id", item[this.primaryKey]));
      }
      if (this.updateRouter) {
        window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}/edit`);
      }
      this.setDisplayMode("edit", item);
    },

    goToViewPage(item) {
      if (this.mergedOptions.viewPath) {
        return this.$router.push(this.mergedOptions.viewPath.replace(":id", item[this.primaryKey]));
      }
      if (this.updateRouter) {
        window.history.replaceState({}, null, `${this.parentPath}/${item[this.primaryKey]}`);
      }
      this.setDisplayMode("view", item);
    },

    nestedViewFunction() {
      this.displayMode = "view";
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

    deleteFunction(item) {
      this.selectedItem = item;
      Swal.fire({
        title: this.$t("AwesomeDefault.messages.are_you_sure"),
        text: this.$t("AwesomeDefault.messages.wont_be_able_recover"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "var(--primary)",
        cancelButtonColor: "#eee",
        confirmButtonText: this.$t("EnyoCrudComponent.buttons.yes_delete_it"),
        cancelButtonText: this.$t("EnyoCrudComponent.buttons.cancel"),
        reverseButtons: true
      })
        .then((result) => {
          if (result.value) {
            this.$http
              .delete(`${this._selectedItemUrl}/${item[this.primaryKey]}`)
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

    onCustomAction(body) {
      const { action } = body;
      this.$emit(this.identity + "-custom-action", action);
      return action && action.action && action.action(body, this);
    },

    /**
     * @param item object
     * @param options = {context = create | edit }
     */
    onEditDisplayCancelled(item, { context }) {
      this.setDisplayMode(
        this.previousDisplayMode && this.previousDisplayMode !== context ? this.previousDisplayMode : "table",
        item,
        { refresh: false }
      );
    },

    onViewDisplayCancelled(item) {
      // eslint-disable-next-line
      console.log("@cancel event treated", this.previousDisplayMode);
      this.setDisplayMode(
        this.previousDisplayMode && this.previousDisplayMode !== "view" ? this.previousDisplayMode : "table",
        item,
        { refresh: false }
      );
    },

    onItemCreated(item) {
      this.setDisplayMode("table", item);
      // eslint-disable-next-line
      console.log("EVENT", "onItemCreated", item);
    },
    onItemEdited(...args) {
      // eslint-disable-next-line
      console.log("EVENT", "onItemEdited", args);
    },
    onItemDeleted(...args) {
      // eslint-disable-next-line
      console.log("EVENT", "onItemDeleted", args);
    },
    onItemViewed(...args) {
      // eslint-disable-next-line
      console.warn("EVENT", "onItemViewed", args);
    },
    onItemValidated(...args) {
      // eslint-disable-next-line
      console.warn("EVENT", "onItemValidated", args);
    },
    onItemValidationFailed(...args) {
      // eslint-disable-next-line
      console.warn("EVENT", "onItemValidationFailed", args);
    },

    onListUpdated(datas) {
      this.$emit("list-updated", datas);
      this.$emit(this.identity + "-list-updated", datas);
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
          if (prop.relation) {
            newCol.relation = prop.relation;
          }
          newcolumns.push(newCol);
        }
      });

      if (!newcolumns.find((col) => col.field === "ACTIONS")) {
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
