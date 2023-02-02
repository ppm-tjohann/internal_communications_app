import React, { useEffect } from 'react'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './lib/theme'
import { Provider } from 'react-redux'
import Store from './Store'
import Router from './components/Router'
import { BrowserRouter } from 'react-router-dom'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// Style for MD-Editor
import 'react-markdown-editor-lite/lib/index.css'
import { createSocketconnection } from './lib/socketService'



function App() {
    useEffect( () => {
        createSocketconnection()
    }, [] )
    return (
      <Provider store={Store}>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <BrowserRouter>
                  <Router/>
              </BrowserRouter>
          </ThemeProvider>
      </Provider>
    )
}


export default App
