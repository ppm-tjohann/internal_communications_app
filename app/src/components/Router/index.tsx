import { Route, Switch } from 'react-router-dom'
import Login from '../Auth/Login'
import AuthRouter from './components/AuthRouter'
import Dashboard from '../../pages/Dashboard'
import Layout from '../Layout'
import Calendar from '../../pages/Calendar'
import PostList from '../Post/PostList'
import Chat from '../../pages/Chat'
import News from '../../pages/News'
import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import FlexBox from '../utils/FlexBox'
import AdminRoute from './components/AdminRoute'
import AddNews from '../../pages/AddNews'
import NewsView from '../News/NewsView'
import Sidebar from '../../pages/News/Sidebar'



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
                      <Chat/>
                  </Route>
                  <AdminRoute redirectRoute={'/news'} path="/news/add" exact>
                      <AddNews/>
                  </AdminRoute>
                  <Route path={'/news'} exact>
                      <News/>
                  </Route>
                  <Route path={'/news/:id'} exact>
                      <NewsView/>
                  </Route>

              </Layout>
          </AuthRouter>
      </Switch>
    )

}

export default Router