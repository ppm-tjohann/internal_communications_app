import { User } from '../../interfaces/user'
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'



interface UserAvatarProps {
    user: User
    size?: 'large' | 'medium' | 'small'
    showName?: boolean
    textVariant?: 'subtitle2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'subtitle1' | 'body1' | 'body2' | 'overline'
    withBorder?: 'iron' | 'bronze' | 'silver' | 'gold' | 'diamond'
}

const UserAvatar = ( { user, size = 'medium', showName = false, textVariant = 'subtitle2' }: UserAvatarProps ) => {

    const getSize = () => {
        switch ( size ) {
            case 'small':
                return { width: 32, height: 32 }
            case 'medium':
                return { width: 48, height: 48 }
            case 'large':
                return { width: 64, height: 64 }
        }
    }

    const border = Math.round( Math.random() * 5 ) + 1
    console.log( 'BORDER: ', border )

    return (
      <Tooltip title={user.username}>
          <Stack alignItems={'center'} spacing={1}>
              <Box sx={{ ...getSize(), position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Avatar src={user.avatar ?? undefined} sx={{ width: '60%', height: '60%' }}>{user.username.substring( 0, 2 )}</Avatar>
                  <img style={{ top: 0, left: 0, position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}
                       src={`/img/userframes-0${border}.png`}/>
              </Box>
              {showName && <Typography variant={textVariant}>{user.username}</Typography>}
          </Stack>
      </Tooltip>
    )

}
export default UserAvatar