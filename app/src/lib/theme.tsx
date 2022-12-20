import { createTheme } from '@mui/material'



let theme = createTheme({
    palette:{
        mode:'dark'
    }
})
theme = createTheme(theme,{
    components:{
        MuiStack:{
            defaultProps:{
                direction:'row',
                spacing:3,
            }
        }
    }
})

theme = createTheme(theme,{
    components:{
        MuiPaper:{
            styleOverrides:{
                root:{
                    padding:theme.spacing(3)
                }
            }
        }
    }
} )



export default theme