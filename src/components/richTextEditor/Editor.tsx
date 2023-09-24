'use client';
import React, { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import TopMenuBar from '@components/richTextEditor/ToolMenu/ToolMenuBar';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import TopNavigationContainer from '@components/TopNavigationContainer';
import { Input } from 'antd';
import { Document, User } from '@schema/types';
import { useMutation, useQuery } from '@apollo/client';
import { updateRichTextDocument } from '@operations/document';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import useYSocketIOProvider from '@hooks/useYSocketIOProvider';

const RichTextEditor = ({
  documentData,
  userData
}: {
  documentData: Document;
  userData: User;
}): JSX.Element | null => {
  const [rtDocName, setRTDocName] = useState<string>(
    documentData.title as string
  );

  const [updateRTDocument] = useMutation(updateRichTextDocument);

  const [yDoc, YSocketProvider] = useYSocketIOProvider(userData, documentData);

  // Shamelessly copied from https://stackoverflow.com/a/5092846
  const randomHexColor =
    '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            languageClassPrefix: 'language-',
            class: 'bg-gray-200 px-5'
          }
        },
        heading: {},
        history: false
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
      TextStyle,
      Collaboration.configure({
        document: YSocketProvider.doc
      }),
      CollaborationCursor.configure({
        provider: YSocketProvider,
        user: {
          name: userData.email,
          color: randomHexColor
        }
      })
    ],
    editorProps: {
      attributes: {
        class:
          'bg-white border border-gray-300 relative px-docPad py-docPad h-docH w-docW mx-auto'
      }
    },
    autofocus: false,
    onUpdate: (updatedEditor) => {
      if (!yDoc) return;
      const yMap = yDoc.getMap('data');
      const editorJSON = updatedEditor.editor.getJSON();
      yMap.set('data', editorJSON);
    }
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
      <div className="mx-auto w-96 mb-5">
        <Input
          className="text-center"
          value={rtDocName}
          bordered={false}
          onChange={(evt) => {
            evt.preventDefault();
            setRTDocName(evt.target.value);
          }}
          onBlur={async (evt) => {
            evt.preventDefault();
            await updateRTDocument({
              variables: {
                documentInput: { title: evt.target.value, id: documentData.id }
              }
            });
          }}
        />
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
