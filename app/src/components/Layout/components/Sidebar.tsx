import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Button } from '@mui/material'
import { ReactNode } from 'react'
import { Chat, Close, Dashboard, DateRange, Newspaper, People } from '@mui/icons-material'
import FlexBox from '../../utils/FlexBox'



const drawerWidth = 240

const openedMixin = ( theme: Theme ): CSSObject => ( {
    width: drawerWidth,
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    } ),
    overflowX: 'hidden',
} )

const closedMixin = ( theme: Theme ): CSSObject => ( {
    transition: theme.transitions.create( 'width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    } ),
    overflowX: 'hidden',
    width: `calc(${theme.spacing( 7 )} + 1px)`,
    [theme.breakpoints.up( 'sm' )]: {
        width: `calc(${theme.spacing( 8 )} + 1px)`,
    },
} )

const Drawer = styled( MuiDrawer, { shouldForwardProp: ( prop ) => prop !== 'open' } )(
  ( { theme, open } ) => ( {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...( open && {
          ...openedMixin( theme ),
          '& .MuiDrawer-paper': { ...openedMixin( theme ), padding: 0 },
      } ),
      ...( !open && {
          ...closedMixin( theme ),
          '& .MuiDrawer-paper': { ...closedMixin( theme ), padding: 0 },
      } ),
  } ),
)

interface MenuItem {
    name: string
    link: string
    icon: ReactNode
}

const MenuItems: MenuItem[] = [
    {
        name: 'Dashboard',
        link: '/',
        icon: <Dashboard/>,
    },
    {
        name: 'Calendar',
        link: '/calendar',
        icon: <DateRange/>,
    }, {
        name: 'Social',
        link: '/social',
        icon: <People/>,
    }, {
        name: 'Chat',
        link: '/chat',
        icon: <Chat/>,
    }, {
        name: 'News',
        link: '/news',
        icon: <Newspaper/>,
    },
]

export default function MiniDrawer() {
    const theme = useTheme()
    const [ open, setOpen ] = React.useState( false )

    const handleClick = () => {
    }

    const toggleDrawer = () => {
        setOpen( o => !o )
    }

    return ( <Drawer variant="permanent" open={open}>
          {
              open ?
                <Button onClick={toggleDrawer} startIcon={<Close/>}>Close</Button> :
                <FlexBox sx={{ backgroundColor: 'primary.dark' }}>
                    <IconButton onClick={toggleDrawer}>
                        <MenuIcon/>
                    </IconButton>
                </FlexBox>
          }
          <Divider/>
          <List>
              {MenuItems.map( ( item, index ) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                      }}
                    >
                        <ListItemIcon
                          sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                          }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }}/>
                    </ListItemButton>
                </ListItem>
              ) )}
          </List>

      </Drawer>
    )
}