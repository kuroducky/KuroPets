import React, { Fragment, useState } from "react";
import { Form, Input, Button, Modal, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../Auth";

const { Text } = Typography;
const LoginForm = ({ visible, onLogin, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Login to KuroPets"
      okText="Login"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onLogin(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!"
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!"
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Text>Do not have an account? </Text>
        <a href="/register">Register now!</a>
      </Form>
    </Modal>
  );
};
const LoginControl = props => {
  const [visible, setVisible] = useState(false);

  const onLogin = async ({ username, password }) => {
    let success = await login(username, password);
    if (success) {
      window.location.reload();
      setVisible(false);
    } else {
      message.error("Incorrect Username or Password");
    }
  };
  return (
    <Fragment>
      <Button
        size="medium"
        style={{
          float: "right",
          marginTop: "16px",
          padding: "0 20px 0 20px"
        }}
        onClick={() => {
          setVisible(true);
        }}
      >
        <strong>Login</strong>
      </Button>
      <LoginForm
        visible={visible}
        onLogin={onLogin}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </Fragment>
  );
};
export default LoginControl;
