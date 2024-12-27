import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const LayoutApp: FC = () => {
  return (
    <div className='h-screen w-screen bg-blue-200'>
      <Outlet />
    </div>
  );
};

export { LayoutApp };
