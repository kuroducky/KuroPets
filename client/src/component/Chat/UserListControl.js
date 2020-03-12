import React from 'react';
import UserListView from "./UserListView";

const userList = [
      {
          id : 'bob',
          name : 'Bob',
          text : 'You : Goodbye',
          time : '10.00 AM'
      },
      {
          id : 'carol',
          name : 'Carol',
          text : 'Carol : Heyo',
          time : 'Yesterday'
      }
  ];

class UserListControl extends React.Component {
  state = {
    userListDetails : {
      userId : this.props.userId,
      otherId : this.props.otherId,
      userList : userList,
      update : ()=>{
        alert("works");
        this.forceUpdate();
      }
    }
  };

  render() {
    const { userListDetails } = this.state;
    return <UserListView userListDetails={userListDetails} />;
  }
}

export default UserListControl;
