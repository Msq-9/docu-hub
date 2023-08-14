'use client';
import React, { type CSSProperties } from 'react';
import { EditorContent } from '@tiptap/react';
import TopMenuBar from '@components/RichTextEditor/ToolMenu/ToolMenuBar';
import { useEditor, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import TopNavigationContainer from '@components/TopNavigationContainer';

const Tiptap = (): JSX.Element | null => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            languageClassPrefix: 'language-',
            class: 'bg-gray-200 px-5'
          }
        },
        heading: {}
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-sky-600'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      FontFamily.configure({
        types: ['textStyle']
      }),
      TextStyle
    ],
    editorProps: {
      attributes: {
        class:
          'bg-white border border-gray-300 relative px-docPad py-docPad h-docH w-docW mx-auto'
      }
    },
    autofocus: false
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <TopNavigationContainer>
        <div className="bg-gray-100 rounded-3xl max-w-fit mx-auto py-2 px-3 mt-7 lg:py-1 lg:px-5 lg:mt-6">
          <TopMenuBar editor={editor} />
        </div>
      </TopNavigationContainer>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
