<template>
  <div class="text-avoid-overflow aw-display-relation" v-bind="$props">
    <template v-if="_values && _values.length">
      <template v-for="value in _values">
        <div :key="value" :title="getLabel(value) + ' (' + value + ')'" :tooltip="value">
          <span v-if="value" class="badge badge-info pointer" @click="onClick">
            {{ getLabel(value) }}
          </span>
          <router-link
            v-if="value && !onClickUrl"
            :to="'/app/' + kebabCase(relation) + '/' + value"
            class="external-link"
          >
            &nbsp; <i class="fa fa-external-link text-info"></i>
          </router-link>

          <div v-if="value && onClickUrl && isFunction(onClickUrl)" @click="onClickUrl(value)" class="external-link">
            &nbsp; <i class="fa fa-external-link text-info"></i>
          </div>
          <router-link
            v-if="value && onClickUrl && !isFunction(onClickUrl)"
            :to="onClickUrl + '/' + value"
            class="external-link"
          >
            &nbsp; <i class="fa fa-external-link text-info"></i>
          </router-link>

          <span v-if="value" class="copy-link" @click="copy(value)">
            &nbsp; <i class="fa fa-clone text-info"></i>
          </span>
        </div>
      </template>
    </template>
    <div v-else>
      ...
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import awesomeDisplayMixin from '../../../mixins/displayMixin';
import apiErrorsMixin from '../../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import templatingMixin from '../../../mixins/templatingMixin';

export default {
  name: 'DisplayRelation',
  mixins: [awesomeDisplayMixin, apiConfigMixin, apiErrorsMixin, i18nMixin],
  computed: {
    _relationUrl() {
      return this.relationUrl || this.relation;
    },
    _relationLabel() {
      return this.relationLabel || 'label';
    },

    _label() {
      return this.storePath || this.store ? this.getStoreLabel(this.value) : this.getApiLabel(this.value);
    },

    _displayLabelCache() {
      return this.displayLabelCache || this.internalCache || {};
    },

    _values() {
      if (!this.$props.value) {
        return this.$props.value;
      }
      return Array.isArray(this.$props.value) ? this.$props.value : [this.$props.value];
    }
  },
  data() {
    return {
      internalCache: {},
      timeoutId: null
    };
  },
  methods: {
    onClick() {
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => {
          this.timeoutId = null;
        }, 200); //tolerance in ms
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.copy(this.value);
      }
    },
    kebabCase: _.kebabCase,
    isFunction: _.isFunction,
    getLabel(value) {
      return this.storePath || this.store ? this.getStoreLabel(value) : this.getApiLabel(value);
    },

    formatLabel(item, passedLabel = null) {
      let field = passedLabel || this._relationLabel;
      let label = '';
      if (field.indexOf('{{') > -1) {
        label = this.templateParser(field, item);
      } else {
        label = _.get(item, field, '');
      }

      return label;
    },

    getStoreLabel(value) {
      if (!value) {
        return;
      }

      if (this._displayLabelCache[value] && this._displayLabelCache[value] !== value) {
        return this._displayLabelCache[value];
      }

      // no store found and no storepath found
      if (!this.store && !(this.storePath && this.$store && _.get(this.$store.state, this.storePath))) {
        return;
      }

      const $store = this.store ? this.store : this.$store && _.get(this.$store.state, this.storePath);
      if (!$store) {
        return;
      }

      const item = $store && $store.find((elm) => elm[this.relationKey] === value);
      if (!item) {
        return;
      }

      const result = item[this.relationLabel] || this.templateParser(this.relationLabel, item);
      if (result) {
        this.$set(this._displayLabelCache, value, result);
      }
      return result || value;
    },

    getApiLabel(value) {
      if (!this.relationUrl && value && this.relationLabel) {
        const computedLocalValue =
          _.isObject(value) && this.relationLabel
            ? value[this.relationLabel] || this.templatingMixin(this.relationLabel, value)
            : null;
        if (computedLocalValue) {
          return computedLocalValue;
        }
      }
      const url = `${this.relationUrl}/${value}`;
      if (value && this._displayLabelCache[url] && this._displayLabelCache[url] !== value) {
        return this._displayLabelCache[url];
      }

      this.$http
        .get(url)
        .then((res) => {
          const data =
            this.apiResponseConfig && this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
              ? _.get(res, this.apiResponseConfig.dataPath)
              : res.data;
          if (res.data.totalCount) {
            this.totalCount = res.data.totalCount;
          }

          const result = `${this.formatLabel(data, this.relationLabel)}`;
          if (result) {
            this.$set(this._displayLabelCache, url, result);
          }
          return result;
        })
        .catch((err) => {
          console.warn('getApiLabel result', this.relationLabel, err.message);
          this.$set(this._displayLabelCache, url, value);
        });
      this.$set(this._displayLabelCache, url, value);
      return this._displayLabelCache[url];
    },
    copyToClipboard(str) {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },

    copy(value) {
      this.copyToClipboard(`${this.getLabel(value)}`);
      if (this.$awNotify) {
        this.$awNotify(
          this.$te('awesome-display.value-copied') ? this.$t('awesome-display.value-copied') : 'Value copied'
        );
      }
    }
  }
};
</script>

<style>
.aw-display-relation {
  position: relative;
}

.aw-display-relation .copy-link,
.aw-display-relation .external-link {
  visibility: hidden;
  opacity: 0;
  transition: all 50ms linear 100ms;
  position: absolute;
  padding-right: 50px;
  cursor: pointer;
}

.aw-display-relation:hover .external-link {
  visibility: visible;
  display: inline-block;
  opacity: 1;
  margin-left: 5px;
  margin-top: 2px;
}

.aw-display-relation:hover .copy-link {
  visibility: visible;
  opacity: 1;
  display: inline-block;
  margin-left: 25px;
  margin-top: 2px;
}

.copy-link:hover,
.external-link:hover {
  font-size: 105%;
}
</style>
