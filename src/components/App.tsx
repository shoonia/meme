import { Suspense, FC } from 'react';
import { Switch } from 'react-router-dom';

import { routes } from './routers';
import { AppRoute } from './AppRoute';

export const App: FC = () => {
  const pages = routes.map((props, i) => (
    <AppRoute key={i} {...props} />
  ));

  return (
    <Suspense fallback={null}>
      <Switch>
        {pages}
      </Switch>
    </Suspense>
  );
};
