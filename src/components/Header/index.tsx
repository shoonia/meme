import { FC } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  root: HTMLElement;
}

export const Header: FC<Props> = ({ root }) =>
  createPortal(
    <div>Header</div>,
    root,
  );
