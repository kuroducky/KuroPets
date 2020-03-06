import React from "react";
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

import {
  MessageFilled,
  EnvironmentFilled,
  UserOutlined,
  FileTextOutlined
} from "@ant-design/icons";
import LoginButton from "./LoginButton";

const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Topbar = () => {
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
  const userMenu = (
    <Menu>
      <Menu.Item>
        <span>
          <UserOutlined />
        </span>
        <Text strong>UserName</Text>
      </Menu.Item>
      <Menu.Item>
        <span>
          <FileTextOutlined />
        </span>
        <Text>My Posts</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={headerStyles}>
        {/* we will add our app logo here */}
        <div className="logo" style={logoStyles} />
        <Search
          size="large"
          placeholder="Search posts..."
          onSearch={value => console.log(value)}
          style={{
            width: 800,
            marginLeft: "60px",
            backgroundColor: "#f0f1f1",
            border: "none"
          }}
        />
        {/* Create post button */}
        {localStorage.getItem("user") ? (
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
        ) : (
          // <Button
          //   type="primary"
          //   size="medium"
          //   style={{
          //     float: "right",
          //     marginTop: "16px",
          //     padding: "0 20px 0 20px"
          //   }}
          // >
          //   {" "}
          //   <strong>Log in</strong>
          // </Button>
          <LoginButton />
        )}

        {/* Chat Button, counter represents unopened chats KIV*/}
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
      </Header>
    </Layout>
  );
};

export default Topbar;
