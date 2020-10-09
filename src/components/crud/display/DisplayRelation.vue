<template>
  <div class="text-avoid-overflow awesome-display-relation" v-bind="$props">
    <template v-for="value in _values">
      <div :key="value">
        <span v-if="value" class="badge badge-info">
          {{ getLabel(value) }}
        </span>
        <router-link v-if="value && !onClickUrl" :to="'/app/' + relation + '/' + value" class="external-link">
          &nbsp; <i class="fa fa-external-link text-info"></i>
        </router-link>

        <router-link v-if="value && onClickUrl" :to="onClickUrl + '/' + value" class="external-link">
          &nbsp; <i class="fa fa-external-link text-info"></i>
        </router-link>

        <span v-if="value" class="copy-link" @click="copy(value)"> &nbsp; <i class="fa fa-clone text-info"></i> </span>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash';
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

    _label() {
      return this.storePath || this.store ? this.getStoreLabel(this.value) : this.getApiLabel(this.value);
    },

    _displayLabelCache() {
      return this.displayLabelCache || this.internalCache || {};
    },

    _values() {
      return Array.isArray(this.$props.value) ? this.$props.value : [this.$props.value];
    }
  },
  data() {
    return {
      internalCache: {}
    };
  },
  methods: {
    getLabel(value) {
      return this.storePath || this.store ? this.getStoreLabel(value) : this.getApiLabel(value);
    },

    getStoreLabel(value) {
      if (!value) {
        return;
      }

      if (this._displayLabelCache[value]) {
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
      console.warn('$store', item, $store, this.relationKey);
      if (!item) {
        return;
      }

      const result = item[this.relationLabel];
      if (result) {
        this.$set(this._displayLabelCache, value, result);
      }
      return result;
    },

    getApiLabel(value) {
      if (!this.relationUrl || !value || !this.relationLabel) {
        return _.isObject(value) && this.relationLabel && value[this.relationLabel] ? value[this.relationLabel] : value;
      }
      const url = `${this.relationUrl}/${value}`;
      if (value && this._displayLabelCache[url]) {
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
          const result = `${_.get(data, this.relationKey)} - ${_.get(data, this.relationLabel, '')}`;
          if (result) {
            this.$set(this._displayLabelCache, url, result);
          }
          return result;
        })
        .catch(() => {
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
      if (this.$notify) {
        this.$notify(
          this.$te('awesome-display.value-copied') ? this.$t('awesome-display.value-copied') : 'Value copied'
        );
      }
    }
  }
};
</script>

<style>
.awesome-display-relation {
  position: relative;
}

.awesome-display-relation .copy-link,
.awesome-display-relation .external-link {
  visibility: hidden;
  opacity: 0;
  transition: all 50ms linear 100ms;
  position: absolute;
  padding-right: 50px;
  cursor: pointer;
}

.awesome-display-relation:hover .external-link {
  visibility: visible;
  display: inline-block;
  opacity: 1;
  margin-left: 5px;
  margin-top: 2px;
}

.awesome-display-relation:hover .copy-link {
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
