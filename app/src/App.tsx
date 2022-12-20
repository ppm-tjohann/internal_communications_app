import React from 'react'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './lib/theme'
import { Provider } from 'react-redux'
import Store from './Store'
import Router from './components/Router'
import { BrowserRouter } from 'react-router-dom'



function App() {
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
