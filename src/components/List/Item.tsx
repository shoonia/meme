import { FC } from 'react';

import { IItem } from '../../store/types';

export const Item: FC<IItem> = ({ id }) => (
  <div>{id}</div>
);
