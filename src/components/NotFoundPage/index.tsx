import { lazy, FC } from 'react';

export const NotFoundPage: FC = lazy(() => {
  return import(
    /* webpackChunkName: "NotFoundPage" */
    /* webpackPrefetch: true */
    './NotFoundPage'
  ).then((i) => {
    return {
      default: i.NotFoundPage,
    };
  });
});
