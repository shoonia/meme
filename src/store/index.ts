import { createStoreon } from 'storeon';

import { IEvents, IState } from './types';
import { appModule } from './appModule';

export const store = createStoreon<IState, IEvents>([
  appModule,
]);
