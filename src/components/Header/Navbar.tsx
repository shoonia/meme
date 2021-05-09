import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Navbar.module.css';

export const Navbar: FC = () => (
  <nav aria-label="Main menu">
    <ul className={s.list} role="menu">
      <li className={s.item} role="none">
        <NavLink
          to="/"
          className={s.link}
          activeClassName={s.active}
          role="menuitem"
          tabIndex={0}
        >
          Home
        </NavLink>
      </li>
    </ul>
  </nav>
);
