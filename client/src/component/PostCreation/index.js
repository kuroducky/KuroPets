import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import ImageUpload from "./ImageUpload";
const { Content } = Layout;
const { Title } = Typography;
const mainPageStyles = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: 120,
  boxShadow:
    "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
  borderRadius: "8px",
  padding: "2px 22px 0px 22px"
};
class PostCreation extends React.Component {
  onSubmitImage = url => {
    console.log("new image: ", url);
  };
  render() {
    return (
      <Content style={mainPageStyles}>
        <div
          style={{
            marginTop: 24,
            minHeight: 380
          }}
        >
          <Title style={{ marginBottom: "0px" }} level={3}>
            What help do you need?
          </Title>
          Create a post and put it on our Marketplace.
          <Row style={{ marginTop: "20px" }} gutter={16}>
            <Col span={8}>
              <ImageUpload onSubmitImage={this.onSubmitImage} />
            </Col>
            <Col span={16}>Form</Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default PostCreation;
