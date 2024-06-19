import React, { lazy, Suspense } from 'react';
import Loading from '../components/Loading';

const CodingPageList = lazy(() => import('../page/coding/CodingPageList'));
const CodingPageDetail = lazy(() => import('../page/coding/CodingPageDetail'));
const CodingPageSidebarCreate = lazy(() =>
  import('../page/coding/CodingPageSidebarCreate')
);
const CodingPagePostCreate = lazy(() =>
  import('../page/coding/CodingPagePostCreate')
);
const CodingPagePostUpdate = lazy(() =>
  import('../page/coding/CodingPagePostUpdate')
);

const detailRouter = {
  path: 'detail/:id',
  element: (
    <Suspense fallback={<Loading />}>
      <CodingPageDetail />
    </Suspense>
  ),
};

const updateRouter = {
  path: 'update/:postId',
  element: (
    <Suspense fallback={<Loading />}>
      <CodingPagePostUpdate />
    </Suspense>
  ),
};

const codingRouter = [
  {
    path: ':section0',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPageList />
      </Suspense>
    ),
    children: [
      detailRouter,
      {
        path: ':section1',
        element: (
          <Suspense fallback={<Loading />}>
            <CodingPageList />
          </Suspense>
        ),
        children: [
          detailRouter,
          {
            path: ':section2',
            element: (
              <Suspense fallback={<Loading />}>
                <CodingPageList />
              </Suspense>
            ),
            children: [
              detailRouter,
              {
                path: ':section3',
                element: (
                  <Suspense fallback={<Loading />}>
                    <CodingPageList />
                  </Suspense>
                ),
                children: [
                  detailRouter,
                  {
                    path: ':section4',
                    element: (
                      <Suspense fallback={<Loading />}>
                        <CodingPageList />
                      </Suspense>
                    ),
                    children: [detailRouter],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'sidebar',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPageSidebarCreate />
      </Suspense>
    ),
  },
  {
    path: 'post',
    element: (
      <Suspense fallback={<Loading />}>
        <CodingPagePostCreate />
      </Suspense>
    ),
  },
  updateRouter,
];

export default codingRouter;
