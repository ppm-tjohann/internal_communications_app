import { ValidationError } from '../interfaces/validationError'
import { BaseEvent } from '../interfaces/event'
import { ZodError } from 'zod'
import { AxiosError } from 'axios'



const validationErrors = ( error: any ): ValidationError<any> | undefined => {
    let errors: ValidationError<any> = {}
    if ( error instanceof ZodError ) {
        error.errors.forEach( zodError => {
            errors[zodError.path[0] as keyof BaseEvent] = zodError.message
        } )
    }
    else if ( error instanceof AxiosError )
        if ( error.response && error.response.status === 422 ) {
            const axiosErrors = error.response.data.errors

            Object.keys( axiosErrors ).forEach( errorKey => {
                errors[errorKey as keyof BaseEvent] = axiosErrors[errorKey]
            } )
        }
        else {
            console.error( 'Unknown Error : ', 500 )
        }
    if ( Object.keys( errors ).length === 0 ) {
        return undefined
    }
    return errors
}
export default validationErrors
