import { createBrowserRouter } from 'react-router-dom';

import { Suspense, lazy, React } from 'react';
import Layout from '../layout/Layout';
import condingRouter from './codingRouter';
import Loading from '../components/Loading';

const Main = lazy(() => import('../page/main'));
const Life = lazy(() => import('../page/life'));
const Coding = lazy(() => import('../page/coding'));
const Poto = lazy(() => import('../page/poto'));
const Info = lazy(() => import('../page/info'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: 'life',
        element: (
          <Suspense fallback={<Loading />}>
            <Life />
          </Suspense>
        ),
      },
      {
        path: 'coding',
        element: (
          <Suspense fallback={<Loading />}>
            <Coding />
          </Suspense>
        ),
        children: condingRouter,
      },
      {
        path: 'poto',
        element: (
          <Suspense fallback={<Loading />}>
            <Poto />
          </Suspense>
        ),
      },
      {
        path: 'info',
        element: (
          <Suspense fallback={<Loading />}>
            <Info />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
