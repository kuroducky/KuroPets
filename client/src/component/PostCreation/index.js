import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  DatePicker,
  message
} from "antd";
import ImageUpload from "./ImageUpload";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Title } = Typography;
const { TextArea } = Input;
const mainPageStyles = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: 60,
  padding: "2px 22px 0px 22px"
};
class PostCreation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.form = React.createRef();
  }
  onSubmitImage = url => {
    this.setState(prevState => ({
      images: [...prevState.images, url]
    }));
  };
  onDeleteImage = index => {
    const images = [...this.state.images];
    images.splice(index, 1);
    this.setState({ images: images });
  };
  async onSubmitForm(values) {
    const { images } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const { accountID } = user;
    values.startDate = values.startEndDate[0].format("YYYY-MM-DDTHH:mm:ss"); // 2020-02-22T16:00:00.000Z
    values.endDate = values.startEndDate[1].format("YYYY-MM-DDTHH:mm:ss");
    values.images = images;
    values.accountID = accountID;
    // values.accountID = user.accountID;
    delete values.startEndDate;

    // POST request
    const response = await fetch(`http://172.21.148.170/api/post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const content = await response.json();

    console.log(content);
    this.form.current.resetFields();
    message.success("Post created!");
    // this.props.form.resetFields();
    this.setState({ images: [] });
    this.props.history.push(`/post/${content.postID}`);
  }
  render() {
    const validateMessages = {
      required: "This field is required!"
    };
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
                onDeleteImage={this.onDeleteImage}
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
                  validateMessages={validateMessages}
                  size={"large"}
                  layout={"vertical"}
                  name="new-post"
                  onFinish={this.onSubmitForm}
                  ref={this.form}
                >
                  <Form.Item
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    name={"title"}
                    label="Title"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={"location"} label="Location">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"typeOfPet"} label="Type Of Pet">
                    <Input />
                  </Form.Item>
                  <Form.Item name={"service"} label="Type Of Service">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      {
                        required: true
                      }
                    ]}
                    name={"startEndDate"}
                    label="Start and End Date"
                  >
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
