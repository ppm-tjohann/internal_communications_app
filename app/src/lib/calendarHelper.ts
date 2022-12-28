import moment, { Moment } from 'moment'
import { DEFAULT_FORMAT } from '../reducers/CalendarReducer'
import { Event } from '../interfaces/event'



export type Day = {
    date: string,
}
export const getMonthDates = ( date: string ) => new Array( moment( date ).daysInMonth() ).
  fill( null ).
  map<Day>( ( x, i ) => ( {
      date: moment( date ).startOf( 'month' ).add( i, 'days' ).format( DEFAULT_FORMAT ),
  } ) )

export const getWeekDates = ( date: string ) => {
    const days: Day[] = []
    for ( let i = 0; i < 7; i++ ) {
        days.push( {
            date: moment( date ).startOf( 'week' ).add( i, 'days' ).format( DEFAULT_FORMAT ),
        } )
    }
    return days
}

// always return 7*5 dates
export const getCalendarDates = ( date: string ) => {
    const RETURNING_DATES_COUNT = 35
    const firstDay = parseInt( moment( date ).startOf( 'month' ).format( 'd' ) )
    const daysInMonth = moment( date ).daysInMonth()
    const preMonthDates = getMonthDates( moment( date ).subtract( 1, 'month' ).
      format( DEFAULT_FORMAT ) ).
      reverse().
      slice( 0, firstDay - 1 ).
      reverse()

    const monthDates = getMonthDates( date )
    const nextMonthDates = getMonthDates( moment( date ).add( 1, 'month' ).
      format( DEFAULT_FORMAT ) ).
      slice( 0, RETURNING_DATES_COUNT - ( firstDay - 1 + daysInMonth ) )

    return [ ...preMonthDates, ...monthDates, ...nextMonthDates ]

}

export const groupEventsByDate = ( events: Event[], property: keyof Event ) => {
    return events.reduce( ( groups, item ) => {
        const name = item[property]
        //@ts-ignore
        const group = groups[name] || ( groups[name] = [] )
        group.push( item )
        return groups
    }, {} )
}
