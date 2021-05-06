import { lazy, FC } from 'react';

export const Modal: FC = lazy(() => {
  return import(
    /* webpackChunkName: "Modal" */
    /* webpackPrefetch: true */
    './Modal'
  ).then((i) => {
    return {
      default: i.Modal,
    };
  });
});
