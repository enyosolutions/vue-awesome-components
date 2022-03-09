<template>
  <div class="aw-table-segments bg-white">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href="javascript:void(0)"
          :class="!selectedSegment || selectedSegment === '' || selectedSegment === 'ALL' ? 'active' : ''"
          @click="onClickOnSegment('ALL')"
          >{{ $t('AwesomeDefault.messages.all') }}</a
        >
      </li>
      <li class="nav-item" v-for="(segment, idx) in _segmentsList" :key="idx">
        <a
          @click="onClickOnSegment(segment)"
          class="nav-link"
          :class="getSegmentKey(segment) === selectedSegment ? 'active' : ''"
          href="javascript:void(0)"
          >{{ getSegmentLabel(segment) }}</a
        >
      </li>

      <!-- <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li> -->
    </ul>
  </div>
</template>
<script>
import _ from 'lodash';

import i18nMixin from '../../../mixins/i18nMixin';
import awEmitMixin from '../../../mixins/awEmitMixin';
import uuidMixin from '../../../mixins/uuidMixin';
import templatingMixin from '../../../mixins/templatingMixin';
import { segmentMixin } from '../../../mixins/';

export default {
  name: 'AwesomeSegments',
  components: {},
  mixins: [uuidMixin, i18nMixin, awEmitMixin, templatingMixin, segmentMixin],
  props: {
    field: {
      type: [Object, String],
      default: () => null
    },

    title: { type: [String, Boolean], default: '' },
    name: { type: String, default: '' },
    namePlural: { type: String, default: '' },

    apiResponseConfig: {
      type: Object,
      note: 'This object define the configuration for processing data coming from the api : count, data path'
    },

    translations: {
      type: Object,
      default: () => ({
        'AwesomeTable.buttons.filters': 'Filter',
        'AwesomeTable.buttons.refresh': 'Refresh',
        'AwesomeTable.buttons.excel-currentpage': 'Export current page',
        'AwesomeTable.searchInput': 'AwesomeTable.searchInput',
        'AwesomeTable.next': 'Next',
        'AwesomeTable.prev': 'Previous',
        'AwesomeTable.rows_per_page': 'Rows per page',
        'AwesomeTable.of': 'of',
        'AwesomeTable.page': 'page',
        'AwesomeTable.all': 'all',
        'AwesomeTable.empty': 'empty'
      })
    },
    needsRefresh: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    },
    collapsible: {
      default: true,
      type: Boolean,
      description: 'Wether the table can be collapsed using the minus button at the topRight corner.'
    }
  },
  data() {
    return {
      totalCount: 0,
      isRefreshing: false,
      selectedSegment: 'ALL',
      segmentOptions: []
    };
  },
  computed: {
    _segmentsList() {
      const configSegments =
        _.get(this.field, 'fieldOptions.filterDropdownItems') ||
        _.get(this.field, 'enum') ||
        _.get(this.field, 'fieldOptions.values') ||
        _.get(this.field, 'fieldOptions.option');
      if (configSegments && configSegments.length) {
        return configSegments;
      }
      return this.segmentOptions;
    },
    dataUrl() {
      // eslint-disable-next-line
      let url = this.url || this.field.relationUrl;
      if (url && url.indexOf('{{') > -1) {
        url = this.templateParser(url, { ...this.$props.model, currentItem: this.$props.model, context: this });
      }
      return url || '';
    }
  },
  watch: {
    _segmentsList() {
      this.$emit('segment-list-changed', this._segmentsList);
    }
  },
  created() {
    if (!this.$t) {
      this.$t = (str) => {
        /*
        if (!window.trans) {
          window.trans = {}
        }
        window.trans[str]= str;
        */

        return this.translations[str] || str;
      };
      this.$te = (str) => !!this.translations[str];
    }
  },
  beforeMount() {},
  mounted() {
    if (this.field && this.field.relation) {
      this.preloadFn();
    }
  },
  beforeDestroy() {},

  methods: {
    onClickOnSegment(segment) {
      if (!segment) {
        return '';
      }
      this.selectedSegment = this.getSegmentKey(segment);
      this.$emit('aw-segment-changed', this.selectedSegment, segment);
      this.$emit('change', {
        segmentField: this.field.field || this.field.model,
        segmentValue: this.getSegmentKey(segment)
      });
    },

    preloadFn() {
      if (!this.dataUrl) {
        return;
      }
      this.$http
        .get(`${this.dataUrl}${this.dataUrl.indexOf('?') === -1 ? '?' : '&'}$perPage=100'`, {
          params: { ..._.get(this.field, 'fieldOptions.queryParams') }
        })
        .then((res) => {
          this.segmentOptions = this.getData(res);
        })
        .finally(() => {
          this.isDataReady = true;
        });
    },

    getData(res) {
      const data =
        this.apiResponseConfig && this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
          ? _.get(res, this.apiResponseConfig.dataPath)
          : res.data;
      if (Array.isArray(data)) {
        return data.map((item) => {
          return this.field.relationKey
            ? {
                label: item[this.field.relationLabel],
                id: item[this.field.relationKey]
              }
            : item;
        });
      }
    }
  }
};
</script>
<style lang="scss"></style>
