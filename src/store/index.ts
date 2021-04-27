import { createStoreon } from 'storeon';

import { itemsModule, IItemsState, IItemsEvents } from './itemsModule';

export type TState = IItemsState;
export type TEvents = IItemsEvents;

export const store = createStoreon<TState, TEvents>([
  itemsModule,
]);
