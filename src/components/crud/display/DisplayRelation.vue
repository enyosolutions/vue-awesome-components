<template>
  <div class="text-avoid-overflow" v-bind="$props">
    <router-link
      :to="'/app/' + $props.relation + '/' + $props.value"
      class="ajax-table-href"
    >
      <span class="badge badge-info">
        {{
          props.column.listName
            ? getLovValue(
                props.formattedRow[props.column.field],
                props.column.listName
              )
            : getDisplayLabel($props.value)
        }}
      </span>
    </router-link>
  </div>
</template>

<script>
import _ from 'lodash';
import awesomeDisplayMixin from '../../../mixins/displayMixin';
import apiErrorsMixin from '../../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';

export default {
  name: 'DisplayUrl',
  mixins: [awesomeDisplayMixin, apiConfigMixin, apiErrorsMixin],
  props: {
    relation: String,
    relationUrl: String,
    relationLabel: String,
    relationKey: String,
  },
  computed: {
    _relationUrl() {
      return this.relationUrl || this.relation;
    },
    _relationLabel() {
      return this.relationLabel || 'label';
    },
  },
  data() {
    return {
      displayLabelCache: {},
    };
  },
  methods: {
    getDisplayLabel(value) {
      const url = `${this.relationUrl}/${value}`;
      if (!this.relationUrl || !value || !this.relationLabel) {
        return value;
      }
      if (this.relationUrl && value && this.displayLabelCache[url]) {
        return this.displayLabelCache[url];
      }
      const promise = this.$http
        .get(url)
        .then((res) => {
          const data =
            this.responseField && this.responseField != false
              ? _.get(res.data, this.responseField)
              : res.data.body;
          if (res.data.totalCount) {
            this.totalCount = res.data.totalCount;
          }
          const result = `${_.get(data, this.relationKey)} - ${_.get(
            data,
            this.relationLabel,
            ''
          )}`;

          if (result) {
            this.$set(this.displayLabelCache, url, result);
          }
          return result;
        })
        .catch(() => {
          this.$set(this.displayLabelCache, url, value);
        });
      this.$set(this.displayLabelCache, url, promise);
      return this.displayLabelCache[url];
    },
  },
};
</script>

<style></style>
