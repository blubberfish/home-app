import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from '@blubberfish/frontend/pages/routes';

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
                features={[
                  { label: 'Account', props: { path: PATH.PRIVATE.ACCOUNT } },
                  { label: 'Recipes', props: { path: PATH.PRIVATE.RECIPES } },
                  { label: 'Users', props: { path: PATH.PRIVATE.USERS } },
                ]}
              />
            }
          >
            <Route index element={<Empty />} />
            <Route path={PATH.PRIVATE.USERS} element={<Empty />} />
            <Route path={PATH.ALL} element={<Empty />} />
          </Route>
          <Route path={PATH.PUBLIC.LOGIN} element={<Empty />} />
          <Route path={PATH.ALL} element={<Empty />} />
        </Routes>
      </Suspense>
    </BrowserRouter >
  );
};
