import { Box, IconButton, Paper, Stack } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'



const NavigationsBar = () => {

    return ( <Paper>
          <Stack alignItems={'center'} justifyContent={'space-between'}>
              <Box><IconButton><ArrowBack/></IconButton></Box>
          </Stack>
      </Paper>
    )

}
export default NavigationsBar