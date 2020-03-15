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
          <div class="dropdown">
            <button
              v-if="opts.actions && opts.actions.refresh"
              class="btn btn-simple"
              @click="getItems()"
            >
              <i :class="'fa fa-refresh' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t("awesomelist.buttons.refresh") }}
            </button>

            <button class="btn btn-simple" @click="decreaseItemsPerRow(1)">
              <i :class="'fa fa-minus' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t("awesomelist.buttons.decrease") }}
            </button>

            <button class="btn btn-simple" @click="increaseItemsPerRow(1)">
              <i :class="'fa fa-plus' + (isRefreshing ? ' fa-spin' : '')" />
              {{ $t("awesomelist.buttons.increase") }}
            </button>
            <button
              v-if="
                opts.actions && (opts.actions.export || opts.actions.import)
              "
              id="dropdownMenuButton"
              class="btn btn-secondary btn-simple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-plus" />
              {{ $t("EnyoAjaxTable.more") }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <slot name="table-top-more-actions" />
              <button
                v-if="opts.actions && opts.actions.export"
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

    <div class="ajax-table-card-body">
      <div class="list-responsive" :class="styles.listWrapperClasses" v-if="_paginatedItems">
        <div v-for="(item,index) in _paginatedItems" :key="index" :class="itemWrapperClasses">
          <slot name="list-item" :item="item">
            <div
              class="card mb-3 awesome-list-item"
              :style="{'flex-direction': itemsPerRow < 2 ? 'row' : 'column',
          'height': _itemHeight
          }"
            >
              <img
                class="card-img-top"
                v-if="fields.image"
                :src="item[fields.image]"
                :alt="item[fields.title]"
              />
              <div class="card-body">
                <h5 class="card-title" v-if="item[fields.title]">{{ item[fields.title] }}</h5>
                <p class="card-text">{{ item[fields.description] }}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
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
import Paginate from "vuejs-paginate";
import _ from "lodash";

export default {
  name: "AwesomeList",
  token: `

  `,
  components: { Paginate },
  mixins: [i18nMixin, apiErrors, apiListMixin],
  props: {
    perRow: {
      type: Number,
      default: 3
    },
    itemHeight: {
      type: [Number, String],
      default: 500
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
      })
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    defaultOptions: {
      type: Object,
      default: () => ({
        fixedHeader: false,
        maxHeight: "",
        pagination: true,
        customInlineActions: [], // {key, label, action: function(item, context{}}
        saveSearchDatas: false,
        actions: {
          noActions: false,
          search: true,
          filter: true,
          create: true,
          edit: true,
          view: true,
          delete: true,
          export: false,
          import: false,
          dateFilter: true,
          refresh: true
        }
      })
    }
  },
  data() {
    return {
      itemsPerRow: 3,
      page: 0
    };
  },
  computed: {
    _listTitle() {
      return (
        this.title ||
        (this.$te && this.$te("app.labels." + this.entity)
          ? this.$t("app.labels." + this.entity)
          : _.startCase(this.entity))
      );
    },

    _itemHeight() {
      return _.isString(this.itemHeight)
        ? this.itemHeight
        : this.itemHeight + "px";
    },

    _pageCount() {
      return this.perPage && this.totalCount
        ? Math.ceil(this.totalCount / this.perPage)
        : 10;
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
            : 0;
        const startIndex = (currentPage - 1) * this.perPage;
        if (!this.data) {
          return [];
        }
        return this.mode === "remote"
          ? this.data
          : this.data.slice(startIndex, startIndex + this.perPage);
      },
      set(d) {
        //eslint-disable-next-line
        console.warn(d);
      }
    }
  },
  watch: {},
  created() {},
  beforeMount() {},
  mounted() {
    if (this.perRow) {
      this.itemsPerRow = this.perRow;
    }
  },
  beforeDestroy() {},
  methods: {
    increaseItemsPerRow(c) {
      this.itemsPerRow += c;
    },

    decreaseItemsPerRow(c) {
      this.itemsPerRow -= c;
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
