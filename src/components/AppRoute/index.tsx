import { FC, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';

import { IRoute } from '../routers';

export const AppRoute: FC<IRoute> = ({ path, exact, component }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <Route path={path} exact={exact} component={component} />
  );
};
