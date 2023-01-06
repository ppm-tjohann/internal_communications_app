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

export const getCalendarDates = ( date: string ) => {

    let preMonthDates: Day[] = [],
      nextMonthDates: Day[] = []

    const daysInMonth = moment( date ).daysInMonth()

    const RETURNING_DATES_COUNT = daysInMonth % 7
    let firstDay = parseInt( moment( date ).startOf( 'month' ).format( 'd' ) )
    if ( firstDay === 0 ) {
        firstDay = 7
    }
    const monthDates = getMonthDates( date )

    preMonthDates = getMonthDates( moment( date ).subtract( 1, 'month' ).
      format( DEFAULT_FORMAT ) ).reverse().slice( 0, firstDay - 1 ).reverse()

    nextMonthDates = getMonthDates( moment( date ).add( 1, 'month' ).
      format( DEFAULT_FORMAT ) ).
      slice( 0, 7 - ( monthDates.length + preMonthDates.length ) % 7 )

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
export const getTimeValues = ( format: string, limitValue: string = '0:00' ) => {
    let times = []
    for ( let i = 0; i < ( 4 * 24 ); i++ ) {
        times.push( moment().startOf( 'days' ).add( i * 15, 'minute' ).format( format ) )
    }
    return times
}
