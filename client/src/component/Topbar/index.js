import React, { useEffect, Fragment } from "react";
import {
  Layout,
  Input,
  Button,
  Tooltip,
  Badge,
  Dropdown,
  Menu,
  Typography,
  notification
} from "antd";

import { Link } from "react-router-dom";
import {
  MessageFilled,
  EnvironmentFilled,
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import LoginControl from "./LoginControl";
import { logout } from "../../Auth";
const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Topbar = props => {
  const logoStyles = {
    width: "120px",
    height: "31px",
    float: "left",
    margin: "-3px 28px 16px 0"
  };

  const headerStyles = {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    paddingRight: "5%",
    paddingLeft: "5%",
    borderBottom: "1px solid #f0f0f0"
  };

  // Notification fetch logic
  useEffect(() => {
    async function fetchNotif() {
      if (localStorage.getItem("user")) {
        const { accountID } = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `http://172.21.148.170/api/user/${accountID}/notification`
        );
        let content = await response.json();
        console.log("notification", content);
        content.forEach(notif => {
          notification.open({
            message: notif.type
          });
        });
      }
    }
    fetchNotif();
  }, []);

  const logOutUser = () => {
    logout();
    props.history.push("/");
  };
  let currentUser = JSON.parse(localStorage.getItem("user"));

  const onSearchSubmit = value => {
    const keywords = value.split(" ");
    props.onSearchSubmit(keywords);
    props.history.push("/");
  };
  const userMenu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          props.history.push(`/user/${currentUser.accountID}`);
        }}
      >
        <span>
          <UserOutlined />
        </span>
        {localStorage.getItem("user") ? (
          <Text strong>{currentUser.name}</Text>
        ) : (
          ""
        )}
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          props.history.push(`/user/${currentUser.accountID}`);
        }}
      >
        <span>
          <FileTextOutlined />
        </span>
        <Text>My Posts</Text>
      </Menu.Item>
      <Menu.Item onClick={logOutUser}>
        <span>
          <LogoutOutlined />
        </span>
        <Text> Logout</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={headerStyles}>
        {/* we will add our app logo here */}
        <div className="logo" style={logoStyles}>
          <a href="/">
            <img
              style={{ maxHeight: "180px", maxWidth: "180px" }}
              src="/kuropets.png"
              alt="kuropets"
            />
          </a>
        </div>
        <Search
          className="search"
          size="large"
          placeholder="Search posts..."
          onSearch={onSearchSubmit}
          style={{
            width: 800,
            marginLeft: "60px",
            backgroundColor: "#f0f1f1",
            border: "none"
          }}
        />
        {/* Create post button */}
        {localStorage.getItem("user") ? (
          <Link to="/post">
            <Button
              type="primary"
              size="medium"
              style={{
                float: "right",
                marginTop: "16px",
                padding: "0 20px 0 20px"
              }}
            >
              <strong>Post</strong>
            </Button>
          </Link>
        ) : (
          <LoginControl {...props} />
        )}

        {/* Chat Button, counter represents unopened chats KIV*/}
        {localStorage.getItem("user") ? (
          <Fragment>
            <Tooltip title="Chat">
              <span
                style={{
                  float: "right",
                  marginTop: "0px",
                  marginRight: "50px"
                }}
              >
                <Badge count={5}>
                  <Button
                    onClick={async () => {
                      const current = JSON.parse(localStorage.getItem("user"));
                      const content = await fetch(
                        `http://172.21.148.170/api/chat/${current.accountID}`
                      );
                      content.json().then(r => {
                        props.history.push(`/chat/${r[0].url}`);
                      });
                    }}
                    shape="circle"
                    icon={<MessageFilled />}
                  />
                </Badge>
              </span>
            </Tooltip>
            {/* Location services Button */}
            <Tooltip title="Location Services">
              <Button
                onClick={() => {
                  props.history.push(`/location`);
                }}
                style={{
                  float: "right",
                  marginTop: "16px",
                  marginRight: "15px"
                }}
                shape="circle"
                icon={<EnvironmentFilled />}
              />
            </Tooltip>
            <Dropdown overlay={userMenu}>
              <Button
                style={{
                  float: "right",
                  marginTop: "16px",
                  marginRight: "15px"
                }}
                shape="circle"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Fragment>
        ) : (
          ""
        )}
      </Header>
    </Layout>
  );
};

export default Topbar;
