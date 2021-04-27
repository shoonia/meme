import { StoreonModule } from 'storeon';

import { IItem } from './types';

export interface IItemsState {
  items: IItem[];
}

export interface IItemsEvents {
  'items/set': IItem[];
}

type TModule = StoreonModule<IItemsState, IItemsEvents>;

export const itemsModule: TModule = ({ on }) => {
  on('@init', () => {
    return {
      items: [],
    };
  });

  on('items/set', (_, items) => ({ items }));
};
