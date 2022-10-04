import _ from 'lodash';

export const segmentMixin = {
  methods: {
    getSegmentLabel(segment) {
      if (!segment) {
        return '';
      }
      let label = segment.title || segment.label;
      if (label) {
        return label;
      }
      if (typeof segment === 'string' && segment.indexOf('|') > -1) {
        return segment.split('|')[1];
      }
      return _.startCase(segment.field || segment.name || (_.isString(segment) ? segment : this.getSegmentKey(segment)));
    },

    getSegmentKey(segment) {
      if (!segment) {
        return '';
      }
      let key = segment.model || segment.field || segment.key || segment.id;
      if (key) {
        return key;
      }
      if (typeof segment === 'string' && segment.indexOf('|') > -1) {
        return segment.split('|')[0];
      }
      return segment;
    },

  },
}