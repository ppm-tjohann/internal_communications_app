import { IconButton, Paper, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useHistory, useLocation } from 'react-router'



const AddNewsBar = () => {

    const history = useHistory()

    const handleClick = () => {
        history.push( '/news/add' )
    }

    return (
      <Paper sx={{ mb: 3, p: 2 }}>
          <Stack alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant={'h3'}>Add News</Typography>
              <IconButton onClick={handleClick}>
                  <Add/>
              </IconButton>
          </Stack>
      </Paper>
    )

}
export default AddNewsBar