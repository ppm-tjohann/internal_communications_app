import { BasePost, Post } from '../../interfaces/post'
import { ValidationError } from '../../interfaces/validationError'



export const POST_ADD_POST = 'POST_ADD_POST'
export const POST_ADD_POST_LOADING = 'POST_ADD_POST_LOADING'
export const POST_LOADING = 'POST_LOADING'
export const POST_SET_POSTS = 'POST_SET_POSTS'
export const POST_HANDLE_LIKE = 'POST_HANDLE_LIKE'
export const POST_SET_ERRORS = 'POST_SET_ERRORS'

export interface PostAddPost {
    type: typeof POST_ADD_POST
    payload: { post: Post }
}

export interface PostHandleLike {
    type: typeof POST_HANDLE_LIKE
    payload: { id: number }
}

export interface PostLoading {
    type: typeof POST_LOADING
}

export interface PostAddPostLoading {
    type: typeof POST_ADD_POST_LOADING
}

export interface PostSetPosts {
    type: typeof POST_SET_POSTS
    payload: { posts: Post[] }
}

export interface PostSetErrors {
    type: typeof POST_SET_ERRORS,
    payload: { errors: ValidationError<BasePost> }
}

export type PostDispatchTypes =
  | PostAddPost
  | PostHandleLike
  | PostLoading
  | PostAddPostLoading
  | PostSetPosts
  | PostSetErrors







