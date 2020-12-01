import Vue from 'vue';

const requireComponent = require.context('.', false, /\.vue$/);

const modules = [];

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.replace(/(\.\/|\.vue)/g, '');
  modules.push(componentName);

  Vue.component(componentName, componentConfig.default || componentConfig);
});

export default modules;