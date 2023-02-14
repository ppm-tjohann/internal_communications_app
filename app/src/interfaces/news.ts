import * as z from 'zod'



export const NewsRequest = z.object( {
    headline: z.string(),
    teaser: z.string(),
    image: z.instanceof( File ).nullable(),
    text: z.string(),
} )
export type NewsRequest = {
    headline: string
    teaser: string
    text: string
    image: null | File

}
export type News = NewsRequest & {
    id: number
    created_at: string
    updated_at: string
    image: string
}
export type NewsTeaser = News & {
    text: ''
}