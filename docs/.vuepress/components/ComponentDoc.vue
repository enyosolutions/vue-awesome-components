<template>
  <article v-if="merged && merged.name" class=" aw-propdoc propdoc">
    <table v-if="merged.props" class="props">
      <tr class="proprow labels header">
        <th class="propcol name required">
          name
          <span>(required)</span>
        </th>
        <th class="propcol type">
          type
        </th>
        <th class="propcol default">
          Possible values
        </th>
        <th class="propcol default">
          default
        </th>
        <th class="propcol notes">
          notes
        </th>
      </tr>
      <tr
        v-for="(propinfo, propname) in merged.props"
        :key="propname"
        class="proprow"
        :id="'comp-prop-' + propinfo.name"
      >
        <slot name="prop-row" v-bind:prop="propinfo">
          <td class="propcol name" :class="{ required: propinfo.required }">
            <a :href="'#comp-prop-' + propinfo.name" class="prop-anchor"><i class="fa fa-link"></i></a>
            <slot name="prop-col-name" v-bind:prop="propinfo">
              <span>{{ propinfo.name }}</span>
              <span v-if="propinfo.required" style="color:red; font-weight:bold">*</span>
            </slot>
          </td>
          <td class="propcol type">
            <slot name="prop-col-type" v-bind:prop="propinfo">
              {{ propinfo.type }}
            </slot>
          </td>
          <td class="propcol default">
            <slot name="prop-col-values" v-bind:prop="propinfo">
              <template v-if="propinfo.values">
                <template v-if="Array.isArray(propinfo.values)">
                  <span class="badge badge-primary" v-for="val in propinfo.values" :value="val" v-bind:key="val">{{
                    val
                  }}</span>
                </template>
                <template v-else>
                  <span>{{ propinfo.values }}</span>
                </template>
              </template>
            </slot>
          </td>
          <td class="propcol default">
            <slot name="prop-col-default" v-bind:prop="propinfo">
              <!--optionally you can output this: {{ propinfo.defaultTypeStr }} -->
              <code v-if="typesForCodeTag.includes(propinfo.defaultTypeStr)" style="white-space: pre-wrap;">{{
                propinfo.default
              }}</code>
              <span v-else>{{ propinfo.default }}</span>
            </slot>
          </td>
          <td class="propcol notes">
            <slot name="prop-col-description" v-bind:prop="propinfo">
              {{ propinfo.note || propinfo.description }}
            </slot>
          </td>
        </slot>
      </tr>
    </table>
  </article>
