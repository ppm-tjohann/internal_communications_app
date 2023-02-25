import { Alert, AlertTitle, Box, Collapse, IconButton, Slide, SlideProps, Snackbar, Stack, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import useSocket from '../../hooks/useSocket'
import Score from '../../interfaces/score'
import { Badge } from '../../interfaces/user'
import { useAppDispatch } from '../../Store'
import { OptionsObject, useSnackbar } from 'notistack'
import { Info } from '@mui/icons-material'
import { UserAddBadge } from '../../actions/user/UserActions'
import { Message } from '../../interfaces/chat'



type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = ( props: TransitionProps ) => <Slide {...props} direction={'left'}/>

const UiMessages = () => {

    const [ open, setOpen ] = useState( false )
    const [ score, setScore ] = useState( 20 )
    const dispatch = useAppDispatch()
    const { enqueueSnackbar } = useSnackbar()

    const defaultSnackbarOptions = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        autoHideDuration: 3000,
    }

    const handleScore = ( { score: newScore }: { score: Score } ) => {
        handleMessage( `Your Score Updated: ${newScore.count}` )
    }
    const handleChat = ( { message }: { message: Message } ) => {
        handleMessage( `New Chat Message from ${message.user?.username}` )
    }

    const handleBadges = ( { badge }: { badge: Badge } ) => {
        console.log( 'Badges :', badge )
        dispatch( UserAddBadge( badge ) )
        const size = 40
        const Icon = () => <Box width={size} height={size}><img style={{ objectFit: 'contain' }} src={`/img/badges/post/post-${badge.variant}.png`}/></Box>
        let message = ''
        switch ( badge.variant ) {
            case 1:
                message = 'Congrats! You recieved your first Comment-Badge. Keep On'
                break
            case 2:
                message = 'Congrats! You recieved your second Comment-Badge. Keep On'
                break
            case 3:
                message = 'Congrats! You recieved your third Comment-Badge. Two more to go'
                break
            case 4:
                message = 'Congrats! You recieved a new Comment-Badge. One more to go'
                break
            case 5:
                message = 'Nice! Last Comment-Badge. Thanks for your Comments'
                break

        }
        handleMessage( message, {
            action: <Icon/>,
        } )
    }
    const handleMessage = ( text: string, options?: OptionsObject ) => {
        enqueueSnackbar( text, {
            variant: 'success', anchorOrigin: { horizontal: 'right', vertical: 'top' }, autoHideDuration: 6000,
            ...options,
        } )
    }

    useSocket( { type: 'NewScore', callBack: handleScore } )
    useSocket( { type: 'BadgeUpdate', callBack: handleBadges } )
    useSocket( { type: 'ChatMessage', callBack: handleChat } )

    const handleClose = () => {
        setOpen( false )
    }

    return null

}
export default UiMessages