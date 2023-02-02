import React from 'react'
import { createTheme } from '@mui/material'



let theme = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
            main: '#f0ddbc',
        },
        background: {
            default: '#3a4257',
            paper: '#3a4257',
        },
    },

} )

// Theme –  DEFAULT PROPS
theme = createTheme( theme, {
    components: {
        MuiGrid: {
            defaultProps: {
                spacing: 3,
            },
        },
        MuiStack: {
            defaultProps: {
                direction: 'row',
                spacing: 3,
            },
        },
    },
} )

theme = createTheme( theme, {
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: theme.spacing( 3 ),
                },
            },
        },
    },
} )

export default theme