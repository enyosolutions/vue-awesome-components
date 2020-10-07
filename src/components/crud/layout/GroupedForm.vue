<template>
  <div class="row mb-4">
    <template v-for="(group, index) in groups">
      <Group :key="index" v-bind="group">
        <VueFormGenerator
          :schema="getShemaForFields(group.fields)"
          :model.sync="model"
          :options="formOptions"
          tag="div"
        />
      </Group>
    </template>
  </div>
</template>

<script>
import Group from './Group.vue';
// import Row from "./Row.vue";
import layoutMixin from '../../../mixins/layoutMixin';
import formLayoutMixin from '../../../mixins/formLayoutMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import { uniqueId } from 'lodash';

export default {
  name: 'GroupedForm',
  components: { Group },
  mixins: [i18nMixin, layoutMixin, formLayoutMixin],
  props: {
    id: { type: String, default: '' },
    groups: { type: Array, default: () => [], required: true },
    formOptions: { type: [String, Object], default: '' },
    model: { type: Object, required: true },
    schema: { type: Object, required: true }
  },
  computed: {},
  data() {
    return {
      fieldId: uniqueId(this.id + '_')
    };
  },
  methods: {}
};
</script>

<style lang="scss"></style>
