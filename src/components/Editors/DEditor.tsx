import React, { Component } from 'react'
import { convertFromRaw } from 'draft-js'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const content = { entityMap: {}, blocks: [{ key: '637gr', text: 'Initialized from content state.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {} }] }

export default class DEditor extends Component<any, any> {
  constructor(props: any) {
    super(props)
    const contentState = convertFromRaw(content)
    this.state = {
      contentState,
    }
  }

  onContentStateChange: Function = (contentState) => {
    this.setState({
      contentState,
    })
  }

  uploadImageCallBack: Function = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', 'https://api.imgur.com/3/image')
      xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
      const data = new FormData()
      data.append('image', file)
      xhr.send(data)
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText)
        resolve(response)
      })
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText)
        reject(error)
      })
    })
  }

  render() {
    const { contentState } = this.state
    return (
      <div className="w-full h-full">
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onContentStateChange={this.onContentStateChange}
          toolbar={{
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        <textarea className="w-full h-full" disabled value={JSON.stringify(contentState, null, 4)} />
      </div>
    )
  }
}
