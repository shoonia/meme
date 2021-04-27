import { FC } from 'react';
import { createPortal } from 'react-dom';

import { Navbar } from './Navbar';

interface Props {
  root: HTMLElement;
}

export const Header: FC<Props> = ({ root }) =>
  createPortal(
    <Navbar />,
    root,
  );
