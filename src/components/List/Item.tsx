import { FC } from 'react';

import s from './Item.module.css';
import { IItem } from '../../store/types';
import { Image } from '../Image';
import { Time } from '../Time';

export const Item: FC<IItem> = ({ title, body, date, image }) => {
  const heading = title !== '' ? title : '***';

  const figcaption = body !== '' && (
    <figcaption>
      {body}
    </figcaption>
  );

  return (
    <article>
      <h2 className={s.title}>
        {heading}
      </h2>
      <figure>
        <Image {...image} />
        {figcaption}
      </figure>
      <Time date={date} />
    </article>
  );
};
