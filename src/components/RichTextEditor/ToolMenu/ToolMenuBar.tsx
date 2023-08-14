import React, { useCallback, useEffect, useState } from 'react';
import { type Editor } from '@tiptap/react';

import Icon, {
  BoldOutlined,
  CodeOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  UnderlineOutlined,
  LinkOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined
} from '@ant-design/icons';

import { Divider, Button, Popover, Input } from 'antd';
import HeadingMenu from './HeadingMenu';
import FontFamily from './FontFamily';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const VerticalDivider = (): JSX.Element => {
  return (
    <Divider
      type={'vertical'}
      style={{ height: '24px' }}
      className="bg-slate-300 mx-3"
    />
  );
};

const JustifyContentSvg = () => (
  <svg
    width="15px"
    height="15px"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(90)"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />

    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      {' '}
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.14998 14V1H0.849976V14H2.14998ZM6.14998 14V1H4.84998V14H6.14998ZM10.15 1V14H8.84998V1H10.15ZM14.15 14V1H12.85V14H14.15Z"
        fill="#000000"
      />{' '}
    </g>
  </svg>
);

const JustifyContentIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={JustifyContentSvg} {...props} />
);

const AddLinkButton = ({
  editor
}: {
  editor: Editor | null;
}): JSX.Element | null => {
  const [linkUrl, setLinkUrl] = useState<string>(
    editor?.getAttributes('link').href
  );

  if (!editor) {
    return null;
  }

  // update url value whenever editor node changes
  useEffect(() => {
    setLinkUrl(editor?.getAttributes('link').href);
  }, [editor?.getAttributes('link').href]);

  const addLink = useCallback(() => {
    if (!editor) {
      return null;
    }

    // empty or null
    if (!linkUrl) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // update link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkUrl })
      .run();
  }, [editor, linkUrl]);

  const LinkContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      className="w-80"
    >
      <Input
        placeholder="Enter link URL..."
        value={linkUrl}
        onChange={(e) => {
          setLinkUrl(e.target.value);
        }}
        type="url"
      />
      <Button
        className="ml-3"
        onClick={() => {
          addLink();
        }}
      >
        {'Apply'}
      </Button>
    </div>
  );

  return (
    <>
      <Popover content={LinkContent} trigger="click">
        <Button
          shape={'circle'}
          className={editor.isActive('link') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<LinkOutlined />}
        />
      </Popover>
    </>
  );
};

const TopMenuBar = ({
  editor
}: {
  editor: Editor | null;
}): JSX.Element | null => {
  if (editor == null) {
    return null;
  }

  return (
    <div className="flex lg:flex-row flex-col">
      <div className="mb-2 lg:mb-0">
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={'mx-1'}
          icon={<UndoOutlined />}
        />
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={'mx-1'}
          icon={<RedoOutlined />}
        />

        <VerticalDivider />
        <HeadingMenu editor={editor} />

        <VerticalDivider />
        <FontFamily editor={editor} />

        <VerticalDivider />
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<BoldOutlined />}
        />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<ItalicOutlined />}
        />
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<StrikethroughOutlined />}
        />
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<UnderlineOutlined />}
        />
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-gray-300 mx-1' : 'mx-1'}
          icon={<CodeOutlined />}
        />
        <AddLinkButton editor={editor} />
        <div className="hidden lg:contents">
          <VerticalDivider />
        </div>
      </div>

      <div className="justify-center mx-auto lg:mx-0">
        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={'mx-1'}
          icon={<UnorderedListOutlined />}
        />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={'mx-1'}
          icon={<OrderedListOutlined />}
        />

        <VerticalDivider />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={'mx-1'}
          icon={<AlignLeftOutlined />}
        />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={'mx-1'}
          icon={<AlignCenterOutlined />}
        />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={'mx-1'}
          icon={<JustifyContentIcon />}
        />

        <Button
          shape={'circle'}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={'mx-1'}
          icon={<AlignRightOutlined />}
        />
      </div>
    </div>
  );
};

export default TopMenuBar;
