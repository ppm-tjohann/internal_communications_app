import { Route } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAppSelector } from '../../../Store'
import { Redirect, useHistory } from 'react-router'



interface AdminRouteProps {
    path: string
    exact?: boolean
    redirectRoute: string
    children: ReactNode
}

const AdminRoute = ( { path, redirectRoute, children, exact = false }: AdminRouteProps ) => {
    const { user } = useAppSelector( state => state.auth )

    //TODO check if user is admin
    //if ( !user || user.role !== 'ADMIN' ) {
    //    return <Redirect to={redirectRoute}/>
    //}

    return (
      <Route path={path} exact={exact}>
          {children}
      </Route>
    )
}
export default AdminRoute