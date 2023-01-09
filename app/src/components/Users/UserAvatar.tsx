import { User } from '../../interfaces/user'
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material'



interface UserAvatarProps {
    user: User
    size?: 'large' | 'medium' | 'small'
    showName?: boolean
    textVariant?: 'subtitle2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'subtitle1' | 'body1' | 'body2' | 'overline'
}

const UserAvatar = ( { user, size = 'medium', showName = false, textVariant = 'subtitle2' }: UserAvatarProps ) => {

    const getSize = () => {
        switch ( size ) {
            case 'small':
                return { width: 24, height: 24 }
            case 'medium':
                return { width: 32, height: 32 }
            case 'large':
                return { width: 48, height: 48 }
        }
    }

    return (
      <Tooltip title={user.username}>
          <Stack alignItems={'center'} spacing={1}>
              <Avatar src={user.avatar ?? undefined} sx={getSize()}>{user.username.substring( 0, 2 )}</Avatar>
              {showName && <Typography variant={textVariant}>{user.username}</Typography>}
          </Stack>
      </Tooltip>
    )

}
export default UserAvatar