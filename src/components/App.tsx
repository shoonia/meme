import { Suspense, FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { MODAL_PATH, routes } from './routers';
import { Modal } from './Modal';

export const App: FC = () => {
  const pages = routes.map((props, i) => (
    <Route key={i} {...props} />
  ));

  return (
    <Suspense fallback={null}>
      <Switch>
        {pages}
      </Switch>
      <Switch>
        <Route exact path={MODAL_PATH}>
          <Modal />
        </Route>
      </Switch>
    </Suspense>
  );
};