</template>
<script>
import marked from 'marked';
import VueAwesomeComponents from '../../../src';
export default {
  name: 'ComponentDoc',
  props: {
    component: {
      type: [Object, String],
      required: true
    },
    documentation: {
      type: Object
    },
    ignoreMixins: {
      type: Boolean,
      default: false
    },
    properties: {
      type: Array
    }
  },
  mounted() {
    setTimeout(() => {
      const hash = document.location.hash;
      const target = document.querySelector(hash);
      console.log('target', target);
      if (hash.indexOf('#comp-prop-') === 0 && target) {
        target.scrollIntoView();
      }
    }, 500);
  },
  data() {
    return {
      _component: {},
      merged: this.process(this.component, this.documentation),
      typesForCodeTag: ['array', 'object', 'function']
    };
  },
  getDoc(component, documentation, ignoreMixins) {
    return this.methods.process(component, documentation, ignoreMixins);
  },
  methods: {
    process(component, documentation, ignoreMixins) {
      //  let VueAwesomeComponents = {};
      let _component;
      if (typeof component === 'string' && VueAwesomeComponents[component]) {
        _component = VueAwesomeComponents[component];
      } else {
        _component = component;
      }

      console.log('m =>', component);
      const m = this.merge(_component, documentation);
      if (m.token) m.token = this.sanitize(m.token);
      if (m.description) m.description = marked(m.description);
      if (!(ignoreMixins || this.ignoreMixins)) {
        if (m.mixins) m.props = this.merge(this.getPropsFromMixins(m.mixins), m.props);
      }
      if (m.props) {
        m.props = this.processProps(m.props);
      }
      if (this.properties && this.properties.length) {
        Object.keys(m.props).forEach((p) => {
          if (!this.properties.includes(p)) {
            delete m.props[p];
          }
        });
      }

      return m;
    },
    sanitize(text) {
      text = text.trim();
      const match = text.match(/^[ \t]*(?=\S)/gm);
      if (!match) return text;
      const indent = Math.min.apply(
        Math,
        match.map((x) => x.length)
      );
      const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');
      return indent > 0 ? text.replace(re, '') : text;
    },
    getPropsFromMixins(mixins) {
      return mixins.reduce((map, mixin) => {
        Object.assign(map, mixin.props);
        return map;
      }, {});
    },
    processProps(props) {
      const keys = Array.isArray(props) ? props : Object.keys(props);
      return keys.reduce((map, k) => {
        const v = new Proxy(props[k] || {}, this.basicArrayProxy);
        let objInfo = {};

        objInfo = Object.assign(objInfo, {
          name: k,
          type: this.getType(v.type),
          required: v.required || false,
          values: v.values || false,
          default: this.getDefault(v.default, v.type, objInfo),
          // defaultTypeStr - this will be sets from the function which is on line above (getDefault)
          note: v.note || '',
          description: v.description || ''
        });

        map[k] = objInfo;

        return map;
      }, {});
    },
    basicArrayProxy(target, name) {
      return name in target ? target[name] : undefined;
    },
    getDefault(d, type, objInfo) {
      const typeStr = this.getType(type);
      const dTypeStr = getTypeString(d);

      if (typeof d === 'undefined') return 'undefined';

      // if default is function
      if (dTypeStr === 'function') {
        // if there are types object or array and not function
        if (['array', 'object'].some((i) => typeStr.includes(i)) && !typeStr.includes('function')) {
          // get result from function
          const dResult = d();

          objInfo.defaultTypeStr = getTypeString(dResult);
          return JSON.stringify(dResult, null, 2);
        }

        objInfo.defaultTypeStr = 'function';
        // if not array or object then just get function in text format
        return d.toString();
      }

      objInfo.defaultTypeStr = dTypeStr;
      // for all other types
      return JSON.stringify(d);
    },
    // works for all types
    getType(t) {
      // for null and undefined
      if (t == undefined) return 'any';

      if (getTypeString(t) === 'function') {
        return getTypeString(t());
      }
      if (Array.isArray(t)) {
        return t.map(this.getType).join('|');
      }

      return getTypeString(t);
    },
    merge(a, b) {
      return Object.assign({}, a, b);
    },
    hasMixins(component) {
      return typeof component.mixins !== 'undefined';
    }
  }
};

function getTypeString(variable) {
  return Object.prototype.toString
    .call(variable)
    .slice(8, -1)
    .toLowerCase();
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

.badge {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: #fff;
  background: var(--primary, #fe4d17);
}

.badge.primary {
  background: var(--primary, #fe4d17);
}
.badge.warning {
  background: var(--primary, #fe4d17);
}
pre {
  line-height: 1.4;
  padding: 0.25rem 0.5rem;
  margin: 0.85rem 0;
  background-color: #282c34;
  border-radius: 6px;
  color: #fff;
  overflow: auto;
}

.theme-default-content code {
  background-color: #2c3e50;
  color: #eee;
  border-radius: 2px;
  overflow: auto;
  margin-bottom: 1px;
}

.theme-default-content .aw-propdoc code {
  display: block;
}

.proprow,
.propcol {
  position: relative;
}
.prop-anchor {
  position: absolute;
  left: 0px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms linear;
}
.proprow:hover .prop-anchor {
  visibility: visible;
  opacity: 1;
}
</style>
