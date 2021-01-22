<template>
  <div class="aw-table-segments bg-white">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a
          class="nav-link"
          href="#"
          :class="!selectedSegment || selectedSegment === '' || selectedSegment === 'ALL' ? 'active' : ''"
          @click="onClickOnSegment('ALL')"
          >{{ $t('AwesomeDefault.messages.all') }}</a
        >
      </li>
      <li class="nav-item" v-for="(segment, idx) in _segments" :key="idx">
        <a
          @click="onClickOnSegment(segment)"
          class="nav-link"
          :class="getSegmentKey(segment) === selectedSegment ? 'active' : ''"
          href="#"
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

export default {
  name: 'AwesomeSegments',
  components: {},
  mixins: [uuidMixin, i18nMixin, awEmitMixin],
  props: {
    field: {
      type: [Object, String],
      default: () => null
    },

    title: { type: String, default: '' },
    name: { type: String, default: '' },
    namePlural: { type: String, default: '' },

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
      selectedSegment: 'ALL'
    };
  },
  computed: {
    _segments() {
      return (
        this.field &&
        ((this.field.fieldOptions && this.field.fieldOptions.filterDropdownItems) ||
          this.field.enum ||
          this.field.fieldOptions.values ||
          this.field.fieldOptions.options)
      );
    }
  },
  watch: {},
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
  mounted() {},
  beforeDestroy() {},

  methods: {
    getSegmentLabel(segment) {
      let label = segment.title || segment.label;
      if (label) {
        return label;
      }
      if (typeof segment === 'string' && segment.indexOf('|') > -1) {
        return segment.split('|')[1];
      }
      return _.startCase(segment.field || segment.name || segment);
    },

    getSegmentKey(segment) {
      let key = segment.model || segment.field || segment.key || segment.id;
      if (key) {
        return key;
      }
      if (typeof segment === 'string' && segment.indexOf('|') > -1) {
        return segment.split('|')[0];
      }
      return segment;
    },

    onClickOnSegment(segment) {
      this.selectedSegment = this.getSegmentKey(segment);
      this.$emit('aw-segment-changed', this.selectedSegment, segment);
      this.$emit('change', {
        segmentField: this.field.field || this.field.model,
        segmentValue: this.getSegmentKey(segment)
      });
    }
  }
};
</script>
<style lang="scss"></style>
