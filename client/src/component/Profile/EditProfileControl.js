import React, { useEffect, Fragment } from "react";
import { Button, Form, Input, Modal } from "antd";

const EditProfileView = ({ visible, onCancel, onUpdateForm, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      email: user.email,
    });
  }, []);
  return (
    <Modal
      visible={visible}
      title="User Information"
      cancelText="Cancel"
      okText="Done"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onUpdateForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      centered
      width="520px"
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          name={"phone"}
          label="Phone Number"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input a valid email address",
            },
          ]}
          name={"email"}
          label="Email Address"
        >
          <Input />
        </Form.Item>
        {/* <Form.Item name={"password"} label="Password">
          <Input />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

class EditProfileControl extends React.Component {
  state = {
    visible: false,
  };
  onUpdateForm = (values) => {
    this.props.onUpdateForm(values);
    this.setState({ visible: false });
  };
  render() {
    return (
      <Fragment>
        <Button
          size="large"
          onClick={() => {
            this.setState({ visible: true });
          }}
        >
          <strong>Edit Profile</strong>
        </Button>
        <EditProfileView
          {...this.props}
          visible={this.state.visible}
          user={this.props.user}
          onCancel={() => {
            this.setState({ visible: false });
          }}
          onUpdateForm={this.onUpdateForm}
        />
      </Fragment>
    );
  }
}

export default EditProfileControl;
