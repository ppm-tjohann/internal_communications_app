import React from 'react'
import { createTheme, responsiveFontSizes } from '@mui/material'



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
    typography: {
        subtitle1: { fontWeight: 700 },
        h1: { fontWeight: 700 },
    },
} )

// Theme –  DEFAULT PROPS
theme = createTheme( theme, {
    components: {
        MuiGrid: {
            defaultProps: {
                spacing: 3,
            },
            styleOverrides: {
                root: {
                    maxHeight: '100%',
                },
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
                    overflowY: 'scroll',
                },
            },
        },
    },
} )

theme = responsiveFontSizes( theme )

export default theme