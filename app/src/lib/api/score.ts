import { ApiResponse } from '../../interfaces/apiResponse'
import Score from '../../interfaces/score'
import api from './index'



export const get = (): ApiResponse<Score[]> => api.get( 'score' )
export const bestOf = (): ApiResponse<Score[]> => api.get( 'score?include=user&sort=-count' )
