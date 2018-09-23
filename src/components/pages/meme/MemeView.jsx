import React from 'react';
import PropTypes from 'prop-types';

import Time from '../helpers/Time';
import Button from '../helpers/Button';
import { Figure } from './meme-styled';

const MemeView = (props) => {
  const {
    title,
    image,
    body,
    date,
    onClick,
  } = props;

  return (
    <main className="has-text-centered">
      <h1 className="title is-4">{title || '***'}</h1>
      <Figure>
        <img src={image} alt={title} />
        <p>{body}</p>
        <Time date={date} />
      </Figure>
      <Button onClick={onClick}>
        Go Back
      </Button>
    </main>
  );
};

MemeView.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MemeView;