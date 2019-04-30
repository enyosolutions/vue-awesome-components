<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h1 class="text-primary">{{ $t('common.labels.manageTitle') }} {{ _titlePlural }} <i class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"
            v-if="isRefreshing"
                    style="color:orange;max-width: 50%;margin-top:25%"></i></h1>
          <div class="row" v-if="innerOptions.stats">
            <enyo-stats
              :url="innerOptions.url + '/stats'"
              :entity="modelName"
              :statsNeedsRefresh.sync="statsNeedsRefresh"
            ></enyo-stats>
          </div>
          <!--
            <EnyoSelect v-model="mySelect2" url="/page" :options="[]" label="content" track-by="_id"  :multiple="true" :somevar="'test'"></EnyoSelect>
          -->
          <div class="text-right">
            <slot name="top-right-buttons">
              <button
                class="btn btn-primary btn-simple"
                v-if="innerOptions.actions && innerOptions.actions.create"
                @click="createFunction()"
              >
                <i class="enyo-fa-plus"></i>
                {{ $t('common.labels.createNew') }} {{ _title }}
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
              class="modal"
              :class="{slide: innerOptions.modalMode === 'slide', fade: innerOptions.modalMode === 'fade'}"
              tabindex="-1"
              role="dialog"
              id="formModal"
            >
              <div
                class="modal-dialog"
                :class="{'modal-full-height': innerOptions.modalMode === 'slide', 'modal-lg': innerOptions.modalMode === 'fade'}"
                role="document"
              >
                <div class="modal-content" v-if="viewMode==='create'">
                  <form @submit.prevent="createItem()">
                    <div class="modal-header bg-primary text-white">
                      <h3 class="modal-title mt-0">{{ $t('common.labels.add_a') }} {{ title }}</h3>
                      <button type="button" class="close" @click="closeModal()" aria-label="Close">
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
                          ></VueFormGenerator>
                        </template>
                      </slot>
                    </div>
                    <div class="modal-footer">
                      <slot name="add-modal-footer">
                        <button
                          type="button"
                          class="btn btn-default btn-simple mr-auto"
                          @click="closeModal()"
                        >{{ $t('common.buttons.cancel') }}</button>
                        <button
                          type="submit"
                          class="btn btn-primary ml-auto"
                        >{{ $t('common.buttons.save') }}</button>
                      </slot>
                    </div>
                  </form>
                </div>
                <!--  EDITS -->
                <div class="modal-content" v-if="viewMode==='edit' || viewMode==='view'">
                  <form @submit.prevent="editItem()">
                    <div class="modal-header bg-primary text-white">
                      <h3
                        class="modal-title mt-0"
                        v-if="viewMode==='edit'"
                      >{{ $t('common.buttons.edit') }}</h3>
                      <h3
                        class="modal-title mt-0"
                        v-if="viewMode==='view'"
                      >{{ $t('common.buttons.view') }}</h3>
                      <button type="button" class="close" aria-label="Close" @click="closeModal()">
                        <span aria-hidden="true" class="text-white">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body" :class="{'view-mode': viewMode === 'view'}">
                      <ul
                        class="nav nav-tabs mt-5 mb-4"
                        v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view'"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            data-toggle="tab"
                            @click="activeNestedTab = 'general'"
                          >{{ $t('app.labels.' + name) }}</a>
                        </li>
                        <li class="nav-item" v-for="ns in nestedSchemas"
                          :key="ns.$id"
                        >
                          <a class="nav-link" data-toggle="tab" @click="activeNestedTab = ns.name">
                            <i :class="ns.icon" v-if="ns.icon"></i>
                            {{ $t(ns.title || ns.name || ns.modelName) }}
                          </a>
                        </li>
                      </ul>
                      <slot name="edit-form" :selectedItem="selectedItem">
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
                              ></VueFormGenerator>
                            </div>
                          </template>
                          <template  v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view' && selectedItem">
                          <div
                            class="tab-pane nested-tab fade"
                            v-for="ns in nestedSchemas"
                            :key="ns.$id"
                            :class="{'active show': activeNestedTab===ns.name}"
                          >
                            <crud-component
                              v-bind="ns"
                              :parent="selectedItem"
                              :crudNeedsRefresh.sync="nestedCrudNeedsRefresh"
                            >
                              <div slot="crud-title"></div>
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
                        >{{ $t('common.buttons.cancel') }}</button>
                        <button
                          type="submit"
                          v-if="viewMode==='edit'"
                          class="btn btn-primary ml-auto"
                        >{{ $t('common.buttons.save') }}</button>
                        <button
                          type="button"
                          v-if="viewMode === 'view' && innerOptions.actions && innerOptions.actions.edit  && !innerOptions.noActions"
                          class="btn btn-info btn-simple ml-auto"
                          @click.prevent.stop="goToEditPage(selectedItem)"
                        >
                          <i class="fa fa-pencil"></i>
                          {{ $t('common.buttons.edit') }}
                        </button>
                        <button
                          type="button"
                          v-if="viewMode==='view'"
                          class="btn btn-primary ml-2"
                          @click="closeModal()"
                        >{{ $t('common.buttons.close') }}</button>
                      </slot>
                    </div>
                  </form>
                </div>
               <div class="modal-content" v-if="viewMode==='edit' || viewMode==='view'">
                 <form @submit.prevent="editItem()">
                   <div class="modal-header bg-primary text-white">
                     <h3
                       class="modal-title mt-0"
                       v-if="viewMode==='edit'"
                     >{{ $t('common.buttons.edit') }}</h3>
                     <h3
                       class="modal-title mt-0"
                       v-if="viewMode==='view'"
                     >{{ $t('common.buttons.view') }}</h3>
                     <button type="button" class="close" aria-label="Close" @click="closeModal()">
                       <span aria-hidden="true" class="text-white">&times;</span>
                     </button>
                   </div>
                   <div class="modal-body" :class="{'view-mode': viewMode === 'view'}">
                     <ul
                       class="nav nav-tabs mt-5 mb-4"
                       v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view'"
                     >
                       <li class="nav-item">
                         <a
                           class="nav-link active"
                           data-toggle="tab"
                           @click="activeNestedTab = 'general'"
                         >{{ $t('app.labels.' + name) }}</a>
                       </li>
                       <li class="nav-item" v-for="ns in nestedSchemas"
                       :key="ns.$id"
                       >
                         <a class="nav-link" data-toggle="tab" @click="activeNestedTab = ns.name">
                           <i :class="ns.icon" v-if="ns.icon"></i>
                           {{ $t(ns.title || ns.name) }}
                         </a>
                       </li>
                     </ul>
                     <slot name="edit-form" :selectedItem="selectedItem">
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
                             ></VueFormGenerator>
                           </div>
                         </template>
                         <template v-if="nestedSchemas && nestedSchemas.length && viewMode === 'view' && selectedItem">
                         <div
                           class="tab-pane nested-tab fade"

                           v-for="ns in nestedSchemas"
                           :key="ns.$id"
                           :class="{'active show': activeNestedTab===ns.name}"
                         >
                           <crud-component
                             v-bind="ns"
                             :parent="selectedItem"
                             :crudNeedsRefresh.sync="nestedCrudNeedsRefresh"
                           >
                             <div slot="crud-title"></div>
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
                       >{{ $t('common.buttons.cancel') }}</button>
                       <button
                         type="submit"
                         v-if="viewMode==='edit'"
                         class="btn btn-primary ml-auto"
                       >{{ $t('common.buttons.save') }}</button>
                       <button
                         type="button"
                         v-if="viewMode === 'view' && innerOptions.actions && innerOptions.actions.edit  && !innerOptions.noActions"
                         class="btn btn-info btn-simple ml-auto"
                         @click.prevent.stop="goToEditPage(selectedItem)"
                       >
                         <i class="fa fa-pencil"></i>
                         {{ $t('common.buttons.edit') }}
                       </button>
                       <button
                         type="button"
                         v-if="viewMode==='view'"
                         class="btn btn-primary ml-2"
                         @click="closeModal()"
                       >{{ $t('common.buttons.close') }}</button>
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
          <AjaxTable
            :columns="innerOptions.columns"
            :columnsDisplayed="innerOptions.columnsDisplayed"
            :entity="modelName"
            :mode="innerOptions.mode"
            :url="innerOptions.url"
            :params="innerOptions.queryParams"
            @edit="goToEditPage"
            @view="goToViewPage"
            @create="createFunction"
            @delete="deleteFunction"
            @customAction="customAction"
            :tableNeedsRefresh.sync="tableNeedsRefresh"
            :nestedCrudNeedsRefresh.sync="nestedCrudNeedsRefresh"
            :options="{actions: innerOptions.actions, customActions: innerOptions.customActions}"
            name="ajax-table"
          >
            <template slot="table-top-more-actions">
              <upload-button
                v-if="innerOptions.actions && innerOptions.actions.import"
                name="import"
                :options="{
                upload: true,
                targetUrl: innerOptions.uploadUrl,
                method: 'POST',
                headers: {},
                base64: false,
                label: $t('common.buttons.import'),
                class: 'btn btn-success btn-simple btn-block'
              }"
                @uploaded="importResponse"
              ></upload-button>
            </template>

            <!-- END OF ARRAY -->
          </AjaxTable>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */
