import { FC, ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { HttpClient } from "../libs/http";
import { isTokenExpired } from "../libs/jwt";

const routesWithNoAuth = ["/", "/about", "/auth"];

interface AuthRedirectorProps {
  children: ReactNode;
}

const AuthRedirector: FC<AuthRedirectorProps> = ({ children }) => {
  const location = useLocation();
  const httpClient = new HttpClient({ baseURL: "" });
  const isAuthenticated = isTokenExpired(httpClient.getToken());

  if (isAuthenticated) {
    if (location.pathname === "/auth") {
      return <Navigate to="/dashboard" replace />;
    }
  } else {
    if (!routesWithNoAuth.includes(location.pathname)) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
  }
  return children;
};

const Root = () => {
  return (
    <AuthRedirector>
      <Outlet />
    </AuthRedirector>
  );
};

export default Root;
