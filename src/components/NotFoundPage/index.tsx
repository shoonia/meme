import { lazy, FC } from 'react';

export const NotFoundPage: FC = lazy(() => {
  return import(
    /* webpackChunkName: "NotFoundPage" */
    './NotFoundPage'
  ).then((i) => {
    return {
      default: i.NotFoundPage,
    };
  });
});
