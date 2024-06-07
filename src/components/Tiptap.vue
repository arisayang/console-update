<template>
  <!-- TODO:要直接升級成 @tiptap/vue-3 -->
  <div>
    <div v-if="editor" class="d-flex flex-row flex-wrap mb-4">
      <div class="d-flex flex-row flex-wrap">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('bold') }" -->
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
          </template>
          <span>粗體</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
          </template>
          <span>斜體</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <!-- :class="{
              'is-active--darken': editor.isActive('underline') && $vuetify.theme.dark,
              'is-active--lighten': editor.isActive('underline') && !$vuetify.theme.dark,
            }" -->
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>
          </template>
          <span>底線</span>
        </v-tooltip>
      </div>

      <v-divider vertical class="mx-2" />

      <div class="d-flex flex-row flex-wrap">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="setLink"
            >
              <!-- :class="{ 'is-active': editor.isActive('bold') }" -->
              <v-icon>mdi-link</v-icon>
            </v-btn>
          </template>
          <span>連結</span>
        </v-tooltip>
      </div>

      <v-divider vertical class="mx-2" />

      <div class="d-flex flex-row flex-wrap">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().setTextAlign('left').run()"
            >
              <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
          </template>
          <span>靠左對齊</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().setTextAlign('center').run()"
            >
              <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
          </template>
          <span>置中對齊</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().setTextAlign('right').run()"
            >
              <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
          </template>
          <span>靠右對齊</span>
        </v-tooltip>
      </div>

      <v-divider vertical class="mx-2" />

      <div class="d-flex flex-row flex-wrap">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().setParagraph().run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('setParagraph') }" -->
              <v-icon>mdi-text</v-icon>
            </v-btn>
          </template>
          <span>段落文字</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }" -->
              <v-icon>mdi-format-header-1</v-icon>
            </v-btn>
          </template>
          <span>1 級標題</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" -->
              <v-icon>mdi-format-header-2</v-icon>
            </v-btn>
          </template>
          <span>2 級標題</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" -->
              <v-icon>mdi-format-header-3</v-icon>
            </v-btn>
          </template>
          <span>3 級標題</span>
        </v-tooltip>
      </div>

      <v-divider vertical class="mx-2" />

      <div class="d-flex flex-row flex-wrap">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleBulletList().run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('bulletList') }" -->
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </template>
          <span>項目清單</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              small
              icon
              v-bind="attrs"
              :disabled="disabled"
              v-on="on"
              @click="editor.chain().focus().toggleOrderedList().run()"
            >
              <!-- :class="{ 'is-active': editor.isActive('orderedList') }" -->
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-btn>
          </template>
          <span>編號清單</span>
        </v-tooltip>
      </div>
    </div>
    <editor-content :class="disabled ? 'text--disabled' : ''" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps, defineEmits, ref, watch, onMounted, onBeforeUnmount,
} from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

// =================
//
// define
//

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  input: (_item: string) => true,
  'is-editor-empty': (_value: boolean) => true,
});

const editor = ref<Editor>();

// =================
//
// mounted
//

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});

onMounted(() => {
  editor.value = new Editor({
    editable: !props.disabled,
    content: props.value,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    onUpdate: () => {
      emit('input', editor.value?.getHTML() ?? '');
      emit('is-editor-empty', editor.value?.isEmpty ?? false);
    },
  });
});

// =================
//
// watch
//

watch(
  () => props.value,
  (value) => {
    const isSame = editor.value?.getHTML() === value;

    if (!isSame) {
      editor.value?.commands.setContent(value, false);
    }
  },
);

// =================
//
// methods
//

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href;
  const url = window.prompt('連結網址', previousUrl);

  if (url === null) {
    return;
  }

  if (url === '') {
    editor.value
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run();

    return;
  }

  editor.value
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run();
};
</script>

<style lang="scss" scoped>
.is-active--darken {
  background-color: rgba(255, 255, 255, 0.16) !important;
}

.is-active--lighten {
  background-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
