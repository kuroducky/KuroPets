import React from 'react';
import { Link } from "react-router-dom";
import './UserList.css';
import defaultAvatar from './default-avatar.png';

const UserListView = ({ userListDetails }) => {
    const {
        userId,
        otherId,
        userList,
        update
    } = userListDetails;

    const items = [];
    userList.forEach(user => {
        let className = "UserList__container__list__item"
        if (otherId === user.id){
            className += " UserList__container__list__item--selected";
        }

        items.push(
            <li className={className}>
            <p>{otherId}</p>
              <Link onClick={update} to={`/chat/${userId}/${user.id}`}>
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
        )
    })
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
        <ul className="UserList__container__list">
            {items}
        </ul>
      </div>
    </div>
  );
}

export default UserListView;
