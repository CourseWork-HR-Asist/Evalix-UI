import { Outlet } from 'react-router-dom'
import { NavbarWithSolidBackground } from './navigators/NavBar'

const PublicLayout = () => {
  return <>
   <div className="dark:bg-gray-900">
        <NavbarWithSolidBackground />
        <Outlet />
   </div>
  </>
}

export default PublicLayout