import { FC } from 'react';
import { List as VirtualizedList, ListRowRenderer } from 'react-virtualized/dist/es/List';
import { WindowScroller, WindowScrollerChildProps } from 'react-virtualized/dist/es/WindowScroller';
import { useStoreon } from 'storeon/react';

import s from './List.module.css';
import { IState } from '../../store/types';
import { Item } from './Item';

export const List: FC = () => {
  const { items } = useStoreon<IState>('items');

  const rowRenderer: ListRowRenderer = ({
    key,
    index,
    style,
  }) => (
    <div
      key={key}
      style={style}
      className={s.item}
    >
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
      width={600}
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      scrollTop={scrollTop}
      rowCount={items.length}
      className={s.list}
      rowHeight={500}
      rowRenderer={rowRenderer}
    />
  );

  return (
    <WindowScroller>
      {WindowScrollerChildren}
    </WindowScroller>
  );
};
