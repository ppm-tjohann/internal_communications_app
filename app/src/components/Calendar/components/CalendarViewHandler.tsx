import { useAppDispatch, useAppSelector } from '../../../Store'
import DayView from './views/DayView'
import WeekView from './views/WeekView'
import MonthView from './views/MonthView'
import ListView from './views/ListView'



const CalendarViewHandler = () => {

    const { view } = useAppSelector( state => state.calendar )

    switch ( view ) {
        case 'List':
            return <ListView/>
        case 'Week':
            return <WeekView/>
        case 'Month':
        default:
            return <MonthView/>
    }

}
export default CalendarViewHandler
