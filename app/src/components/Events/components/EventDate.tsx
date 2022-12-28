import moment from 'moment'
import { Typography, TypographyVariant } from '@mui/material'
import { ElementType } from 'react'



interface EventDateProps {
    start: string
    end: string
    hFormat?: string
    dFormat?: string
    variant?: TypographyVariant
    component?: ElementType<any>
}

const EventDate = ( { end, start, dFormat = 'DD.MM.Y', hFormat = 'HH:MM', variant = 'body1', component = 'span' }: EventDateProps ) => {
    const getDate = () => {

        if ( moment( end ).isSame( start, 'day' ) ) {
            return `${moment( start ).format( dFormat )} ${moment( start ).format( hFormat )} – ${moment( end ).format( hFormat )}`
        }

        return `${moment( start ).format( `${dFormat} ${hFormat}` )} – ${moment( end ).format( `${dFormat} ${hFormat}` )}`
    }

    return <Typography variant={variant} component={component}>{getDate()}</Typography>

}
export default EventDate