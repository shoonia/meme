import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Time from '../helpers/Time';
import WrapperButton from '../helpers/WrapperButton';
import { ArticleFadeIn, ImgItem } from './list-styled';

const { PUBLIC_URL } = process.env;

const ListItem = (props) => {
  const {
    id,
    title,
    body,
    image,
    date,
    openModal,
  } = props;
  const openFunc = () => openModal(image);

  return (
    <ArticleFadeIn>
      <h3 className="title is-4 has-text-centered">
        <NavLink to={`${PUBLIC_URL}/post/${id}`}>
          {title.trim() || '***'}
        </NavLink>
      </h3>
      <figure className="has-text-centered">
        <WrapperButton
          aria-label="Show image"
          onClick={openFunc}
        >
          <ImgItem src={image.src} alt={title} />
        </WrapperButton>
        <p>{body}</p>
      </figure>
      <Time date={date} />
    </ArticleFadeIn>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  date: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default React.memo(ListItem);
