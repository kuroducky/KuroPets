import React from 'react';
import UserListView from "./UserListView";

const userListDetails = {
    userId : 'alice',
    otherId : 'bob',
    userList : [
        {
            id : 'bob',
            name : 'Bob',
            text : 'You : Goodbye',
            time : '10.00 AM'
        },
        {
            id : 'wrongbob',
            name : 'Other Bob',
            text : 'Person 2 : Heyo',
            time : 'Yesterday'
        }
    ]
};

class UserListControl extends React.Component {
  state = {
    userListDetails : userListDetails
  };

  render() {
    const { userListDetails } = this.state;
    return <UserListView userListDetails={userListDetails} />;
  }
}

export default UserListControl;
