import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserList from './UserList';

export default function Users(props) {
  return (
    <Fragment>
      <div className="users container" id="users">
        <h2 className="users__head">Our cheerful users</h2>
        <h5 className="users__subhead">
          Attention! Sorting users
          <br className="mob-br" /> by registration date
        </h5>
        <div className="users__content">
          <UserList users={props.users} isPlaceholder={props.isPlaceholder} />
        </div>
        <div
          id="showMore"
          className={`
            users__btn btn secondary 
            ${!props.SM_isVisible ? 'users__btn--none' : ''} 
            ${props.SM_isPressed ? 'pressed' : ''} 
            ${props.SM_isLoading ? 'loading' : ''}
          `}
          onClick={props.handleShowMoreClick}
          onKeyDown={props.handleShowMoreClick}
          tabIndex={props.tabIndex}
          aria-label={'Show more button'}
        >
          Show more
        </div>
      </div>
    </Fragment>
  );
}

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      photo: PropTypes.string,
      position: PropTypes.string
    })
  ).isRequired,
  handleShowMoreClick: PropTypes.func.isRequired,
  SM_isVisible: PropTypes.bool.isRequired,
  SM_isPressed: PropTypes.bool,
  SM_isLoading: PropTypes.bool,
  isPlaceholder: PropTypes.bool
};
