import React, { useEffect } from 'react'
import './App.css'
import { CssBaseline, Paper, Stack, ThemeProvider } from '@mui/material'
import theme from './lib/theme'
import { Provider } from 'react-redux'
import Store from './Store'
import Router from './components/Router'
import { BrowserRouter } from 'react-router-dom'

// Style for MD-Editor
import 'react-markdown-editor-lite/lib/index.css'
import { createSocketconnection } from './lib/socketService'
import UiMessages from './global/UiMessages'



function App() {
    useEffect( () => {
        createSocketconnection()
    }, [] )
    
    return (
      <Provider store={Store}>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <UiMessages/>
              <BrowserRouter>
                  <Router/>
              </BrowserRouter>
          </ThemeProvider>
      </Provider>
    )
}


export default App
