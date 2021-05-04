import { TModule } from './types';

export const appModule: TModule = ({ on }) => {
  on('@init', () => {
    return {
      items: [],
    };
  });

  on('items/set', (_, items) => ({ items }));
};
