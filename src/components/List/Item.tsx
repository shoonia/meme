import { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './Item.module.css';
import { IItem } from '../../store/types';
import { Image } from '../Image';
import { Time } from '../Time';

export const Item: FC<IItem> = ({ id, title, body, date, image }) => {
  const heading = title !== '' ? title : '***';
  const linkFullscreen = `/fullscreen/${id}`;
  const linkPost = `/post/${id}`;

  const figcaption = body !== '' && (
    <figcaption>
      {body}
    </figcaption>
  );

  return (
    <article>
      <h2 className={s.title}>
        <Link to={linkPost} className={s.link}>
          {heading}
        </Link>
      </h2>
      <figure>
        <Link to={linkFullscreen}>
          <Image lazy {...image} />
        </Link>
        {figcaption}
      </figure>
      <Time date={date} />
    </article>
  );
};
