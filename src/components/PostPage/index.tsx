import { lazy, FC } from 'react';

export const PostPage: FC = lazy(() => {
  return import(
    /* webpackChunkName: "PostPage" */
    /* webpackPrefetch: true */
    './PostPage'
  ).then((i) => {
    return {
      default: i.PostPage,
    };
  });
});
