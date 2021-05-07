import { useParams } from 'react-router';
import { useStoreon } from 'storeon/react';

import { IItem, IState } from '../store/types';

export const usePost = (): IItem | undefined => {
  const { items } = useStoreon<IState>('items');
  const { id } = useParams<{id?: string}>();

  return items.find((item) => {
    return item.id === id;
  });
};
