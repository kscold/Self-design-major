import React, { lazy } from 'react';
import { Suspense } from 'react';
import Loading from '../components/Loading'; // 로딩 컴포넌트 임포트

const CodingPageList = lazy(() => import('../page/coding/CodingPageList'));
const CodingPageDetail = lazy(() => import('../page/coding/CodingPageDetail'));

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
];

export default condingRouter;
