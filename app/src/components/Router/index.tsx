import { Route, Switch } from 'react-router-dom'
import Login from '../Auth/Login'
import AuthRouter from './components/AuthRouter'
import Dashboard from '../../pages/Dashboard'
import Layout from '../Layout'
import Calendar from '../../pages/Calendar'
import Post from '../Post'
import PostList from '../Post/PostList'
import ChatDashboard from '../Chat/ChatDashboard'
import ChatList from '../Chat/ChatList'
import Chat from '../../pages/Chat'



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
                  <Route path={'/chat'} exact>
                      <ChatDashboard/>
                  </Route>
                  <Route path={'/chat/:userId'}>
                      <Chat/>
                  </Route>
              </Layout>
          </AuthRouter>
      </Switch>
    )

}

export default Router