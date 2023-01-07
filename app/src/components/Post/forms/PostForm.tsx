import { ValidationError } from '../../../interfaces/validationError'
import { BasePost, Post } from '../../../interfaces/post'
import { Box, Button, Grid, TextField } from '@mui/material'
import FileUpload from '../../utils/FileUpload'
import { ChangeEvent, useState } from 'react'



interface PostFormProps {
    onSubmit: ( values: BasePost ) => any
    errors: ValidationError<BasePost>
    initialValues?: BasePost | Post
    options?: {
        resetValuesOnSubmit?: boolean
    }
}

const PostForm = ( { onSubmit, errors, initialValues, options }: PostFormProps ) => {

    const defaultValues: BasePost = { text: '', image: null }
    const [ values, setValues ] = useState( initialValues ?? defaultValues )
    const [ fileKey, setFileKey ] = useState( 0 )

    const handleChange = ( label: keyof BasePost ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( { ...values, [label]: event.target.value } )
    }

    const handleFile = ( file: File | null ) => {
        setValues( {
            ...values,
            image: file,
        } )
    }

    const handleSubmit = () => {
        onSubmit( values )
        if ( options?.resetValuesOnSubmit ) {
            setValues( defaultValues )
            setFileKey( k => k + 1 )
        }
    }

    return (
      <Box>
          <Grid container>
              <Grid item xs={12}>
                  <TextField helperText={errors.text} value={values.text} error={'text' in errors} fullWidth label={'text'} name={'text'}
                             onChange={handleChange( 'text' )}/>

              </Grid>
              <Grid item xs={12}>
                  <FileUpload label={'image'} error={errors.image} updateFilesCb={handleFile} key={fileKey}/>
              </Grid>
              <Grid item xs={12}>
                  <Button onClick={handleSubmit} variant={'contained'}>Post</Button>
              </Grid>
          </Grid>
      </Box>
    )

}
export default PostForm