import { Comment, Post } from '../../../../interfaces/post'
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import * as commentsApi from '../../../../lib/api/comments'
import { handlePostComment, handlePostSetComments } from '../../../../actions/posts/PostActions'
import { useAppDispatch } from '../../../../Store'
import { Container } from '@mui/material'



interface CommentProviderTypes {
    expanded: boolean
    loading: boolean
    comments: Comment[] | null[]
    handleExpansion: () => any
    handleAddComment: ( text: string ) => any
}

export const CommentsContext = createContext( {} as CommentProviderTypes )

interface CommentProviderProps {
    post: Post
    children: ReactNode
}

const getInitial = ( comments_count: number ): null[] => {
    let comments = []
    let i = 0
    while ( i < comments_count ) {
        comments.push( null )
        i++
    }
    return comments
}

const CommentsProvider = ( { post, children }: CommentProviderProps ) => {

    const dispatch = useAppDispatch()

    const [ expanded, setExpanded ] = useState( false )
    const [ loading, setLoading ] = useState( post.comments === undefined )
    const [ comments, setComments ] = useState<Comment[] | null[]>( post.comments ?? getInitial( post.comments_count ) )

    // TODO add pagination

    useMemo( () => {
        if ( expanded && !( comments[0] !== null ) ) {
            commentsApi.getForPost( post.id ).then( res => {
                setComments( res.data )
                dispatch( handlePostSetComments( post.id, res.data ) )
                setLoading( false )
                console.log( 'Comments :', res.data )
            } ).catch( e => {
                console.error( 'Fetching Comments failed :', e )
            } )
        }
    }, [ expanded ] )

    const handleExpansion = () => {
        setExpanded( e => !e )
    }

    const handleAddComment = async ( text: string ) => {
        setLoading( true )
        try {
            const { data: comment } = await commentsApi.post( { text }, post.id )
            comments[0] === null ?
              setComments( [ comment ] ) :
              setComments( [ comment, ...comments as Comment[] ] )

            dispatch( handlePostComment( post.id, comment ) )
        }
        catch ( e ) {
            console.error( 'Adding post comment failed', e )
        }

        setLoading( false )
    }

    return (
      <CommentsContext.Provider value={{
          comments, loading, expanded, handleExpansion, handleAddComment,
      }}>
          <Container>
              {children}
          </Container>
      </CommentsContext.Provider>
    )
}

export default CommentsProvider
