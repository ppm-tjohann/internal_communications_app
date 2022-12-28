import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../Store'
import { CalendarViewChange } from '../../../../actions/calendar/CalendarActions'
import React from 'react'
import { CalendarViewTypes } from '../../../../reducers/CalendarReducer'



const CalendarViewToggle = () => {

    const dispatch = useAppDispatch()
    const { view } = useAppSelector( state => state.calendar )

    console.log( 'View:', view )

    const handleChange = ( event: React.MouseEvent<HTMLElement>, newView: CalendarViewTypes ) => {
        console.log( 'New View :', newView )
        dispatch( CalendarViewChange( newView ) )
    }

    return (
      <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
          <ToggleButton value={'Month'}>Month</ToggleButton>
          <ToggleButton value={'Week'}>Week</ToggleButton>
          <ToggleButton value={'Day'}>Day</ToggleButton>
          <ToggleButton value={'List'}>List</ToggleButton>
      </ToggleButtonGroup>
    )
}
export default CalendarViewToggle