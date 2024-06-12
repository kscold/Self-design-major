import React, { lazy } from 'react';
import { Suspense } from 'react';
import Loading from '../components/Loading';

const CodingPageList = lazy(() => import('../page/coding/CodingPageList'));
const CodingPageDetail = lazy(() => import('../page/coding/CodingPageDetail'));
const CodingPageSidebarCreate = lazy(() =>
  import('../page/coding/CodingPageSidebarCreate')
);

const condingRouter = [
  {
    path: ':section',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPageList />
      </Suspense>
    ),
    // children: [
    //   {
    //     path: ':contentId',
    //     element: (
    //       <Suspense fallback={<Loading />}>
    //         <CodingPageDetail />
    //       </Suspense>
    //     ),
    //   },
    // ],
  },
  {
    path: ':section/:contentId',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPageDetail />
      </Suspense>
    ),
  },
  {
    path: 'sidebar',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPageSidebarCreate />
      </Suspense>
    ),
  },
];

export default condingRouter;
