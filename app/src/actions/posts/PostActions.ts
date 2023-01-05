import { Dispatch } from 'redux'
import { POST_ADD_POST_LOADING, POST_SET_ERRORS, PostDispatchTypes } from './PostActionTypes'
import { AddPostRequest, BasePost } from '../../interfaces/post'
import { RootState } from '../../Store'
import validationErrors from '../../lib/validationErrors'
import * as posts from '../../lib/api/post'



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
            console.error( 'Unknown Error : ', e )
        }
    }
    dispatch( { type: POST_ADD_POST_LOADING } )
}
