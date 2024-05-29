import { createBrowserRouter } from 'react-router-dom';

import { Suspense, lazy, React } from 'react';
import Nav from '../layout/Nav';

const Main = lazy(() => import('../page/main'));
const Life = lazy(() => import('../page/life'));
const Coding = lazy(() => import('../page/coding'));
const Poto = lazy(() => import('../page/poto'));
const Info = lazy(() => import('../page/info'));

const loading = <h1>임시 로딩 페이지</h1>;

const router = createBrowserRouter([
  {
    element: <Nav />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={loading}>
            <Main />,
          </Suspense>
        ),
      },
      {
        path: 'life',
        element: (
          <Suspense fallback={loading}>
            <Life />,
          </Suspense>
        ),
      },
      {
        path: 'conding',
        element: (
          <Suspense fallback={loading}>
            <Coding />,
          </Suspense>
        ),
      },
      {
        path: 'poto',
        element: (
          <Suspense fallback={loading}>
            <Poto />,
          </Suspense>
        ),
      },
      {
        path: 'info',
        element: (
          <Suspense fallback={loading}>
            <Info />,
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
