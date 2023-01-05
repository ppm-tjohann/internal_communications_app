import { Box, Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { BasePost } from '../../interfaces/post'
import { useAppDispatch, useAppSelector } from '../../Store'
import { handlePostSubmit } from '../../actions/posts/PostActions'
import api from '../../lib/api'
import FileUpload from '../utils/FileUpload'



const AddPostForm = () => {

    const defaultValues: BasePost = {
        text: '',
        image: null,
    }

    const { errors, loading } = useAppSelector( state => state.posts )
    const dispatch = useAppDispatch()
    const [ values, setValues ] = useState( defaultValues )
    const [ fileKey, setFileKey ] = useState( 0 )

    const handleChange = ( label: keyof BasePost ) => ( event: ChangeEvent<HTMLInputElement> ) => {
        setValues( {
            ...values,
            [label]: event.target.value,
        } )
    }

    const handleFile = ( file: File | null ) => {
        setValues( {
            ...values,
            image: file,
        } )
    }

    const handleSubmit = async () => {

        console.log( 'Values: ', values )

        try {
            if ( values.image === null ) {
                console.log( 'No Image' )
                throw new Error( 'Image needed' )
            }
            const formData = new FormData()
            formData.append( 'image', values.image )
            formData.append( 'text', values.text )
            dispatch( handlePostSubmit( values, formData ) )
            setValues( defaultValues )
            setFileKey( k => k + 1 )
        }
        catch ( e ) {

        }
    }

    console.log( 'ERRORS :', errors )

    return (
      <Box>
          <Grid container>
              <Grid item xs={12}>
                  <TextField helperText={errors.text} value={values.text} error={'text' in errors} fullWidth label={'text'} name={'text'}
                             onChange={handleChange( 'text' )}/>

              </Grid>
              <Grid item xs={12}>
                  <FileUpload label={'image'} updateFilesCb={handleFile} key={fileKey}/>
              </Grid>
              <Grid item xs={12}>
                  <Button onClick={handleSubmit} variant={'contained'}>Post</Button>
              </Grid>
          </Grid>
      </Box>
    )

}
export default AddPostForm