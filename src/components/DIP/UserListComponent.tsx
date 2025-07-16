import React from 'react';
import DataList from './DataList';
import type { IDataService } from './interfaces/IDataService';
import type { User } from './interfaces/IDataService';

interface UserListProps {
  userService: IDataService<User>; // Depends on abstraction, not concrete class
}

function UserListComponent({ userService }: UserListProps) {
  const renderUser = (user: User) => (
    <li key={user.id}>
      <strong>{user.name}</strong> - {user.email}
    </li>
  );

  return (
    <div>
      <h2>Users</h2>
      <DataList 
        fetchData={() => userService.fetchData()} 
        renderItem={renderUser} 
      />
    </div>
  );
}

export default UserListComponent;
