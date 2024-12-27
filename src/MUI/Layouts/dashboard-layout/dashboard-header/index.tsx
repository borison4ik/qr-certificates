import { FC } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { GlobalLoader } from '@/ui/GlobalLoader';
import { PAGES_URL } from '@/config/pages-url.config';
import { useAuth } from '@/hooks/useAuth';

const DashboardHeader: FC = () => {
  const { sigOut, isLoading } = useAuth();

  const navigator = useNavigate();

  const logoutHandler = async () => {
    sigOut(() => {
      navigator(`/${PAGES_URL.LOGIN}`, { replace: true });
    });
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Certificates <span className='text-xs'>v.0.0.2</span>
        </Typography>
        <div className='flex'>
          <GlobalLoader />
          <LoadingButton
            type='button'
            sx={{
              color: '#fff',
            }}
            onClick={logoutHandler}
            loading={isLoading}
            variant='outlined'
            loadingPosition='end'
            endIcon={<LogOut size={18} />}>
            Выйти
          </LoadingButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export { DashboardHeader };
