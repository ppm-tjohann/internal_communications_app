import { Paper, Box, Typography } from '@mui/material'
import SidebarItem from './components/SidebarItem'
import { useAppDispatch, useAppSelector } from '../../Store'
import { useEffect } from 'react'
import { loadNewsTeaser } from '../../actions/news/NewsActions'



const Sidebar = () => {

    const { newsTeaser } = useAppSelector( state => state.news )
    const dispatch = useAppDispatch()

    useEffect( () => {
        if ( newsTeaser.length === 0 ) {
            console.log( 'Loading NewsTeaser' )
            dispatch( loadNewsTeaser() )
        }
    }, [] )

    console.log( newsTeaser )

    return (
      <Box sx={{ overflowY: 'scroll', height: '100%' }}>
          {newsTeaser.map( teaser => <SidebarItem {...teaser} key={teaser.id}/> )}
      </Box>
    )
}
export default Sidebar