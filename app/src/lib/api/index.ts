import axios, { AxiosResponse } from 'axios'
import Store from '../../Store'



let api = axios.create( {
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'accept': 'Application/json',
        'authorization': `Bearer ${localStorage.getItem( 'API_KEY' )}`,
    },
} )

export default api
