import React from 'react';
import { Link } from 'react-router-dom';

import image from './error-404.gif';

const { PUBLIC_URL } = process.env;

const NotFound = () => (
  <section className="has-text-centered" role="alert">
    <figure>
      <h1 aria-label="Error 404 not found">
        <span />
      </h1>
      <img src={image} alt="Error 404 not found" />
    </figure>
    <Link
      to={`${PUBLIC_URL}/`}
      className="button is-info is-rounded is-outlined"
    >
      Home
    </Link>
  </section>
);

export default NotFound;