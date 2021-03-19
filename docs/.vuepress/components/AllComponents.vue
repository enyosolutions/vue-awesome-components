<template>
  <article class="  card card-primary">
    <template v-for="(component, index) in myComponents">
      <ul :key="index">
        <li v-if="component.name" :id="index">
          <a :href="'#all-components-' + index">{{ index }}</a>
          <template v-if="component.name !== index">
            (Alias of
            <a :href="'#all-components-' + component.name"
              ><b>{{ component.name }}</b></a
            >)
          </template>
        </li>
      </ul>
    </template>

    <template v-for="(component, index) in myComponents">
      <div
        :key="component.name + index"
        v-if="component.name"
        :id="'all-components-' + index"
        style="margin-top: 100px"
      >
        <h2>{{ index }}</h2>
        <div v-if="component.name !== index">
          Alias of
          <a :href="'#all-components-' + component.name"
            ><b>{{ component.name }}</b></a
          >
        </div>
        <div v-else style="border-left: 1px solid var(--primary,#eee); padding-left: 10px">
          <div
            v-if="component.introduction || component.description"
            v-html="marked(component.introduction || component.description)"
          ></div>
          <h3>Props</h3>
          <ComponentDoc :component="component" />
        </div>
      </div>
    </template>
  </article>
</template>
<script>
import marked from 'marked';
import ComponentDoc from './ComponentDoc';

export default {
  name: 'AllComponents',
  components: { ComponentDoc },
  props: {
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
  async mounted() {
    this.components = await import('../../../src');
    this.scrollToHash();
  },
  computed: {
    myComponents() {
      const comps = {};
      Object.entries(this.components).forEach(([key, component]) => {
        if (typeof component === 'string' || typeof component === 'object') {
          comps[key] = component;
        }
      });
      return comps;
    }
  },
  data() {
    return {
      components: []
    };
  },
  methods: {
    marked,
    scrollToHash() {
      setTimeout(() => {
        try {
          const hash = window.document.location.hash;
          const target = window.document.querySelector(hash);
          if (hash.indexOf('#comp-prop-') === 0 && target) {
            target.scrollIntoView();
          }
        } catch (err) {
          console.warn(err.message);
        }
      }, 500);
    }
  }
};
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
