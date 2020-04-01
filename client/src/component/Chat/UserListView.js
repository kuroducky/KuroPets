import React from "react";
import { Link } from "react-router-dom";
import "./UserList.css";
import defaultAvatar from "./default-avatar.png";

class UserListView extends React.Component {

  render() {
    const { userId, otherId, chatList } = this.props;
    let userName;
    const items = [];
    chatList.forEach(user => {
      if (userId === user.otherId){
        [user.id, user.otherId] = [user.otherId, user.id];
        [user.name, user.otherName] = [user.otherName, user.name];
      }
      
      if (userId == user.id){
        if (userName === undefined){
          userName = user.name;
        }
  
        let className = "UserList__container__list__item";
        if (otherId == user.otherId) {
          className += " UserList__container__list__item--selected";
        }
  
        items.push(
          <li className={className}>
            <Link
              onClick={() => {this.props.updateSelectedUser(user.url)}}
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
                  {user.otherName}
                </p>
              </div>
            </Link>
          </li>
        );
      }
    });
    return (
      <div className="UserList">
        <div className="UserList__titlebar">
          <img
            src={defaultAvatar}
            className="UserList__titlebar__avatar"
            alt="avatar"
          />
          <span className="UserList__titlebar__logged-in-as">{userName}</span>
        </div>
        <div className="UserList__container">
          <ul className="UserList__container__list">{items}</ul>
        </div>
      </div>
    );
  }
}

export default UserListView;
