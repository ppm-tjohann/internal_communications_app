import { BasePost, Post } from '../interfaces/post'
import { Dispatch } from 'redux'
import { PostDispatchTypes } from '../actions/posts/PostActionTypes'
import { ValidationError } from '../interfaces/validationError'



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
            return { ...state, posts: [ ...state.posts, action.payload.post ] }
        case 'POST_ADD_POST_LOADING':
            return { ...state, addPostLoading: !state.addPostLoading }
      // case 'POST_HANDLE_LIKE':
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