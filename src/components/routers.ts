import { FC } from 'react';
import { HomePage } from './HomePage';

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
    path: '*',
    component: NotFoundPage,
  },
];