import apiErrors from "@/mixins/api-errors";
import _ from "lodash";
import Swal from "sweetalert2/dist/sweetalert2.js";
import AjaxTable from "../table/AjaxTable.vue";
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
  modalMode: "slide", // fade | slide
  columnsDisplayed: 8,
  customActions: [], // {key, label, action: function(item, context{}}
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
    refresh: true
  }
};

export default {
  name: "crud-component",
  introduction:
    "A component to quickly create a table UI with edit capabilities",
  description: `This components magically create lists and edit data based on a json schema.

  ### Usage.

There are 3 ways of using the Crud Component.
   The component works best when connected directly to the router. The config can the be passed as props. See the token section for an example of how to set-up a route based crud component.

  If you want to further personalize your page, it's possible to create your own component, use the crud component in the body, and then use slots to create the desired features.

  The 3rd way of reusing the Crud component if simply by extending the component and redesigning the template part completely. One use case would be to remove the json schema form and create your own form.
   Whatever the reason for you to modify the component, we suggest that you copy the html code as source for your edits.

  ### Actions

  The crud compoenent allows to define which actions are enabled on a component. There are

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
  props: {
    name: { type: String, required: false },
    modelName: { type: String, required: true },
    model: {
      type: Object,
      required: false,
      note: "The object that will be used for managing the component"
    },
    schema: {
      type: Object,
      required: false,
      note:
        "The json schema that represent the object to display. this is used to personalise form inputs and column displays"
    },
    crudNeedsRefresh: { type: Boolean, default: false },
    nestedSchemas: {
      type: Array,
      required: false,
      default: () => [],
      note:
        "An array describing data that is linked to this model. Serves for displaying a detailed object"
    },
    parent: {
      type: Object,
      required: false,
      note:
        "The actual object containing the parent in case of a nested schema. You don't actually to pass this, it's done automatically by the compoenet itself"
    },
    nestedDisplayMode: {
      type: String,
      required: false,
      default: "list",
      note: `In case of a nested schema, this parameter determines whether the component should be rendered as a list of a form`
    },
    options: {
      type: Object,
      default: () => defaultOptions
    }
  },
  components: {
    AjaxTable
    // VueGoodTable
  },
  mixins: [apiErrors],
  created() {
    this.loadModel();
  },
  mounted() {
    this.$modal = $("#formModal");
    this.loadModel();
    if (!this.$route) {
      return;
    }
    const matched = this.$route.matched[this.$route.matched.length - 1];
    if (this.$route.params.id) {
      this.parentPath = matched.path.replace("/edit", "").replace("/:id", "");
    } else {
      this.parentPath = matched.path;
    }
  },
  beforeRouteEnter(to, from, next) {
    // eslint-disable-next-line
    next(vm => {
      //    vm.loadModel();
    });
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
  watch: {
    // call again the method if the route changes
    name: "loadModel",
    modelName: "loadModel",
    model: "loadModel",
    options: "mergeOptions",
    crudNeedsRefresh: "refreshComponent"
  },
  computed: {
    _title() {
      if (this.title) {
      return this.$te(this.title) ? this.$t(this.title) : this.title;
      }

      if (this.name) {
        return this.$te(`app.labels.${this.name}`) ? this.$t(`app.labels.${this.name}`) : this.name;
      }
      if (this.modelName) {
        return this.$te(`app.labels.${this.modelName}`) ? this.$t(`app.labels.${this.modelName}`) : this.modelName;
      }
      return '';
    },
    _titlePlural() {
      if (this.titlePlural) {
      return this.$te(this.titlePlural) ? this.$t(this.titlePlural) : this.titlePlural;
      }

      if (this.title) {
      return this.$te(this.title) ? this.$t(this.title + 's') : (this.title + 's');
      }

      if (this.name) {
        return this.$te(`app.labels.${this.name}s`) ? this.$t(`app.labels.${this.name}s`) : this.name + 's';
      }
      if (this.modelName) {
        return this.$te(`app.labels.${this.modelName}s`) ? this.$t(`app.labels.${this.modelName}s`) : this.modelName + 's';
      }
      return '';
    },
    formSchema() {
      if (!this.innerSchema) {
        return [];
      }
      const parsedFormSchema = this.parseSchema(this.innerSchema);
      return parsedFormSchema;
    }
  },
  methods: {
    refreshComponent() {
      // console.log("refresh component watcher");
      if (this.modelName) {
        this.loadModel();
      }

      this.tableNeedsRefresh = true;
      this.statsNeedsRefresh = true;
      this.nestedCrudNeedsRefresh = true;


      setTimeout(() => {
        this.$emit("update:crudNeedsRefresh", false);
      }, 100);
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
      this.innerOptions = _.merge(this.innerOptions, this.options);
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

    exportCurrentArrayToExcel() {
      let CsvString = "";
      // eslint-disable-next-line
      this.items.forEach((RowItem, RowIndex) => {
        // eslint-disable-next-line
        RowItem.forEach((ColItem, ColIndex) => {
          CsvString += `${ColItem},`;
        });
        CsvString += "\r\n";
      });
      CsvString = `data:application/csv,${encodeURIComponent(CsvString)}`;
      const x = document.createElement("A");
      x.setAttribute("href", CsvString);
      x.setAttribute("download", "somedata.csv");
      document.body.appendChild(x);
      x.click();
    },

    loadModel() {
      if (!this.options) {
        this.options = {};
      }
      this.mergeOptions();
      if (this.$store && this.$store.state && !this.model) {
        this.innerModel = this.$store.state.data.models.find((model) => model.name === this.modelName);
      } else {
        this.innerModel = this.model;
      }
      if (this.modelName && !this.name) {
        this.name = this.modelName;
      }

      if (!this.innerModel && !this.schema) {
        // console.warn("CRUD COMPONENT ERROR", `model ${this.name} not found`);
        return;
      }

      this.innerSchema = this.schema || this.innerModel.schema;
      this.innerOptions.columns = this.parseColumns(this.innerSchema.properties);
      this.innerOptions.url = (this.options && this.options.url) || (this.innerModel && this.innerModel.url) || `/crud/${this.modelName}`;
      if (typeof this.innerOptions.url === 'function') {
        this.innerOptions.url = this.innerOptions.url(this.parent, this);
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
            if (matched.path.indexOf("/edit") !== -1) {
              this.editFunction(res.data.body);
            } else {
              this.viewFunction(res.data.body);
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
      const formSchema = [];
      const size = Object.keys(schema.properties).length;
      Object.keys(schema.properties).forEach(key => {
        if (["_id", "metadata"].indexOf(key) === -1) {
          const prop = schema.properties[key];
          if (prop.field && prop.field.hidden) {
            return;
          }
          if (prop.type === "object" && !(prop.field && prop.field.type)) {
            const subSchema = this.parseSchema(prop, `${key}.`);
            subSchema.legend = prop.title || _.startCase(key);
            subSchema.type = "group";
            subSchema.styleClasses = `subgroup  ${(prop.field &&
              prop.field.styleClasses) ||
              "card"}`;
            formSchema.push(subSchema);
          } else {
            if (prop.field && prop.relation && prop.field.fieldOptions) {
              prop.field.fieldOptions.url = prop.relation;
              prop.field.fieldOptions.trackBy = prop.foreignKey;
            }
            const field = {
              type: (prop.field && prop.field.type) || this.getFormtype(prop),
              label: prop.title || prop.description || _.startCase(key),
              placeholder: prop.description || prop.title || _.startCase(key),
              fieldOptions: (prop.field && prop.field.fieldOptions) || {
                placeholder: prop.description || prop.title || _.startCase(key),
                url: prop.relation,
                trackBy: prop.foreignKey || "code",
                label: "label"
              },
              values:
                prop.enum ||
                (prop.items && prop.items.enum) ||
                (prop.field &&
                  prop.field.fieldOptions &&
                  this.getSelectEnum(prop.field.fieldOptions.enum)),
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
              foreignKey: prop.foreignKey
            };
            field.fieldOptions.inputType =
              (prop.field && prop.field.inputType) ||
              this.getFormInputType(prop) ||
              "text";
            if (field.type === "dateTime") {
              field.fieldOptions.icons = {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down"
              };
            }
            formSchema.push(field);
          }
        }
      });
      return { fields: formSchema };
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
      switch (type) {
        default:
        case "string":
          return "input";
        case "number":
          return "input";
        case "boolean":
          return "checkbox";
      }
    },
    getSelectEnum(val) {
      const options = this.$store && this.$store.state;
      _.isString(val) && val.indexOf("$store") === 0
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
        return property.column && property.column.type;
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
      this.$modal && this.$modal.modal("show");
    },

    closeModal() {
      window.history.replaceState({}, null, `${this.parentPath}`);
      this.$modal && this.$modal.modal("hide");
    },

    goToEditPage(item) {
      if (!this.innerOptions.editPath) {
        window.history.replaceState(
          {},
          null,
          `${this.parentPath}/${item._id}/edit`
        );
        this.editFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.editPath.replace(":id", item._id));
    },

    goToViewPage(item) {
      if (!this.innerOptions.viewPath) {
        window.history.replaceState({}, null, `${this.parentPath}/${item._id}`);
        this.viewFunction(item);
        return;
      }
      this.$router.push(this.innerOptions.viewPath.replace(":id", item._id));
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
          "Unable to find the reference to the scham form on ",
          this.$route.path
        );
      }
      return this.$http
        .post(this.innerOptions.url, this.selectedItem)
        .then(() => {
          Swal.fire({
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
          `${this.innerOptions.url}/${this.selectedItem._id}`,
          this.selectedItem
        )
        .then(() => {
          Swal.fire({
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
        .catch(this.apiErrorCallback).finally(()=> {
          this.isRefreshing = false;
        });
      return false;
    },

    editFunction(item) {
      this.viewMode = "edit";
      this.selectedItem = item;
      this.$http
        .get(`${this.innerOptions.url}/${item._id}`)
        .then(res => {
          this.selectedItem = res.data.body;
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
        .get(`${this.innerOptions.url}/${item._id}`)
        .then(res => {
          this.selectedItem = res.data.body;
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
          this.selectedItem = res.data.body;
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
            .delete(`${this.innerOptions.url}/${item._id}`)
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

    createFunction() {
      if (!this.innerOptions.createPath) {
        this.viewMode = "create";
        this.selectedItem = {};
        this.openModal();
        return;
      }
      this.$router.push(this.innerOptions.createPath);
    },

    customAction({ action, item }) {
      // console.log(item);
      return action.action(item, this);
    },

    parseColumns(properties) {
      const newcolumns = [];
      Object.keys(properties).forEach(key => {
        const newCol = {};
        const prop = properties[key];
        if (!prop.hidden && !(prop.column && prop.column.hidden)) {
          newCol.field = key;
          newCol.type = this.getColumnType(prop);
          newCol.label = _.startCase(
            (prop.column && prop.column.title) || prop.title || key
          );
          newCol.listName = prop.column && prop.column.listName;
          newCol.filterOptions = { enabled: false };
          newCol.enum = prop.enum || (prop.column && prop.column.enum);
          newCol.sortable = true;
          newcolumns.push(newCol);
          if (prop.relation) {
            newCol.relation = prop.relation;
          }
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


.vue-form-generator .input-group {
  z-index: 100;
}
.vue-form-generator .multiselect {
  width: 100%;
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
