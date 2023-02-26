import { User } from '../../interfaces/user'
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'
import UserPopup from './UserPopup'



interface UserAvatarProps {
    user: User | null
    size?: 'large' | 'medium' | 'small' | 'fill'
    showName?: boolean
    textVariant?: 'subtitle2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'subtitle1' | 'body1' | 'body2' | 'overline'
    withBorder?: boolean
}

const UserAvatar = ( { user, size = 'medium', showName = false, textVariant = 'subtitle2', withBorder = false }: UserAvatarProps ) => {

    const {
        REACT_APP_SRC_BASE = 'http://localhost:8000',
    } = process.env

    const [ open, setOpen ] = useState( false )
    const toggleModal = () => {
        setOpen( !open )
    }
    const closeModal = () => {
        setOpen( false )
    }

    if ( !user ) {
        return null
    }

    const getSize = () => {
        switch ( size ) {
            case 'small':
                return { width: 24, height: 24 }
            case 'medium':
                return { width: 48, height: 48 }
            case 'large':
                return { width: 64, height: 64 }
            case 'fill':
                return { width: '100%', height: '100%' }
        }
    }

    const avatarSize = () => {
        if ( withBorder && user.border ) {
            return '60%'
        }
        if ( withBorder && !user.border ) {
            return '80%'
        }
        return '100%'
    }

    console.log( 'Avatar SRC:', REACT_APP_SRC_BASE + user.avatar, user.username )

    return (
      <>

          <Tooltip title={user.username}>
              <Stack alignItems={'center'} spacing={1} height={'100%'}>
                  <Box onClick={toggleModal} sx={{ ...getSize(), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Avatar src={`${REACT_APP_SRC_BASE}/${user.avatar}` ?? undefined}
                              sx={{ width: avatarSize(), height: avatarSize() }}>{user.username.substring( 0, 2 )}</Avatar>
                      {( withBorder && user.border ) &&
                      <img style={{ top: 0, left: 0, position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}
                           src={`/img/border/userframes-0${user.border.value}.png`}/>}
                  </Box>
                  {showName && <Typography variant={textVariant}>{user.username}</Typography>}
              </Stack>
          </Tooltip>
          <UserPopup user={user} open={open} onClose={closeModal}/></>
    )

}
export default UserAvatar