import { BasePost, Post } from '../../interfaces/post'
import { Comment } from '../../interfaces/post'
import { ValidationError } from '../../interfaces/validationError'



export const POST_ADD_POST = 'POST_ADD_POST'
export const POST_ADD_POST_LOADING = 'POST_ADD_POST_LOADING'
export const POST_LOADING = 'POST_LOADING'
export const POST_SET_POSTS = 'POST_SET_POSTS'
export const POST_SET_ERRORS = 'POST_SET_ERRORS'

export const POST_ADD_LIKE = 'POST_ADD_LIKE'
export const POST_REMOVE_LIKE = 'POST_REMOVE_LIKE'

export const POST_SET_COMMENTS = 'POST_SET_COMMENTS'
export const POST_ADD_COMMENT = 'POST_ADD_COMMENT'

export interface PostSetComments {
    type: typeof POST_SET_COMMENTS
    payload: { comments: Comment[], postId: number }
}

export interface PostAddComment {
    type: typeof POST_ADD_COMMENT
    payload: { comment: Comment, postId: number }
}

export interface PostAddPost {
    type: typeof POST_ADD_POST
    payload: { post: Post }
}

export interface PostAddLike {
    type: typeof POST_ADD_LIKE
    payload: { id: number }
}

export interface PostRemoveLike {
    type: typeof POST_REMOVE_LIKE
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
  | PostAddLike
  | PostRemoveLike
  | PostLoading
  | PostAddPostLoading
  | PostSetPosts
  | PostSetErrors
  | PostSetComments
  | PostAddComment







