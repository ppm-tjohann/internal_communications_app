import { Box, Grid } from '@mui/material'
import FlexBox from '../../utils/FlexBox'
import LoginForm from './components/LoginForm'
import bgImage from '../../../images/loginBackground.jpg'



const Login = ()=>{
    return(
      <Box sx={{height:'100vh',width:'100vw'}}>
          <Grid container alignItems={'stretch'} sx={{
              height:'100%'
          }}>
              <Grid item md={8} sx={{backgroundColor:'primary.main'}}>
                  <img src={bgImage} alt={''}/>
              </Grid>
              <Grid item xs={12} md={4}>
                 <FlexBox sx={{
                     height:'100%',
                 }}>
                     <LoginForm/>
                 </FlexBox>
              </Grid>


          </Grid>
      </Box>
    )
}
export default Login