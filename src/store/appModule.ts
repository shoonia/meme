import { TModule } from './types';

export const appModule: TModule = ({ on }) => {
  on('@init', () => {
    return {
      items: [],
      cache: {},
    };
  });

  on('items/set', (_, items) => ({ items }));
};
