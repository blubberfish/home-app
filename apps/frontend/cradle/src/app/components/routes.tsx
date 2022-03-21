import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';

const HomePage = lazy(() => import('@blubberfish/frontend/pages/public/home'));
const LoginPage = lazy(
  () => import('@blubberfish/frontend/pages/public/login')
);
const DashboardPage = lazy(
  () => import('@blubberfish/frontend/pages/private/dashboard')
);

/** @todo */
const Empty = () => null;

export default () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Empty />}>
        <Routes>
          <Route
            path={PATH.PRIVATE.DASHBOARD}
            element={
              <DashboardPage
                links={[
                  { label: 'Account', path: PATH.PRIVATE.ACCOUNT },
                  { label: 'Recipes', path: PATH.PRIVATE.RECIPES },
                  { label: 'Users', path: PATH.PRIVATE.USERS },
                ]}
              />
            }
          >
            <Route index element={<Empty />} />
            <Route path={PATH.PRIVATE.USERS} element={<Empty />} />
            <Route path={PATH.ALL} element={<Empty />} />
          </Route>
          <Route path={PATH.PUBLIC.LOGIN} element={<LoginPage />} />
          <Route path={PATH.ALL} element={<HomePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
