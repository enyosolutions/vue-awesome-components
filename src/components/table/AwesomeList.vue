<template>
  <div class="awesome-list-card awesome-list-component awesome-list">
    <div
      :class="
        'awesome-list-header ' +
          (opts.headerStyle ? 'colored-header bg-' + opts.headerStyle : '')
      "
    >
      <h4 class>
        <slot name="awesome-list-title">{{ _listTitle }}</slot>
        <div class="btn-group btn-group-sm float-right awesome-list-buttons">
          <slot name="table-top-actions" class />
          <div v-if="isRefreshing" style="text-align: center">
            <i
              class="fa fa-circle-o-notch fa-spin fa-2x fa-fw"
              style="color:#888;margin-left:10px"
            />
          </div>
          <div class="btn-group" role="group">
            <button
              v-if="actions && actions.refresh"
              class="btn btn-simple"
              @click="getItems()"
            >
              <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t("awesomelist.buttons.refresh") }}
            </button>



            <template v-if="actions && actions.itemsPerRow">
             <button class="btn " @click="setListMode()"
              :class="itemsPerRow === 1 ? 'btn-primary' : 'btn-light'"
            >
              <i :class="'fa fa-list'" />

            </button>
              <button
              class="btn"
              :class="itemsPerRow === 2 ? 'btn-primary' : 'btn-light'"
              @click="setMediumGridMode()">
                <i :class="'fa fa-th-large'" />
              </button>

              <button
              class="btn"
              :class="itemsPerRow === 3 ? 'btn-primary' : 'btn-light'"
              @click="setGridMode()">
                <i :class="'fa fa-th'" />
              </button>
            </template>

            <button
              v-if="
                actions && (actions.export || actions.import)
              "
              id="dropdownMenuButton"
              class="btn btn-secondary btn-simple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-plus" />
              {{ $t("AwesomeTable.more") }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <slot name="table-top-more-actions" />
              <button
                v-if="actions && actions.export"
                class="btn btn-success btn-simple btn-block"
                @click="exportCallBack"
              >
                <i class="fa fa-file-excel" />
                {{ $t("common.buttons.excel") }}
              </button>

              <button
                class="btn btn-default btn-simple btn-block"
                @click="exportCurrentArrayToExcel"
              >
                <i class="fa fa-file-excel" />
                {{ $t("common.buttons.excel-currentpage") }}
              </button>
            </div>
          </div>
        </div>
      </h4>
      <p class="card-category">
        <slot name="list-subtitle" />
      </p>
    </div>

    <div class>
      <div class="list-responsive card-deck" :class="styles.listWrapperClasses" v-if="_paginatedItems">
        <div
          class="pointer"
          v-for="(item, index) in _paginatedItems"
          :key="index"
          :class="itemWrapperClasses"
          @click="handleItemClick($event, item)"
        >
          <slot name="list-item" :item="item" itemsPerRow:="itemsPerRow">
            <div
              class="card mb-3 awesome-list-item"
              :style="{'flex-direction': itemsPerRow < 2 ? 'row' : 'column',
             'height': _itemHeight
          }"
            >
              <img
               class="card-img-top"
                v-if="fields && fields.image"
                :src="item[fields.image]"
                :alt="item[fields.title]"
              />
              <div class="card-body">
                  <h5 class="card-title" v-if="fields && fields.title && item[fields.title]">{{ item[fields.title] }}</h5>
                <p class="card-text" v-if="fields && fields.description && item[fields.description]">{{ item[fields.description] }}</p>
                <template v-if="columns && columns.length">
                  <div v-for="(itemData, key) in getAllowColumn(item)" :key="key">
                      {{ key }} :
                      <AwesomeDisplay
                        :type="getColumn(key).type"
                        :value="itemData"
                        :relation="getColumn(key).relation"
                        :relation-label="getColumn(key).relationLabel"
                        :relation-url="getColumn(key).relationUrl"
                        :relation-key="getColumn(key).relationKey"
                      >
                      </AwesomeDisplay>
                  </div>
                </template>
                <p v-if="getAllowColumn(item)" class="card-text">{{ $t('AwesomeList.no-data')}}</p>
                <div class="awesomelist-item-action pl-3 pr-3" v-if="actions.itemButton">
                  <button
                    @click="handleItemButtonClick($event, item)"
                    class="btn btn-primary btn-sm "
                    :class="itemsPerRow > 1 ? 'btn-block': ''"
                  >
                  {{ $t("awesomelist.buttons.itemAction") }}
                  </button>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </div>
      <hr />
      <nav class="text-center">
        <paginate
          v-model="page"
          :page-count="_pageCount"
          :page-range="3"
          :margin-pages="2"
          :click-handler="onPaginationChange"
          :prev-text="'<< '"
          :next-text="' >>'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :prev-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-link-class="'page-link'"
          :next-link-class="'page-link'"
        ></paginate>
      </nav>
    </div>
  </div>
