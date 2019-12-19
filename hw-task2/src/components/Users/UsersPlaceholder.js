import React from 'react';
import Users from './UsersFetched';

export default function UsersPlaceholder(props) {
  const isDesk = window.matchMedia('(min-width: 690px)').matches;
  const fakeUsers = [
    {
      email: 'userEmail@mail.com',
      id: '1',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    },
    {
      email: 'userEmail@mail.com',
      id: '2',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    },
    {
      email: 'userEmail@mail.com',
      id: '3',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    }
  ];
  const fakeUsersDesk = [
    {
      email: 'userEmail@mail.com',
      id: '4',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    },
    {
      email: 'userEmail@mail.com',
      id: '5',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    },
    {
      email: 'userEmail@mail.com',
      id: '6',
      name: 'Name SecondName',
      phone: '+380000000000',
      photo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      position: 'User position'
    }
  ];
  const users = !isDesk ? fakeUsers : fakeUsers.concat(fakeUsersDesk);
  return <Users users={users} handleShowMoreClick={function() {}} isPlaceholder={true} SM_isVisible={false} />;
}
