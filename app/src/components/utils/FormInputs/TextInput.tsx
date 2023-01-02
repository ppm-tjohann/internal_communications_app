import { TextField } from '@mui/material'
import { HTMLInputTypeAttribute } from 'react'



interface TextInputProps {
    label: string
    value: string
    error?: string | null
    type?: HTMLInputTypeAttribute
}

const TextInput = ( { label, value, error, type = 'text' }: TextInputProps ) => {
    return (
      <TextField label={label} value={value} type={type}/>
    )
}
export default TextInput