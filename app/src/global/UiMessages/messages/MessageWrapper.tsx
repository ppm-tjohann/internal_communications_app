import { Alert, AlertColor, AlertTitle } from '@mui/material'



interface MessageWrapper {
    children: string | string[]
    description?: string
    severity?: AlertColor
}

const MessageWrapper = ( { children, description, severity }: MessageWrapper ) => {
    return (
      <Alert severity={severity} sx={{ width: '100%' }}>
          <AlertTitle>{children}</AlertTitle>
          {description}
      </Alert>
    )
}
export default MessageWrapper