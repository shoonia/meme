import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NotFoundPage: FC = () => (
  <>
    <h1>not found</h1>
    <NavLink to="/">
      Home
    </NavLink>
  </>
);
