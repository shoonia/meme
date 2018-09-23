import React from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import ListLoader from './ListLoader';

const List = ({ items, isLoading, openModal }) => {
  if (isLoading) {
    return <ListLoader />;
  }

  return (
    <main className="section">
      {items.map(meme => (
        <ListItem
          {...meme}
          key={meme.id}
          openModal={openModal}
        />
      ))}
    </main>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default List;
