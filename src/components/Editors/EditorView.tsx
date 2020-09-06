import React, { useCallback, useMemo, useState, useEffect } from 'react'
import Prism from 'prismjs'

import isHotkey from 'is-hotkey'
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  ReactEditor,
  RenderLeafProps,
  RenderElementProps,
  useEditor,
  useSelected,
  useFocused,
} from 'slate-react'
import { Editor, Transforms, createEditor, Node, Range, Text, Point, Element as E } from 'slate'
import { withHistory } from 'slate-history'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiFillCode,
  AiOutlineBlock,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineLink,
} from 'react-icons/ai'
import { FaHeading, FaTram } from 'react-icons/fa'
import { BiHeading } from 'react-icons/bi'
import { BsImage } from 'react-icons/bs'
import { Button, Toolbar } from './components'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'
import { css } from 'emotion'

// eslint-disable-next-line
;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

interface RichTextViewerProps {
  initialValue: string
}

export const RichTextViewer = ({ initialValue }: RichTextViewerProps) => {
  const [value, setValue] = useState<Node[]>([])
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

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

//Editor for input data
interface RichTextEditor {
  onChange: (value: string) => void
  initialValue: string
  clear?: () => string
}

const RichTextEditor = ({ onChange, initialValue, clear }: RichTextEditor) => {
  const [value, setValue] = useState<Node[]>(JSON.parse(initialValue))
  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withShortcuts(withLinks(withImages(withHistory(withReact(createEditor()))))),
    []
  )

  const decorate = useCallback(([node, path]) => {
    const ranges = []

    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = (token) => {
      if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    }

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown)
    let start = 0

    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length

      if (typeof token !== 'string') {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])

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
        <BlockButton format="code" icon={<AiFillCode size={25} />} />
        <BlockButton format="heading-one" icon={<FaHeading size={25} />} />
        <BlockButton format="heading-two" icon={<BiHeading size={25} />} />
        <BlockButton format="block-quote" icon={<AiOutlineBlock size={25} />} />
        <BlockButton format="numbered-list" icon={<AiOutlineOrderedList size={25} />} />
        <BlockButton format="bulleted-list" icon={<AiOutlineUnorderedList size={25} />} />
        <InsertImageButton icon={<BsImage size={25} />} />

        <LinkButton icon={<AiOutlineLink size={25} />} />
      </Toolbar>

      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        placeholder="Type here ..."
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
//End editor input data

//Function for button toolbar
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

//End function for button toolbar

//Element render after button click
const Element = ({ attributes, children, element }: RenderElementProps) => {
  const props = { attributes, children, element }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          className="border-l-4 border-teal-500 italic my-4 pl-4 md:pl-12"
        >
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

    case 'code':
        return <CodeElement {...props} />

    case 'link':
      return (
        <a {...attributes} href={element.url.toString()}>
          {children}
        </a>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
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

export const CodeElement = ({ attributes, children, element }: RenderElementProps) => {
  const value = element.children
    .reduce((a: string[], current) => {
      return [...a, Node.string(current)]
    }, [])
    .join('/n')
  console.log('value', value, children)

  return (
    <div className="bg-gray-900 py-0 text-white font-mono text-base py-2" {...attributes}>
      <pre className="bg-gray-900 py-0 text-white font-mono text-base py-2">
        <code className="bg-gray-900 py-0 text-white font-mono text-base py-2">
          {value}
          {children}
        </code>
      </pre>
    </div>
  )
}

//End element render after button click

//Define button toolbar
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

//Width link

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' })
  return !!link
}

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' })
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const LinkButton = ({ icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      {icon}
    </Button>
  )
}

//Markdown-shortcuts

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor

  editor.insertText = (text) => {
    const { selection } = editor

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })
      const path = block ? block[1] : []
      const start = Editor.start(editor, path)
      const range = { anchor, focus: start }
      const beforeText = Editor.string(editor, range)
      const type = SHORTCUTS[beforeText]

      if (type) {
        Transforms.select(editor, range)
        Transforms.delete(editor)
        Transforms.setNodes(editor, { type }, { match: (n) => Editor.isBlock(editor, n) })

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] }
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  }

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (block.type !== 'paragraph' && Point.equals(selection.anchor, start)) {
          Transforms.setNodes(editor, { type: 'paragraph' })

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }

  return editor
}

export default RichTextEditor
