import { AxiosResponse } from 'axios'



export type ApiResponse<type> = Promise<AxiosResponse<type>>

export type ApiResponsePaginated<type> = ApiResponse<{
    data: type
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
}>
