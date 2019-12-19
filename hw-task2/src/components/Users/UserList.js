import React from 'react';

import anonUser from '../../img/users@2x/user.png';

function handleImgError(event) {
  event.currentTarget.src = anonUser;
}

export default function UserList(props) {
  const userList = props.users.map(user => {
    return (
      <div className={`user ${props.isPlaceholder ? 'placeholder' : ''}`} key={user.id}>
        <img src={user.photo} alt={`Avatar of ${user.name}`} className="user__img" onError={handleImgError} />
        <div className="user__info">
          <h4 className="user__name">{user.name ? user.name : ''}</h4>
          <div className="user__position user__text">{user.position ? user.position : ''}</div>
          <div className="user__email user__text">{user.email ? user.email : ''}</div>
          <div className="user__phone user__text">
            {user.phone ? user.phone.replace(/\+38(\d{3})(\d{3})(\d{2})(\d{2})/, '+38 ($1) $2 $3 $4') : ''}
          </div>
        </div>
      </div>
    );
  });
  return userList;
}


