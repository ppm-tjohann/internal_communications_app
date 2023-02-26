import { Box, CircularProgress, IconButton, InputBase, Paper, Stack, Typography, useTheme } from '@mui/material'
import { Send } from '@mui/icons-material'
import { KeyboardEvent, ChangeEvent, useContext, useState } from 'react'
import { CommentsContext } from './CommentProvider'



const AddComment = () => {

    const COMMENT_MAX_LENGTH = 128
    const theme = useTheme()
    const { handleAddComment } = useContext( CommentsContext )
    const [ value, setValue ] = useState( '' )
    const [ loading, setLoading ] = useState( false )

    const handleValue = ( event: ChangeEvent<HTMLInputElement> ) => {
        if ( value.length < COMMENT_MAX_LENGTH ) {
            setValue( event.target.value )
        }
        else if ( event.target.value.length < value.length )
            setValue( event.target.value )
    }
    const handleKeyDown = ( event: KeyboardEvent<HTMLInputElement> ) => {
        if ( event.key === 'Enter' ) {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        setLoading( true )
        handleAddComment( value )
        setValue( '' )
        setLoading( false )
    }

    return ( <Paper elevation={4} sx={{ py: 2, mb: 1, mt: 4, borderRadius: theme.spacing( 3 ) }}>
        <Stack justifyContent={'space-between'} alignItems={'center'}>
            <InputBase placeholder={'comment…'} value={value} onChange={handleValue}
                       onKeyDown={handleKeyDown} sx={{ width: '100%' }}
            />
            <Box>
                <IconButton onClick={handleSubmit}>
                    {loading ? <CircularProgress size={20}/> : <Send/>}
                </IconButton>
                <Typography variant={'body2'}>{value.length}/{COMMENT_MAX_LENGTH}</Typography>
            </Box>
        </Stack>
    </Paper> )

}
export default AddComment