import React from "react";
import { Layout } from "antd";
import MarketPlaceControl from "./MarketPlaceControl";

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
const MarketPlace = props => {
  return (
    <Content style={mainPageStyles}>
      <div
        style={{
          marginTop: 24,
          minHeight: 380
        }}
      >
        {/* conditional render Marketplace & View my own posts */}

        <MarketPlaceControl {...props} />

        {/* need to figure how to use loading components also well but later */}
      </div>
    </Content>
  );
};

export default MarketPlace;
