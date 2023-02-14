import { Alert, AlertTitle, Box, Collapse, IconButton, Slide, SlideProps, Snackbar, Stack, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import useSocket from '../../hooks/useSocket'
import Score from '../../interfaces/score'



type TransitionProps = Omit<SlideProps, 'direction'>;

const Transition = ( props: TransitionProps ) => <Slide {...props} direction={'left'}/>

const UiMessages = () => {

    const [ open, setOpen ] = useState( false )
    const [ score, setScore ] = useState( 20 )

    const handleCount = ( { score: newScore }: { score: Score } ) => {
        setOpen( true )
        setScore( newScore.count )
    }

    useSocket( { type: 'NewScore', callBack: handleCount } )

    const handleClose = () => {
        setOpen( false )
    }

    return <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Transition}
      autoHideDuration={3000}
      onClose={handleClose}
      open={open} sx={{ width: 'min(100%,400px)' }}
    >
        <Alert severity={'success'} sx={{ width: '100%' }} onClose={handleClose}>
            <AlertTitle>
                New Score: {score}
            </AlertTitle>
            Your score has updated.
        </Alert>
    </Snackbar>

}
export default UiMessages