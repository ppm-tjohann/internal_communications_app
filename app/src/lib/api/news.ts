import { NewsRequest, NewsTeaser, News } from '../../interfaces/news'
import api from './index'
import { ApiResponse } from '../../interfaces/apiResponse'



export const get = (): ApiResponse<NewsTeaser[]> => api.get( 'news' )
export const latest = (): ApiResponse<News> => api.get( 'news/latest' )
export const store = ( data: FormData ): ApiResponse<News> => api.post( 'news', data )
export const update = ( newsId: number, data: FormData ): ApiResponse<News> => api.post( `news/${newsId}`, data )
export const destroy = ( newsId: number ): ApiResponse<{ message: string }> => api.get( `news/${newsId}` )
export const find = ( newsId: number ): ApiResponse<News> => api.get( `news/${newsId}` )