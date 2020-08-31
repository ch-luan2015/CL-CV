import React, { useCallback, useMemo, useState, useEffect } from 'react'
import Prism from 'prismjs'

import {
  Editable,
  withReact,
  Slate,
  RenderLeafProps,
  RenderElementProps,
  useSelected,
  useFocused,
} from 'slate-react'
import { Editor, Transforms, createEditor, Node, Range, Text, Point } from 'slate'
import { withHistory } from 'slate-history'

import isUrl from 'is-url'
import { css } from 'emotion'

// eslint-disable-next-line
// ;Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

//Editor for view data

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

//Element render 
const Element = ({ attributes, children, element }: RenderElementProps) => {
  const props = { attributes, children, element }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote
          {...attributes}
          className="border-l-4 border-teal-500 italic my-8 pl-8 md:pl-12"
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
        return <CodeElement {...props}/>
    
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

//   if (leaf.code) {
//     children = (
//       <pre className="bg-gray-900 py-0 text-white font-mono text-base py-2">
//         <code>{children}</code>
//       </pre>
//     )
//   }
  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const CodeElement = ({ attributes, children, element }) => {
    return (
      <div className="bg-gray-900 py-0 text-white font-mono text-base py-2" {...attributes} >
            <pre className="bg-gray-900 py-0 text-white font-mono text-base py-2">
                <code className="bg-gray-900 py-0 text-white font-mono text-base py-2">{children}</code>
            </pre>
       
      </div>
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



export default RichTextViewer
