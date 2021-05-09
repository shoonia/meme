import { FC, MouseEventHandler } from 'react';

import x from './Close.module.css';

interface Props {
  onClick: MouseEventHandler;
}

export const Close: FC<Props> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={x.close}
    aria-label="close"
  />
);
