import { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './Item.module.css';
import { IItem } from '../../store/types';
import { Image } from '../Image';
import { Time } from '../Time';

export const Item: FC<IItem> = ({ id, title, body, date, image }) => {
  const heading = title !== '' ? title : '***';
  const link = `/fullscreen/${id}`;

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
        <Link to={link}>
          <Image {...image} />
        </Link>
        {figcaption}
      </figure>
      <Time date={date} />
    </article>
  );
};
