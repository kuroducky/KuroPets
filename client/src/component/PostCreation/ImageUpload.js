import React, { Fragment } from "react";
import FittedImage from "react-fitted-image";
import { Carousel, Typography, Button, Form, Input } from "antd";

const { Title } = Typography;
class ImageUpload extends React.Component {
  onAddImage = value => {
    const { image } = value;
    const { onSubmitImage } = this.props;
    console.log();
    onSubmitImage(image);
  };
  render() {
    const { images } = this.props;
    return (
      <Fragment>
        <br />
        <Title style={{ marginBottom: "0px" }} level={4}>
          Image Upload
        </Title>
        You can choose to upload images to provide more information
        <div style={{ borderRadius: "8px", width: "600px", height: "550px" }}>
          <br />
          <Carousel>
            {images.length === 0 ? (
              <div>
                <FittedImage
                  fit="cover"
                  style={{
                    height: "500px",
                    borderRadius: "8px"
                  }}
                  src={"/placeholder-lg.png"}
                />
              </div>
            ) : (
              images.map((link, i) => (
                <div key={i}>
                  <FittedImage
                    fit="cover"
                    style={{
                      height: "500px",
                      borderRadius: "8px"
                    }}
                    src={link}
                  />
                </div>
              ))
            )}
          </Carousel>
        </div>
        <div>
          <Form onFinish={this.onAddImage} size={"large"} layout={"vertical"}>
            <Form.Item name={"image"}>
              <Input placeholder="enter image URL..." />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12 }}>
              <Button block type="primary" htmlType="submit">
                <strong>Add Image</strong>{" "}
              </Button>
            </Form.Item>
          </Form>
          <div style={{ float: "left" }}></div>hello
        </div>
      </Fragment>
    );
  }
}

export default ImageUpload;
