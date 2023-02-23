import { Grid, Paper, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { NewsTeaser } from '../../../interfaces/news'
import Loader from '../../utils/Loader'
import * as newsApi from '../../../lib/api/news'
import DashboardNewsItem from './DashboardNewsItem'



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

    return ( <Grid container my={3} alignItems={'stretch'}>
        <Grid item xs={12}>
            <Typography variant={'h3'}>Recent News</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
                {loading ? <Loader/> : <DashboardNewsItem {...news[0]}/>}
            </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
                {loading ? <Loader/> : <DashboardNewsItem {...news[1]}/>}
            </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
            <Paper sx={{ height: '100%' }}>
                {loading ? <Loader/> : <DashboardNewsItem {...news[2]}/>}
            </Paper>
        </Grid>
    </Grid> )

}
export default DashboardNews