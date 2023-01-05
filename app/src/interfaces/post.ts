import * as z from 'zod'



export const AddPostRequest = z.object( {
    text: z.string().min( 1 ),
    image: z.instanceof( File ),
} )

export type BasePost = {
    text: string
    image: File | null
}
export type Post = BasePost & {
    image: string
    id: number
}