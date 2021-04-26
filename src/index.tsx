import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'storeon/react';

import { App } from './components/App';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getElementById } from './util';
import { store } from './store';

const root = getElementById('main');
const header = getElementById('header');
const footer = getElementById('footer');

render(
  <StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <App />
        <Header root={header} />
        <Footer root={footer} />
      </StoreContext.Provider>
    </BrowserRouter>
  </StrictMode>,
  root,
);
