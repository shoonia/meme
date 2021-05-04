import { TModule } from './types';

export const appModule: TModule = ({ on, dispatch }) => {
  on('@init', () => {
    return {
      items: [],
      isLoaded: false,
    };
  });

  on('items/load', (_, items) => {
    return {
      items,
      isLoaded: true,
    };
  });

  fetch('https://shoonia.wixsite.com/meme-api/_functions/list')
    .then((res) => res.json())
    .then((data) => {
      dispatch('items/load', data.items);
    });
};
