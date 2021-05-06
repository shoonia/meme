import { FC } from 'react';
import { useDate } from './useDate';

interface Props {
  date: number;
}

export const Time: FC<Props> = ({ date }) => {
  const { iso, a11y, label } = useDate(date);

  return (
    <time dateTime={iso} title={a11y}>
      {label}
    </time>
  );
};