</template>
<script>
import apiErrors from "../../mixins/apiErrorsMixin";
import i18nMixin from "../../mixins/i18nMixin";
import apiListMixin from "../../mixins/apiListMixin";
import AwesomeDisplay from "../crud/display/AwesomeDisplay";
import Paginate from "vuejs-paginate";
import _ from "lodash";

export default {
  name: "AwesomeList",
  token: `

  `,
  components: { Paginate, AwesomeDisplay },
  mixins: [i18nMixin, apiErrors, apiListMixin],
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    perRow: {
      type: Number,
      default: 3
    },
    perPage: {
      type: Number,
      default: 6
    },
    gridModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    listModeItemHeight: {
      type: [Number, String],
      default: undefined
    },
    fields: {
      type: Object,
      default: () => ({
        image: "",
        title: "",
        subtitle: "",
        description: ""
      })
    },
    translations: {
      type: Object,
      default: () => ({
        "awesomelist.buttons.increase": "More items per row",
        "awesomelist.buttons.decrease": "Less items per row",
        "awesomelist.buttons.refresh": "Refresh",
        "awesomelist.buttons.itemAction": "Open",
      })
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    actions: {
      type: Object,
      default: () => ({
          itemButton: true,
          refresh: true,
          itemsPerRow: true
        })
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: "",
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        customBulkActions: [],
        saveSearchDatas: false,
      })
    },
  },
  data() {
    return {
      itemsPerRow: 3,
      page: 0,
      data: [],
    };
  },
  computed: {
    _listTitle() {
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

    _itemHeight() {
      const height =
        this.itemsPerRow === 1
          ? this.listModeItemHeight
          : this.gridModeItemHeight;
      return _.isString(height) ? height : height + "px";
    },

    _pageCount() {
      const perPage = parseInt(this.serverParams.perPage) || this.perPage;
      return perPage && this.totalCount
        ? Math.ceil(this.totalCount / perPage)
        : 0;
    },
    itemWrapperClasses() {
      switch (this.itemsPerRow) {
        case 0:
        case 1:
        default:
          return "col-12";
        case 2:
          return "col-6";
        case 3:
          return "col-4";
        case 4:
          return "col-3";
        case 5:
        case 6:
          return "col-2";
      }
    },

    _paginatedItems: {
      get() {
        const currentPage =
          this.serverParams && this.serverParams.page
            ? this.serverParams.page
            : 1;
        const perPage = parseInt(this.serverParams.perPage) || this.perPage
        const startIndex = (currentPage - 1) * perPage;
        if (!this.data) {
          return [];
        }
        return this.mode === "remote"
          ? this.data
          : this.data.slice(startIndex, startIndex + perPage);
      },
      set(d) {
        //eslint-disable-next-line
        console.warn(d);
      }
    }
  },
  watch: {
    'perRow': 'resetItemsPerRow',
    rows: 'refreshLocalData'
  },
  created() {},
  beforeMount() {},
  mounted() {
    if (this.perRow) {
      this.resetItemsPerRow();
    }
    this.refreshLocalData();
  },
  beforeDestroy() {},
  methods: {
    getAllowColumn(item) {
      let columns = {};
      Object.keys(item).forEach(key => {
        this.columns.forEach(column => {
          if (column.field === key) {
            columns = Object.assign(columns, _.pick(item, [key]))
          }
        })
      })
      return columns;
    },

    getColumn(key) {
      const column = _.filter(this.columns, ['field', key]);
      return column[0] ? column[0]: column;
    },
    resetItemsPerRow() {
      this.itemsPerRow = this.perRow;
    },

    increaseItemsPerRow(c) {
      this.itemsPerRow += c;
    },

    decreaseItemsPerRow(c) {
      this.itemsPerRow -= c;
    },

    setGridMode() {
      this.itemsPerRow = 3;
    },

    setListMode() {
      this.itemsPerRow = 1;
    },

    setMediumGridMode() {
      this.itemsPerRow = 2;
    },

    handleItemClick($event, item) {
      this.$emit("itemClicked", item);
    },

    handleItemButtonClick($event, item) {
      this.$emit("itemButtonClicked", item);
    },



    onPaginationChange(page) {
      this.serverParams.page = page;
      if (this.mode !== "remote") {
        return;
      }
      this.getItems();
    }
  }
};
</script>
<style lang="scss">
.awesome-list-component {
  .pagination {
    justify-content: center;
  }

  .awesome-list-item {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .col-12 {
    .awesome-list-item {
      .card-img-top {
        height: 100%;
        width: 30%;
      }

      .awesomelist-item-action {
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
    .awesome-list-item {
      .card-img-top {
        height: 60%;
      }

      .awesomelist-item-action {
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
.awesome-list-header {
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
</style>
