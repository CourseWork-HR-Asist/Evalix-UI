import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "../components/layout/MainLayout";
import NotFoundPage from "../components/NotFoundPage";
import Root from "../components/Root";
import HomePage from "../features/home";
import AboutUs from "../features/aboutUs";
import PublicLayout from "../components/layout/PublicLayout";
import AuthPage from "../features/authorization";
import Dashboard from "../features/dashboard";
import { SkillPage } from "../features/skill/index";
import { VacancyPage } from "../features/vacancy";
import { ResumePage } from "../features/resume";

const BasicDataRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>
        <Route path="/" Component={PublicLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="/about" Component={AboutUs} />
        </Route>
        <Route path="/auth" Component={AuthPage} />
        <Route path="/" Component={Layout}>
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/skill" Component={SkillPage} />
          <Route path="/vacancy" Component={VacancyPage} />
          <Route path="/resumes" Component={ResumePage} />
        </Route>
        <Route path="*" Component={NotFoundPage} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default BasicDataRouter;
