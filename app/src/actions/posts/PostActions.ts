import { Dispatch } from 'redux'
import {
    POST_ADD_COMMENT,
    POST_ADD_LIKE,
    POST_ADD_POST,
    POST_ADD_POST_LOADING,
    POST_LOADING,
    POST_REMOVE_LIKE,
    POST_SET_COMMENTS,
    POST_SET_ERRORS,
    POST_SET_POSTS,
    PostDispatchTypes,
} from './PostActionTypes'
import { AddPostRequest, BasePost, Comment, Post } from '../../interfaces/post'
import { RootState } from '../../Store'
import validationErrors from '../../lib/validationErrors'
import * as posts from '../../lib/api/post'
import * as likes from '../../lib/api/likes'
import { ValidationError } from '../../interfaces/validationError'
import { AxiosError } from 'axios'



export const handlePostSubmit = ( values: BasePost, post: FormData ) => async ( dispatch: Dispatch<PostDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: POST_ADD_POST_LOADING } )
    try {
        AddPostRequest.parse( values )
        const { data } = await posts.store( post )
    }
    catch ( e ) {
        const errors = validationErrors( e )
        if ( errors !== undefined ) {
            dispatch( { type: POST_SET_ERRORS, payload: { errors } } )
        }
        else {
            if ( e instanceof AxiosError ) {
                console.error( 'Creating Post Failed:', e?.response?.data )
            }
            console.error( 'Unknown Error : ', e )
        }
    }
    dispatch( { type: POST_ADD_POST_LOADING } )
}

export const PostAddedByUser = ( post: Post ) => ( dispatch: Dispatch<PostDispatchTypes> ) => {
    dispatch( { type: POST_ADD_POST, payload: { post } } )
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
    try {
        const res = await likes.post( id )
        if ( res.status === 200 ) {
            dispatch( { type: POST_REMOVE_LIKE, payload: { id } } )
        }
        else if ( res.status === 201 ) {
            dispatch( { type: POST_ADD_LIKE, payload: { id } } )
        }
    }
    catch ( e ) {
        console.error( 'Handle Post Like failed :', e )
    }
}
export const handlePostComment = ( id: number, comment: Comment ) => async ( dispatch: Dispatch<PostDispatchTypes> ) => {
    dispatch( { type: POST_ADD_COMMENT, payload: { postId: id, comment } } )
}

export const handlePostSetComments = ( id: number, comments: Comment[] ) => ( dispatch: Dispatch<PostDispatchTypes> ) => {
    dispatch( { type: POST_SET_COMMENTS, payload: { postId: id, comments } } )
}