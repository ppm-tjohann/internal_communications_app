import { Box, CircularProgress, IconButton, InputBase, Paper, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { Send } from '@mui/icons-material'
import { ChangeEvent, useContext, useState } from 'react'
import { useAppDispatch } from '../../../../Store'
import { CommentsContext } from './CommentProvider'



const AddComment = () => {

    const COMMENT_MAX_LENGTH = 128
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

    const handleSubmit = async () => {
        setLoading( true )
        handleAddComment( value )
        setValue( '' )
        setLoading( false )
    }

    return ( <Paper elevation={4} sx={{ py: 2, mb: 1 }}>
        <Stack justifyContent={'space-between'} alignItems={'center'}>
            <InputBase placeholder={'comment…'} value={value} onChange={handleValue}
                       sx={{ width: '100%' }}
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