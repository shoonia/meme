import { FC } from 'react';

import { HomePage } from './HomePage';
import { PostPage } from './PostPage';
import { NotFoundPage } from './NotFoundPage';

export interface IRoute {
  path: string;
  component: FC;
  exact?: boolean;
}

export const routes: IRoute[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/post/:id',
    component: PostPage,
    exact: true,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
