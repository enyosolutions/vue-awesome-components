import Vue from 'vue';

const requireComponent = require.context('.', true, /\.vue$/);

const modules = [];

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  let componentName = fileName.replace(/(\.\/|\.vue)/g, '');
  componentName = componentName.split('/');
  componentName = componentName[componentName.length - 1];
  modules.push({
    name: componentName
  });

  Vue.component(componentName, componentConfig.default || componentConfig);
});

export default modules;