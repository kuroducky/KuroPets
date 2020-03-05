import React from "react";
import { Layout } from "antd";
import PostControl from "./PostControl";

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
const Post = props => {
  return (
    <Content style={mainPageStyles}>
      <div
        style={{
          marginTop: 24,
          minHeight: 380
        }}
      >
        <PostControl {...props} />
      </div>
    </Content>
  );
};

export default Post;
