/*
* TODO
* 1. Create Calendar Weekly View
* 2. Daily / Weekly / Monthly
* */

import CalendarViewHandler from './components/CalendarViewHandler'
import CalendarHeader from './components/CalendarHeader'
import EventPopup from '../Events/components/EventPopup'



const Calendar = () => {
    return ( <>
        <CalendarHeader/>
        <CalendarViewHandler/>
        <EventPopup/>
    </> )
}
export default Calendar