<template>
  <article v-if="merged" class="propdoc aw-auto-props">
    <div>
      <slot v-bind:userProps="mergedProps">
        <div :is="component" v-bind="mergedProps" />
      </slot>
    </div>
    <section
      v-if="merged.props"
      class="props prop-section-docked"
      :class="{
        'prop-section-folded': foldedComputed
      }"
    >
      <table :is="dockedComputed && !debug ? 'div' : 'table'">
        <thead>
          <tr :is="rowDisplayMode" class="proprow props-header">
            <div class="component-name" v-if="dockedComputed" @click="isFolded = !foldedComputed">
              {{ merged.name }} <i class="fa" :class="foldedComputed ? 'fa-plus' : 'fa-times'"></i>
            </div>
            <td :is="colDisplayMode" class="propcol name">
              Name
            </td>
            <td :is="colDisplayMode" class="propcol default">
              Config
            </td>
            <td :is="colDisplayMode" class="propcol default" v-if="debug">
              Type
            </td>

            <td :is="colDisplayMode" class="propcol default" v-if="debug">
              Value
            </td>
            <td :is="colDisplayMode" class="propcol notes" v-if="debug">
              notes
            </td>
          </tr>
        </thead>
        <tbody v-if="!foldedComputed">
          <template v-for="(propinfo, propname) in merged.props">
            <tr v-if="skipProps.indexOf(propname) === -1" :key="propname" class="proprow" :is="rowDisplayMode">
              <td :is="colDisplayMode" class="propcol name" :class="{ required: propinfo.required }">
                <span>{{ propname }}</span>
              </td>

              <td :is="dockedComputed && !debug ? 'div' : 'tr'" class="propcol default">
                <!--optionally you can output this: {{ propinfo.defaultTypeStr }} -->
                <template v-if="propinfo.type === 'string'">
                  <template v-if="propinfo.values && Array.isArray(propinfo.values)">
                    <select v-model="inputedProps[propname]">
                      <option v-for="val in propinfo.values" :value="val" v-bind:key="val">{{ val }}</option>
                    </select>
                  </template>
                  <template v-if="!propinfo.values">
                    <input
                      type="text"
                      class="form-control input-xs"
                      v-model="inputedProps[propname]"
                      @input="updateModel"
                    />
                  </template>
                </template>
                <template v-else-if="propinfo.type === 'object' || propinfo.type === 'array'">
                  <textarea
                    rows="10"
                    type="text"
                    class="form-control input-xs"
                    :value="JSON.stringify(mergedProps[propname], null, 2)"
                    @input="($event) => setProp($event, propname, mergedProps[propname])"
                  />
                </template>
                <template v-else-if="propinfo.type == 'boolean'">
                  <input
                    type="checkbox"
                    value="1"
                    class="form-control"
                    v-model="inputedProps[propname]"
                    @input="updateModel"
                  />
                </template>
                <template v-else-if="propinfo.type == 'number'">
                  <input
                    type="number"
                    class="form-control input-xs"
                    v-model="inputedProps[propname]"
                    @change="updateModel"
                  />
                </template>
                <template v-else>
                  <input
                    type="text"
                    class="form-control input-xs"
                    v-model="inputedProps[propname]"
                    @input="updateModel"
                  />
                </template>
              </td>
              <td :is="rowDisplayMode" class="propcol type" v-if="debug">
                {{ propinfo.type }}
                {{ propinfo.defaultTypeStr }}
              </td>
              <td :is="rowDisplayMode" class="propcol value" v-if="debug">
                default:
                <pre>{{ defaultProps[propname] }}</pre>
                <br />
                inputed:
                <pre>{{ inputedProps[propname] }}</pre>
                <br />
                merged:
                <pre>{{ mergedProps[propname] }}</pre>
                <br />
              </td>
              <td :is="colDisplayMode" class="propcol notes" v-if="debug">
                {{ propinfo.note }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>
  </article>
</template>
<script>
export default {
  name: 'AutoProps',
  model: {
    prop: 'componentProps',
    event: 'input'
  },
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

    skipProps: {
      type: Array,
      default: () => []
    },
    docked: {
      type: Boolean,
      default: true
    },
    folded: {
      type: Boolean,
      default: false
    },
    componentProps: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },

  data() {
    return {
      merged: this.process(this.component, this.documentation),
      typesForCodeTag: ['array', 'object', 'function'],
      defaultProps: {},
      inputedProps: {},
      debug: false,
      isDocked: undefined,
      isFolded: undefined
    };
  },
  mounted() {
    if (this.merged.props) {
      this.defaultProps = this.getDefaultProps();
      this.inputedProps = Object.assign({}, this.defaultProps, this.componentProps);
      this.updateModel();
    }
    if (this.dockedComputed) {
      document.body.classList.add('docked-auto-props');
    }
  },
  getDoc(component, documentation, ignoreMixins) {
    return this.methods.process(component, documentation, ignoreMixins);
  },
  beforeDestroy() {
    document.body.classList.remove('docked-auto-props');
  },
  watch: {
    dockedComputed() {
      if (this.dockedComputed) {
        document.body.classList.add('docked-auto-props');
      } else {
        document.body.classList.remove('docked-auto-props');
      }
    }
  },
  computed: {
    mergedProps() {
      try {
        return Object.assign({}, this.defaultProps, this.componentProps, this.inputedProps);
      } catch (err) {
        console.warn('[mergedProps] erroror while merging', err);
        return {};
      }
    },
    rowDisplayMode() {
      return this.docked && !this.debug ? 'div' : 'tr';
    },

    colDisplayMode() {
      return this.docked && !this.debug ? 'div' : 'td';
    },
    dockedComputed() {
      return this.isDocked !== undefined && this.isDocked !== null ? this.isDocked : this.docked;
    },
    foldedComputed() {
      return this.isFolded !== undefined && this.isFolded !== null ? this.isFolded : this.folded;
    }
  },
  methods: {
    getDefaultProps() {
      const defaultProps = {};
      Object.keys(this.merged.props).forEach((propName) => {
        const propInfo = this.merged.props[propName];
        if (!this.componentProps[propName] && propInfo.default && propInfo.default !== 'undefined') {
          let propDefault = propInfo.default;
          if (['function'].indexOf(propInfo.type) === -1 && typeof propDefault === 'function') {
            propDefault = propDefault();
          }
          try {
            propDefault = JSON.parse(propDefault);
          } catch (err) {
            console.warn('[getDefaultProps] try catch error', propName, propDefault, propInfo.type, err.message, err);
          }
          defaultProps[propName] = propDefault;
        }
        return;
      });
      return defaultProps;
    },
    process(component, documentation, ignoreMixins) {
      const m = this.merge(component, documentation);
      if (!(ignoreMixins || this.ignoreMixins)) {
        if (m.mixins) m.props = this.merge(this.getPropsFromMixins(m.mixins), m.props);
      }
      if (m.props) m.props = this.processProps(m.props);
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
          type: this.getType(v.type),
          required: v.required || false,
          values: v.values,
          default: this.getDefault(v.default, v.type, objInfo),
          // defaultTypeStr - this will be sets from the function which is on line above (getDefault)
          note: v.note || ''
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
    },
    updateModel() {
      this.$emit('input', this.mergedProps);
    },

    setProp(event, prop, value) {
      this.$set(this.inputedProps, prop, value);
      if (event.target.nodeName === 'TEXTAREA') {
        this.$set(this.inputedProps, prop, JSON.parse(event.target.value));
      }
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

<style lang="scss" scoped>
.props {
  .proprow:nth-child(even) {
    background-color: transparentize(#2b3b43, 0.95);
  }
  .proprow {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 0.5rem;
  }
  .labels {
    padding: 0.8rem;
    > .propcol {
      font-size: 0.5rem;
      font-weight: 400;
      text-transform: uppercase;
      color: #547484;
    }
    .name span {
      margin-left: 0.4rem;
    }
  }
  .propcol {
    font-size: 0.8rem;
    flex: 1;
    &.notes {
      flex: 2;
    }
  }
  .name {
    font-weight: 600;
    &.required span {
      border-bottom: 0.2rem solid transparentize(#ce7780, 0.5);
    }
  }
}
.propcol * {
  display: inline;
}
.propdoc {
  margin-bottom: 12rem;
}

.use,
.props {
  margin: 1.8rem 0;
}
.token pre {
  margin: 0;
}
.use {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.8rem;
}

.input-xs {
  height: 22px;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 1.5; /* If Placeholder of the input is moved up, rem/modify this. */
  border-radius: 3px;
}
.propdoc table {
  width: 100%;
}

.prop-section-docked {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 30vw;
  overflow: auto;
  padding: 60px 10px 50px 10px;
  background: #fff;
  z-index: 10;
  box-shadow: -1px 0px 2px #999;
  margin: 0;
}

.prop-section-docked.prop-section-folded {
  position: fixed;
  right: 0;
  top: auto;
  height: auto;
  width: 30vw;
  overflow: auto;
  padding: 60px 10px 50px 10px;
  background: #fff;
  z-index: 10;
  box-shadow: -1px 0px 2px #999;
  margin: 0;
}

.docked-auto-props {
  margin-right: 30vw;
}

.prop-section-docked .props-header {
  position: fixed;
  top: 0;
  right: 0;
  padding: 4px 15px;
  background: white;
  width: 30vw;
  border-bottom: 3px solid #eee;
  height: 50px;
}

.prop-section-docked .props-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 4px 15px;
  background: white;
  width: 30vw;
  border-top: 1px solid #eee;
  height: 50px;
}

.prop-section-docked .component-name {
  display: block;
  position: absolute;
  top: 0;
  background: #eee;
  padding: 2px 5px;
  left: 0;
  font-size: 10px;
  color: darkblue;
  font-weight: bold;
}

.fieldset {
  border: 2px solid wheat;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}
</style>
