import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NotFoundPage from '../components/NotFoundPage'
import Root from '../components/Root'
import HomePage from '../features/home/HomePage'


const BasicDataRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Root}>
        <Route path="/" Component={Layout}>
            <Route path="/" Component={HomePage} />
            <Route path="*" Component={NotFoundPage} />
        </Route>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default BasicDataRouter