import { FC } from 'react';

import s from './Image.module.css';
import { classNames } from '../../util';

interface Props {
  src: string;
  width: number;
  height: number;
  lazy?: boolean;
}

export const Image: FC<Props> = ({ src, width, height, lazy = false }) => {
  const link = `https://static.wixstatic.com/media/${src}`;

  const className = classNames(
    s.image,
    lazy && s.lazy,
  );

  return (
    <img
      src={link}
      width={width}
      height={height}
      className={className}
      loading={lazy ? 'lazy' : undefined}
      decoding={lazy ? 'async' : undefined}
      crossOrigin="anonymous"
      alt=""
    />
  );
};
