import { BasePost, Post } from '../interfaces/post'
import { Dispatch } from 'redux'
import { PostDispatchTypes } from '../actions/posts/PostActionTypes'
import { ValidationError } from '../interfaces/validationError'
import { comment } from '../lib/api/likes'



interface DefaultState {
    loading: boolean
    addPostLoading: boolean
    posts: Post[]
    errors: ValidationError<BasePost>
}

const defaultState: DefaultState = {
    loading: false,
    addPostLoading: false,
    posts: [],
    errors: {},
}

const PostReducer = ( state: DefaultState = defaultState, action: PostDispatchTypes ) => {
    switch ( action.type ) {
        case 'POST_ADD_POST':
            return { ...state, posts: [ action.payload.post, ...state.posts ] }
        case 'POST_ADD_POST_LOADING':
            return { ...state, addPostLoading: !state.addPostLoading }
        case 'POST_ADD_LIKE':
            return {
                ...state,
                posts: [
                    ...state.posts.map( post => post.id !== action.payload.id ?
                      post :
                      { ...post, likes_count: ( post.likes_count + 1 ) } ),
                ],
            }
        case 'POST_REMOVE_LIKE':
            return {
                ...state,
                posts: [
                    ...state.posts.map( post => post.id !== action.payload.id ?
                      post :
                      { ...post, likes_count: ( post.likes_count - 1 ) } ),
                ],
            }
        case 'POST_ADD_COMMENT':
            return {
                ...state,
                posts: state.posts.map( post => (
                  post.id !== action.payload.postId ? post : {
                      ...post,
                      comments: post.comments === undefined ?
                        [ action.payload.comment ] : [ ...post.comments, action.payload.comment ],
                  }
                ) ),
            }

        case 'POST_SET_COMMENTS':
            return {
                ...state,
                posts: state.posts.map( post => (
                  post.id !== action.payload.postId ?
                    post : {
                        ...post,
                        comments: action.payload.comments,
                    }
                ) ),

            }
        case 'POST_LOADING':
            return { ...state, loading: !state.loading }
        case 'POST_SET_POSTS':
            return { ...state, posts: action.payload.posts }
        case'POST_SET_ERRORS':
            return { ...state, errors: action.payload.errors }
        default:
            return state
    }
}
export default PostReducer