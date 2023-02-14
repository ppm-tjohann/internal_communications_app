import { useAppDispatch, useAppSelector } from '../../../../Store'
import { Button, ButtonGroup } from '@mui/material'
import { SkipNext, SkipPrevious } from '@mui/icons-material'
import { CalendarViewingDate } from '../../../../actions/calendar/CalendarActions'
import moment from 'moment'



const CalendarNavigation = () => {

    const dispatch = useAppDispatch()
    const { currentDate, viewingDate, view } = useAppSelector( state => state.calendar )

    const handleNow = () => {
        dispatch( CalendarViewingDate( moment( currentDate ) ) )
    }

    const handleNext = () => {

        switch ( view ) {
            case 'Month':
                return ( dispatch( CalendarViewingDate( moment( viewingDate ).add( 1, 'month' ) ) ) )
            case 'Week':
                return ( dispatch( CalendarViewingDate( moment( viewingDate ).add( 1, 'week' ) ) ) )
        }
    }
    const handlePrev = () => {
        console.log( 'Handling Navigation' )
        switch ( view ) {
            case 'Month':
                return ( dispatch( CalendarViewingDate( moment( viewingDate ).subtract( 1, 'month' ) ) ) )
            case 'Week':
                return ( dispatch( CalendarViewingDate( moment( viewingDate ).subtract( 1, 'week' ) ) ) )
        }
    }

    return (
      <ButtonGroup variant={'text'}>
          <Button onClick={handlePrev}>
              <SkipPrevious/>
          </Button>
          <Button onClick={handleNow}>today</Button>
          <Button onClick={handleNext}>
              <SkipNext/>
          </Button>
      </ButtonGroup>
    )

}
export default CalendarNavigation