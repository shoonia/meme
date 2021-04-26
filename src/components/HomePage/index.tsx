import { lazy, FC } from 'react';

export const HomePage: FC = lazy(() => {
  return import(
    /* webpackChunkName: "HomePage" */
    /* webpackPrefetch: true */
    './HomePage'
  ).then((i) => {
    return {
      default: i.HomePage,
    };
  });
});
