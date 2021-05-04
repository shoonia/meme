import { FC } from 'react';

import { HomePage } from './HomePage';
import { PostPage } from './PostPage';
import { NotFoundPage } from './NotFoundPage';

interface IRoute {
  path: string | string[];
  component: FC;
  exact?: boolean;
}

export const routes: IRoute[] = [
  {
    path: ['/', '/index.html'],
    exact: true,
    component: HomePage,
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
