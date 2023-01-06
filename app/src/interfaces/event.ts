import * as z from 'zod'
import { User } from './user'



export const TIME_FORMAT = 'HH:mm'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}:ss`

export const AddEventRequest = z.object( {
    name: z.string().min( 1 ),
    description: z.optional( z.string() ),
    start: z.string(),
    end: z.string(),

    participants: z.optional( z.array( z.number() ) ),
} )
export type AddEventRequest = z.infer<typeof AddEventRequest>

export type BaseEvent = {
    name: string
    description?: string
    start: string
    end: string
    participants?: number[]
}

export type Event = BaseEvent & {
    id: number,
    user: User,
    participants: User[],
}