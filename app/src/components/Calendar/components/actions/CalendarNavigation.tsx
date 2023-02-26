import { useAppDispatch, useAppSelector } from '../../../../Store'
import { Button, ButtonGroup } from '@mui/material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import { CalendarHandlePagination, CalendarViewingDate } from '../../../../actions/calendar/CalendarActions'
import moment from 'moment'
import { DEFAULT_FORMAT } from '../../../../reducers/CalendarReducer'



const CalendarNavigation = () => {

    const dispatch = useAppDispatch()
    const { currentDate, viewingDate, view } = useAppSelector( state => state.calendar )

    const handleClick = ( label: 'now' | 'prev' | 'next' ) => () => {
        let newDate = moment( viewingDate )
        switch ( label ) {
            case 'next':
                newDate = newDate.add( 1, view === 'Month' ? 'month' : 'week' )
                break
            case 'prev':
                newDate = newDate.subtract( 1, view === 'Month' ? 'month' : 'week' )
                break
            case 'now':
                newDate = moment()
        }
        dispatch( CalendarHandlePagination( newDate.format( DEFAULT_FORMAT ) ) )
        dispatch( CalendarViewingDate( newDate ) )
    }

    return (
      <ButtonGroup variant={'text'}>
          <Button onClick={handleClick( 'prev' )}>
              <SkipPrevious/>
          </Button>
          <Button onClick={handleClick( 'now' )}>today</Button>
          <Button onClick={handleClick( 'next' )}>
              <SkipNext/>
          </Button>
      </ButtonGroup>
    )

}
export default CalendarNavigation