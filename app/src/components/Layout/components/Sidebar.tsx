import * as React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'

import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import { ReactNode } from 'react'
import { Chat, Close, Dashboard, DateRange, Newspaper, People } from '@mui/icons-material'
import FlexBox from '../../utils/FlexBox'
import { useHistory, useLocation } from 'react-router'
import MenuItem from './MenuItem'



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

type MenuItems = {
    name: string
    link: string
    icon: ReactNode
}[]

const MenuItems: MenuItems = [
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

const Sidebar = () => {
    const [ open, setOpen ] = React.useState( false )
    const history = useHistory()
    const { pathname } = useLocation()

    console.log( 'Router Location :', pathname )
    MenuItems.forEach( item => {
        console.log( 'Is Route Match:', item.link, pathname.includes( item.link ) )
    } )

    const handleClick = ( label: string ) => () => {
        history.push( label )
        setOpen( false )
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
              <MenuItem active={pathname === '/'} onClick={handleClick} open={open} link={'/'} name={'Dashboard'} icon={<Dashboard/>}/>
              {MenuItems.map( ( item, index ) => (
                <MenuItem key={index} open={open} onClick={handleClick} active={pathname.includes( item.link )} {...item}/>
              ) )}
          </List>

      </Drawer>
    )
}
export default Sidebar