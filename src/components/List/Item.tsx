import { FC } from 'react';

import { IItem } from '../../store/types';
import { Image } from '../Image';

export const Item: FC<IItem> = ({ image }) => (
  <figure>
    <Image {...image} />
  </figure>
);
