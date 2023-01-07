import { Box, Button, Grid, TextField } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { AddPostRequest, BasePost } from '../../interfaces/post'
import { useAppDispatch, useAppSelector } from '../../Store'
import { handlePostSubmit, handlePostValidationError } from '../../actions/posts/PostActions'
import FileUpload from '../utils/FileUpload'
import PostForm from '../Post/forms/PostForm'
import validationErrors from '../../lib/validationErrors'
import Loader from '../utils/Loader'



const AddPostForm = () => {

    const defaultValues: BasePost = {
        text: '',
        image: null,
    }

    const { errors, addPostLoading: loading } = useAppSelector( state => state.posts )
    const dispatch = useAppDispatch()

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

    return <PostForm onSubmit={handleSubmit} errors={errors}/>

}
export default AddPostForm