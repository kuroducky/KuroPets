import React from "react";
import { Layout, Typography } from "antd";
import LocationControl from "./LocationControl";
const { Title } = Typography;
const { Content } = Layout;

const mainPageStyles = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: 120,
  boxShadow:
    "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
  borderRadius: "8px",
  padding: "2px 22px 0px 22px"
};
const Location = props => {
  return (
    <Content style={mainPageStyles}>
      <div
        style={{
          marginTop: 24,
          minHeight: 380
        }}
      >
        <Title level={2}> Location Services</Title>
        <LocationControl {...props} />
      </div>
    </Content>
  );
};

export default Location;
