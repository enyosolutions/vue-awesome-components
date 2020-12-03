<template>
  <AwesomeBuilderModule :options="options" :uuid="_uuid" :mode="mode">
    <template v-slot:editor>
      <div class="rich-text">
        <quill-editor
          v-model="content"
          :options="editorOptions"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        />
      </div>
    </template>
  </AwesomeBuilderModule>
</template>

<script>

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import AwesomeBuilderModule from '@/components/builder/layout/AwesomeBuilderModule';
import builderModuleMixin from '@/mixins/builderModuleMixin';
import { quillEditor } from 'vue-quill-editor';

export default {
  name: 'RichText',
  mixins: [builderModuleMixin],
  components: {
    AwesomeBuilderModule,
    quillEditor
  },
  data: () => ({
    options: {
      icon: 'fa-pencil-square-o',
      title: 'Rich Text',
      description: 'Include formatted text & Images'
    },
    content: '<h2>I am Example</h2>',
    editorOptions: {

    }
  }),
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
  }
}
</script>

<style scoped lang="scss">

</style>