import { Dispatch } from 'redux'
import { POST_ADD_POST, POST_ADD_POST_LOADING, POST_LOADING, POST_SET_ERRORS, POST_SET_POSTS, PostDispatchTypes } from './PostActionTypes'
import { AddPostRequest, BasePost } from '../../interfaces/post'
import { RootState } from '../../Store'
import validationErrors from '../../lib/validationErrors'
import * as posts from '../../lib/api/post'
import { ValidationError } from '../../interfaces/validationError'



export const handlePostSubmit = ( values: BasePost, post: FormData ) => async ( dispatch: Dispatch<PostDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: POST_ADD_POST_LOADING } )
    try {
        AddPostRequest.parse( values )
        const { data } = await posts.store( post )
        dispatch( { type: POST_ADD_POST, payload: { post: data } } )
    }
    catch ( e ) {
        const errors = validationErrors( e )
        if ( errors !== undefined ) {
            dispatch( { type: POST_SET_ERRORS, payload: { errors } } )
        }
        else {
            console.error( 'Unknown Error : ', e )
        }
    }
    dispatch( { type: POST_ADD_POST_LOADING } )
}

export const handlePostValidationError = ( errors: ValidationError<BasePost> ) => ( dispatch: Dispatch<PostDispatchTypes> ) => {
    dispatch( { type: POST_SET_ERRORS, payload: { errors } } )
}

export const SetPosts = () => async ( dispatch: Dispatch<PostDispatchTypes> ) => {
    dispatch( { type: POST_LOADING } )
    try {
        const { data } = await posts.get()
        dispatch( { type: POST_SET_POSTS, payload: { posts: data.data } } )
    }
    catch ( e ) {
        console.error( 'Fetching Posts Failed' )
    }
    dispatch( { type: POST_LOADING } )
}

export const handlePostLike = ( id: number ) => async ( dispatch: Dispatch<PostDispatchTypes> ) => {
}
export const handlePostComment = ( id: number, comment: string ) => async ( dispatch: Dispatch<PostDispatchTypes> ) => {
}