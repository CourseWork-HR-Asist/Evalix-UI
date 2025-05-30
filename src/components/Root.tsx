import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
// import HttpClient from '../lib/http'
// import { isTokenExpired } from '../lib/jwt'

// const routesWithNoAuth = ['/login', '/register']

interface AuthRedirectorProps {
  children: ReactNode
}

const AuthRedirector: FC<AuthRedirectorProps> = ({ children }) => {
//   const location = useLocation()
//   const httpClient = new HttpClient()

//   if (!isTokenExpired(httpClient.getToken())) {
//     if (!routesWithNoAuth.includes(location.pathname))
//       return <Navigate to="/login" state={{ from: location }} replace />
//   } else {
//     if (routesWithNoAuth.includes(location.pathname)) {
//       if (location.state?.from)
//         return <Navigate to={location.state.from} replace />
//       return <Navigate to="/" replace />
//     }
//   }

  return children
}

const Root = () => {
  return <AuthRedirector>
    <Outlet />
  </AuthRedirector>
}

export default Root