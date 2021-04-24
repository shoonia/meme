import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getElementById } from './util';

const root = getElementById('main');
const header = getElementById('header');
const footer = getElementById('footer');

render(
  <StrictMode>
    <App />
    <Header root={header} />
    <Footer root={footer} />
  </StrictMode>,
  root,
);
