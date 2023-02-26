import { createContext, useState } from 'react'
import { Button, Container, Grid, Modal, Paper, Stack, Typography } from '@mui/material'
import UserAvatar from '../UserAvatar'
import { User } from '../../../interfaces/user'
import FlexBox from '../../utils/FlexBox'
import { Chat, Close, Mail } from '@mui/icons-material'
import BadgeHandler from '../../Badges/BadgeHandler'
import SquareBox from '../../utils/SquareBox'



interface UserContext {
    user: User
    context: 'read' | 'update'
}

export const UserContext = createContext( {} as UserContext )

interface UserPopup {
    user: User
    open: boolean
    onClose: () => any
}

const UserPopup = ( { user, open, onClose }: UserPopup ) => {

    return (
      <UserContext.Provider value={{ user, context: 'read' }}>
          <Modal open={open}>
              <FlexBox sx={{ height: '100%' }}>
                  <Container>
                      <Paper>
                          <Grid container>
                              <Grid item xs={12}>
                                  <Stack justifyContent={'space-between'}>
                                      <Typography variant={'h3'}>{user.username}</Typography>
                                      <Button onClick={onClose} startIcon={<Close/>}>Close</Button>
                                  </Stack>
                              </Grid>
                              <Grid item xs={12} sm={3}>
                                  <SquareBox>
                                      <UserAvatar user={user} size={'fill'} withBorder={true}/>
                                  </SquareBox>
                              </Grid>

                              <Grid item xs={12} sm={9} container>
                                  <Grid item lg={6} xs={12}>
                                      <Typography variant={'h5'}>{user.firstname} {user.lastname}</Typography>
                                      <Typography variant={'h5'} sx={{ fontWeight: 300 }}>{user.username}</Typography>

                                  </Grid>
                                  <Grid item lg={6} xs={12}>
                                      <Paper elevation={2}>
                                          <Typography variant={'body1'} mb={2}>User-Badges:</Typography>
                                          {user.badges && <BadgeHandler badges={user.badges}/>}
                                      </Paper>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Stack justifyContent={'flex-end'} direction={{ xs: 'column', md: 'row' }}>
                                          <Button variant={'contained'} startIcon={<Mail/>} href={`mailto:${user.email}`}>{user.email}</Button>
                                          <Button variant={'contained'} startIcon={<Chat/>}>Write Message</Button>
                                          {user.phone && <Button variant={'contained'} href={`tel:${user.phone}`} startIcon={<Chat/>}>{user.phone}</Button>}
                                      </Stack>
                                  </Grid>
                              </Grid>

                          </Grid>

                      </Paper>


                  </Container>
              </FlexBox>
          </Modal>
      </UserContext.Provider>
    )

}
export default UserPopup