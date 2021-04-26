import { FC } from 'react';

import { HomePage } from './HomePage';
import { PostPage } from './PostPage';
import { NotFoundPage } from './NotFoundPage';

interface IRoute {
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
    path: '/index.html',
    component: HomePage,
    exact: true,
  },
  {
    path: '/post/:id',
    exact: true,
    component: PostPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
