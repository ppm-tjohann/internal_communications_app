import { Box, Stack, Tooltip, Typography } from '@mui/material'
import { Badge } from '../../interfaces/user'
import { ReactNode } from 'react'



interface BadgeHandler {
    badges: Badge[]
}

const BadgeWrapper = ( { children, size = { xs: 12, sm: 16, md: 24 } }: { children: ReactNode, size?: any } ) => <Box
  sx={{ height: size, width: size }}>{children}</Box>

const CommentBadge = ( { variant }: { variant: number } ) => {
    return <BadgeWrapper>
        <Tooltip title={'Badge earned for making comments'}>
            <img style={{ objectFit: 'contain' }} src={`/img/badges/comment/comment-${variant}.png`}/>
        </Tooltip>
    </BadgeWrapper>
}
const PostBadge = ( { variant }: { variant: number } ) => {
    return ( <BadgeWrapper>
        <Tooltip title={'Badge earned for creating posts'}>
            <img style={{ objectFit: 'contain' }} src={`/img/badges/post/post-${variant}.png`}/>
        </Tooltip>
    </BadgeWrapper> )
}

const LikeBadge = ( { variant }: { variant: number } ) => {
    return (
      <BadgeWrapper>
          <Tooltip title={'Badge earned for liking posts and comments'}>
              <img style={{ objectFit: 'contain' }} src={`/img/badges/likes/likes-${variant}.png`}/>
          </Tooltip>
      </BadgeWrapper>
    )
}

const BadgeHandler = ( { badges }: BadgeHandler ) => {
    if ( badges.length === 0 ) return null
    console.log( 'Badges', badges )

    const getBadge = ( badge: Badge, index: number ) => {
        console.log( badge )
        switch ( badge.for ) {
            case 'COMMENT_BADGE':
                return <CommentBadge variant={badge.variant} key={index}/>
            case 'POST_BADGE':
                return <PostBadge variant={badge.variant} key={index}/>
            case 'LIKE_BADGE':
                return <LikeBadge variant={badge.variant} key={index}/>
        }
    }

    return (
      <Box>
          <Stack spacing={1}>
              {badges.map( getBadge )}
          </Stack>
      </Box>
    )

}
export default BadgeHandler