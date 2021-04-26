import { Suspense, FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { routes } from './routers';

export const App: FC = () => {
  const pages = routes.map((props) => (
    <Route key={props.path} {...props} />
  ));

  return (
    <Suspense fallback={null}>
      <Switch>
        {pages}
      </Switch>
    </Suspense>
  );
};
