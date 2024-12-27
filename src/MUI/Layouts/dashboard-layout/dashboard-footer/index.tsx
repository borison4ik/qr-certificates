import { PAGES_URL } from '@/config/pages-url.config';
import { CustomLink } from '@/ui/CustomLink';
import { FC } from 'react';

const DashBoardFooter: FC = () => {
  return (
    <footer className='bg-white'>
      <div className='text-blue-600 p-2 rounded-md flex justify-between items-center gap-x-3'>
        <div className='flex gap-3 items-center'>
          <CustomLink to={`/${PAGES_URL.DASHBOARD}`} icon={{ name: 'Home' }} />
          <CustomLink to={`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATES_LIST}`} icon={{ name: 'List' }} />
        </div>
        <div>
          <CustomLink to={`/${PAGES_URL.DASHBOARD}/${PAGES_URL.CERTIFICATE_ADD}`} icon={{ name: 'FilePlus2' }} />
        </div>
      </div>
    </footer>
  );
};

export { DashBoardFooter };
