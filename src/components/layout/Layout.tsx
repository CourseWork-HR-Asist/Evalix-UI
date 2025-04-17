import { Outlet } from 'react-router-dom'

const Layout = () => {
  return <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-3xl px-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Layout