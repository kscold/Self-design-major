import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loading from '../components/Loading';
import Layout from '../layout/Layout';
import codingRouter from './codingRouter';

const Main = lazy(() => import('../page/main'));
const Life = lazy(() => import('../page/life'));
const Coding = lazy(() => import('../page/coding'));
const Photo = lazy(() => import('../page/photo'));
const Info = lazy(() => import('../page/info'));
const Auth = lazy(() => import('../page/auth'));

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
        path: 'login',
        element: (
          <Suspense fallback={<Loading />}>
            <Auth />
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
        children: codingRouter,
      },
      {
        path: 'photo',
        element: (
          <Suspense fallback={<Loading />}>
            <Photo />
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
