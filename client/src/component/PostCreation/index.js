import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  DatePicker
} from "antd";
import ImageUpload from "./ImageUpload";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const { TextArea } = Input;
const mainPageStyles = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: 120,
  padding: "2px 22px 0px 22px"
};
class PostCreation extends React.Component {
  state = {
    images: []
    // title: "",
    // description: "",
    // location: "",
    // dateTime: "",
    // status: "", // "pending offer", "pending service", "service completed"
    // typeOfPet: "",
    // typeOfService: "", // "Walking". "Grooming", "Vet", "Others"
    // startDate: "",
    // endDate: "",
    // user: {}
  };
  onSubmitImage = url => {
    console.log("new image: ", url);
    this.setState(prevState => ({
      images: [...prevState.images, url]
    }));
  };

  onSubmitForm = values => {
    console.log(values);
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
          <Title style={{ marginBottom: "0px" }} level={2}>
            What help do you need?
          </Title>
          Create a post and put it on our Marketplace.
          <Row style={{ marginTop: "20px" }} gutter={16}>
            <Col span={10}>
              <ImageUpload
                images={this.state.images}
                onSubmitImage={this.onSubmitImage}
              />
            </Col>
            <Col span={14}>
              <div
                style={{
                  minHeight: 800,
                  padding: "20px 22px 0px 22px",
                  marginBottom: "50px",
                  boxShadow:
                    "0 3px 10px 0 rgba(44,44,45,.07), inset 0 0 0 1px rgba(44,44,45,.07)",
                  borderRadius: "8px"
                }}
              >
                <Form
                  size={"large"}
                  layout={"vertical"}
                  name="new-post"
                  onFinish={this.onSubmitForm}
                >
                  <Form.Item name={"title"} label="Title">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"location"} label="Location">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"tyoeOfPet"} label="Type Of Pet">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"typeOfService"} label="Type Of Service">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"startEndDate"} label="Start and End Date">
                    <RangePicker size={"large"} />
                  </Form.Item>
                  <Form.Item name={"description"} label="Description">
                    <TextArea
                      autoSize={{ minRows: 4, maxRows: 7 }}
                      placeholder="Briefly describe the service required..."
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 10 }}>
                    <div style={{ marginBottom: 15 }}>
                      <Button
                        type="primary"
                        size={"large"}
                        block
                        htmlType="submit"
                      >
                        <strong>Create Post</strong>
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default PostCreation;
