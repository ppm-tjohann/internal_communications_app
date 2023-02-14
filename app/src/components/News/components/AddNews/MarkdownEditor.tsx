import { AccountBox } from '@mui/icons-material'
import { Box } from '@mui/material'
import MdEditor, { Plugins } from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import styles from './mdEditor.module.scss'
import Markdown from '../Markdown'
import { ChangeEvent, useState } from 'react'



interface MarkdownEditorProps {
    height?: number
    placeholder?: string
    onChange: ( { text, html }: { text: string, html: string } ) => void
}

const MarkdownEditor = ( { placeholder = '', height = 500, onChange }: MarkdownEditorProps ) => {
    MdEditor.unuse( Plugins.BlockCodeInline )
    MdEditor.unuse( Plugins.BlockCodeBlock )
    MdEditor.unuse( Plugins.Table )
    MdEditor.unuse( Plugins.Image )
    MdEditor.unuse( Plugins.FontStrikethrough )

    return (
      <Box className={styles.root}>
          <MdEditor htmlClass={'test'} onChange={onChange} markdownClass={'md-text'} placeholder={placeholder} canView={{
              hideMenu: true, menu: true, md: false, html: false, fullScreen: false, both: true,
          }} style={{ height }} renderHTML={text => <Markdown children={text}/>}/>
      </Box>
    )
}
export default MarkdownEditor