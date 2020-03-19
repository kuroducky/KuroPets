import React from "react";
import UserListView from "./UserListView";

class UserListControl extends React.Component {
  render() {
    return (
    <div>
      <UserListView {...this.props} />
    </div>);
  }
}

export default UserListControl;
