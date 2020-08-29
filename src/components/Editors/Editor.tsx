import React, { useCallback, useMemo, useState, useEffect } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, ReactEditor, RenderLeafProps, RenderElementProps, useEditor, useSelected, useFocused } from 'slate-react'
import { Editor, Transforms, createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiFillCode, AiOutlineBlock, AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai'
import { FaHeading } from 'react-icons/fa'
import { BiHeading } from 'react-icons/bi'
import { BsImage } from 'react-icons/bs'
import { Button, Toolbar } from './components'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { css } from 'emotion'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

interface RichTextViewerProps {
  initialValue: string
}

export const RichTextViewer = ({ initialValue }: RichTextViewerProps) => {
  const [value, setValue] = useState<Node[]>([])
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])

  useEffect(() => {
    if (initialValue == null) {
      return
    }
    try {
      const nodes: Node[] = JSON.parse(initialValue)
      setValue(nodes)
    } catch {
      setValue([])
    }
  }, [initialValue])
  if (value == null) {
    return <div>Loading...</div>
  }
  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable readOnly renderElement={renderElement} renderLeaf={renderLeaf} />
    </Slate>
  )
}

interface RichTextEditor {
  onChange: (value: string) => void
  initialValue: string
  clear?: () => string
}

const RichTextEditor = ({ onChange, initialValue, clear }: RichTextEditor) => {
  const [value, setValue] = useState<Node[]>(JSON.parse(initialValue))
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])

  const handleChange = (value: Node[]) => {
    setValue(value)
    if (value == null) return '[]'
    onChange(JSON.stringify(value))
  }
  useEffect(() => {
    clear && setValue(JSON.parse(clear()))
  }, [clear])

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Toolbar>
        <MarkButton format="bold" icon={<AiOutlineBold size={25} />} />
        <MarkButton format="italic" icon={<AiOutlineItalic size={25} />} />
        <MarkButton format="underline" icon={<AiOutlineUnderline size={25} />} />
        <MarkButton format="code" icon={<AiFillCode size={25} />} />

        <BlockButton format="heading-one" icon={<FaHeading size={25} />} />
        <BlockButton format="heading-two" icon={<BiHeading size={25} />} />
        <BlockButton format="block-quote" icon={<AiOutlineBlock size={25} />} />
        <BlockButton format="numbered-list" icon={<AiOutlineOrderedList size={25} />} />
        <BlockButton format="bulleted-list" icon={<AiOutlineUnorderedList size={25} />} />
        <InsertImageButton icon={<BsImage size={25} />} />
      </Toolbar>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor: ReactEditor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: ReactEditor, format: string) => {
  const iter = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })
  const [match] = Array.from(iter)

  return !!match
}

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const props = { attributes, children, element }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote {...attributes} className="border-l-4 border-teal-500 italic my-8 pl-8 md:pl-12">
          {children}
        </blockquote>
      )

    case 'bulleted-list':
      return (
        <ul {...attributes} className="list-disc">
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 {...attributes} className="text-2xl">
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 {...attributes} className="text-xl">
          {children}
        </h2>
      )
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return (
        <ol {...attributes} className="list-decimal">
          {children}
        </ol>
      )
    case 'image':
      return <ImageElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    // children = <pre><code>{children}</code></pre>;
    children = (
      <pre className="bg-gray-900 rounded text-white font-mono text-base p-2 md:p-4">
        <code className="break-words whitespace-pre-wrap">{children}</code>
      </pre>
    )
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <span>{icon}</span>
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <span>{icon}</span>
    </Button>
  )
}

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
        />
      </div>
      {children}
    </div>
  )
}

const InsertImageButton = ({ icon }) => {
  const editor = useEditor()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the image:')
        if (!url) return
        insertImage(editor, url)
      }}
    >
      {icon}
    </Button>
  )
}

const isImageUrl = (url) => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

const withImages = (editor) => {
  const { insertData, isVoid } = editor

  editor.isVoid = (element) => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')
    const { files } = data

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')

        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result
            insertImage(editor, url)
          })

          reader.readAsDataURL(file)
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertImage = (editor, url) => {
  const text = { text: '' }
  const image = { type: 'image', url, children: [text] }
  Transforms.insertNodes(editor, image)
}
export default RichTextEditor
