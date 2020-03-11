import React, { Fragment } from "react";
import {
  Layout,
  Input,
  Button,
  Tooltip,
  Badge,
  Dropdown,
  Menu,
  Typography
} from "antd";

import { Link } from "react-router-dom";
import {
  MessageFilled,
  EnvironmentFilled,
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import LoginButton from "./LoginButton";
import { logout } from "../../Auth";
const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Topbar = props => {
  const logoStyles = {
    width: "120px",
    background: "#f0f1f1",
    height: "31px",
    float: "left",
    margin: "16px 28px 16px 0"
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

  const logOutUser = () => {
    logout();
    props.history.push("/");
  };
  let currentUser = JSON.parse(localStorage.getItem("user"));

  const onSearchSubmit = value => {
    const keywords = value.split(" ");
    props.onSearchSubmit(keywords);
  };
  const userMenu = (
    <Menu>
      <Menu.Item>
        <span>
          <UserOutlined />
        </span>
        {localStorage.getItem("user") ? (
          <Text strong>{currentUser.name}</Text>
        ) : (
          ""
        )}
      </Menu.Item>
      <Menu.Item>
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
        <div className="logo" style={logoStyles} />
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
          <LoginButton {...props} />
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
                  <Button shape="circle" icon={<MessageFilled />} />
                </Badge>
              </span>
            </Tooltip>
            {/* Location services Button */}
            <Tooltip title="Location Services">
              <Button
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
