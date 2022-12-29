import * as z from 'zod'
import { User } from './user'



export const AddEventRequest = z.object( {
    name: z.string(),
    description: z.optional( z.string() ),
    start: z.date(),
    end: z.date(),
    owner: z.number(),
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
    owner: User,
    participants: User[],
}