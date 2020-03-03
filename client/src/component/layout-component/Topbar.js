import React from "react";
import { Layout, Input, Button, Tooltip } from "antd";
import { CompassOutlined } from "@ant-design/icons";
const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {
  const logoStyles = {
    width: "120px",
    background: "#f0f1f1",
    height: "31px",
    float: "left",
    margin: "16px 28px 16px 0"
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          background: "#fff",
          paddingRight: "5%",
          paddingLeft: "5%",
          borderBottom: "1px solid #f0f0f0"
        }}
      >
        <div className="logo" style={logoStyles} />
        <Search
          size="large"
          placeholder="Search posts..."
          onSearch={value => console.log(value)}
          style={{
            width: 600,
            marginLeft: "30px",
            backgroundColor: "#f0f1f1",
            border: "none"
          }}
        />

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

        <Tooltip title="Location Services">
          <Button
            style={{
              float: "right",
              marginTop: "16px",
              marginRight: "20px"
            }}
            shape="circle"
            icon={<CompassOutlined />}
          />
        </Tooltip>
      </Header>
    </Layout>
  );
};

export default Topbar;
