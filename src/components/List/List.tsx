import { FC } from 'react';
import { List as VirtualizedList, ListRowRenderer } from 'react-virtualized/dist/es/List';
import { WindowScroller, WindowScrollerChildProps } from 'react-virtualized/dist/es/WindowScroller';
import { useStoreon } from 'storeon/react';

import { IState } from '../../store/types';
import { Item } from './Item';

export const List: FC = () => {
  const { items } = useStoreon<IState>('items');

  const rowRenderer: ListRowRenderer = ({
    key,
    index,
    style,
  }) => (
    <div key={key} style={style}>
      <Item {...items[index]} />
    </div>
  );

  const WindowScrollerChildren: FC<WindowScrollerChildProps> = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
  }) => (
    <VirtualizedList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      scrollTop={scrollTop}
      width={500}
      rowCount={items.length}
      rowHeight={600}
      rowRenderer={rowRenderer}
    />
  );

  return (
    <WindowScroller>
      {WindowScrollerChildren}
    </WindowScroller>
  );
};
