<template>
  <div class="grouped-form">
    a
    <template v-for="(group, index4) in groups">
      {{ groups }}
      <Group
        :key="index4"
        v-bind="group"
        :class="'group-' + (group.legend || index4)"
      >
        <VueFormGenerator
          :schema="getShemaForFields(group.fields)"
          :model="model"
          :options="formOptions"
          tag="div"
        />
      </Group>
    </template>
  </div>
</template>

<script>
import Group from './Group.vue';
import layoutMixin from '../../../mixins/layoutMixin';
import formLayoutMixin from '../../../mixins/formLayoutMixin';
import i18nMixin from '../../../mixins/i18nMixin';
import { uniqueId } from 'lodash';

export default {
  components: { Group },
  mixins: [i18nMixin, layoutMixin, formLayoutMixin],
  props: {
    id: { type: String, default: '' },
    groups: { type: Array },
  },
  computed: {},
  data() {
    return {
      fieldId: uniqueId(this.id + '_'),
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
