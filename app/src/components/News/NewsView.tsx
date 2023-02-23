import { Box, Container, Grid, Paper, Skeleton, Typography } from '@mui/material'
import { News } from '../../interfaces/news'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import * as newsApi from '../../lib/api/news'
import Markdown from './components/Markdown'
import Loader from '../utils/Loader'
import Sidebar from '../../pages/News/Sidebar'
import Image from '../utils/Image'
import FlexBox from '../utils/FlexBox'
import AddNewsBar from './AddNewsBar'
import { useAppSelector } from '../../Store'



const NewsView = () => {

    const { user } = useAppSelector( state => state.auth )
    const { id } = useParams<{ id?: string | undefined }>()
    const [ loading, setLoading ] = useState( false )
    const [ news, setNews ] = useState<News | null>( null )

    useEffect( () => {

        setLoading( true )
        if ( id === undefined ) {
            newsApi.latest().then( res => {
                setNews( res.data )
                setLoading( false )
            } ).catch( e => {
                console.error( 'Error fetching latest News :', e )
            } )
        }
        else {
            newsApi.find( parseInt( id ) ).then( res => {
                setNews( res.data )
                setLoading( false )
            } ).catch( e => {
                console.error( 'Fetching News by id failed: ', e )
                setLoading( false )
            } )
        }

    }, [ id ] )

    return (
      <Grid container justifyContent={'space-between'}>
          {user && user.role === 'ADMIN' && <Grid item xs={12}>
            <AddNewsBar/>
          </Grid>}
          <Grid item xs={12}>
              <Paper sx={{ width: '100%', maxHeight: 600, overflow: 'hidden', p: 0 }}>
                  {loading || !news ? <Loader/> : <Image src={process.env.REACT_APP_SRC_BASE + news.image}/>}
              </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
              <Box>
                  <Container maxWidth={'md'} sx={{ my: 3 }}>
                      <Typography mb={2} variant={'h1'}>{news && !loading ? news.headline : <Skeleton variant={'text'}/>}</Typography>
                      {loading || !news ? <Loader/> : <Markdown>{news.text}
                      </Markdown>}
                  </Container>
              </Box>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
              <Sidebar/>
          </Grid>
      </Grid>
    )

}
export default NewsView