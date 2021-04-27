import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Navbar.module.css';

export const Navbar: FC = () => (
  <nav>
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink to="/" className={s.link}>
          Home
        </NavLink>
      </li>
    </ul>
  </nav>
);
