import React, { Fragment } from "react";
import { Button, Modal } from "antd";

class LoginButton extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <Fragment>
        <Button
          type="primary"
          size="medium"
          style={{
            float: "right",
            marginTop: "16px",
            padding: "0 20px 0 20px"
          }}
          onClick={this.showModal}
        >
          {" "}
          <strong>Log in</strong>
        </Button>
        <Modal
          title="Log In"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Fragment>
    );
  }
}

export default LoginButton;
