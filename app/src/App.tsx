import React, { useEffect } from 'react'
import './App.css'
import { CssBaseline, Paper, Stack, ThemeProvider } from '@mui/material'
import theme from './lib/theme'
import { Provider } from 'react-redux'
import Store from './Store'
import Router from './components/Router'
import { BrowserRouter } from 'react-router-dom'

import { createSocketconnection } from './lib/socketService'
import UiMessages from './global/UiMessages'
import { SnackbarProvider } from 'notistack'

// Style for MD-Editor
import 'react-markdown-editor-lite/lib/index.css'



function App() {
    useEffect( () => {
        createSocketconnection()
    }, [] )

    return (
      <Provider store={Store}>
          <ThemeProvider theme={theme}>
              <SnackbarProvider maxSnack={3}>
                  <CssBaseline/>
                  <UiMessages/>
                  <BrowserRouter>
                      <Router/>
                  </BrowserRouter>
              </SnackbarProvider>
          </ThemeProvider>
      </Provider>
    )
}


export default App
