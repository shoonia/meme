import { FC } from 'react';
import { List as VirtualizedList } from 'react-virtualized/dist/es/List';
import { WindowScroller } from 'react-virtualized/dist/es/WindowScroller';
import { useStoreon } from 'storeon/react';

import { IState } from '../../store/types';
import { Item } from './Item';

export const List: FC = () => {
  const { items } = useStoreon<IState>('items');

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <VirtualizedList
          autoHeight
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          scrollTop={scrollTop}
          width={500}
          rowCount={items.length}
          rowHeight={600}
          rowRenderer={({
            key, // Unique key within array of rows
            index, // Index of row within collection
            // isScrolling, // The List is currently being scrolled
            // isVisible, // This row is visible within the List (eg it is not an overscanned row)
            style,
          }) => (
            <div key={key} style={style}>
              <Item {...items[index]} />
            </div>
          )}
        />
      )}
    </WindowScroller>
  );
};
