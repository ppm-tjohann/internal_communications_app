import { Route, Switch } from 'react-router-dom'
import Login from '../Auth/Login'
import AuthRouter from './components/AuthRouter'
import Dashboard from '../../pages/Dashboard'
import Layout from '../Layout'
import Calendar from '../../pages/Calendar'
import Post from '../Post'
import PostList from '../Post/PostList'



const Router = () => {

    return (
      <Switch>
          <Route path={'/login'}>
              <Login/>
          </Route>
          <AuthRouter>
              <Layout>
                  <Route path={'/'} exact>
                      <Dashboard/>
                  </Route>
                  <Route path={'/calendar'}>
                      <Calendar/>
                  </Route>
                  <Route path={'/social'}>
                      <PostList/>
                  </Route>
              </Layout>
          </AuthRouter>
      </Switch>
    )

}

export default Router