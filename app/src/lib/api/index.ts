import axios, { AxiosResponse } from 'axios'
import Store from '../../Store'



let api = axios.create( {
    baseURL: 'http://localhost:8000/api/v1',
} )

api.interceptors.request.use( ( req ) => {
      const { apiToken } = Store.getState().auth
      console.log( 'apiToken : ', apiToken )
      api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`
      return req
  },
)

export default api
