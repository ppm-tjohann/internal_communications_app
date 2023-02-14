import ReactMarkdown from 'react-markdown'
import { Typography } from '@mui/material'



const Markdown = ( { children }: { children: string } ) => {
    return (
      <ReactMarkdown components={{
          h1: ( { node, ...props } ) => <Typography variant={'h1'} {...props} />,
          h2: ( { node, ...props } ) => <Typography variant={'h2'} {...props} />,
          p: ( { node, ...props } ) => <Typography variant={'body1'} {...props} />,
          strong: ( { node, ...props } ) => <Typography mb={3} variant={'subtitle1'} {...props} />,

      }}>{children}</ReactMarkdown>
    )
}
export default Markdown