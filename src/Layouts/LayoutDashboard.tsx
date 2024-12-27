import { PAGES_URL } from '@/config/pages-url.config';
import { useAuth } from '@/hooks/useAuth';
import { CustomLink } from '@/ui/CustomLink';
import { GlobalLoader } from '@/ui/GlobalLoader';
import Loader from '@/ui/Loader';
import { Button } from '@/ui/buttons/Button';
import { LogOut } from 'lucide-react';
import { FC, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const LayoutDashboard: FC = () => {
  const { sigOut } = useAuth();

  const navigator = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsPending(true);
      sigOut(() => {
        setIsPending(false);
        navigator(`/${PAGES_URL.LOGIN}`, { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex max-w-screen-lg mx-auto px-2 flex-col h-screen overflow-hidden w-full bg-zinc-900'>
      <header className='py-2'>
        <div className='p-2 flex justify-between items-center bg-zinc-700 rounded-md'>
          <h1 className='text-white font-bold text-xl pl-3'>
            <Link to={`/${PAGES_URL.DASHBOARD}`}>Certificates</Link> <span className='text-zinc-300 text-xs'>v.0.0.1</span>
          </h1>
          <div className='flex'>
            <GlobalLoader />
            <Button onClick={logoutHandler} className='flex items-center gap-x-3'>
              Выйти {isPending ? <Loader /> : <LogOut size={20} />}
            </Button>
          </div>
        </div>
      </header>
      <main className='flex-1 py-5 overflow-auto'>
        <Outlet />
      </main>
      <footer className='py-2'>
        <div className='bg-zinc-700 text-white p-2 rounded-md flex justify-between items-center gap-x-3'>
          <div className='flex gap-3 items-center'>
            <CustomLink to={`/${PAGES_URL.DASHBOARD}`} icon={{ name: 'Home' }} />
            <CustomLink to={`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`} icon={{ name: 'List' }} />
          </div>
          <div>
            <CustomLink to={`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATE_ADD}`} icon={{ name: 'FilePlus2' }} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export { LayoutDashboard };
