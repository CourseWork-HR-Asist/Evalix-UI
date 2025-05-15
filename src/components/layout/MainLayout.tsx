import { Outlet } from 'react-router-dom';
import  DashboardNavBar  from './navigators/DashBoardNavBar';

const Layout = () => {
  return (
    <div className="dark:bg-gray-900 bg-gray-100 transition-colors duration-300 pb-16 md:pb-0">
      
    

     <DashboardNavBar />
      <div className="flex-1 min-h-screen">
        <div className="container mx-auto p-8">
       
          <div className="flex flex-wrap">
            
            
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* <BottomNav /> */}
    </div>
  );
}

export default Layout;