import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../components/layout/MainLayout";
import NotFoundPage from "../components/NotFoundPage";
import Root from "../components/Root";
import HomePage from "../features/home/";
import AboutUs from "../features/aboutUs";
import PublicLayout from "../components/layout/PublicLayout";
import AuthPage from "../features/authorization";

const BasicDataRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>
        <Route path="/" Component={PublicLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutUs} />
        </Route>
        <Route path="/auth" Component={AuthPage}/>
        <Route path="/" Component={Layout}>
          <Route path="*" Component={NotFoundPage} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BasicDataRouter;
