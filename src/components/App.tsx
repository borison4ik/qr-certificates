import { FC, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LayoutApp } from '@/Layouts/LayoutApp';
import { LayoutDashboard } from '@/MUI/Layouts/dashboard-layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/MUI/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { CetrificatePage } from '@/MUI/pages/CetrificatePage';
import { PAGES_URL } from '@/config/pages-url.config';
import { HomePage } from '@/pages/HomePage';
import { AddCetrificatePage } from '@/MUI/pages/AddCetrificatePage';
import { UpdateCetrificatePage } from '@/MUI/pages/UpdateCetrificatePage';
import { CertificateListPage } from '@/MUI/pages/CertificateListPage';
import { RequireAuth } from '@/hoc/RequireAuth';
import { useAuth } from '@/hooks/useAuth';

const App: FC = () => {
  const { checkAuth } = useAuth();

  useLayoutEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
    }
  }, []);
  return (
    <Routes>
      <Route path={PAGES_URL.ROOT} element={<LayoutApp />}>
        <Route index element={<HomePage />} />
        <Route path={PAGES_URL.LOGIN} element={<LoginPage />} />
        <Route path={`${PAGES_URL.CERTIFICATE}/:id`} element={<CetrificatePage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route
          path={PAGES_URL.DASHBOARD}
          element={
            <RequireAuth>
              <LayoutDashboard />
            </RequireAuth>
          }>
          <Route index element={<DashboardPage />} />
          <Route path={PAGES_URL.CERTIFICATES_LIST} element={<CertificateListPage />} />
          <Route path={PAGES_URL.CERTIFICATE_ADD} element={<AddCetrificatePage />} />
          <Route path={`${PAGES_URL.CERTIFICATE_UPDATE}/:id`} element={<UpdateCetrificatePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { App };
