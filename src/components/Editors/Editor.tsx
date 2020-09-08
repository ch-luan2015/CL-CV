import React, { useCallback, useMemo, useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-tsx'

import isHotkey from 'is-hotkey'
import '../../assets/prism/prism.css'
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'

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
import { Text, Editor, Transforms, createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import { Icon, IconName} from '@blueprintjs/core'
import { Button, Toolbar } from './components'
import { css } from 'emotion'

const HOTKEYS: { [id: string]: string } = {
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
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])
  const renderElement = useCallback((props) =><Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, [])
  const [language, setLanguage] = useState('tsx')

  // decorate function depends on the language selected
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []
      if (!Text.isText(node)) {
        return ranges
      }
      const tokens = Prism.tokenize(node.text, Prism.languages[language])
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
    },
    [language]
  )

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
      <Editable
        decorate={decorate}
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
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
  const renderLeaf = useCallback((props) => <Leaf {...props}/>, [])
  const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), [])
  const [language, setLanguage] = useState('tsx')

  // decorate function depends on the language selected
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []
      if (!Text.isText(node)) {
        return ranges
      }
      const tokens = Prism.tokenize(node.text, Prism.languages[language])
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
    },
    [language]
  )

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
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="header-one" />
        <BlockButton format="heading-two" icon="header-two" />
        <BlockButton format="block-quote" icon="citation" />
        <BlockButton format="numbered-list" icon="numbered-list" />
        <BlockButton format="bulleted-list" icon="properties" />
        <InsertImageButton icon="media"/>
        <select
          value={language}
          style={{ float: 'right' }}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="js">JavaScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="tsx">Tsx</option>
          <option value="jsx">Jsx</option>
        </select>
      </Toolbar>


      <Editable
        decorate={decorate}
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

const withImages = editor => {
  const { insertData, isVoid } = editor

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.insertData = data => {
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


const getLength = (token) => {
  if (typeof token === 'string') {
    return token.length
  } else if (typeof token.content === 'string') {
    return token.content.length
  } else {
    return token.content.reduce((l, t) => l + getLength(t), 0)
  }
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

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt="image element"
          src={element.url}
          className={
            css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? "0 0 0 3px #B4D5FF" : "none"}
          `}
        />
      </div>
      {children}
    </div>
  )
}

const InsertImageButton = ({icon}) => {
  const editor = useEditor()
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:')
        if (!url) return
        insertImage(editor, url)
      }}
    >
       <Icon icon={icon} />
    </Button>
  )
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

const Element = ({ attributes, children, element }: RenderElementProps) => {
  var props={ attributes, children, element };
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
        return <ImageElement { ...props } />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
     return   <span
          {...attributes}
          
          className={css`
            font-family: monospace;
            background: hsl(204, 45%, 98%);
            ${leaf.comment &&
            css`
              color: slategray;
            `}
            ${(leaf.operator || leaf.url) &&
            css`
              color: #9a6e3a;
            `}
        ${leaf.keyword &&
            css`
              color: #07a;
            `}
        ${(leaf.variable || leaf.regex) &&
            css`
              color: #e90;
            `}
        ${(leaf.number ||
              leaf.boolean ||
              leaf.tag ||
              leaf.constant ||
              leaf.symbol ||
              leaf.attr ||
              leaf.selector) &&
            css`
              color: #905;
            `}
        ${leaf.punctuation &&
            css`
              color: #999;
            `}
        ${(leaf.string || leaf.char) &&
            css`
              color: #690;
            `}
        ${(leaf.function || leaf.class) &&
            css`
              color: #dd4a68;
            `}
          `}
        >
          {children}
        </span>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

interface ToolbarButtonProps {
  format: string
  icon: IconName
}

const BlockButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon} />
    </Button>
  )
}

const MarkButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon icon={icon} />
    </Button>
  )
}

// modifications and additions to prism library

Prism.languages.javascript = Prism.languages.extend('javascript', {})
Prism.languages.insertBefore('javascript', 'prolog', {
  comment: { pattern: /\/\/[^\n]*/, alias: 'comment' },
})
Prism.languages.html = Prism.languages.extend('html', {})
Prism.languages.insertBefore('html', 'prolog', {
  comment: { pattern: /<!--[^\n]*-->/, alias: 'comment' },
})
Prism.languages.markdown = Prism.languages.extend('markup', {})
Prism.languages.insertBefore('markdown', 'prolog', {
  blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: 'keyword' },
    { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' },
  ],
  title: [
    {
      pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/,
      alias: 'important',
      inside: { punctuation: /==+$|--+$/ },
    },
    {
      pattern: /(^\s*)#+.+/m,
      lookbehind: !0,
      alias: 'important',
      inside: { punctuation: /^#+|#+$/ },
    },
  ],
  hr: {
    pattern: /(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  list: {
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: !0,
    alias: 'punctuation',
  },
  'url-reference': {
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
      string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[\[\]!:]|[<>]/,
    },
    alias: 'url',
  },
  bold: {
    pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
})
Prism.languages.markdown.bold.inside.url = Prism.util.clone(Prism.languages.markdown.url)
Prism.languages.markdown.italic.inside.url = Prism.util.clone(Prism.languages.markdown.url)
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(Prism.languages.markdown.italic)
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

export default RichTextEditor
