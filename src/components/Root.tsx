import { FC, ReactNode } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {HttpClient} from '../libs/http'
import { isTokenExpired } from '../libs/jwt'

const routesWithNoAuth = ['/', '/about', '/auth',]

interface AuthRedirectorProps {
  children: ReactNode
}

const AuthRedirector: FC<AuthRedirectorProps> = ({ children }) => {
  const location = useLocation()
  const httpClient = new HttpClient({baseURL: ""})

  if (!isTokenExpired(httpClient.getToken())) {
    if (!routesWithNoAuth.includes(location.pathname))
      return <Navigate to="/auth" state={{ from: location }} replace />
  } else {
    if (routesWithNoAuth.includes(location.pathname)) {
      if (location.state?.from)
        return <Navigate to={location.state.from} replace />
      return <Navigate to="/" replace />
    }
  }

  return children
}

const Root = () => {
  // return <AuthRedirector>
  //   <Outlet />
  // </AuthRedirector>
  return (<Outlet />)

}

export default Root