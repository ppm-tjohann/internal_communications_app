import { Grid, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { NewsTeaser } from '../../../interfaces/news'
import Loader from '../../utils/Loader'
import * as newsApi from '../../../lib/api/news'
import DashboardNewsItem from './DashboardNewsItem'
import MuiPaper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'



const Paper = styled( MuiPaper )( ( { theme } ) => ( {
    borderRadius: theme.spacing( 3 ),
} ) )

const DashboardNews = () => {

    const [ loading, setLoading ] = useState( true )
    const [ news, setNews ] = useState<NewsTeaser[]>( [] )

    useMemo( () => {
        if ( news.length === 0 ) {
            setLoading( true )
            newsApi.get().then( res => {
                setNews( res.data )
                setLoading( false )
            } ).catch( e => {
                console.error( 'Fechtign Dashboard news failed :', e )
                setLoading( false )
            } )
        }
    }, [] )

    return ( <Grid container alignItems={'stretch'} sx={{ height: '100%' }}>
        <Grid item xs={12} md={4}>
            {loading ? <Loader/> : <DashboardNewsItem {...news[0]}/>}
        </Grid>
        <Grid item xs={12} md={4}>
            {loading ? <Loader/> : <DashboardNewsItem {...news[1]}/>}
        </Grid>
        <Grid item xs={12} md={4}>
            {loading ? <Loader/> : <DashboardNewsItem {...news[2]}/>}
        </Grid>
    </Grid> )

}
export default DashboardNews