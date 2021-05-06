import { FC } from 'react';

import { HomePage } from './HomePage';
// import { PostPage } from './PostPage';
import { NotFoundPage } from './NotFoundPage';

export interface IRoute {
  path: string | string[];
  component: FC;
  exact?: boolean;
}

export const MODAL_PATH = '/fullscreen/:id';

export const routes: IRoute[] = [
  {
    path: ['/', MODAL_PATH],
    component: HomePage,
    exact: true,
  },
  // {
  //   path: '/post/:id',
  //   component: PostPage,
  //   exact: true,
  // },
  {
    path: '*',
    component: NotFoundPage,
  },
];
