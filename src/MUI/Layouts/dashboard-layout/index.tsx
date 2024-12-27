import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from './dashboard-header';
import { DashBoardFooter } from './dashboard-footer';

const LayoutDashboard: FC = () => {
  return (
    <div className='flex max-w-screen-lg mx-auto flex-col h-screen overflow-hidden w-full bg-gray-100'>
      <DashboardHeader />
      <main className='flex-1 py-5 px-2 overflow-auto'>
        <Outlet />
      </main>
      <DashBoardFooter />
    </div>
  );
};

export { LayoutDashboard };
