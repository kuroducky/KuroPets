import React from "react";
import { Link } from "react-router-dom";
import "./UserList.css";
import defaultAvatar from "./default-avatar.png";

class UserListView extends React.Component {
  state = {
    otherId: this.props.userListDetails.otherId
  };
  updateSelectedUser = () => {
    const otherId = this.props.match.params;
    this.setState(otherId);
  };
  render() {
    const { userId, userList } = this.props.userListDetails;
    const { otherId } = this.state;
    const items = [];
    userList.forEach(user => {
      let className = "UserList__container__list__item";
      if (otherId === user.id) {
        className += " UserList__container__list__item--selected";
      }

      items.push(
        <li className={className}>
          <p>{otherId}</p>
          <Link
            onClick={this.updateSelectedUser}
            to={`/chat/${userId}/${user.id}`}
          >
            <div>
              <img
                src={defaultAvatar}
                className="UserList__container__list__item__avatar"
                alt="avatar"
              />
            </div>
            <div className="UserList__container__list__item__content">
              <p className="UserList__container__list__item__content__name">
                {user.name}
              </p>
              <p className="UserList__container__list__item__content__text">
                {user.text}
              </p>
            </div>
            <div className="UserList__container__list__item__time">
              {user.time}
            </div>
          </Link>
        </li>
      );
    });
    return (
      <div className="UserList">
        <div className="UserList__titlebar">
          <img
            src={defaultAvatar}
            className="UserList__titlebar__avatar"
            alt="avatar"
          />
          <span className="UserList__titlebar__logged-in-as">{userId}</span>
        </div>
        <div className="UserList__container">
          <ul className="UserList__container__list">{items}</ul>
        </div>
      </div>
    );
  }
}

export default UserListView;
