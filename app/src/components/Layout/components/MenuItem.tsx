import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import * as React from 'react'
import { ReactNode } from 'react'
import { useLocation } from 'react-router'
import exp from 'constants'
import { Badge } from '@mui/material'



interface MenuItemProps {
    onClick: ( label: string ) => any
    open: boolean
    link: string
    name: string
    active: boolean
    icon: ReactNode

}

const MenuItem = ( { onClick, open, link, icon, name, active }: MenuItemProps ) => {
    return (
      <ListItem disablePadding sx={{ display: 'block', backgroundColor: active ? 'primary.main' : 'default' }}
                onClick={onClick( link )}>
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
                  <Badge badgeContent={name === 'Chat' ? 2 : 0} color={'secondary'} variant={'dot'}>
                      {icon}
                  </Badge>
              </ListItemIcon>
              <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }}/>
          </ListItemButton>
      </ListItem>
    )
}
export default MenuItem