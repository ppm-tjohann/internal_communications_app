import { useState } from 'react'
import Editor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'



const RichTextEditor = () => {
    const [ value, setValue ] = useState( 'Initial' )

    return (
      <Editor renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}/>
    )
}

export default RichTextEditor