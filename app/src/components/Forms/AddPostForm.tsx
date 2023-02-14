import { Box, Button, Collapse, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { AddPostRequest, BasePost } from '../../interfaces/post'
import { useAppDispatch, useAppSelector } from '../../Store'
import { handlePostSubmit, handlePostValidationError } from '../../actions/posts/PostActions'
import FileUpload from '../utils/FileUpload'
import PostForm from '../Post/forms/PostForm'
import validationErrors from '../../lib/validationErrors'
import Loader from '../utils/Loader'
import { ExpandMore, TypeSpecimenOutlined } from '@mui/icons-material'



const AddPostForm = () => {

    const defaultValues: BasePost = {
        text: '',
        image: null,
    }

    const [ expanded, setExpanded ] = useState( false )

    const { errors, addPostLoading: loading } = useAppSelector( state => state.posts )
    const dispatch = useAppDispatch()

    const handleExpand = () => {
        setExpanded( e => !e )
    }

    const handleSubmit = async ( values: BasePost ) => {
        try {
            console.log( 'Values: ', values )
            AddPostRequest.parse( values )
            if ( values.image === null ) {
                dispatch( handlePostValidationError( {
                    image: 'Image Required',
                } ) )
                console.log( 'No Image' )
                throw new Error( 'Image needed' )
            }
            const formData = new FormData()
            formData.append( 'image', values.image )
            formData.append( 'text', values.text )
            dispatch( handlePostSubmit( values, formData ) )
            dispatch( handlePostValidationError( {} ) )
        }
        catch ( e ) {
            const errors = validationErrors( e )
            console.log( 'ERRORS :', errors, values )
            if ( errors === undefined ) {
                console.error( 'Unknown Add Post Error : ', e )
            }
            else {
                dispatch( handlePostValidationError( errors ) )
            }
        }
    }
    if ( loading ) return <Loader/>

    return <>
        <Box mb={expanded ? 2 : 0}><Stack alignItems={'center'} justifyContent={'space-between'}><Typography variant={'h4'}>Add a
            Post</Typography><IconButton
          onClick={handleExpand}
          sx={{ transition: 'transform 150ms ease-in-out', transform: `rotate(${expanded ? 180 : 0}deg)` }}><ExpandMore/></IconButton></Stack></Box>
        <Collapse in={expanded}><PostForm onSubmit={handleSubmit} errors={errors}/></Collapse>
    </>

}
export default AddPostForm