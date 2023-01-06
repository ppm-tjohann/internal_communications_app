import { ReactNode } from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Loader from '../../utils/Loader'
import { Box } from '@mui/material'

import useCalendar from '../../../hooks/useCalendar'



interface AddEventFormWrapper {
    children: ReactNode | ReactNode[]
}

const AddEventFormWrapper = ( { children }: AddEventFormWrapper ) => {

    const { addEventLoading: loading } = useCalendar()

    return (
      <Box sx={{ p: 3, mb: 3 }} component={'form'}>
          {loading ? <Loader/> : <Box>{children}</Box>}
      </Box>
    )
}
export default AddEventFormWrapper