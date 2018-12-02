import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';
import { getMessages } from '../../selectors';
import { removeMessage } from '../../actions/messages';
import css from './messenger.module.scss';

const FlashMessenger = ({ items, remove }) => (
  <aside className={css.wrapper}>
    {items.map(item => (
      <Message
        {...item}
        key={item.id}
        remove={remove}
      />
    ))}
  </aside>
);

FlashMessenger.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: getMessages(state),
});

const mapDispatchToProps = {
  remove: removeMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessenger);