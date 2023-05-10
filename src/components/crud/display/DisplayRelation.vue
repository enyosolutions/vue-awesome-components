<template>
  <div class="text-avoid-overflow aw-display-relation" v-bind="$props">
    <template v-if="_values && _values.length">
      <template v-for="value in _values">
        <div :key="getKey(value)" :title="getLabel(value) + ' (' + value + ')'" :tooltip="value">
          <span
            v-if="value"
            class="badge badge-info pointer"
            @click.prevent.stop="onClick"
            :class="_relationIsClickable ? 'pointer' : ''"
          >
            {{ getLabel(value) }}
          </span>
          <template v-if="displayActions">
            <span v-if="value" class="copy-link" @click="copy(value)">
              &nbsp;<i class="fa fa-clone text-info"></i>
            </span>
            <a
              v-if="value && !onClickUrl"
              :href="'/app/' + kebabCase(relation) + '/' + getKey(value)"
              target="_blank"
              class="external-link"
            >
              &nbsp;<i class="fa fa-external-link text-info"></i>
            </a>

            <div v-if="value && onClickUrl && isFunction(onClickUrl)" @click="onClickUrl(value)" class="external-link">
              &nbsp;<i class="fa fa-external-link text-info"></i>
            </div>
            <a
              v-if="value && onClickUrl && !isFunction(onClickUrl)"
              :href="_parsedClickUrl"
              class="external-link"
              target="_blank"
            >
              &nbsp;<i class="fa fa-external-link text-info"></i>
            </a>
          </template>
        </div>
      </template>
    </template>
    <div v-else>...</div>
  </div>
</template>

<script>
import { get, kebabCase, isFunction, isObject } from 'lodash';

import awesomeDisplayMixin from '../../../mixins/displayMixin';
import apiErrorsMixin from '../../../mixins/apiErrorsMixin';
import apiConfigMixin from '../../../mixins/apiConfigMixin';
import i18nMixin from '../../../mixins/i18nMixin';

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

    _relationKey() {
      return this.relationKey || this.primaryKeyField || this.primaryKey || 'id';
    },

    _label() {
      return this.storePath || this.store ? this.getStoreLabel(this.value) : this.getApiLabel(this.value);
    },

    _displayLabelCache() {
      return (
        this.displayLabelCache ||
        (this.awComponentsConfig && this.awComponentsConfig.displayLabelsCache) ||
        this.internalCache ||
        {}
      );
    },

    _values() {
      if (!this.$props.value) {
        return this.$props.value;
      }
      return Array.isArray(this.$props.value) ? this.$props.value : [this.$props.value];
    },

    _relationIsClickable() {
      return (
        this.isClickable ||
        (this.isClickable === undefined && this.awComponentsConfig && this.awComponentsConfig.relationsAreClickable)
      );
    },

    _parsedClickUrl() {
      return this.parseUrl(this.onClickUrl, {
        [this.relationKey || this.primaryKeyField || this.primaryKey || 'id']: this.value,
        [this.field]: this.value
      });
    }
  },
  mounted() {
    if (this.relationUrl && this.value) {
      this.$awEventBus &&
        this.$awEventBus.$on(`displayRelation-${this.relationUrl}-${this.value}`, this.updateComponent);
    }
  },
  beforeDestroy() {
    this.$awEventBus &&
      this.$awEventBus.$off(`displayRelation-${this.relationUrl}-${this.value}`, this.updateComponent);
  },
  watch: {
    relationUrl(newValue) {}
  },
  data() {
    return {
      internalCache: {},
      timeoutId: null
    };
  },
  methods: {
    onClick() {
      if (!this._relationIsClickable) {
        return;
      }
      this.goToRelation(this.value);
      // @deprecate
      // double click system
      // if (!this.timeoutId) {
      //   this.goToRelation(this.value);
      //   this.timeoutId = setTimeout(() => {
      //     this.timeoutId = null;
      //   }, 200); //tolerance in ms
      // } else {
      //   clearTimeout(this.timeoutId);
      //   this.timeoutId = null;
      //   this.goToRelation(this.value);
      // }
    },
    kebabCase: kebabCase,
    isFunction: isFunction,
    getLabel(value) {
      if (typeof value === 'object') {
        return this.formatLabel(value);
      }
      return this.storePath || this.store ? this.getStoreLabel(value) : this.getApiLabel(value);
    },
    getKey(value) {
      return typeof value === 'object' ? value[this._relationKey] : value;
    },

    goToRelation(value) {
      if (value && this.onClickUrl) {
        if (isFunction(this.onClickUrl)) {
          return this.onClickUrl(value);
        }
        return this.$router.push(this._parsedClickUrl);
      } else if (value) {
        this.$router.push('/app/' + this.kebabCase(this.relation) + '/' + this.getKey(value));
      }
      return;
    },

    formatLabel(item, passedLabel = null) {
      let field = passedLabel || this._relationLabel;
      let label = '';
      if (field.indexOf('{{') > -1) {
        label = this.templateParser(field, item);
      } else {
        label = get(item, field, '');
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
      if (!this.store && !(this.storePath && this.$store && get(this.$store.state, this.storePath))) {
        return;
      }

      const $store = this.store ? this.store : this.$store && get(this.$store.state, this.storePath);
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
          isObject(value) && this.relationLabel
            ? value[this.relationLabel] || this.templatingMixin(this.relationLabel, value)
            : null;
        if (computedLocalValue) {
          return computedLocalValue;
        }
      }
      if (!this.relationUrl) {
        return value;
      }
      const [path, params] = this.relationUrl.split('?');
      const url = `${path}/${value}?${params || ''}`;
      //  && this._displayLabelCache[url] !== value
      if (value && this._displayLabelCache[url]) {
        return this._displayLabelCache[url];
      }
      // console.log('getApiLabel', url);
      this.$set(this._displayLabelCache, url, value);
      this.$awApi
        .get(url)
        .then((res) => {
          const data =
            this.apiResponseConfig && this.apiResponseConfig.dataPath && this.apiResponseConfig.dataPath != false
              ? get(res, this.apiResponseConfig.dataPath)
              : res.data;
          if (res.data.totalCount) {
            this.totalCount = res.data.totalCount;
          }

          const result = `${this.formatLabel(data, this.relationLabel)}`;
          if (result) {
            this.$set(this._displayLabelCache, url, result);
          } else {
            this.$set(this._displayLabelCache, url, value);
          }
          this.$awEventBus && this.$awEventBus.$emit(`displayRelation-${this.relationUrl}-${this.value}`);
          this.$forceUpdate();
          return result;
        })
        .catch((err) => {
          console.warn('getApiLabel result [', this.relationUrl.length, ']', url, this.relationLabel, err.message);
          this.$set(this._displayLabelCache, url, value);
        });

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
    },

    updateComponent() {
      this.$forceUpdate();
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
  padding: 0;
  padding-right: 50px;
  cursor: pointer;
}

.aw-display-relation:hover .external-link {
  visibility: visible;
  display: inline-block;
  opacity: 1;
  margin-left: 2px;
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
