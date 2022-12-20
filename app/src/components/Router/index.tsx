import { Route, Switch } from 'react-router-dom'
import Login from '../Auth/Login'
import AuthRouter from './components/AuthRouter'
import Dashboard from '../../pages/Dashboard'
import { Container } from '@mui/material'
import Layout from '../Layout'



const Router = () => {

    return (
      <Switch>
          <Route path={'/login'}>
              <Login/>
          </Route>
          <AuthRouter>
              <Layout>
                  <Route path={'/'}>
                      <Dashboard/>
                  </Route>
              </Layout>
          </AuthRouter>
      </Switch>
    )

}

export default Router