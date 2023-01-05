import BoardCard from '../../utils/BoardCard'
import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import moment from 'moment'
import { useAppSelector } from '../../../Store'
import EventDate from './EventDate'
import Participants from './Participants'
import Loader from '../../utils/Loader'



const TodayEventsList = () => {

    const today = moment()

    const { events, loading } = useAppSelector( state => state.calendar )

    if ( loading ) {
        return <Loader/>
    }

    const todaysEvents = events.filter( event => today.isSame( moment( event.start ), 'day' ) )

    return (
      <BoardCard title={'Today\'s Events'} loading={loading}>
          {
              !loading && todaysEvents.length === 0 && events.length !== 0 ?
                <Typography variant={'subtitle1'}>No Events sheduled today</Typography>
                :
                <List>
                    {todaysEvents.map( event => <ListItemButton key={event.id}>
                        <Box sx={{ mr: 3 }}>
                            {moment( event.start ).format( 'HH:mm' )} <br/>
                            {moment( event.end ).format( 'HH:mm' )}
                        </Box>
                        <ListItemText primary={event.name} secondary={event.description} sx={{ flexShrink: 1 }}/>
                        <Participants users={event.participants}/>
                    </ListItemButton> )}
                </List>}
      </BoardCard>
    )
}
export default TodayEventsList