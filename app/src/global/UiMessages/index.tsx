import { Alert, AlertTitle, Box, Collapse, IconButton, ListItemText, Slide, SlideProps, Snackbar, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import useSocket from '../../hooks/useSocket'
import Score from '../../interfaces/score'
import { Badge } from '../../interfaces/user'
import { useAppDispatch, useAppSelector } from '../../Store'
import { OptionsObject, SnackbarMessage, useSnackbar } from 'notistack'
import { Info } from '@mui/icons-material'
import { UserAddBadge } from '../../actions/user/UserActions'
import { Message } from '../../interfaces/chat'
import BadgeHandler from '../../components/Badges/BadgeHandler'
import { useLocation } from 'react-router'
import UserAvatar from '../../components/Users/UserAvatar'
import Chat from '../../pages/Chat'
import { newChatMessage } from '../../actions/chat/ChatActions'

import { Event } from '../../interfaces/event'
import { CalendarEventAddedByUser } from '../../actions/calendar/CalendarActions'
import { PostAddedByUser } from '../../actions/posts/PostActions'
import { Post } from '../../interfaces/post'



type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = ( props: TransitionProps ) => <Slide {...props} direction={'left'}/>

const UiMessages = () => {

    const dispatch = useAppDispatch()
    const { user } = useAppSelector( state => state.auth )
    const { pathname: currentUserPath } = useLocation()
    const { enqueueSnackbar } = useSnackbar()

    const defaultSnackbarOptions = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        autoHideDuration: 3000,
    }

    const handleScore = ( { score: newScore }: { score: Score } ) => {
        handleMessage( `Your Score Updated: ${newScore.count}` )
    }

    const handleEvent = ( { event }: { event: Event } ) => {
        handleMessage( 'You have been invited', {
            action: <UserAvatar user={event.user}/>,
        } )
        dispatch( CalendarEventAddedByUser( event ) )
    }

    const handleChat = ( { message }: { message: Message } ) => {

        dispatch( newChatMessage( message ) )

        if ( !currentUserPath.includes( 'chat' ) ) {
            handleMessage( <Box>
                <Typography variant={'body1'}>{message.user?.username}</Typography>
                <Typography variant={'body2'}>{message.text}</Typography>
            </Box>, {
                variant: 'default', autoHideDuration: 10000,
                action: <UserAvatar user={message.user}/>,
            } )
        }
    }

    const handleBadges = ( { badge }: { badge: Badge } ) => {
        dispatch( UserAddBadge( badge ) )
        const size = 40
        let message = ''

        const getBadgeName = () => {
            switch ( badge.for ) {
                case 'COMMENT_BADGE':
                    return 'Comment'
                case 'LIKE_BADGE':
                    return 'Like'
                case 'POST_BADGE':
                    return 'Post'
            }
        }
        switch ( badge.variant ) {
            case 1:
                message = `Congrats! You recieved your first ${getBadgeName()}-Badge. Keep On`
                break
            case 2:
                message = `Congrats! You recieved your second ${getBadgeName()}-Badge. Keep On`
                break
            case 3:
                message = `Congrats! You recieved your third ${getBadgeName()}-Badge. Two more to go`
                break
            case 4:
                message = `Congrats! You recieved a new Comment-Badge. One more to go`
                break
            case 5:
                message = `Nice! Last ${getBadgeName()}-Badge. Thanks for your ${getBadgeName()}s`
                break

        }
        handleMessage( message, {
            action: <BadgeHandler badges={[ badge ]}/>,
        } )
    }

    const handleMessage = ( text: SnackbarMessage, options?: OptionsObject ) => {
        enqueueSnackbar( text, {
            variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' }, autoHideDuration: 6000,
            ...options,
        } )
    }

    const handlePost = ( { post }: { post: Post } ) => {
        if ( !user )
            return null
        dispatch( PostAddedByUser( post ) )
        if ( post.user.id !== user.id ) {
            handleMessage( `New Post from ${post.user.username}` )
        }
    }

    useSocket( { type: 'NewScore', callBack: handleScore } )
    useSocket( { type: 'BadgeUpdate', callBack: handleBadges } )
    useSocket( { type: 'ChatMessage', callBack: handleChat } )
    useSocket( { type: 'NewEvent', callBack: handleEvent } )
    useSocket( { type: 'PostCreated', callBack: handlePost } )

    return null

}
export default UiMessages