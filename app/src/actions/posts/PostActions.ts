import { Dispatch } from 'redux'
import { POST_ADD_POST_LOADING, POST_SET_ERRORS, PostDispatchTypes } from './PostActionTypes'
import { AddPostRequest, BasePost } from '../../interfaces/post'
import { RootState } from '../../Store'
import api from '../../lib/api'
import validationErrors from '../../lib/validationErrors'



export const handlePostSubmit = ( values: BasePost, post: FormData ) => async ( dispatch: Dispatch<PostDispatchTypes>, getState: () => RootState ) => {
    dispatch( { type: POST_ADD_POST_LOADING } )
    try {
        AddPostRequest.parse( values )
        const { apiToken } = getState().auth
        const { data } = await api.post( '/posts', post, {
            headers: { Authorization: `Bearer ${apiToken}` },
        } )
        console.log( 'Posted Request' )
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

export const handlePostLike = ( id: number ) => async ( dispatch: Dispatch<PostDispatchTypes> ) => {
    try {

    }
    catch ( e ) {

    }
}