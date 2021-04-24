import { FC } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  root: HTMLElement;
}

export const Footer: FC<Props> = ({ root }) =>
  createPortal(
    <div>Footer</div>,
    root,
  );
